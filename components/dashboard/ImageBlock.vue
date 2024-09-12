<script
  setup
  lang='ts'
>
const props = defineProps<{
  img: string
  title?: string
  subtitle?: string
  text?: string
  link?: string
  linkText?: string
  linkIcon?: string
}>()

defineEmits(['click'])
</script>

<template>
  <section class="flex justify-center">
    <div class="max-w-2xl items-center flex flex-wrap">
      <img
        v-if="img"
        :src="props.img"
        :alt="props.title"
        width="187"
        height="187"
        class="mr-6"
      >
      <div class="flex flex-col gap-2">
        <TypographyText
          v-if="title"
          :title="4"
          :text="title"
        />
        <TypographyText
          v-if="subtitle"
          :text="subtitle"
        />

        <TypographyText
          v-if="text"
          :text="text"
        />

        <div>
          <UButton
            color="blue"
            :icon="linkIcon"
            trailing
            @click="$emit('click')"
          >
            {{ linkText }}
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
