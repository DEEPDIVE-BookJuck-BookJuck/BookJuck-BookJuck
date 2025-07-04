'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { ProfileType } from '../../_types'

export default function ProfileItem() {
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [updateNickName, setUpdateNickName] = useState('')
  const [active, setActive] = useState(false)
  const router = useRouter()

  const clickHandler = () => {
    const fetchNickName = async () => {
      try {
        const newNickName: ProfileType = await fetchWithAuth(
          '/api/user/profile',
          {
            auth: true,
            method: 'PATCH',
            body: JSON.stringify({ nickName: updateNickName.trim() }),
          },
        )

        setNickName(newNickName?.nickName)
        setUpdateNickName('')
        setActive(false)
      } catch (error) {
        if (error instanceof Error)
          console.error('닉네임 변경 로딩 실패:', error.message)
        else console.error('왜 나는지 모르는 에러:', error)
      }
    }
    fetchNickName()
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setUpdateNickName(newValue)
    setActive(newValue.trim() !== '')
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData: ProfileType = await fetchWithAuth(
          '/api/user/profile',
          {
            auth: true,
            method: 'GET',
          },
        )

        setNickName(profileData.nickName)
        setEmail(profileData.email)
      } catch (error) {
        if (error instanceof Error)
          console.error('프로필 데이터 로딩 실패:', error.message)
        else console.error('왜 나는지 모르는 에러:', error)
      }
    }
    fetchProfile()
  }, [nickName])

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-3xl mb-2">회원 정보</h1>
      <div className="flex w-5/6 justify-between items-center">
        <label className="font-bold w-1/4 text-sm text-center pr-2 pt-1">
          E-mail
        </label>
        {email ? (
          <p className="w-2/3">{email}</p>
        ) : (
          <div className="w-2/3 h-6 bg-gray-200 rounded animate-pulse"></div>
        )}
      </div>
      <div className="flex w-5/6 justify-between items-center">
        <label className="font-bold w-1/4 text-sm text-center pr-2 pt-1">
          닉네임
        </label>
        <input
          type="text"
          name="nickName"
          value={updateNickName}
          onChange={handleInput}
          placeholder={nickName}
          className="w-2/3 h-11 p-2 border border-zinc-200 rounded focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:outline-none"
        />
      </div>
      <section className="flex w-1/2 justify-between mt-2">
        <button
          className="px-4 py-2 border rounded border-gray-200 hover:bg-gray-100 cursor-pointer"
          onClick={() => router.back()}
        >
          취소
        </button>
        <button
          disabled={!active}
          onClick={clickHandler}
          className={`px-4 py-2 border rounded border-gray-200 ${
            active
              ? 'bg-slate-950 text-white hover:bg-gray-800 cursor-pointer'
              : 'cursor-not-allowed'
          }`}
        >
          수정
        </button>
      </section>
    </div>
  )
}
