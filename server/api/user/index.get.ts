import consola from 'consola'

import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const log = consola.withTag('api:user:index.get')
  const user = await serverSupabaseUser(event)

  if (!user) {
    log.info('User not exists')
    return null
  }

  const client = await serverSupabaseClient<Database>(event)

  const result = {
    subscriptionActive: null,
    cvLeft: 1,
    generated: 0,
    isPaid: false,
  }

  const { data, error } = await client
    .from('users')
    .select('sub_active, sub_end, generations, cv_count')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error(error.message)
    throw createError({ status: 500, message: 'Internal Server Error' })
  }

  const isPaid = await isUserPaid(event)

  if (data) {
    result.subscriptionActive = data.sub_active
    result.cvLeft = data.cv_count
    result.generated = data.generations
    result.isPaid = isPaid
  }

  return result
})
