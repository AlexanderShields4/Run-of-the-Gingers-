'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-900 border border-red-900/30 rounded-xl p-8 shadow-2xl text-center">
        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-red-400">Oops, something went wrong</h1>
        <p className="text-neutral-400 mb-8">{message || 'An unknown error occurred.'}</p>
        <Link
          href="/profile/create"
          className="inline-block px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  )
}
