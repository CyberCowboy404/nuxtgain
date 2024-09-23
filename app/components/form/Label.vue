<script setup lang='ts'>
const props = defineProps<{
  label: string
  required?: boolean
}>()
</script>

<template>
  <p class="flex gap-1 font-bold text-[14px] text-gray-700 items-center mb-[5px]">
    <span>
      {{ label }}
    </span>
    <Icon
      v-if="required"
      name="mdi:required"
      class="text-red-500"
    >
      *
    </Icon>
  </p>
</template>

<style scoped lang='scss'>

</style>
