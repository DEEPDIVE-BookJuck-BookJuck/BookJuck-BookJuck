import Graph from '@/components/Graph'
import StatisticsCard from '@/components/StatisticsCard'

export default function MyPage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">마이페이지</h1>
          <p className="mt-3 text-gray-600">
            나의 독서 통계와 기록을 확인해보세요
          </p>
        </div>
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
      </div>
    </>
  )
}
