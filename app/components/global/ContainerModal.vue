<script
  setup
  lang='ts'
>
const props = defineProps<{
  modelValue: boolean
  title: string
  body?: string
  widthClass?: string
  cardBody?: object
}>()

const emit = defineEmits(['update:modelValue'])
const isModalVisible = ref(props.modelValue)

watch(isModalVisible, () => {
  emit('update:modelValue', false)
})
</script>

<template>
  <UModal
    v-model="isModalVisible"
    :ui="{
      width: `w-full ${widthClass || 'sm:max-w-4xl'}`,
      container: 'items-center',
    }"
  >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', body: cardBody }">
      <template #header>
        <div class="relative">
          <TypographyText
            class="text-center"
            :title="3"
            :text="title"
          />
          <UIcon
            name="i-heroicons-x-mark"
            class="absolute right-0 top-1/2 transform -translate-y-1/2  cursor-pointer text-lg"
            @click="isModalVisible = false"
          />
        </div>
      </template>

      <section class="flex flex-col gap-[20px] pb-5">
        <b
          v-if="body"
          class="max-w-2xl text-lg mx-auto text-center text-neutral-4 leading-normal"
        >
          {{ body }}
        </b>

        <slot />
      </section>

      <!-- <template #footer /> -->
    </UCard>
  </UModal>
</template>
