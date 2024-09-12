<script setup lang="ts">
const { t } = useI18n()
const isOpen = ref(false)
const email = 'cybercowboy404@gmail.com'
const twitter = 'https://twitter.com/CyberCowboy404'
const discord = 'https://discord.gg/wENrGUUnwx'

const router = useRouter()

const isDesignPage = computed(() => router.currentRoute.value.path.toLowerCase().includes('design'))
</script>

<template>
  <div v-if="false" class="fixed bottom-0 right-0">
    <UButton size="lg" color="blue" :label="t('common.feedback')" class="rounded-xl border-l-0 rounded-r-none rounded-bl-none text-lg" @click="isOpen = true" />
    <UModal
      v-model="isOpen"
      :ui="{ width: 'w-full sm:max-w-2xl' }"
    >
      <UCard>
        <template #header>
          <h2 class="text-2xl font-bold">
            {{ t('feedback.feedbackHeader') }}
          </h2>
        </template>
        <div class="mb-4">
          <p class="flex flex-col gap-[5px]">
            <span>
              🎨 I'm crafting this app just for you, and your feedback is golden! ✨<br>
            </span>
            <span>
              📝 Share your thoughts and become an exclusive beta tester. 🌟<br>
            </span>
            <span>
              🎁 You'll get to try out new features before anyone else, absolutely free. 😊<br>
            </span>
            <span>
              🚀 Let's create something amazing together! 💪
            </span>
          </p>
        </div>
        <div class="mb-4">
          <p class="text-xl font-bold mb-2">
            Share your feedback:
          </p>
          <ul class="space-y-2">
            <li>
              <a :href="`mailto:${email}`" class="inline-flex items-center text-blue-500 hover:underline">
                <Icon name="mdi:email" class="mr-1" />
                {{ email }}
              </a>
            </li>
            <li>
              <a :href="twitter" target="_blank" class="inline-flex items-center text-blue-500 hover:underline">
                <Icon name="mdi:twitter" class="mr-1" />
                Twitter
              </a>
            </li>
            <li>
              <a :href="discord" target="_blank" class="inline-flex items-center text-blue-500 hover:underline">
                <Icon name="mdi:discord" class="mr-1" />
                Discord
              </a>
            </li>
          </ul>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
