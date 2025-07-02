import type { Access } from 'payload'

export const readFromServer: Access = ({ req }) => {
  if (req.user) {
    return true
  }

  const custom_auth = req.headers.get('custom_auth')
  if (!custom_auth || custom_auth !== process.env.ADMIN_CUSTOM_AUTH) {
    return false
  }

  return true
}
