FROM oven/bun:1.4.4-slim AS base
WORKDIR /app

# ---------------------------------------------------------------------------
# Etapa 1: Instalación de dependencias (caché persistente en Coolify)
# ---------------------------------------------------------------------------
FROM base AS deps
COPY package.json bun.lock* ./

RUN --mount=type=cache,id=bun-cache,target=/root/.bun/install/cache \
  bun install --frozen-lockfile

# ---------------------------------------------------------------------------
# Etapa 2: Build (Payload 3 + Next.js standalone)
# ---------------------------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Limita la memoria de V8 en caso de que Next/Webpack levante subprocesos Node
ARG BUILD_MAX_RAM=1536
ENV NODE_OPTIONS="--no-deprecation --max-old-space-size=${BUILD_MAX_RAM}"

# Coolify inyecta PAYLOAD_SECRET, DATABASE_URL y variables NEXT_PUBLIC_* en este RUN
RUN bun --bun ./node_modules/next/dist/bin/next build

# ---------------------------------------------------------------------------
# Etapa 3: Imagen final de producción (mínima gracias a Next standalone)
# ---------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copiamos el bundle autónomo generado por Next.js (incluye su propio node_modules mínimo)
COPY --from=builder --chown=bun:bun /app/.next/standalone ./
# Next standalone no incluye public/ ni .next/static por defecto; hay que copiarlos aparte
# COPY --from=builder --chown=bun:bun /app/public ./public
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static

USER bun
EXPOSE 3000

# server.js es el entrypoint nativo que genera output: 'standalone'
CMD ["bun", "run", "server.js"]