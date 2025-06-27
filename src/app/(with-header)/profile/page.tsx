import ProfileItem from './_components/profile-item'

export default function Profile() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full px-6 py-8 border-1 border-gray-300">
        <ProfileItem />
      </div>
    </div>
  )
}
