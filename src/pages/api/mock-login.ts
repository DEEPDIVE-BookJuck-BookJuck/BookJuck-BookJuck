import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return res.status(200).json({
      message: '모의 로그인 성공',
      accessToken: 'mock-access-token',
      user: {
        id: 'mock-user-id-123',
        email: 'mock@example.com',
      },
    })
  }
  return res.status(405).json({ message: 'Method Not Allowed' })
}
