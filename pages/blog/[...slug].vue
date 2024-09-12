<script setup>
const { path } = useRoute()
const cleanPath = path.replace(/\/+$/, '')
const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
  // Remove a trailing slash in case the browser adds it, it might break the routing
  // fetch document where the document path matches with the cuurent route
  const article = queryContent('/blog').where({ _path: cleanPath }).findOne()
  // get the surround information,
  // which is an array of documeents that come before and after the current document
  const surround = queryContent('/blog').sort({ date: -1 }).only(['_path', 'headline']).findSurround(cleanPath, { before: 1, after: 1 })
  return {
    article: await article,
    surround: await surround
  }
})

// Get the authors
const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne())

// Set the meta
const baseUrl = 'https://www.magic-resume.ai'
const canonicalPath = baseUrl + (`${path}/`).replace(/\/+$/, '/')
const image = baseUrl + (data.value?.article?.socialImage.src || '/sample.webp')

// JSON+LD
const jsonScripts = [
  {
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': 'https://www.magic-resume.ai'
      },
      'url': canonicalPath,
      'image': image,
      'headline': data.value?.article?.headline,
      'abstract': data.value?.article?.excerpt,
      'datePublished': data.value?.article?.date,
      'dateModified': data.value?.article?.dateUpdated || data.value?.article?.date,
      'author': authorData.value[data.value?.article?.author],
      'publisher': authorData.value['Nick Bohdanov']
    })
  }
]
useHead({
  title: data.value?.article?.title,
  meta: [
    { name: 'author', content: data.value?.article?.author },
    { name: 'description', content: data.value?.article?.description },
    { property: 'article:published_time', content: data.value?.article?.date.split('T')[0] },
    // OG
    { hid: 'og:title', property: 'og:title', content: data.value?.article?.headline },
    { hid: 'og:url', property: 'og:url', content: canonicalPath },
    { hid: 'og:description', property: 'og:description', content: data.value?.article?.description },
    { hid: 'og:image', name: 'image', property: 'og:image', content: image },
    { hid: 'og:type', property: 'og:type', content: 'Article' },
    { hid: 'og:image:type', property: 'og:image:type', content: `image/${data.value?.article?.socialImage.mime}` },
    { hid: 'og:image:width', property: 'og:image:width', content: data.value?.article?.socialImage.width || 190 },
    { hid: 'og:image:height', property: 'og:image:height', content: data.value?.article?.socialImage.height || 190 },
    { hid: 'og:image:alt', property: 'og:image:alt', content: data.value?.article?.socialImage.alt },
    // Twitter
    { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
    { hid: 'twitter:title', name: 'twitter:title', content: data.value?.article?.headline },
    { hid: 'twitter:url', name: 'twitter:url', content: canonicalPath },
    { hid: 'twitter:description', name: 'twitter:description', content: data.value?.article?.description },
    { hid: 'twitter:image', name: 'twitter:image', content: image },
    { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: data.value?.article?.socialImage.alt }
  ],
})
</script>

<template>
  <main class="container mx-auto px-4">
    <ContentDoc>
      <template #default="{ doc }">
        <BlogSection
          id="blog-title"
          type="header"
          class=""
        >
          <div
            class="pt-8 border-typography_primary flex flex-col md:flex-row items-center md:justify-between md:text-right mb-12 md:mb-8"
          >
            <!-- Breadcrumbs -->
            <BlogBreadcrumbs :current-link="doc.headline" />
            <!-- Publish date -->
            <span class="font-light text-typography_primary/75 dark:text-typography_primary_dark/75 mt-2 md:mt-0">
              {{
                formatDate(doc.date)
              }}
            </span>
          </div>
          <!-- Headline -->
          <h1
            class="blog-post-text font-bold mb-4 md:mb-6 text-lg md:text-xl text-center md:text-left"
          >
            {{ doc.headline }}
          </h1>
          <div
            class="border-b-2 pb-8 border-typography_primary dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between mt-12 md:mt-4"
          >
            <!-- Author -->
            <div class="flex flex-row items-center justify-center">
              <span class="blog-post-text text-lg leading-lg font-light">By
                <a
                  class="hover:underline italic"
                  :href="doc.authorUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{
                  doc.author
                }}</a></span>
            </div>
            <!-- Social Share -->
            <div class="mt-6 md:mt-0">
              <BlogNavShareIcons
                :headline="doc.headline"
                :excerpt="doc.excerpt"
                :path="`${doc._path}/`"
              />
            </div>
          </div>
        </BlogSection>
        <!-- Content -->
        <BlogSection
          id="main"
          class="!pt-0 relative grid grid-cols-10 gap-8 lg:gap-12"
        >
          <!-- Table of Contents -->
          <aside class="mt-8 col-span-full md:col-span-3 md:hidden">
            <div class="blog-post-text blog-aside-wrapper mb-2">
              <BlogTableOfContents :links="doc.body?.toc?.links" />
            </div>
          </aside>
          <article class="prose col-span-full md:col-span-7 relative">
            <!-- Update date -->
            <span
              v-show="doc.dateUpdated"
              class="italic absolute -top-8 text-sm leading-sm font-light text-typography_primary/75 dark:text-typography_primary_dark/75"
            >
              (Updated: {{ formatDate(doc.dateUpdated) }})
            </span>
            <!-- Blog content -->
            <ContentRenderer
              :value="doc"
              class="blog-content blog-post-text"
            />
          </article>
          <aside class="sticky mt-6 top-[85px] col-span-full md:col-span-3 blog-aside h-fit">
            <!-- Mobile Table of Content -->
            <div class="!hidden blog-aside-wrapper md:!flex mb-4">
              <BlogTableOfContents
                :links="doc.body?.toc?.links"
                class="blog-post-text"
              />
            </div>
            <!-- Related articles -->
            <div
              v-if="data?.surround?.filter((elem) => elem !== null)?.length > 0"
              class="blog-aside-wrapper"
            >
              <BlogRelatedArticles
                :surround="data?.surround"
                class="blog-post-text"
              />
            </div>
          </aside>
        </BlogSection>
      </template>
      <!-- Error in case not found -->
      <template #not-found>
        <BlogSectionsError />
      </template>
    </ContentDoc>
  </main>
</template>
