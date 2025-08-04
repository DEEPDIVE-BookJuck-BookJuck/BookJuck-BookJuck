import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()

  // accessToken 삭제
  cookieStore.set({
    name: 'accessToken',
    value: '',
    path: '/',
    maxAge: 0,
  })

  // refreshToken 삭제
  cookieStore.set({
    name: 'refreshToken',
    value: '',
    path: '/',
    maxAge: 0,
  })

  return NextResponse.json({ message: '로그아웃 완료' })
}
