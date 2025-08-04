'use client'

interface Option {
  value: string
  label: string
}

interface CustomToggleProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export default function CustomToggle({
  options,
  value,
  onChange,
}: CustomToggleProps) {
  return (
    <div className="inline-flex bg-gray-100 rounded-full p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`px-4 py-1 mr-1 text-sm rounded-full transition-colors cursor-pointer ${
            value === opt.value
              ? 'bg-white text-black font-semibold border border-slate-950'
              : 'bg-gray-200 text-gray-500 hover:bg-white hover:text-black hover:border border-slate-950'
          }`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
