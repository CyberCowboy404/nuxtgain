<script setup lang="ts">
// import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
// import { SpeedInsights } from '@vercel/speed-insights/nuxt'

const { t } = useI18n()
useHead({
  title: 'NuxtGain',
})
const payentState = usePaymentState()
const { isPaymentModalVisible } = storeToRefs(payentState)
const upgradeModalVisible = computed({
  get: () => isPaymentModalVisible.value,
  set: (value) => {
    payentState.setPaymentModalVisibility(value)
  },
})

const userState = useUserState()

const { isUserAuthVisible } = storeToRefs(userState)
const showAuth = computed({
  get: () => isUserAuthVisible.value,
  set: (value) => {
    userState.setAuthModalVisibility(value)
  },
})

// const route = useRoute()
// const localePath = useLocalePath()

// const capctha = ref<VueHcaptcha | null>(null)
// capctha.value?.execute()
// const captchaToken = useState('captchaToken', () => '')
// function onVerify(token: string) {
//   captchaToken.value = token
// }

onMounted(async () => {
  identifyAnalytics()

  userState.getUserInfo()

  // if (_session) {
  //   if (route.path.includes('/auth')) {
  //     await navigateTo(localePath('/app/dashboard'))
  //   }
  // } else {
  //   await navigateTo(localePath('/auth'))
  // }
  // })
})
</script>

<template>
  <div>
    <NuxtLayout class="bg-white font-sans">
      <NuxtPage />
    </NuxtLayout>
    <ContainerModal
      v-if="isPaymentModalVisible"
      v-model="upgradeModalVisible"
      :width-class="$device.isMobile ? '!max-w-full' : '!max-w-[95%]'"
    >
      <!-- <PricingTable /> -->
      <MarketingPricingTrust />
    </ContainerModal>

    <ContainerModal
      v-if="isUserAuthVisible"
      v-model="showAuth"
      :title="t('auth.authWarn')"
      :body="t('auth.authWarnDesc')"
      width-class="sm:max-w-xl"
    >
      <AuthForm :redirect-to="getCurrentUrl()" />
    </ContainerModal>
    <!-- <SpeedInsights /> -->

    <!-- <ClientOnly>
      <VueHcaptcha ref="capctha" sitekey="c8b3273e-94f1-4f5b-9c57-4814391f38a7" @verify="onVerify" />
    </ClientOnly> -->
  </div>
</template>
