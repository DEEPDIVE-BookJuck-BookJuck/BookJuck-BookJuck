type LoginParams = {
  email: string
  password: string
}

type LoginResponse = {
  accessToken: string
  user: {
    email: string
    nickname: string
  }
}

export async function login({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
  const res = await fetch(
    'https://goorm-bookjuck-api.vercel.app/api/auth/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  )

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || '로그인에 실패했습니다.')
  }

  return res.json()
}
