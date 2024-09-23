<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="mt-12 py-14">
    <div class="max-w-screen-xl mx-auto px-4 text-center md:px-8">
      <div class="mx-auto flex flex-col gap-[40px]">
        <h2 class="whitespace-break-spaces font-merriweather text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
          {{ t('landing.ctaTitle') }}
        </h2>
        <div>
          <UButton
            size="xl"
            icon="i-heroicons-rocket-launch"
            trailing
          >
            {{ t('common.ctaButton') }}
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
