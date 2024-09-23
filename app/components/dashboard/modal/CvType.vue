<script setup>
const blockClasses = `
  rounded-xl border border-neutral-300 py-4 px-2 flex items-center flex-col
  align-center w-[45%] gap-2 cursor-pointer hover:shadow-md hover:border-primaryBlue
  transition-all duration-300
`
</script>

<template>
  <div class="py-8 px-12 flex flex-col items-center gap-4 container">
    <TypographyText
      class="text-center"
      :title="3"
      text="Start Your Resume Journey"
    />
    <TypographyText class="text-center whitespace-pre-line text-neutral-500">
      Choose how you'd like to begin. <br>
      Create a custom resume with our AI assistant or upload and enhance an existing one.
    </TypographyText>
    <div class="flex justify-between mt-9">
      <div
        :class="blockClasses"
        @click="navigateTo('/app/cv/')"
      >
        <!-- TODO: if it will be using add locale to redirect -->
        <UIcon
          class="text-2xl"
          name="i-heroicons-pencil"
        />
        <TypographyText class="font-bold">
          Create a new resume
        </TypographyText>
        <TypographyText
          size="14px"
          class="text-center"
        >
          Fill predefined sections to swiftly craft your resume.
        </TypographyText>
      </div>
      <div :class="blockClasses">
        <UIcon
          class="text-2xl"
          name="i-heroicons-arrow-up-tray"
        />
        <TypographyText class="font-bold">
          Upload Existing Resume
        </TypographyText>
        <TypographyText
          size="14px"
          class="text-center"
        >
          Upload your resume and let our AI enhance it instantly.
        </TypographyText>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
