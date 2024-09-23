<script setup>
// Fetching data
const { path, params } = useRoute()
const blogCountLimit = 6

function getPageLimit(totalPosts) {
  return Math.ceil(totalPosts / blogCountLimit)
}

function getPageNumber() {
  return Number(params.number)
}

// Attempt to get the number
const router = useRouter()
let pageNo
try {
  pageNo = getPageNumber()
  if (Number.isNaN(pageNo) || pageNo <= 0) {
    router.replace('/blog/')
  }
} catch (err) {
  console.error(err)
  router.replace('/blog/')
}
</script>

<template>
  <main class="container mx-auto px-4">
    <!-- Query for the given blog page number -->
    <ContentQuery
      path="/blog"
      :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
      :sort="{
        date: -1,
      }"
      :skip="blogCountLimit * (getPageNumber() - 1)"
      :limit="blogCountLimit"
    >
      <!-- In case it is found -->
      <template #default="{ data }">
        <BlogHero />
        <BlogSection
          id="main"
          class="!pt-0"
        >
          <BlogList :data="data" />
          <ContentQuery
            path="/blog"
            :only="['headline']"
          >
            <template #default="{ data }">
              <BlogPagination
                v-if="getPageLimit(data.length) > 1"
                class="mt-8"
                :current-page="getPageNumber()"
                :total-pages="getPageLimit(data.length)"
                :next-page="getPageNumber() < getPageLimit(data.length)"
                base-url="/blog/"
                page-url="/blog/page/"
              />
            </template>
            <template #not-found>
              <!-- Nothing -->
            </template>
          </ContentQuery>
        </BlogSection>
      </template>
      <!-- In case not found -->
      <template #not-found>
        <!-- Show hero and message -->
        <BlogHero />
        <BlogSection
          id="main"
          class="!pt-0"
        >
          <BlogList
            :data="[]"
            message="There are no posts in this page, maybe try searching on another one."
          />
        </BlogSection>
      </template>
    </ContentQuery>
  </main>
</template>
