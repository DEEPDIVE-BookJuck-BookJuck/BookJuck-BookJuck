'use client'

import { useRouter } from 'next/navigation'
import Button from './button'

export default function ProfileItem() {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-3xl mb-2">회원 정보</h1>
      <div className="flex w-5/6 justify-between items-center">
        <label className="font-bold w-1/4 text-sm text-center pr-2 pt-1">
          E-mail
        </label>
        <p className="w-2/3">test1@email.com</p>
      </div>
      <div className="flex w-5/6 justify-between items-center">
        <label className="font-bold w-1/4 text-sm text-center pr-2 pt-1">
          닉네임
        </label>
        <input
          type="text"
          name="nickName"
          placeholder="삼룡파 곽두칠"
          className="w-2/3 h-11 p-2 border border-zinc-200 rounded focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:outline-none"
        />
      </div>
      <section className="flex w-1/2 justify-between mt-2">
        <Button
          text="취소"
          handler={() => router.back()}
        />
        <Button text="수정" />
      </section>
    </div>
  )
}
