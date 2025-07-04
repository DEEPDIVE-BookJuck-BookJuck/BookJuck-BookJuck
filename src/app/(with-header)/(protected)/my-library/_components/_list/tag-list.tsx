interface TagListProps {
  tags?: string[]
}

export default function TagList({ tags = [] }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-semibold truncate"
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}
