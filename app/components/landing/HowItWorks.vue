<script
  setup
  lang="ts"
>
const activeStep = ref(0)

function setActiveStep(step: number) {
  activeStep.value = step
}
</script>

<template>
  <section class="py-14">
    <div class="w-full mx-auto">
      <h2 class="font-merriweather text-4xl lg:text-5xl font-bold lg:tracking-tight text-center mb-[35px]">
        How It Works?
      </h2>

      <UButton
        class="flex items-center text-2xl font-semibold mb-[20px] "
        variant="ghost"
        :color="activeStep === 0 ? 'blue' : 'gray'"
        @click="setActiveStep(0)"
      >
        <div class="flex items-center gap-[5px]">
          <Icon
            name="mdi:pencil-outline"
            class="mr-2"
          />
          Step 1: Input your details
          <UIcon :name="activeStep === 0 ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'" />
        </div>
      </UButton>

      <UButton
        class="block text-2xl font-semibold mb-[20px] text-left"
        variant="ghost"
        :color="activeStep === 1 ? 'blue' : 'gray'"
        @click="setActiveStep(1)"
      >
        <div class="flex items-center gap-[5px]">
          <Icon
            name="mdi:robot-excited-outline"
            class="mr-2"
          />
          Step 2: AI-Powered Resume Enhancement
          <UIcon :name="activeStep === 1 ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'" />
        </div>
      </UButton>

      <Transition>
        <div
          v-if="activeStep === 0"
          class="mt-12 flex-col md:flex-row flex gap-[40px] justify-center items-center"
        >
          <ul class="text-lg flex flex-col gap-[15px] text-md text-left flex flex-col gap-4">
            <li> ✏️ Fill in your basic information </li>
            <li> 🎯 Provide your years of experience and desired role </li>
            <li>
              📝 Include a summary and skills
              <ul class="ml-6 mt-2 text-sm text-gray-600 flex flex-col gap-2">
                <li> 💪 Paste your own info or let AI handle it </li>
              </ul>
            </li>
            <li>
              📚 Add your work experience and education
              <ul class="ml-6 mt-2 text-sm text-gray-600 flex flex-col gap-2">
                <li> 💡 Fill in short info or leave it empty </li>
              </ul>
            </li>
          </ul>
          <NuxtImg
            src="landing/us/how_to_use.png"
            alt="How to use MagicResume"
            height="370"
          />
        </div>
      </Transition>

      <Transition>
        <div
          v-if="activeStep === 1"
          class="mt-12 flex gap-[40px] flex-col lg:flex-row"
        >
          <div class="flex flex-col gap-[15px]">
            <ul class="text-lg text-left flex flex-col gap-4">
              <li>💡 Choose from our curated AI suggestions: </li>
              <li>✨ Watch as our AI works its magic, creating a job-winning CV tailored to your career goals </li>
              <li>😊 Sit back and relax, knowing you're one step closer to landing your dream job</li>
            </ul>
          </div>
          <NuxtImg
            src="landing/us/enrich.png"
            width="600"
            alt="How to use MagicResume"
          />
        </div>
      </Transition>
    </div>
  </section>
</template>
