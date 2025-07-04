import React, { ReactNode } from 'react'
import { fetchWithAuthOnServer } from '@/lib/fetch-with-auth-server'
import { ProfileType } from '../../_types'

export default async function MyLibraryLayout({
  children,
}: {
  children: ReactNode
}) {
  let nickName = '사용자'
  try {
    const user = await fetchWithAuthOnServer<ProfileType>(
      '/api/user/profile',
    )
    nickName = user.nickName
  } catch (e) {
    console.error('프로필 로드 실패:', e)
  }

  return (
    <>
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {nickName} 님의 서재
        </h1>
        <p className="text-gray-600">
          읽은 책들과 독후감을 관리하세요
        </p>
      </section>
      {children}
    </>
  )
}
