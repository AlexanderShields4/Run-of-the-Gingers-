import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function ConfirmPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-[#ff3d00]/10 rounded-full">
            <Mail className="w-10 h-10 text-[#ff9100]" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          Check Your Email
        </h1>
        <p className="text-neutral-400 mb-2">
          We sent a confirmation link to your email address.
        </p>
        <p className="text-neutral-500 text-sm mb-8">
          Click the link in that email to activate your account, then come back here to sign in and cast your vote.
        </p>
        <Link
          href="/profile/login"
          className="block w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  )
}
