<script
  setup
  lang='ts'
>
const { t } = useI18n()
const { locale, setLocale, locales } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const languages = computed(() => {
  return availableLocales.value.map((i) => {
    return {
      label: i.name,
      click() {
        setLocale(i.code)
      }
    }
  })
})
</script>

<template>
  <UDropdown
    mode="hover"
    :items="[languages]"
    :popper="{ placement: 'left-start', strategy: 'absolute' }"
  >
    <span class="flex items-center">
      <UIcon
        name="i-heroicons-globe-alt"
        class="mr-2 text-gray-400"
      />
      {{ t('common.languages') }}
      <UIcon
        name="i-heroicons-chevron-right"
        class="mr-auto text-gray-400"
      />
    </span>
  </UDropdown>
</template>

<style
  scoped
  lang='scss'
></style>
