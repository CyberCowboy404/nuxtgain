<script
  setup
  lang='ts'
>
import { format, formatDistanceToNow } from 'date-fns'

const props = withDefaults(defineProps<{
  type?: 'premium' | 'create' | 'default'
  cv?: Tables<'resumes'> | null
}>(), {
  type: 'default',
})

const createStyles = `border-dashed border border-neutral-500`
const defaultStyles = `border border-neutral-200`

const createdTime = computed(() => {
  if (props.cv?.created_at) {
    const date = new Date(props.cv.created_at)
    const formattedDate = format(date, 'MMMM d, yyyy')

    return formattedDate
  }
  return ''
})

const editedTime = computed(() => {
  if (props.cv?.updated_at) {
    return formatDistanceToNow(new Date(props.cv.updated_at), {
      addSuffix: true,
    })
  }
  return ''
})
</script>

<template>
  <section class="cursor-pointer">
    <div
      class="p-8 min-h-[400px] rounded-xl flex items-center justify-center"
      :class="type === 'create' ? createStyles : defaultStyles"
    >
      <div
        v-if="type === 'create'"
        class="flex flex-col items-center justify-center gap-4"
      >
        <UButton
          icon="i-heroicons-plus"
          size="sm"
          color="blue"
          variant="solid"
          class="rounded-full"
        />

        <TypographyText
          class="text-center"
          text="Add New Resume"
          :title="4"
        />

        <TypographyText
          class="text-center"
          text="Ready for your next opportunity? Click to add a new resume and let AI do the heavy lifting."
        />
      </div>
    </div>
    <div
      v-if="type === 'default' && cv"
      class="my-4 flex flex-col text-center gap-[10px]"
    >
      <TypographyText
        v-if="cv.name"
        class="text-center"
        :text="cv.name"
        :title="4"
      />
      <div class="flex text-center items-center justify-center">
        <TypographyText
          v-if="createdTime"
          class="text-center"
          :text="createdTime"
        />
        <TypographyText
          v-if="editedTime"
          class="text-center"
        >
          ({{ editedTime }})
        </TypographyText>
      </div>
    </div>
  </section>
</template>
