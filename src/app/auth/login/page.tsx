'use client'

import { useState } from 'react'

export default function MockLoginPage() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleMockLogin() {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/mock-login', {
        method: 'POST',
      })

      if (!res.ok) throw new Error('로그인 실패')

      const data = await res.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (err: any) {
      setResult(err.message || '에러 발생')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 py-20">
      <h1 className="text-2xl font-bold mb-4">Mock 로그인 테스트</h1>
      <button
        onClick={handleMockLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? '로그인 중...' : 'Mock 로그인 요청'}
      </button>

      {result && (
        <pre className="mt-6 p-4 bg-gray-100 rounded border border-gray-300 whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  )
}
