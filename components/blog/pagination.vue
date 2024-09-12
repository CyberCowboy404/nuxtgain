<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  nextPage: {
    type: Boolean,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  },
  pageUrl: {
    type: String,
    required: true
  }
})

function getPageUrl(pageNo) {
  return `${props.pageUrl}${pageNo}/`
}
// Calculate the page range to show
const pageRange = [Math.max(1, props.currentPage - 1), props.currentPage, Math.min(props.totalPages, props.currentPage + 1)]

const prevLink = computed(() => {
  return props.currentPage === 2 ? props.baseUrl : `${props.pageUrl}${props.currentPage - 1}/`
})
</script>

<template>
  <div class="pagination-list text-typography_primary">
    <!-- Chevron -->
    <nuxt-link
      v-show="currentPage > 1"
      class="pagination-item pagination-icon"
      :to="prevLink"
    >
      <BlogIconsChevronDown
        class="transform rotate-90 h-6 w-6"
        width="24"
        height="24"
      />
    </nuxt-link>
    <!-- First Page -->
    <nuxt-link
      class="pagination-item"
      :class="[currentPage === 1 ? 'active' : '']"
      :to="baseUrl"
    >
      1
    </nuxt-link>
    <!-- ... -->
    <span
      v-show="currentPage > 2"
      class="pagination-extra"
    > ... </span>
    <template
      v-for="page in pageRange"
      :key="page"
    >
      <nuxt-link
        v-show="page !== 1 && page !== totalPages"
        class="pagination-item"
        :class="[currentPage === page ? 'active' : '']"
        :to="getPageUrl(page)"
      >
        {{ page }}
      </nuxt-link>
    </template>
    <!-- ... -->
    <span
      v-show="currentPage < totalPages - 1"
      class="pagination-extra"
    > ... </span>

    <!-- Last Page -->
    <nuxt-link
      v-show="totalPages > 1"
      class="pagination-item"
      :class="[currentPage === totalPages ? 'active' : '']"
      :to="getPageUrl(totalPages)"
    >
      {{ totalPages }}
    </nuxt-link>
    <!-- Chevron -->
    <nuxt-link
      v-show="currentPage < totalPages"
      class="pagination-item pagination-icon"
      :to="getPageUrl(currentPage + 1)"
    >
      <BlogIconsChevronDown
        class="transform -rotate-90 h-6 w-6"
        width="24"
        height="24"
      />
    </nuxt-link>
  </div>
</template>

<style scoped>
/* .pagination-list {
    @apply flex flex-row w-full items-center justify-center;
}
.pagination-item.active {
    @apply bg-brand_primary text-background;
}
.pagination-item {
    @apply rounded-md border border-typography_primary px-2 py-1 mx-1 w-8 text-center h-full;
}
.pagination-item:not(.active):hover {
    @apply bg-brand_primary/25;
}
.pagination-extra {
    @apply w-8 text-lg leading-lg text-center;
}
.pagination-icon {
    @apply w-10 text-center;
} */
</style>
