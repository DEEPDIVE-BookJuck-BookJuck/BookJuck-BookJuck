export default function RecentBookSkeleton() {
  return (
    <div className="bg-white border-1 border-gray-300 rounded-xl px-6 py-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
      <div className="w-full flex flex-col gap-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg"
          >
            <div className="h-16 w-12 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="h-4 w-4 bg-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
