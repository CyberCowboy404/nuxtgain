import type { H3Event } from 'h3'
import consola from 'consola'

import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/supabase'

export default async function (event: H3Event) {
  const user = await isUserExists(event)
  const client = await serverSupabaseClient<Database>(event)
  const log = consola.withTag('isUserPaid')
  let isPaid = false

  // todo
  // const { data: subscriptionData, error: subscriptionError } = await client
  //   .from('subscriptions')
  //   .select('*')
  //   .eq('user_id', user.id)

  // if (subscriptionError) {
  //   console.error('Error querying subscriptions table:', subscriptionError)
  //   throw createError({ status: 500, message: 'Internal Server Error' })
  // }

  // if (subscriptionData.length > 0) {
  //   // User has a record in the subscriptions table
  //   isPaid = true
  // }

  const { data: purchaseData, error: purchaseError } = await client
    .from('purchases')
    .select('*')
    .eq('user_id', user.id)

  if (purchaseError) {
    console.error('Error querying purchases table:', purchaseError)
    throw createError({ status: 500, message: 'Internal Server Error' })
  }

  if (purchaseData.length > 0) {
    // User has a record in the purchases table
    isPaid = true
  }

  return isPaid
}
