'use server'

import { createClient } from '@/utils/supabase/server'

async function fetchVoteCounts(supabase: Awaited<ReturnType<typeof createClient>>): Promise<Record<string, number>> {
  const { data } = await supabase.from('votes').select('runner_id')
  const counts: Record<string, number> = {}
  data?.forEach(row => {
    counts[row.runner_id] = (counts[row.runner_id] || 0) + 1
  })
  return counts
}

export async function getVoteCounts(): Promise<Record<string, number>> {
  const supabase = await createClient()
  return fetchVoteCounts(supabase)
}

export async function submitVote(runnerId: string): Promise<Record<string, number>> {
  const supabase = await createClient()
  await supabase.from('votes').insert({ runner_id: runnerId })
  return fetchVoteCounts(supabase)
}
