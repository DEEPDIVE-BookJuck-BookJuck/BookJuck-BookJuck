export async function GET(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_ALADIN_API_KEY
  if (!apiKey) {
    return new Response('API key not found', { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const itemsPerPage = 10

  const start = (page - 1) * itemsPerPage + 1

  const apiUrl =
    `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${apiKey}` +
    `&QueryType=Bestseller&MaxResults=${itemsPerPage}&start=${start}` +
    `&SearchTarget=Book&Output=JS&Version=20131101`

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

