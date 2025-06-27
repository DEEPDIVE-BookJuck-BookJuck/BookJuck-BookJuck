import { AuthStateType } from '@/app/(without-header)/auth/_types'
import { create } from 'zustand'

export const useAuthStore = create<AuthStateType>((set) => ({
  accessToken: null,
  user: null,

  setAuth: (accessToken, user) => {
    set({ accessToken, user })
  },

  clearAuth: () => {
    set({ accessToken: null, user: null })
  },
}))
