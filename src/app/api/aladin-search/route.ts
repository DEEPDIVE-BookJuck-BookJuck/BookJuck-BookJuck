import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('Missing query', { status: 400 })
  }

  const apiKey = process.env.NEXT_PUBLIC_ALADIN_API_KEY
  if (!apiKey) {
    return new Response('API key not found', { status: 500 })
  }

  const apiUrl = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${encodeURIComponent(
    query
  )}&QueryType=Keyword&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101`

  try {
    const response = await fetch(apiUrl)
    const text = await response.text()

    return new Response(text, {
      headers: {
        'Content-Type': 'application/javascript;charset=UTF-8',
      },
    })
  } catch (error) {
    console.error('알라딘 API 요청 실패:', error)
    return new Response('알라딘 API 요청 실패', { status: 500 })
  }
}
