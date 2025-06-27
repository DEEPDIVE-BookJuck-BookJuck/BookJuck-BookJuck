'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from '@/lib/auth'

export default function SignupPage() {
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [nickNameError, setNickNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const validateNickname = (nickName: string) =>
    nickName.trim() ? '' : '사용하실 닉네임을 입력해 주세요.'
  const validateEmail = (email: string) =>
    !email.trim()
      ? '이메일을 입력해 주세요.'
      : /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/.test(
          email.trim(),
        )
      ? ''
      : '올바른 이메일 주소를 입력해 주세요.'
  const validatePassword = (pw: string) =>
    !pw.trim()
      ? '비밀번호를 입력해 주세요.'
      : pw.length < 8
      ? '비밀번호는 최소 8자 이상이어야 합니다.'
      : ''
  const validateConfirm = (confirm: string, pw: string) =>
    confirm !== pw ? '비밀번호가 일치하지 않습니다.' : ''

  useEffect(() => {
    const nickNameMsg = validateNickname(nickName)
    const emailMsg = validateEmail(email)
    const pwMsg = validatePassword(password)
    const confirmMsg = validateConfirm(confirmPassword, password)

    setIsFormValid(!nickNameMsg && !emailMsg && !pwMsg && !confirmMsg)
  }, [nickName, email, password, confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nickNameMsg = validateNickname(nickName)
    const emailMsg = validateEmail(email)
    const pwMsg = validatePassword(password)
    const confirmMsg = validateConfirm(confirmPassword, password)

    setNickNameError(nickNameMsg)
    setEmailError(emailMsg)
    setPasswordError(pwMsg)
    setConfirmError(confirmMsg)

    if (nickNameMsg || emailMsg || pwMsg || confirmMsg) return

    try {
      setIsLoading(true)
      await signup({
        nickName: nickName.trim(),
        email: email.trim(),
        password,
      })
      alert('회원가입이 완료되었습니다!')
      router.push('/auth/log-in')
    } catch (error: unknown) {
      alert(
        error instanceof Error
          ? error.message
          : '회원가입 중 오류가 발생했습니다.',
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
      <h3 className="text-2xl font-bold text-center mb-2">
        회원가입
      </h3>
      <p className="text-center text-sm text-gray-400 mb-6">
        새 계정을 만들어 독서 여행을 시작하세요
      </p>

      {/* 닉네임 */}
      <label
        className="text-sm font-semibold mb-2 block"
        htmlFor="nickname"
      >
        닉네임
      </label>
      <input
        id="nickname"
        type="text"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        placeholder="홍길동"
        className={`w-full h-10 px-3 py-2 mb-1 border rounded-lg focus:ring-1 focus:outline-none text-sm ${
          nickNameError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-gray-500'
        }`}
      />
      {nickNameError && (
        <p className="text-red-500 text-sm mb-3">{nickNameError}</p>
      )}

      {/* 이메일 */}
      <label
        className="text-sm font-semibold mt-4 mb-2 block"
        htmlFor="email"
      >
        이메일
      </label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`w-full h-10 px-3 py-2 mb-1 border rounded-lg focus:ring-1 focus:outline-none text-sm ${
          emailError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-gray-500'
        }`}
      />
      {emailError && (
        <p className="text-red-500 text-sm mb-3">{emailError}</p>
      )}

      {/* 비밀번호 */}
      <label
        className="text-sm font-semibold mt-4 mb-2 block"
        htmlFor="password"
      >
        비밀번호
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`w-full h-10 px-3 py-2 mb-1 border rounded-lg focus:ring-1 focus:outline-none text-sm ${
          passwordError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-gray-500'
        }`}
      />
      {passwordError && (
        <p className="text-red-500 text-sm mb-3">{passwordError}</p>
      )}

      {/* 비밀번호 확인 */}
      <label
        className="text-sm font-semibold mt-4 mb-2 block"
        htmlFor="confirm"
      >
        비밀번호 확인
      </label>
      <input
        id="confirm"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`w-full h-10 px-3 py-2 mb-1 border rounded-lg focus:ring-1 focus:outline-none text-sm ${
          confirmError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-gray-500'
        }`}
      />
      {confirmError && (
        <p className="text-red-500 text-sm mb-3">{confirmError}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full h-10 px-3 py-2 mt-4 mb-4 rounded-md text-white hover:cursor-pointer
          ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-slate-950 hover:bg-gray-800'
          }`}
      >
        {isLoading ? '회원가입 중...' : '회원가입'}
      </button>

      <div className="text-sm text-center">
        이미 계정이 있으신가요?{' '}
        <a
          href="/auth/log-in"
          className="text-blue-500 font-semibold"
        >
          로그인
        </a>
      </div>
    </form>
  )
}
