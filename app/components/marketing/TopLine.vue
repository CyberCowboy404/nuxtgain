<script
  setup
  lang='ts'
>
const { t } = useI18n()
</script>

<template>
  <div
    v-if="data"
    class="bg-[#f4f4f4] text-neutral-4"
  >
    <div class="font-semibold flex gap-3 container mx-auto py-2 px-4">
      <div class="flex items-center gap-1">
        <Icon
          name="mdi:resume"
          class="text-brand-blue"
        />
        <span class="text-xs">{{ t('common.resumesCreated') }}: {{ 1000 }}</span>
      </div>
      <div class="flex items-center gap-1">
        <Icon
          name="mdi:thunder-outline"
          class="text-yellow-500 text-lg"
        />
        <span class="text-xs">{{ t('common.resumesGenerated') }}: {{ 1000 }}</span>
      </div>
    </div>
  </div>
</template>

<style
  scoped
  lang='scss'
></style>
