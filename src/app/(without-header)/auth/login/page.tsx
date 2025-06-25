'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setAuth = useAuthStore((state) => state.setAuth)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    let valid = true

    if (!trimmedEmail) {
      setEmailError('이 입력란을 작성하세요.')
      valid = false
    } else if (!trimmedEmail.includes('@')) {
      setEmailError(
        `이메일 주소에 '@'를 포함해 주세요. '${trimmedEmail}'에 '@'가 없습니다.`,
      )
      valid = false
    } else {
      const domain = trimmedEmail.split('@')[1]
      if (!domain) {
        setEmailError(
          `'@' 뒷 부분을 입력해 주세요. '${trimmedEmail}'이 완전하지 않습니다.`,
        )
        valid = false
      }
    }

    if (!trimmedPassword) {
      setPasswordError('이 입력란을 작성하세요.')
      valid = false
    }

    if (!valid || isLoading) return

    try {
      setIsLoading(true)
      const { accessToken, user } = await login({
        email: trimmedEmail,
        password: trimmedPassword,
      })
      setAuth(accessToken, user)
      router.push('/')
    } catch (error: unknown) {
      alert(
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className="text-2xl font-bold text-center mb-2">로그인</h3>
      <p className="text-center text-sm text-gray-400 mb-6">
        계정에 로그인하여 독서 여행을 계속하세요
      </p>

      <label
        className="text-sm font-semibold mb-2 block"
        htmlFor="email"
      >
        이메일
      </label>
      <input
        id="email"
        className={`w-full h-10 px-3 py-2 mb-1 border rounded-lg focus:ring-1 focus:outline-none text-sm ${
          emailError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-gray-500'
        }`}
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && (
        <p className="text-red-500 text-sm mb-3">{emailError}</p>
      )}

      <label
        className="text-sm font-semibold mt-5 mb-2 block"
        htmlFor="password"
      >
        비밀번호
      </label>
      <input
        id="password"
        className={`w-full h-10 px-3 py-2 mb-1 border rounded-lg focus:ring-1 focus:outline-none text-sm ${
          passwordError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-gray-500'
        }`}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && (
        <p className="text-red-500 text-sm mb-3">{passwordError}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-10 px-3 py-2 bg-slate-950 text-white mt-4 mb-4 rounded-lg hover:bg-gray-800 hover:cursor-pointer disabled:opacity-50"
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>

      <div className="text-sm text-center">
        계정이 없으신가요?{' '}
        <a
          href="/auth/signup"
          className="text-blue-500 font-semibold"
        >
          회원가입
        </a>
      </div>
    </form>
  )
}
