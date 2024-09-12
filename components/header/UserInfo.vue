<script
  setup
  lang='ts'
>
const { t } = useI18n()
const paymentState = usePaymentState()
const userState = useUserState()
const { getUserCvLeft, getUserGenerated, isUserPending } = storeToRefs(userState)

const isRunnedOut = computed(() => {
  return getUserCvLeft.value === 0 && getUserGenerated.value === 0
})

const runnedOutLabel = computed(() => {
  if (getUserCvLeft.value === 0 && getUserGenerated.value === 0) {
    return t('common.upgrade')
  } else if (getUserCvLeft.value === 0) {
    return 'Buy CVs'
  } else if (getUserGenerated.value === 0) {
    return 'Buy Superpowers'
  } else {
    return 'Upgrade'
  }
})

const remainCvsText = computed(() => {
  if (getUserCvLeft.value === 0) {
    return 'No CVs left. Upgrade your plan to get more.'
  }
  return `Remaining CVs: ${getUserCvLeft.value}`
})

const remainGenerationsText = computed(() => {
  if (getUserGenerated.value === 0) {
    return 'No AI generations left. Upgrade your plan to get more.'
  }
  return `AI generations Left`
})

const remainCvsColor = computed(() => {
  if (getUserCvLeft.value === 0) {
    return 'text-red-500'
  } else if (getUserCvLeft.value <= 1) {
    return 'text-yellow-500'
  }
  return ''
})

const remainGenerationsColor = computed(() => {
  if (getUserGenerated.value === 0) {
    return 'text-red-500'
  } else if (getUserGenerated.value <= 3) {
    return 'text-yellow-500'
  }
  return ''
})
</script>

<template>
  <section class="flex items-center gap-3">
    <UButton
      v-if="isRunnedOut && !isUserPending"
      variant="outline"
      :label="runnedOutLabel"
      icon="i-heroicons-sparkles"
      class="hidden md:flex"
      @click="paymentState.setPaymentModalVisibility(true)"
    />
    <UTooltip
      :text="remainCvsText"
      class="flex items-center gap-1 cursor-pointer"
    >
      <Icon
        name="tabler:file-cv"
        class="text-brand-blue"
      />
      <span :class="remainCvsColor">
        {{ getUserCvLeft }}
      </span>
    </UTooltip>
    <UTooltip
      :text="remainGenerationsText"
      class="flex items-center gap-1 cursor-pointer"
    >
      <Icon
        name="mdi:thunder-outline"
        class="text-yellow-500 text-lg"
      />
      <span :class="remainGenerationsColor">
        {{ getUserGenerated }}
      </span>
    </UTooltip>
  </section>
</template>

<style
  scoped
  lang='scss'
></style>
