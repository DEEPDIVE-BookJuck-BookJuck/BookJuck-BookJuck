import { AuthStateType } from '@/app/(without-header)/auth/_types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: (token, user) => set({ accessToken: token, user }),
      clearAuth: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
