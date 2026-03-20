'use server'

import { createClient } from '@/utils/supabase/server'

async function fetchVoteCounts(supabase: Awaited<ReturnType<typeof createClient>>): Promise<Record<string, number>> {
  const { data, error } = await supabase.from('votes').select('runner_id')
  if (error) throw new Error(error.message)
  const counts: Record<string, number> = {}
  data?.forEach(row => {
    counts[row.runner_id] = (counts[row.runner_id] || 0) + 1
  })
  return counts
}

export async function getInitialPageData(): Promise<{
  voteCounts: Record<string, number>
  isLoggedIn: boolean
  hasVoted: boolean
}> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [voteCounts, voteCheck] = await Promise.all([
    fetchVoteCounts(supabase),
    user
      ? supabase.from('votes').select('id').eq('user_id', user.id).maybeSingle()
      : Promise.resolve({ data: null }),
  ])

  return {
    voteCounts,
    isLoggedIn: !!user,
    hasVoted: !!voteCheck.data,
  }
}

export async function submitVote(runnerId: string): Promise<Record<string, number>> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('You must be logged in to vote')

  const { error } = await supabase.from('votes').insert({ runner_id: runnerId, user_id: user.id })
  if (error) {
    if (error.code === '23505') throw new Error('You have already voted')
    throw new Error(error.message)
  }

  return fetchVoteCounts(supabase)
}
