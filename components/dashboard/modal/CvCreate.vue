<script
  setup
  lang="ts"
>
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['submit', 'update:modelValue'])
const { t } = useI18n()
const createModalVisible = ref(props.modelValue)
const resumeName = ref('')
const submitDisabled = ref()

function submit() {
  submitDisabled.value = true
  emit('submit', resumeName.value)
}

function close() {
  emit('update:modelValue', false)
  createModalVisible.value = false
}

watch(createModalVisible, () => {
  emit('update:modelValue', false)
})
</script>

<template>
  <UModal
    v-model="createModalVisible"
    :ui="{ width: 'w-full sm:max-w-2xl', container: 'items-center' }"
  >
    <form
      class="py-8 px-12 flex flex-col items-center gap-4 container"
      @submit.prevent="submit()"
    >
      <TypographyText
        class="text-center"
        :title="3"
        :text="t('components.createCvModal.nameYourResume')"
      />
      <FormInput
        v-model="resumeName"
        name="resumeName"
        class="w-full"
        :label="t('components.createCvModal.resumeName')"
        :placeholder="t('components.createCvModal.resumeNamePlaceholder')"
        :tooltip="t('components.createCvModal.resumeNameTooltip')"
      />
      <div class="flex justify-between w-full">
        <UButton
          color="gray"
          variant="outline"
          :label="t('components.createCvModal.cancel')"
          @click="close"
        />
        <UButton
          type="submit"
          color="blue"
          :label="t('components.createCvModal.createDocument')"
          :disabled="!resumeName || submitDisabled"
          :loading="submitDisabled"
        />
      </div>
    </form>
  </UModal>
</template>

<style scoped></style>
