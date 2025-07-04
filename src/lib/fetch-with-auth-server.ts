import { cookies } from 'next/headers'

const API_URL_SERVER = process.env.API_URL!

// 서버 전용 fetch
export async function fetchWithAuthOnServer<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  const headers = new Headers(options.headers || {})
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${API_URL_SERVER}${endpoint}`, {
    ...options,
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
