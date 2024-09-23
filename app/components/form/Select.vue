<script
  setup
  lang='ts'
>
const props = defineProps<{
  modelValue: string
  options: object[] | string[]
  tooltip?: string
  optionAttribute?: string
}>()

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})
</script>

<template>
  <div>
    <div class="flex gap-[20px]">
      <FormLabel
        class="text-neutral-3"
        label="Choose AI Model"
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
    <USelect
      v-model="model"
      :options="options"
      :option-attribute="optionAttribute"
      @input="capturePSEventData('select_checked', { value: $event.target.value })"
    />
  </div>
</template>
