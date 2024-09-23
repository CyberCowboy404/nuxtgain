<script
  setup
  lang='ts'
>
const { t } = useI18n()
useHead(() => ({
  title: computed(() => `${t('pricing.pageTitle')} | Magic-Resume.ai`),
  meta: [
    { name: 'description', content: computed(() => t('pricing.metaDescription')) },
    { name: 'keywords', content: computed(() => t('pricing.metaKeywords')) },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: computed(() => t('common.language')) },
    { name: 'revisit-after', content: '7 days' },
    { name: 'author', content: 'Magic-Resume.ai' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: computed(() => t('pricing.twitterTitle')) },
    { name: 'twitter:description', content: computed(() => t('pricing.twitterDescription')) },
    { name: 'twitter:image', content: 'https://magic-resume.ai/pricing_summary_image.jpeg' },
    { name: 'twitter:site', content: '@CyberCowboy404' },
    { name: 'twitter:creator', content: '@CyberCowboy404' },
    { property: 'og:title', content: computed(() => t('pricing.ogTitle')) },
    { property: 'og:description', content: computed(() => t('pricing.ogDescription')) },
    { property: 'og:image', content: 'https://magic-resume.ai/pricing_summary_image.jpeg' },
    { property: 'og:url', content: 'https://magic-resume.ai/pricing' },
    { property: 'og:site_name', content: 'Magic-Resume.ai' },
    { property: 'og:locale', content: computed(() => t('common.locale')) },
    { property: 'og:type', content: 'website' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#4a90e2' },
  ],
  link: [
    { rel: 'canonical', href: 'https://magic-resume.ai/pricing' }
  ]
}))
</script>

<template>
  <div class="container mx-auto px-4">
    <MarketingPricingTrust />
  </div>
</template>

<style
  scoped
  lang='scss'
></style>
