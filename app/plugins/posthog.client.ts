import posthog from 'posthog-js'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.env.MODE === 'development')
    return

  const runtimeConfig = useRuntimeConfig()
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost || 'https://app.posthog.com',
    capture_pageview: false, // we add manual pageview capturing below
    loaded: (posthog) => {
      if (import.meta.env.MODE === 'development')
        posthog.debug()
    }
  })

  // Make sure that pageviews are captured with each route change
  const router = useRouter()
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture('$pageview', {
        current_url: to.fullPath
      })
    })
  })

  return {
    provide: {
      posthog: () => posthogClient
    }
  }
})
