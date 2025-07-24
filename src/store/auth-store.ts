import { AuthStateType } from '@/app/(without-header)/auth/_types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
