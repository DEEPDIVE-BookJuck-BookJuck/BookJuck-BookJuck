'use client'

import { useAutoLogout } from '@/hooks/use-auto-logout'

export default function AutoLogoutProvider() {
  useAutoLogout()
  return null
}
