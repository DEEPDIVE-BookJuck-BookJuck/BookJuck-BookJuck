interface FormErrorProps {
  message?: string
}

export default function FormError({ message }: FormErrorProps) {
  return (
    <p
      className={`text-sm mb-1.5 transition-all ${
        message ? 'text-red-500' : 'invisible'
      } min-h-[20px]`}
    >
      {message || ''}
    </p>
  )
}
