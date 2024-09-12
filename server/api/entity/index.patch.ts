import consola from 'consola'

import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const user = await isUserExists(event)
  const educationData = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  const { resume_id, id, type, ...rest } = educationData
  const log = consola.withTag(`api:entity-${type}:update`)

  if (!rest || !resume_id || !id) {
    throw createError({ status: 400, message: 'No data found' })
  }

  delete rest.resume_id
  delete rest.id

  const { data, error } = await client
    .from(type)
    .update(rest)
    .eq('resume_id', resume_id)
    .eq('user_id', user.id)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    console.error(error)
    throw createError({ status: 500, message: error.message })
  }

  return data
})
