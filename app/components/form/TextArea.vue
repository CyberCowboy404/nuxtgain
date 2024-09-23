<script
  setup
  lang='ts'
>
const props = defineProps<{
  modelValue: string
  label: string
  placeholder: string
  required?: boolean
  tooltip?: string
  disabled?: boolean
  size?: string
  resize?: boolean
  name?: string
  rows?: number
  tip?: string
}>()

const emit = defineEmits(['update:modelValue'])

const writableComputed = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})
</script>

<template>
  <div>
    <div class="flex gap-[5px]">
      <FormLabel
        v-if="label"
        :label="label"
        :required="required"
      />
      <UTooltip
        v-if="tooltip"
        class="cursor-pointer"
        :text="tooltip"
        :popper="{
          placement: 'top',
          resize: true,
          arrow: true,
          offsetDistance: 20,
        }"
        :ui="{
          width: 'w-fit max-w-[300px]',
          base: '[@media(pointer:coarse)]:!block px-2 py-2 text-sm font-normal relative text-clip h-fit text-neutral-5',
          arrow: {
            background: '',
            shadow: '',
          },
        }"
      >
        <UIcon
          class="text-neutral-2 text-xl"
          name="i-heroicons-question-mark-circle"
        />
      </UTooltip>
    </div>
    <UTextarea
      v-model="writableComputed"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :size="size || 'lg'"
      autoresize
      :resize="resize"
      :name="name"
      :rows="rows ? rows : null"
      @blur="captureEventData(`text_area_entered_${name || ''}`, { value: $event.target.value, name })"
    />
    <Tip :tip="tip" />
  </div>
</template>

<style
  scoped
  lang='scss'
></style>
