import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function ProfileViewPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/profile/create')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 flex flex-col items-center">
      <div className="max-w-xl w-full bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
          Your Profile
        </h1>
        <div className="space-y-4">
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-400 mb-1">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-400 mb-1">User ID</p>
            <p className="text-sm font-mono text-neutral-300 break-all">{user.id}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-sm text-neutral-500 text-center">
            More features to customize your profile coming soon!
          </p>
        </div>
      </div>
    </div>
  )
}
