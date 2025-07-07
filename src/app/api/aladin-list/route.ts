export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_ALADIN_API_KEY
  if (!apiKey) {
    return new Response('API key not found', { status: 500 })
  }

  const apiUrl = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${apiKey}&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&Output=JS&Version=20131101`

  try {
    const res = await fetch(apiUrl)
    const text = await res.text()

    return new Response(text, {
      headers: {
        'Content-Type': 'application/javascript;charset=UTF-8',
      },
    })
  } catch (error) {
    console.error('List API 호출 실패:', error)
    return new Response('알라딘 List API 요청 실패', { status: 500 })
  }
}
