interface TagListProps {
  tags?: string[]
  style?: string
}

export default function TagList({
  tags = [],
  style = 'bg-gray-100',
}: TagListProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center px-2.5 py-0.5 ${style} rounded-full text-xs font-semibold truncate`}
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}
