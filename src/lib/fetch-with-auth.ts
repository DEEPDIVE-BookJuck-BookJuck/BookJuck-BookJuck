import { FetchWithAuthOptionsType } from '@/app/(without-header)/auth/_types'
import { useAuthStore } from '@/store/auth-store'

const API_URL =
  typeof window === 'undefined'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL

export async function fetchWithAuth<T = unknown>(
  endpoint: string,
  options: FetchWithAuthOptionsType = {},
): Promise<T> {
  const { auth = false, ...restOptions } = options
  const token = useAuthStore.getState().accessToken

  const headers = new Headers(restOptions.headers || {})

  if (auth && token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
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
