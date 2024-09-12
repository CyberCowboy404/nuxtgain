<script setup lang='ts'>
const props = defineProps<{
  count?: string
  text: string
  textColor?: string
}>()
</script>

<template>
  <span class="flex">
    <span class="flex items-center">
      <span class="font-bold">{{ count ?? 1 }}</span>
      <Icon
        name="mdi:thunder-outline"
        class="text-lg"
      />
    </span>
    <span class="ml-[4px]" :class="textColor">{{ text }}</span>
  </span>
</template>
