<script setup>
// Scroll handling
import { nextTick, onUnmounted, ref } from 'vue'

const isVisible = ref(false)
function handleScroll() {
  // Only run the code if we are on the client
  if (typeof window !== 'undefined') {
    const st = window.pageYOffset || document.documentElement.scrollTop
    isVisible.value = st > window.innerHeight / 2
  }
}
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', handleScroll)
  nextTick(() => handleScroll())
}
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div
    class="fixed flex flex-col items-center w-12 sm:w-section_x z-20 bottom-[50px] right-0 text-typography_primary bg-brand_primary/90 transform duration-150 rounded-tl-md rounded-bl-md" :class="[
      isVisible ? '' : 'translate-x-full',
    ]"
  >
    <a
      href="#"
      aria-label="Scroll to Top"
      class="flex flex-col items-center py-1 text-center"
    >
      <span class="text-xxs leading-xxs uppercase font-highlight sm:w-6/12">Scroll to Top</span>
      <BlogIconsArrowUp
        class="w-4 h-4"
        width="16"
        height="16"
      />
    </a>
  </div>
</template>
