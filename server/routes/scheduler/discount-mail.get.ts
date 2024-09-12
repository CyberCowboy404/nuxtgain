import consola from 'consola'
import brevo from '@getbrevo/brevo'

import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~/types/supabase'

interface User { id: string, email: string | null, created_at: string | null }

export default defineEventHandler(async (event) => {
  const log = consola.withTag('get: emails discounts: ')
  const headers = getRequestHeaders(event)

  if (headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return createError({ status: 401, message: 'Unauthorized' })
  }

  const client = await serverSupabaseServiceRole<Database>(event)

  const config = useRuntimeConfig(event)
  const isProd = config.env === 'production'
  // the feature implemented in this time, don't disturb previous users, atract only new ones after this date
  // dev env time where field was added
  let startDay = '2024-07-13 11:22:03.405919+00'
  if (isProd)
    startDay = '2024-07-13 11:40:37.417124+00'

  let filteredUsers: User[] | undefined = []
  try {
    const [purchasesResult, usersResult] = await Promise.all([
      client.from('purchases').select('email'),
      client.from('users')
        .select('id, email, created_at')
        .not('email', 'is', null)
        .not('discount_sent', 'is', true)
        .gt('created_at', startDay)
    ]);

    [purchasesResult, usersResult].forEach((result) => {
      if (result.error)
        throw createError({ status: 500, message: result.error.message })
    })

    const purchasedEmails = new Set(purchasesResult.data?.map(e => e.email))

    filteredUsers = usersResult.data?.filter(user => !purchasedEmails.has(user.email))
    // todo: created_at at least hour ago by timezone

    log.info('users to send email:', filteredUsers)
    // return true
  } catch (e) {
    console.error('Error filtering users:', e)
    return createError({ status: 500, message: 'Internal Server Error' })
  }

  try {
    if (filteredUsers?.length) {
      const config = useRuntimeConfig(event)
      const apiInstance = new brevo.TransactionalEmailsApi()
      const apiKey = apiInstance.authentications.apiKey
      apiKey.apiKey = config.brevoKey

      const sendSmtpEmail = new brevo.SendSmtpEmail()

      filteredUsers.forEach(async (user) => {
        sendSmtpEmail.subject = 'Here\'s 20% off MagicResumeAI'
        sendSmtpEmail.htmlContent = `
<html>
<body>
Hello,
<br><br>
We hope this email finds you well.<br> We noticed you've created a resume with our MagicResumeAI but haven't downloaded it yet.
<br><br>
We're offering an exclusive 20% discount on all our plans to help you land your dream job faster.
<br>
Don't miss out on this limited-time offer - use code <b>magicwelcome20</b> at checkout and invest in your future today!
<br>
<a href="https://www.magic-resume.ai/app/Dashboard?ref=discount-email">MagicResumeAI</a>
<br><br>
A few things to remember about your resume:
<br>
💳 No subscriptions - one-time payment for lifetime access to your resume
<br>
🧠 Control each generation with custom AI instructions to create a new version of tailored CV
<br>
🔐 Download and edit your resume anytime after purchase
<br>
🎨 Choose from a variety of professional templates
</body>
</html>`
        sendSmtpEmail.sender = { name: 'MagicResumeAI', email: 'cybercowboy404@gmail.com' }
        sendSmtpEmail.to = [
          { email: user.email!, name: user.email! }
        ]

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail)

        if (result) {
          log.info('Email sent successfully:', user.email)
          await client.from('users').update({ discount_sent: true }).eq('id', user.id)
          log.info('User updated:', user.id)
        }
      })
    } else {
      log.info('No users to send discount email to')
    }
  } catch (e) {
    console.error('Error sending mail: ', e)
  }
})
