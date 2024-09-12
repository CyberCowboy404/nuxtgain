<script
  setup
  lang="ts"
>
const props = defineProps<{
  title?: string
  confirmText?: string
  cancel: boolean
  modelValue: boolean
}>()

const emit = defineEmits(['confirm', 'update:modelValue'])
const isModalOpen = ref(props.modelValue)

function modelVisibility(visibility: boolean) {
  isModalOpen.value = visibility
  emit('update:modelValue', visibility)
}

function confirm() {
  emit('confirm')
}

function cancel() {
  modelVisibility(false)
}

watch(isModalOpen, () => {
  emit('update:modelValue', false)
})
</script>

<template>
  <div>
    <UModal v-model="isModalOpen">
      <div class="p-4 flex flex-col gap-[15px]">
        <TypographyText
          :title="3"
          class="text-center"
        >
          {{ title }}
        </TypographyText>
        <p class="text-center">
          {{ confirmText }}
        </p>
        <div class="flex justify-between">
          <UButton
            color="gray"
            @click="cancel"
          >
            Cancel
          </UButton>

          <UButton
            color="red"
            @click="confirm"
          >
            Confirm
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
