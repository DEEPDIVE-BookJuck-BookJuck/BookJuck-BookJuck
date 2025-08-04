import React, { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { fetchWithAuthOnServer } from '@/lib/fetch-with-auth-server'
import { ProfileType } from '../../_types'

export const dynamic = 'force-dynamic'

export default async function MyLibraryLayout({
  children,
}: {
  children: ReactNode
}) {
  let nickName = '사용자'
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (accessToken && refreshToken) {
      const user = await fetchWithAuthOnServer<ProfileType>(
        '/api/user/profile',
        accessToken,
        refreshToken,
      )
      nickName = user.nickName
    }
  } catch (e) {
    console.error('프로필 닉네임 로드 실패:', e)
  }

  const isLoading = nickName === '사용자'

  return (
    <>
      <section className="mb-8">
        <h1 className="flex items-center gap-2 mb-2 text-3xl font-bold text-gray-900">
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <span>{nickName}</span>
          )}
          <span>님의 서재</span>
        </h1>
        <p className="text-gray-600">
          읽은 책들과 독후감을 관리하세요
        </p>
      </section>
      {children}
    </>
  )
}
