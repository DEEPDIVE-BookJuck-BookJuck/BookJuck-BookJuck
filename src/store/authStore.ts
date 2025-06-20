import { create } from 'zustand'

type User = {
  id?: string // 로그인 시 반환
  email: string // 공통 필드
  nickname?: string // 회원가입 시 반환
}

type AuthState = {
  accessToken: string | null
  user: User | null
  setAuth: (accessToken: string, user: User) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAuth: (accessToken, user) => {
    set({ accessToken, user })
  },

  clearAuth: () => {
    set({ accessToken: null, user: null })
  },
}))
