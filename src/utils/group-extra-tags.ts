import { TagType } from '@/app/(with-header)/my-page/_types'

const groupExtraTags = (data: TagType[]): TagType[] => {
  if (data.length <= 7) return data

  const topSix = data.slice(0, 6)
  const others = data.slice(6)

  const othersCount = others.reduce(
    (sum, item) => sum + item.count,
    0,
  )
  const othersPercent = others.reduce(
    (sum, item) => sum + item.percent,
    0,
  )

  const etcItem: TagType = {
    tag: '기타',
    count: othersCount,
    percent: othersPercent,
    originalItems: others.map((item) => ({
      tag: item.tag,
      count: item.count,
    })),
  }

  return [...topSix, etcItem]
}

export default groupExtraTags
