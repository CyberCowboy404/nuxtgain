<script setup lang="ts">
const props = withDefaults(defineProps<{
  data: any[]
  message: string
}>(), {
  data: [],
  message: 'There are no posts right now, but stay tuned for newer releases in the future.'
})

console.log(props.data)
</script>

<template>
  <div class="flex-wrap grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4">
    <article
      v-for="article in data"
      :key="article._path"
      class="
        flex flex-col
        shadow
        rounded-lg
        overflow-hidden
        hover:bg-gray-50
        dark:hover:bg-secondary-darker
        cursor-pointer
        dark:bg-secondary-darkest
      "
    >
      <NuxtLink
        :to="`${article._path}/`"
        class="p-4 block relative"
      >
        <div class="wrapper flex flex-col gap-2">
          <div v-if="article.image">
            <NuxtImg
              :src="article.image.src"
              :alt="article.image.alt"
              width="800px"
              class="w-full rounded-lg"
            />
          </div>

          <header class="">
            <h2 class="font-semibold mb-2 group-hover:text-brand-blue">
              {{ article.headline }}
            </h2>
            <p
              class="text-sm leading-sm mb-4"
            >
              {{ formatDate(article.date) }}
            </p>
            <p>{{ article.description }}</p>
          </header>
        </div>
      </NuxtLink>
    </article>
  </div>
  <p
    v-if="data?.length === 0"
    class="w-full md:w-7/12 text-h3 leading-h3 font-bold dark:text-white"
  >
    {{ message }}
  </p>
</template>
