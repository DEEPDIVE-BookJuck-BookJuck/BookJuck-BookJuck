import {
  LoginParamsType,
  LoginResponseType,
  SignupParamsType,
  SignupResponseType,
} from '@/app/(without-header)/auth/_types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function login({
  email,
  password,
}: LoginParamsType): Promise<LoginResponseType> {
  const res = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
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
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickName, email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || '회원가입에 실패했습니다.')
  }

  return res.json()
}
