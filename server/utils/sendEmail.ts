import brevo from '@getbrevo/brevo'
import consola from 'consola'
import type { H3Event } from 'h3'

export interface SendEmailOptions {
  to: brevo.SendSmtpEmailToInner[]
  sender: {
    name: string
    email: string
  }
  subject: string
  template: string
}

export default async function (event: H3Event, options: SendEmailOptions) {
  const log = consola.withTag('Send Email:')
  const config = useRuntimeConfig(event)
  const apiInstance = new brevo.TransactionalEmailsApi()
  const apiKey = apiInstance.authentications.apiKey
  apiKey.apiKey = config.brevoKey

  const sendSmtpEmail = new brevo.SendSmtpEmail()

  sendSmtpEmail.subject = options.subject
  sendSmtpEmail.sender = options.sender
  sendSmtpEmail.to = options.to
  sendSmtpEmail.htmlContent = options.template

  const result = await apiInstance.sendTransacEmail(sendSmtpEmail)

  if (result) {
    log.info('Email sent successfully:')
    return result
  }
}
