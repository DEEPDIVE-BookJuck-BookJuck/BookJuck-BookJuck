import { useAuthStore } from '@/store/authStore'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

type FetchWithAuthOptions = RequestInit & {
  auth?: boolean
}

export async function fetchWithAuth(
  endpoint: string,
  options: FetchWithAuthOptions = {},
): Promise<any> {
  const { auth = false, ...restOptions } = options
  const token = useAuthStore.getState().accessToken

  const headers = new Headers(restOptions.headers || {})

  if (auth && token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...restOptions,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || '요청 중 문제가 발생했습니다.')
  }

  return res.json()
}
