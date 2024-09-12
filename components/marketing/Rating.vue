<script
  setup
  lang='ts'
>
const props = withDefaults(defineProps<{
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  size?: string
  half?: boolean
}>(), {
  rating: 5,
  size: 'text-3xl',
})
</script>

<template>
  <div class="flex flex-col md:flex-row items-center gap-3">
    <div class="flex gap-1">
      <div
        v-for="i in rating"
        :key="i"
      >
        <div v-if="half && i === rating" class="w-1/2 overflow-hidden">
          <Icon
            name="twemoji:star"
            :class="`${size} star-icon`"
          />
        </div>

        <Icon
          v-else
          name="twemoji:star"
          :class="`${size} star-icon`"
        />
      </div>
    </div>

    <span class="pt-1">
      {{ text }}
    </span>
  </div>
</template>

<style
  scoped
  lang='scss'
></style>
