<script
  setup
  lang="ts"
>
const { t } = useI18n()

useHead({
  title: 'Magic-Resume',
  meta: [
    { name: 'description', content: t('indexMeta.description') },
    { name: 'keywords', content: t('indexMeta.keywords') },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: t('indexMeta.language') },
    { name: 'revisit-after', content: '7 days' },
    { name: 'author', content: 'Magic-Resume.ai' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('indexMeta.title') },
    { name: 'twitter:description', content: t('indexMeta.description') },
    { name: 'twitter:image', content: 'https://magic-resume.ai/summary_image.jpeg' },
    { name: 'twitter:site', content: '@CyberCowboy404' },
    { name: 'twitter:creator', content: '@CyberCowboy404' },
    { property: 'og:title', content: t('indexMeta.title') },
    { property: 'og:description', content: t('indexMeta.description') },
    { property: 'og:image', content: 'https://magic-resume.ai/summary_image.jpeg' },
    { property: 'og:url', content: 'https://magic-resume.ai/' },
    { property: 'og:site_name', content: 'Magic-Resume.ai' },
    { property: 'og:locale', content: t('indexMeta.locale') },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<template>
  <main>
    <LandingHero />
    <LandingTestimonials />
    <LandingProblemSolution />
    <!-- <LandingLogos /> -->
    <LandingFeaturesBlock />
    <LandingPricing />
    <LandingFAQ />
    <LandingCta />
  </main>
</template>
