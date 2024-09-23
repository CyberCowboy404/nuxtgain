<script
  setup
  lang='ts'
>
import { VueperSlide, VueperSlides } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const props = defineProps<{
  reviews: {
    title: string
    text: string
    description: string
    name: string
    rating: 1 | 2 | 3 | 4 | 5
    image: string
  }[]
}>()

const { isMobile } = useDevice()
</script>

<template>
  <VueperSlides
    autoplay
    bullets-outside
    :fixed-height="isMobile ? '360px' : '235px'"
    class="
      slider-reviews no-shadow bg-[#f6f6f680] rounded-xl border shadow-lg
      border-[#d7d7d7] px-7 pt-4 pb-2
    "
  >
    <template #arrow-left>
      <Icon
        name="icon-park:left"
        class="text-2xl text-[#000]"
      />
    </template>

    <template #arrow-right>
      <Icon
        name="icon-park:right"
        class="text-2xl text-[#000]"
      />
    </template>
    <VueperSlide
      v-for="(review, i) of reviews"
      :key="i"
    >
      <template #content>
        <div class="flex flex-col gap-3 flex-1 h-full">
          <h2
            v-if="review.title"
            class="text-lg md:text-xl font-bold"
          >
            {{ review.title }}
          </h2>
          <div class="flex flex-col flex-1 h-full gap-5">
            <p class="min-h-[70px] responsive-text text-sm md:text-base">
              {{ review.text }}"
            </p>

            <div class="flex gap-4">
              <div
                v-if="review.image"
                class="flex items-center"
              >
                <NuxtImg
                  :src="review.image"
                  :alt="review.title"
                  width="45"
                  height="45"
                  class="rounded-full mr-3"
                />
              </div>
              <UAvatar
                v-else
                icon="i-heroicons-photo"
                size="sm"
                class="size-[45px] mr-3 bg-neutral-1"
              />

              <div class="w-full flex items-center justify-between">
                <div class="w-full md:w-1/2 flex flex-col">
                  <span class="font-medium">{{ review.name }}</span>
                  <span class="text-sm">{{ review.description }}</span>
                </div>
                <MarketingRating
                  :rating="review.rating"
                  size="text-xl"
                  class="hidden md:flex w-1/2 items-center justify-end"
                />
              </div>
            </div>

            <MarketingRating
              :rating="review.rating"
              size="text-xl"
              class="flex md:hidden self-start"
            />
          </div>
        </div>
      </template>
    </VueperSlide>
  </VueperSlides>
</template>

<style lang='scss'>
@media (min-width: 1024px) and (max-width: 1273px) {
  .responsive-text {
    font-size: 15px;
  }
}

.vueperslides {
  &__arrows {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
  }

  &__arrow {
    position: static;
    transform: none;
    opacity: 1;

    svg {
      fill: #000;
      width: fit-content;
      height: fit-content;
      padding: 0.5em;
    }
  }

  &__bullet {
    margin: 20px 10px
  }
}
</style>
