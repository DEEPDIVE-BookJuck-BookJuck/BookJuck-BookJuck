import Graph from './_components/graph'
import RecentBook from './_components/recent-book'
import StatisticsCard from './_components/statistics-card'
import Link from 'next/link'
import {
  MonthlyBookType,
  RecentBookType,
  StatisicType,
  TagBookType,
} from './_types'
import { fetchWithAuthOnServer } from '@/lib/fetch-with-auth-server'

export default async function MyPage() {
  let statisicData: StatisicType | null = null
  let monthlyBookData: MonthlyBookType[] | null = null
  let tagBookData: TagBookType[] | null = null
  let recentBookData: RecentBookType[] | null = null

  try {
    statisicData = await fetchWithAuthOnServer(
      '/api/reading/statistics',
    )
  } catch (error) {
    if (error instanceof Error)
      console.error('통계 데이터 로딩 실패:', error.message)
    else console.error('왜 나는지 모르는 에러:', error)
  }

  try {
    monthlyBookData = await fetchWithAuthOnServer(
      '/api/reading/monthly',
    )
  } catch (error) {
    if (error instanceof Error)
      console.error('월별 독서량 데이터 로딩 실패:', error.message)
    else console.error('왜 나는지 모르는 에러:', error)
  }

  try {
    tagBookData = await fetchWithAuthOnServer(
      '/api/reading/tags/statistics',
    )
  } catch (error) {
    if (error instanceof Error)
      console.error('태그별 독서량 데이터 로딩 실패:', error.message)
    else console.error('왜 나는지 모르는 에러:', error)
  }

  try {
    recentBookData = await fetchWithAuthOnServer(
      '/api/library/review/recent',
    )
  } catch (error) {
    if (error instanceof Error)
      console.error('최근 읽은 책 데이터 로딩 실패:', error.message)
    else console.error('왜 나는지 모르는 에러:', error)
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">마이페이지</h1>
            <p className="mt-3 text-gray-600">
              나의 독서 통계와 기록을 확인해보세요
            </p>
          </div>
          <Link
            href="/profile"
            className="px-4 py-2 bg-slate-950 text-white rounded hover:bg-gray-800 hover: cursor-pointer"
          >
            회원 정보
          </Link>
        </section>
        {statisicData && (
          <div className="grid grid-cols-4 gap-6">
            <StatisticsCard
              title="totalBooks"
              data={statisicData.totalBooks}
            />
            <StatisticsCard
              title="reviewBooks"
              data={statisicData.reviewBooks}
            />
            <StatisticsCard
              title="currentStreak"
              data={statisicData.currentStreak}
            />
            <StatisticsCard
              title="longestStreak"
              data={statisicData.longestStreak}
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-6">
          {monthlyBookData && (
            <Graph
              title="MonthlyGraph"
              data={monthlyBookData.reverse()}
            />
          )}
          {tagBookData && (
            <Graph
              title="TagGraph"
              data={tagBookData}
            />
          )}
        </div>
        {recentBookData && <RecentBook data={recentBookData} />}
      </div>
    </>
  )
}
