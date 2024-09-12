<script setup lang='ts'>
const props = withDefaults(defineProps<{
  tip?: string
  icon?: string
}>(), {
  icon: 'arcticons:vivo-tips'
})
</script>

<template>
  <div v-if="tip" class="flex gap-2 items-center mt-2 text-sm text-neutral-4">
    <div>
      <Icon :name="icon" />
    </div>
    <span>
      {{ tip }}
    </span>
  </div>
</template>

<style scoped lang='scss'>

</style>
