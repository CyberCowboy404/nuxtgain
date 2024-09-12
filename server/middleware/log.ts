import consola from 'consola'

export default defineEventHandler((event) => {
  const log = consola.withTag('middleware:log')
  log.info(`New request: ${getRequestURL(event)}`)
})
