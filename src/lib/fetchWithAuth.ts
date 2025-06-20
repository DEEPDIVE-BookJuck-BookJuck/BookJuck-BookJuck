import { useAuthStore } from '@/store/authStore'

type FetchWithAuthOptions = RequestInit & {
  auth?: boolean // true일 경우 Authorization 헤더 삽입
}

export async function fetchWithAuth(
  input: RequestInfo | URL,
  options: FetchWithAuthOptions = {},
): Promise<any> {
  const { auth = false, ...restOptions } = options
  const token = useAuthStore.getState().accessToken

  const headers = new Headers(restOptions.headers || {})

  if (auth && token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(input, {
    ...restOptions,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || '요청 중 문제가 발생했습니다.')
  }

  return res.json()
}
