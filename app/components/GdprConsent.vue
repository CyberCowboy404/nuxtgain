<script setup lang="ts">
import { useCookie } from '#imports'

const consentCookie = useCookie<boolean>('gdpr-consent', {
  default: () => false,
  watch: true,
  maxAge: 60 * 60 * 24 * 365, // 1 year
})

const show = ref(false)

const { gtag } = useGtag()

function gdprHandle(allowed: boolean) {
  gtag('consent', 'update', {
    ad_storage: allowed ? 'granted' : 'denied',
    analytics_storage: allowed ? 'granted' : 'denied',
    ad_user_data: allowed ? 'granted' : 'denied',
    ad_personalization: allowed ? 'granted' : 'denied',
  })
}

function accept() {
  consentCookie.value = true
  show.value = false
  gdprHandle(true)
}

function decline() {
  consentCookie.value = false
  show.value = false
  gdprHandle(false)
}

onMounted(() => {
  if (!consentCookie.value)
    show.value = true
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="show"
      class="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <UCard>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our
            <NuxtLink
              to="/legal/privacy-policy"
              class="text-primary"
            >
              Privacy Policy
            </NuxtLink> &
            <NuxtLink
              to="/legal/cookie-policy"
              class="text-primary"
            >
              Cookie Policy
            </NuxtLink>.
          </p>
          <div class="flex items-center gap-2">
            <UButton
              label="Decline"
              variant="outline"
              @click="decline"
            />
            <UButton
              label="Accept"
              @click="accept"
            />
          </div>
        </div>
      </UCard>
    </div>
  </ClientOnly>
</template>
