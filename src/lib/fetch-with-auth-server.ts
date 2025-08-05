const API_URL_SERVER = process.env.API_URL!

export async function fetchWithAuthOnServer<T = unknown>(
  endpoint: string,
  accessToken?: string,
  refreshToken?: string,
  options: RequestInit = {},
): Promise<T> {
  let currentAccessToken = accessToken
  let currentRefreshToken = refreshToken

  // 쿠키 넣어주는 함수
  // 이걸 통해서 api를 다시 요청할 때에도 쿠키를 넣어줌
  const makeRequest = async (accessToken: string | undefined) => {
    const cookieHeader = `accessToken=${accessToken}; refreshToken=${currentRefreshToken}`

    const headers = new Headers(options.headers || {})
    headers.set('Cookie', cookieHeader)

    return fetch(`${API_URL_SERVER}${endpoint}`, {
      ...options,
      headers,
    })
  }

  // 최초 요청
  let res = await makeRequest(currentAccessToken)

  if (res.status === 401) {
    try {
      console.log('토큰 갱신 시도...')
      const refreshRes = await fetch(
        `${API_URL_SERVER}/api/auth/refresh`,
        {
          method: 'POST',
          headers: {
            // 여기서는 리프레시니까 원래 있던 토큰 넣어줌
            Cookie: `accessToken=${currentAccessToken}; refreshToken=${currentRefreshToken}`,
          },
        },
      )

      if (!refreshRes.ok) {
        throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.')
      }

      // 리프레시로 받은 응답값의 헤더에서 토큰을 뽑아서 바로 넣어줌
      const setCookieHeader = refreshRes.headers.get('set-cookie')
      if (setCookieHeader) {
        const cookies = setCookieHeader
          .split(',')
          .map((cookie) => cookie.trim())

        for (const cookie of cookies) {
          if (cookie.startsWith('accessToken='))
            currentAccessToken = cookie.split('=')[1].split(';')[0]
          else if (cookie.startsWith('refreshToken='))
            currentRefreshToken = cookie.split('=')[1].split(';')[0]
        }
      }

      res = await makeRequest(currentAccessToken)
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
