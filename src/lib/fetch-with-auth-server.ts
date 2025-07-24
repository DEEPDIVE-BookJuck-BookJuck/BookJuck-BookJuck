import { cookies } from 'next/headers'

const API_URL_SERVER = process.env.API_URL!

// 서버 전용 fetch
export async function fetchWithAuthOnServer<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  const headers = new Headers(options.headers || {})
  headers.set('Cookie', cookieHeader)

  const requestOptions: RequestInit = {
    ...options,
    headers,
  }

  // 최초 요청
  let res = await fetch(
    `${API_URL_SERVER}${endpoint}`,
    requestOptions,
  )

  if (res.status === 401) {
    try {
      const refreshRes = await fetch(
        `${API_URL_SERVER}/api/auth/refresh`,
        {
          method: 'POST',
          headers: new Headers({
            Cookie: cookieHeader,
          }),
        },
      )

      if (!refreshRes.ok) {
        throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.')
      }

      // refresh 성공 → 원 요청 재시도
      res = await fetch(
        `${API_URL_SERVER}${endpoint}`,
        requestOptions,
      )
    } catch (error) {
      console.error('리프레시 토큰 요청 실패:', error)
      throw new Error('세션 갱신 중 오류가 발생했습니다.')
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(
      (error as { message?: string }).message ||
        '요청 중 문제가 발생했습니다.',
    )
  }

  return res.json() as Promise<T>
}
