import Graph from './_components/graph'
import RecentBook from './_components/recent-book'
import StatisticsCard from './_components/statistics-card'
import Link from 'next/link'

export default function MyPage() {
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
        <div className="grid grid-cols-4 gap-6">
          <StatisticsCard title="totalBooks" />
          <StatisticsCard title="reviewBooks" />
          <StatisticsCard title="currentStreak" />
          <StatisticsCard title="longestStreak" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Graph title="MonthlyGraph" />
          <Graph title="TagGraph" />
        </div>
        <RecentBook />
      </div>
    </>
  )
}
