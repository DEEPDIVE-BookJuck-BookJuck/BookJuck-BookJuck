import {
  LoginParamsType,
  LoginResponseType,
  SignupParamsType,
  SignupResponseType,
} from '@/app/(without-header)/auth/_types'

import { useAuthStore } from '@/store/auth-store'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function login({
  email,
  password,
}: LoginParamsType): Promise<LoginResponseType> {
  const res = await fetch(`${API_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || '로그인에 실패했습니다.')
  }

  return res.json()
}

export async function signup({
  nickName,
  email,
  password,
}: SignupParamsType): Promise<SignupResponseType> {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickName, email, password }),
    credentials: 'include',
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || '회원가입에 실패했습니다.')
  }

  return res.json()
}

export async function logout() {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('로그아웃 요청 실패:', error)
  }

  if (typeof window !== 'undefined') {
    const { clearAuth } = useAuthStore.getState()
    clearAuth()
  }
}
