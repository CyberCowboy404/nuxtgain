<script setup>
defineProps({
  surround: {
    type: Array,
    required: true
  },
  spacing: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div>
    <span class="blog-aside-title mb-2 block">Continue Reading</span>
    <ul
      class="list-none"
      :class="{
        'ml-4': spacing,
        'p-0 m-0': !spacing,
      }"
    >
      <template
        v-for="(other, index) in surround"
        :key="index"
      >
        <li
          v-if="other"
          class="first:mt-0 mt-4 md:mt-1"
        >
          <NuxtLink
            :to="`${other._path}/`"
            class="hover:underline hover:text-brand_primary"
            :aria-label="other.headline"
          >
            {{ other.headline }}
          </NuxtLink>
          <p class="!no-underline md:hidden text-sm leading-sm md:text-xs md:leading-xs mt-1">
            {{ other.excerpt }}
          </p>
        </li>
      </template>
    </ul>
  </div>
</template>
