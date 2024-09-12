<script
  setup
  lang="ts"
>
const props = withDefaults(defineProps<{
  finish?: boolean
  durationFirst?: number
  durationSecond?: number
  colorFirst?: string
  colorSecond?: string
  hideOnFinish?: boolean
}>(), {
  colorFirst: '#4a90e2',
  colorSecond: '#e5e5e5',
  durationFirst: 10,
  durationSecond: 10,
})

const emit = defineEmits(['finish'])

const fillPercentage = ref(0)
const currentColor = toRef(props, 'colorFirst')
let animationFrameId: number | null = null

function fillItem(percentage: number, duration: number) {
  return new Promise<void>((resolve) => {
    const start = Date.now()
    const initialFill = fillPercentage.value
    const totalProgress = percentage - initialFill
    const animationFrame = () => {
      if (props.finish) {
        finishFilling()
        resolve()
        return
      }
      const now = Date.now()
      const elapsed = now - start
      const progressRatio = Math.min(elapsed / duration, 1)
      const easeOutCubic = (t: number) => (--t) * t * t + 1
      const adjustedProgress = easeOutCubic(progressRatio)
      fillPercentage.value = initialFill + totalProgress * adjustedProgress

      if (fillPercentage.value > percentage) {
        fillPercentage.value = percentage
      }

      if (now < start + duration && fillPercentage.value < percentage) {
        animationFrameId = requestAnimationFrame(animationFrame)
      } else {
        resolve()
      }
    }
    requestAnimationFrame(animationFrame)
  })
};

async function startFilling() {
  // Cancel any ongoing animation
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  if (props.finish) {
    fillPercentage.value = 100
    currentColor.value = props.colorFirst
    return
  }
  // Fill 90% quickly
  await fillItem(90, props.durationFirst * 1000)
  // Fill the remaining 10% more slowly
  await fillItem(100, props.durationSecond * 1000)
  emit('finish')
};

function finishFilling() {
  requestAnimationFrame(() => {
    fillPercentage.value = 100
  })
}

onMounted(startFilling)

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})

watch(() => props.finish, startFilling, { immediate: true })
</script>

<template>
  <div
    class="rounded-full w-[200px] h-[7px] mx-auto"
    :style="{ background: colorSecond }"
  >
    <div
      class="h-full rounded-full"
      :style="{ backgroundColor: colorFirst, width: `${fillPercentage}%` }"
    />
  </div>
</template>
