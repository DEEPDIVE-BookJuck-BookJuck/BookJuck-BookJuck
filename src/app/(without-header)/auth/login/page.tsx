'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setAuth = useAuthStore((state) => state.setAuth)
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const { accessToken, user } = await login({ email, password })
      setAuth(accessToken, user)
      router.push('/mypage')
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-2">로그인</h3>
      <p className="text-center text-sm text-gray-400 mb-6">
        계정에 로그인하여 독서 여행을 계속하세요
      </p>
      <p className="text-sm font-semibold mb-2">이메일</p>
      <input
        className="input w-full h-10 mb-5 px-3 py-2 border-1 text-sm border-gray-300 rounded-md focus:ring-3 focus:ring-offset focus:ring-gray-500 focus:outline-gray-300"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
      />
      <p className="text-sm font-semibold mb-2">비밀번호</p>
      <input
        className="input w-full h-10 mb-3 px-3 py-2 border-1 text-sm border-gray-300 rounded-md focus:ring-3 focus:ring-offset focus:ring-gray-500 focus:outline-gray-300"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
      />
      <button
        className="btn w-full h-10 px-3 py-2 bg-slate-950 text-white mt-4 mb-4 rounded-md hover:cursor-pointer hover:bg-gray-800"
        onClick={handleLogin}
      >
        로그인
      </button>
      <div className="text-sm text-center">
        <br />
        계정이 없으신가요?{' '}
        <a
          href="/auth/signup"
          className="text-blue-500"
        >
          회원가입
        </a>
      </div>
    </div>
  )
}
