<script
  setup
  lang="ts"
>
const { t } = useI18n()

const faqs = computed(() => [
  {
    q: t('landing.faq1Question'),
    a: t('landing.faq1Answer'),
  },
  {
    q: t('landing.faq2Question'),
    a: t('landing.faq2Answer'),
  },
  {
    q: t('landing.faq3Question'),
    a: t('landing.faq3Answer'),
  },
  {
    q: t('landing.faq4Question'),
    a: t('landing.faq4Answer'),
  },
  {
    q: t('landing.faq5Question'),
    a: t('landing.faq5Answer'),
  },
])
</script>

<template>
  <div>
    <section class="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
      <div class="space-y-3 text-center">
        <h3 class="font-merriweather text-3xl font-semibold">
          {{ t('landing.faqTitle') }}
        </h3>
      </div>
      <BaseCollapse
        :faqs="faqs"
        class="mt-14 container mx-auto px-4 md:px-0"
      />
    </section>
  </div>
</template>
