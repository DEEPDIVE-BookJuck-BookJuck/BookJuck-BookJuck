export default function StatisticsCardSkeleton() {
  return (
    <div className="flex justify-between items-center h-28 bg-white border-1 border-gray-300 rounded-xl px-6 py-8 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="h-8 w-8 bg-gray-200 rounded"></div>
    </div>
  )
}
