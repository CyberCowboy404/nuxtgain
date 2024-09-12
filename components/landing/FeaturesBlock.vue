<script
  setup
  lang="ts"
>
const { t } = useI18n()
const features = computed(() => ([
  {
    icon: 'mdi:star-check',
    title: t('landing.featureSuccess'),
    description: t('landing.featureSuccessText'),
  },
  {
    icon: 'mdi:typewriter',
    title: t('landing.featureAts'),
    description: t('landing.featureAtsText'),
  },
  {
    icon: 'mdi:input',
    title: t('landing.featureEffortless'),
    description: t('landing.featureEffortlessText'),
  },
  {
    icon: 'mdi:clock-fast',
    title: t('landing.featureTimeSaving'),
    description: t('landing.featureTimeSavingText'),
  },
  {
    icon: 'mdi:human-greeting',
    title: t('landing.featureUserFriendly'),
    description: t('landing.featureUserFriendlyText'),
  },
  {
    icon: 'mdi:file-pdf-box',
    title: t('landing.featureInstantPdf'),
    description: t('landing.featureInstantPdfText'),
  },
  {
    icon: 'mdi:headset',
    title: t('landing.featureSupport'),
    description: t('landing.featureSupportText'),
  },
]))
</script>

<template>
  <section
    id="features"
    class="py-14 px-4"
  >
    <div class="container mx-auto">
      <h2 class="font-merriweather text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
        {{ t('landing.featuresTitle') }}
      </h2>
      <div class="mt-12">
        <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-2">
          <div
            v-for="(card, index) in features"
            :key="index"
            class="border border-gray-200 rounded-lg p-6 bg-white shadow-md"
          >
            <div class="text-4xl mb-4">
              <Icon :name="card.icon" />
            </div>
            <h3 class="font-merriweather font-semibold mb-2">
              {{ card.title }}
            </h3>
            <p class="text-gray-600">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
