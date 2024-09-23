<script setup lang="ts">
import { ref } from 'vue'

const { t } = useI18n()

const testimonials = ref([
  {
    link: 'https://placehold.co/500x170',
    image: 'https://placehold.co/500x170',
    alt: 'MagicResume customer reviews',
  },
  {
    link: 'https://placehold.co/500x170',
    image: 'https://placehold.co/500x170',
    alt: 'MagicResume customer reviews'
  },
  {
    link: 'https://placehold.co/500x170',
    image: 'https://placehold.co/500x170',
    alt: 'MagicResume customer reviews'
  },
  {
    link: 'https://placehold.co/500x170',
    image: 'https://placehold.co/500x170',
    alt: 'MagicResume reviews'
  },
  {
    link: 'https://placehold.co/500x170',
    image: 'https://placehold.co/500x170',
    alt: 'MagicResume feedback'
  },
  {
    link: 'https://placehold.co/500x170',
    image: 'https://placehold.co/500x170',
    alt: 'MagicResume customer reviews'
  },
])
</script>

<template>
  <section class="py-14 container mx-auto px-4 md:px-0">
    <h2 class="font-merriweather text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
      {{ t('landing.testimonials') }}
    </h2>
    <div class="mt-5 columns-1 sm:columns-2 lg:columns-3 gap-4">
      <div
        v-for="(testimonial, index) in testimonials"
        :key="index"
        class="mb-4 bg-white border border-gray-200 rounded-lg overflow-hidden transition-all transform hover:scale-125 hover:z-10 hover:relative  hover:translate-y-[-5px] hover:shadow-lg hover:border-brand-blue"
      >
        <a
          v-if="testimonial.link"
          :href="testimonial.link"
          target="_blank"
          class="p-2"
        >
          <NuxtImg
            :src="testimonial.image"
            :alt="testimonial.alt"
            class="w-full h-auto"
          />
        </a>
      </div>
    </div>
  </section>
</template>
