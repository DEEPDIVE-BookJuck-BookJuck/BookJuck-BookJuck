import { AuthStateType } from '@/app/types/auth'
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
