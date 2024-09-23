<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="pricing" class="py-14">
    <div class="max-w-screen-xl mx-auto px-4 text-center md:px-8">
      <div class="max-w-2xl mx-auto">
        <h2 class="font-merriweather text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
          {{ t('landing.pricingTitle') }}
        </h2>
      </div>
      <div class="mt-12">
        <PricingTable free />
      </div>
    </div>
  </section>
</template>
