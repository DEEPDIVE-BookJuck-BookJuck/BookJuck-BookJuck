import StatisticsCardSkeleton from './_components/skeleton/statistics-card-skeleton'
import GraphSkeleton from './_components/skeleton/graph-skeleton'
import RecentBookSkeleton from './_components/skeleton/recent-book-skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex items-center justify-between">
        <div>
          <div className="flex">
            <div className="w-20 px-4 py-2 bg-gray-200 text-gray-200 mr-2 rounded animate-pulse"></div>
            <h1 className="text-3xl font-bold">님의 독서통계</h1>
          </div>
          <p className="mt-3 text-gray-600">
            나의 독서 통계와 기록을 확인해보세요
          </p>
        </div>
        <div className="px-4 py-2 bg-gray-200 text-gray-200 rounded animate-pulse">
          회원 정보
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCardSkeleton />
        <StatisticsCardSkeleton />
        <StatisticsCardSkeleton />
        <StatisticsCardSkeleton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GraphSkeleton />
        <GraphSkeleton />
      </div>

      <RecentBookSkeleton />
    </div>
  )
}
