import RecentBookItem from './RecentBookItem'

export default function RecentBook() {
  return (
    <div className="bg-white border-1 border-gray-300 rounded-xl px-6 py-6">
      <p className="text-2xl font-bold mb-3">최근 읽은 책</p>
      <div className="grid gap-6">
        <RecentBookItem
          title="스토너 (리버커 특별판)"
          author="존 윌리엄스 (지은이), 김승욱 (옮긴이)"
          date="2025-06-20"
          rating={4}
        />
        <RecentBookItem
          title="첫 여룸, 완주"
          author="김금희 (지은이)"
          date="2025-06-15"
          rating={3}
        />
        <RecentBookItem
          title="아토믹 해빗"
          author="제임스 클리어"
          date="2025-03-15"
          rating={5}
        />
      </div>
    </div>
  )
}
