<script
  setup
  lang='ts'
>
import type { MaskOptions } from 'maska'

const props = defineProps<{
  modelValue: string
  value?: string | undefined
  error?: string
  label?: string
  placeholder?: string
  required?: boolean
  tooltip?: string
  disabled?: boolean
  size?: string
  maskOptions?: MaskOptions
  name?: string
  type?: string
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
    <FormLabel
      v-if="label"
      :label="label"
      :required="required"
    />

    <UInput
      v-model="writableComputed"
      v-maska:[maskOptions]
      :value="writableComputed"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      :size="size || 'lg'"
      :name="name"
      :type="type || 'text'"
      @blur="captureEventData(`input_entered_${name}`, { value: $event.target.value })"
    >
      <template
        v-if="tooltip"
        #trailing
      >
        <div class="cursor-pointer flex items-center justify-center">
          <UTooltip
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
      </template>
    </UInput>
    <div v-if="tip" class="flex gap-2 items-center mt-2 text-sm">
      <Icon name="arcticons:vivo-tips" />
      <span class="text-gray-400">
        {{ tip }}
      </span>
    </div>
  </div>
</template>
