<script setup>
defineProps({
  links: {
    type: Array,
    required: true
  }
})

// flatten TOC links nested arrays to one array
function flattenLinks(links) {
  const _links = links
    .map((link) => {
      let _link = [link]
      if (link.children) {
        // recursively flatten children links
        const flattened = flattenLinks(link.children)
        _link = [link, ...flattened]
      }
      return _link
    })
    .flat(1)
  return _links
}
const isVisible = ref(true)
function toggleToc() {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <nav class="toc">
    <header
      class="flex flex-row justify-between items-center cursor-pointer"
      :class="[isVisible ? 'mb-2' : '']"
      aria-label="Expand the table of contents."
      @click="toggleToc"
    >
      <span class="blog-aside-title mb-0">Table of Contents</span>
      <BlogIconsChevronDown
        class="w-6 h-6 transform"
        :class="[isVisible ? '' : 'rotate-180']"
        width="24"
        height="24"
      />
    </header>
    <ul
      v-if="links"
      class="list-none ml-4"
      :class="[isVisible ? 'block' : 'hidden']"
    >
      <!-- render each link with depth class -->
      <li
        v-for="link of flattenLinks(links)"
        :key="link.id"
        :class="`toc-link_${link.depth} first:mt-0 mt-2 md:mt-1`"
      >
        <a
          :href="`#${link.id}`"
          class="hover:underline hover:text-brand_primary"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc-link_3 {
    @apply pl-4;
}

.toc-link_3::before {
    @apply pr-2;
    content: "-"
}
</style>
