'use client'

import { FetchWithAuthOptionsType } from '@/app/(without-header)/auth/_types'
import { useAuthStore } from '@/store/auth-store'

const API_URL_CLIENT = process.env.NEXT_PUBLIC_API_URL!

// 클라이언트 전용 fetch
export async function fetchWithAuth<T = unknown>(
  endpoint: string,
  options: FetchWithAuthOptionsType = {},
): Promise<T> {
  if (typeof window === 'undefined') {
    throw new Error(
      'fetchWithAuth는 클라이언트 컴포넌트에서만 사용할 수 있습니다.',
    )
  }

  const { auth = false, ...restOptions } = options
  const headers = new Headers(restOptions.headers || {})

  const token = useAuthStore.getState().accessToken

  if (auth && token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${API_URL_CLIENT}${endpoint}`, {
    ...restOptions,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(
      (error as { message?: string }).message ||
        '요청 중 문제가 발생했습니다.',
    )
  }

  return res.json() as Promise<T>
}
