<script
  setup
  lang='ts'
>
const { t } = useI18n()
const log = consola.withTag('cv-image-upload')
const cvImageApi = useCvImageApi()
const cvApi = useCvApi()
const cvState = useCvState()
const imageState = useCvImageState()
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)
const loading = ref()
const imgUrl = ref<string | null>(null)

/*
* We have a few places where we can get image:
* 1. From the state (if the user has already uploaded an image)
* 2. If we init page and user has been uploaded image, we get it from the server
* 3. If user not uploaded image, we get it from his client
*/
const image = computed(() => imageState.getImage || imgUrl.value || imagePreview.value)

onMounted(async () => {
  if (!imageState.getImage) {
    const img = await cvImageApi.getCvImage(cvState.getImageName)

    imgUrl.value = img || imagePreview.value

    imgUrl.value && imageState.setImage(imgUrl.value)
  }
})

async function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file && file.type.startsWith('image')) {
    renderImage(file)
    loading.value = true
    const img = await cvImageApi.uploadImage(file, cvState.getId)
    if (img) {
      await cvApi.updateCv({ image_name: img.name })
    }
    loading.value = false
  } else {
    // Handle the error
    console.error('Invalid file type')
  }
}

function renderImage(file: File) {
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
    imageState.setImage(imagePreview.value)
  }
  reader.readAsDataURL(file)
}

function triggerFileInput() {
  fileInput.value?.click()
}
</script>

<template>
  <section class="flex flex-col md:flex-row gap-[30px]">
    <div
      class="
      rounded-2xl min-w-[136px] h-[136px] border-dashed flex items-center
      justify-center border-2 border-brand-blue
      "
    >
      <NuxtImg
        v-if="image"
        :src="image"
        alt="User's photo"
        class="h-full"
      />
      <UIcon
        v-else
        name="i-heroicons-photo text-neutral-4"
        class="text-2xl"
      />
    </div>
    <div class="flex flex-col justify-start gap-[12px]">
      <TypographyText class="text-neutral-3">
        {{ t('components.image.description') }}
      </TypographyText>
      <input
        ref="fileInput"
        class="hidden"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        @change="handleFileChange"
      >
      <div>
        <UButton
          class="border-brand-blue hover:border-primary-blue-300 transition-all duration-300"
          size="xs"
          color="blue"
          variant="outline"
          label="Choose Photo"
          icon="i-heroicons-arrow-up-tray"
          :loading="loading"
          @click="triggerFileInput"
        />
      </div>
    </div>
  </section>
</template>
