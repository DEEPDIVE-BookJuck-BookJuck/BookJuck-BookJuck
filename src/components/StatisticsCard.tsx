import { IconKeyType, IconObjType } from '@/app/types/mypage'
import { Award, BookOpen, FileText, TrendingUp } from 'lucide-react'

export default function StatisticsCard({
  title,
}: {
  title: IconKeyType
}) {
  const iconObj: IconObjType = {
    totalBooks: {
      title: '총 읽은 책',
      component: <BookOpen className="h-8 w-8 text-blue-500" />,
    },
    reviewBooks: {
      title: '작성한 독후감',
      component: <FileText className="h-8 w-8 text-green-500" />,
    },
    currentStreak: {
      title: '현재 연속 독서',
      component: <TrendingUp className="h-8 w-8 text-orange-500" />,
    },
    longestStreak: {
      title: '최장 연속 독서',
      component: <Award className="h-8 w-8 text-purple-500" />,
    },
  }

  return (
    <div className="flex justify-between items-center h-28 bg-white border-1 border-gray-300 rounded-xl px-6 py-8">
      <div>
        <p className="text-sm text-gray-600 mb-1 text-">
          {iconObj[title].title}
        </p>
        <span className="font-bold text-3xl">24</span>
        {(title === 'currentStreak' || title === 'longestStreak') && (
          <span className="font-bold text-3xl">일</span>
        )}
      </div>
      {iconObj[title].component}
    </div>
  )
}
