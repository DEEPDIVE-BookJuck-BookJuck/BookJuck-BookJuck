
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const page = parseInt(searchParams.get('page') || '1', 10)

  if (!query) {
    return new Response('Missing query', { status: 400 })
  }

  const apiKey = process.env.NEXT_PUBLIC_ALADIN_API_KEY
  if (!apiKey) {
    return new Response('API key not found', { status: 500 })
  }

  const itemsPerPage = 50
  const start = (page - 1) * itemsPerPage + 1

  const apiUrl = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${encodeURIComponent(
    query
  )}&QueryType=Keyword&MaxResults=${itemsPerPage}&start=${start}&SearchTarget=Book&output=JS&Version=20131101`

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
