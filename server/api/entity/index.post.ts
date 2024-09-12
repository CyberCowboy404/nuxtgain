import consola from 'consola'

import { serverSupabaseClient } from '#supabase/server'
import type { Database, Tables } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const user = await isUserExists(event)

  const { type, ...entity } = await readBody<(Tables<'projects'> | Tables<'certificates'>) & { type: 'projects' | 'certificates' }>(event)
  const log = consola.withTag(`api:entity-${type}:create`)

  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from(type)
    .insert([{ ...entity, user_id: user!.id }])
    .select('id, resume_id')
    .single()

  log.info(data)

  if (error) {
    log.error(error)
    throw createError({ status: 500, message: error.message })
  }

  log.info(data)

  return data
})
