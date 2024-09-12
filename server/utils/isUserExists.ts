import type { H3Event } from 'h3'
import consola from 'consola'

import { serverSupabaseUser } from '#supabase/server'

export default async function (event: H3Event) {
  const log = consola.withTag('api:ai:generate')
  const user = await serverSupabaseUser(event)

  if (!user) {
    console.error('User not found')
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return user
}
