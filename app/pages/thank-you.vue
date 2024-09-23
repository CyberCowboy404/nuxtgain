<script
  setup
  lang="ts"
>
const { t } = useI18n()
const localePath = useLocalePath()

useHead(() => ({
  title: computed(() => `${t('thankyou.pageTitle')} | Magic-Resume.ai`),
  meta: [
    { name: 'description', content: computed(() => t('thankyou.metaDescription')) },
    { name: 'keywords', content: computed(() => t('thankyou.metaKeywords')) },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: computed(() => t('common.language')) },
    { name: 'revisit-after', content: '7 days' },
    { name: 'author', content: 'Magic-Resume.ai' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => t('thankyou.twitterTitle')) },
    { name: 'twitter:description', content: computed(() => t('thankyou.twitterDescription')) },
    { name: 'twitter:image', content: 'https://magic-resume.ai/thankyou_summary_image.jpeg' },
    { name: 'twitter:site', content: '@CyberCowboy404' },
    { name: 'twitter:creator', content: '@CyberCowboy404' },
    { property: 'og:title', content: computed(() => t('thankyou.ogTitle')) },
    { property: 'og:description', content: computed(() => t('thankyou.ogDescription')) },
    { property: 'og:image', content: 'https://magic-resume.ai/thankyou_summary_image.jpeg' },
    { property: 'og:url', content: 'https://magic-resume.ai/thank-you' },
    { property: 'og:site_name', content: 'Magic-Resume.ai' },
    { property: 'og:locale', content: computed(() => t('common.locale')) },
    { property: 'og:type', content: 'website' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#4a90e2' },
  ],
  link: [
    { rel: 'canonical', href: 'https://magic-resume.ai/thank-you' }
  ]
}))

// const feedback = ref('')
// const feedbackSubmitted = ref(false)

// function submitFeedback() {
//   // Here you would typically send the feedback to your backend
//   console.log('Feedback submitted:', feedback.value)
//   feedbackSubmitted.value = true
//   feedback.value = ''
// }

const finishedProgress = ref(false)

const afterCheckout = computed(() => useRouter().currentRoute.value.query.session_id)
</script>

<template>
  <div class="mt-8 thank-you-page container mx-auto flex flex-col items-center justify-center gap-5">
    <h1 class="text-brand-blue font-merriweather text-xl lg:text-2xl font-bold">
      {{ t('thankyou.heading') }}
    </h1>
    <div class="flip-horizontally">
      <NuxtImg
        src="thank-you.jpeg"
        sizes="md:300px sm:200px"
      />
    </div>
    <p
      v-if="afterCheckout"
      class="text-center max-w-md"
    >
      {{ t('thankyou.almostReady') }}
    </p>
    <ClientOnly>
      <BaseProgressLoder
        v-if="afterCheckout"
        :duration-first="5"
        :duration-second="5"
        class="w-[200px] h-[7px]"
        @finish="finishedProgress = true"
      />
    </ClientOnly>
    <a
      v-if="afterCheckout"
      :href="finishedProgress ? localePath('/app/dashboard') : 'javascript:void(0)'"
      class="text-lg text-brand-blue underline hover:no-underline"
      :class="{ 'opacity-50 cursor-not-allowed': !finishedProgress }"
    >
      {{ t('common.returnDashboard') }}
    </a>

    <a
      v-else
      :href="localePath('/')"
      class="text-lg text-brand-blue underline hover:no-underline"
    >
      {{ t('common.returnHome') }}
    </a>

    <!-- <div
      v-if="!feedbackSubmitted"
      class="feedback-section mt-8 w-full max-w-lg flex flex-col gap-4"
    >
      <h2 class="text-lg font-bold">
        {{ $t('thankyou.feedbackHeading') }}
      </h2>
      <FormTextArea
        v-model="feedback"
        :placeholder="$t('thankyou.feedbackPlaceholder')"
        :rows="3"
        resize
      />
      <UButton
        class="self-end"
        @click="submitFeedback"
      >
        {{ $t('thankyou.submitFeedback') }}
      </UButton>
    </div>
    <p
      v-else
      class="text-green-600"
    >
      {{ $t('thankyou.feedbackThanks') }}
    </p> -->
  </div>
</template>

<style
  scoped
  lang="scss"
>
.flip-horizontally {
  transform: scaleX(-1);
}
</style>
