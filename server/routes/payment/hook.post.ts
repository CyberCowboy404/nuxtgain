import consola from 'consola'
import Stripe from 'stripe'

import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~/types/supabase'

export enum UserPlanLimits {
  BasicCount = 2,
  BasicOperations = 10,
  BundleCount = 5,
  BundleOperations = 30,
}

export default defineEventHandler(async (event) => {
  const log = consola.withTag('post: payment/hook/')
  const config = useRuntimeConfig(event)
  const bodyRaw = await readRawBody(event)
  const { stripeSigningSecret, stripeSecret } = useRuntimeConfig(event)
  const headers = getRequestHeaders(event)

  const stripe = new Stripe(stripeSecret, {})

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(bodyRaw!, headers['stripe-signature']!, stripeSigningSecret)
  } catch (err) {
    console.error(new Date(), 'Webhook Error:', err.message)
    return createError({ status: 400, message: `Webhook Error: ${err?.message}` })
  }

  const client = await serverSupabaseServiceRole<Database>(event)
  const eventData = stripeEvent?.data.object as Stripe.Checkout.Session

  log.info(new Date(), `event type: ${stripeEvent?.type}`)

  if (stripeEvent?.type === 'checkout.session.completed') {
    const userEmail = eventData.customer_details?.email
    const isPaid = eventData.payment_status === 'paid'
    // One time Payment
    if (eventData.mode === 'payment' && isPaid) {
      const session = await stripe.checkout.sessions.retrieve(eventData.id)
      const links = {
        dev: [
          'plink_1P9mMXRqUPDTe8XNOD5CVWry',
          'plink_1P9m0TRqUPDTe8XNxLlBi5xV',
        ],
        prod: [
          'plink_1PFxqyRqUPDTe8XNDSoR5dad',
          'plink_1PFxvZRqUPDTe8XNUYLi28uM',
        ]
      }
      const env = config.env === 'production' ? 'prod' : 'dev'
      const activeLink = links[env]

      let count = 0
      if (eventData.payment_link === activeLink[0]) {
        count = UserPlanLimits.BasicCount
      } else if (eventData.payment_link === activeLink[1]) {
        count = UserPlanLimits.BundleCount
      }

      let operations = 0
      if (count === UserPlanLimits.BasicCount) {
        operations = UserPlanLimits.BasicOperations
      } else if (count === UserPlanLimits.BundleCount) {
        operations = UserPlanLimits.BundleOperations
      }

      const { data, error } = await client
        .from('purchases')
        .insert([{
          email: userEmail,
          count,
          price: session.amount_total,
          payment_id: session.payment_intent,
          user_id: eventData.client_reference_id,
        }])

      if (error) {
        console.error(new Date(), 'purchase error', error)
        return createError({ status: 500, message: 'Error processing purchase' })
      }

      log.info(new Date(), `purchase completed; env: ${env} count: ${count}, operations: ${operations}`)

      await changeUserLimits(event, {
        cvCount: {
          value: count,
          operation: 'increment'
        },
        generation: {
          value: operations,
          operation: 'increment'
        }
      }, eventData.client_reference_id, client)
    // Subscription
    } /* else if (eventData.mode === 'subscription' && isPaid) {
      const subscription = await stripe.subscriptions.retrieve(eventData.subscription)
      const priceId = subscription.items.data[0]?.price.id
      const { data, error } = await client
        .from('subscriptions')
        .insert([{
          email: userEmail,
          price_id: priceId,
          sub_id: subscription.id,
          customer_id: subscription.customer,
        }])

      if (error) {
        console.error('subscription error', error)
        return createError({ status: 500, message: 'Error processing subscription' })
      }

      log.info(new Date(), 'subscription completed')
    } */
  }

  if (stripeEvent.type === 'invoice.payment_succeeded') {
    return true
    // const userEmail = eventData.customer_email
    // const subscription = await stripe.subscriptions.retrieve(eventData.id)
    // const { data, error } = await client
    //   .from('subscriptions')
    //   .upsert({
    //     email: userEmail,
    //     active: true,
    //     end: new Date(subscription.current_period_end * 1000),
    //     sub_id: subscription.id,
    //     customer_id: subscription.customer,
    //     user_id: eventData.client_reference_id,
    //   })
    //   .eq('sub_id', subscription.id)

    // if (error) {
    //   console.error(new Date(), 'Error updating subscription:', error)
    //   return createError({ status: 500, message: 'Error updating subscription' })
    // }
    // log.info(new Date(), 'Subscription updated')
  }

  if (stripeEvent.type === 'customer.subscription.deleted') {
    const subscription = await stripe.subscriptions.retrieve(eventData.id)
    const { data, error } = await client
      .from('subscriptions')
      .update({
        active: false,
      })
      .eq('email', userEmail!)

    if (error) {
      console.error(new Date(), 'Error updating subscription:', error)
      return createError({ status: 500, message: 'Error updating subscription' })
    }
    log.info(new Date(), 'Subscription updated')
  }

  if (stripeEvent.type === 'customer.subscription.updated') {
    // add customer logic
    log.info(new Date(), 'event.type: ', stripeEvent.type)
  }

  return { received: true }
})
