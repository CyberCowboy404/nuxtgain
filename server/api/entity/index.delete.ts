import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database, Tables } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user)
    throw new Error('User not found')

  const { id, type } = await readBody<Tables<'educations'> & { type: 'certificates' | 'projects' }>(event)

  const client = await serverSupabaseClient<Database>(event)

  const { error } = await client
    .from(type)
    .delete()
    .eq('id', id)

  if (error)
    throw new Error(error.message)

  return true
})
