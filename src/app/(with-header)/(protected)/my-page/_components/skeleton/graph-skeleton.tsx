export default function GraphSkeleton() {
  return (
    <div className="flex flex-col h-[400px] min-w-80 justify-between bg-white border-1 border-gray-300 rounded-xl px-6 py-6 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
      </div>
      <div className="flex-1 flex items-end justify-center gap-2 px-4 pb-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded w-8"
            style={{ height: `${Math.random() * 200 + 50}px` }}
          ></div>
        ))}
      </div>
    </div>
  )
}
