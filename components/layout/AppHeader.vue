<script
  setup
  lang='ts'
>
const supabaseUser = useSupabaseUser()
const userState = useUserState()
const { getUserState } = storeToRefs(userState)
const paymentState = usePaymentState()

const isMainPage = computed(() => {
  // return useRouter().currentRoute.value.path === '/'
  return /^\/$|\/ua$/.test(useRouter().currentRoute.value.path)
})

const isThankYouPage = computed(() => {
  return useRouter().currentRoute.value.path.includes('/thank-you')
})

const isAnonym = computed(() => {
  return supabaseUser.value?.is_anonymous
})

const supabaseClient = useSupabaseClient()
const { t } = useI18n()
const localePath = useLocalePath()

const items = computed(() => (
  [
    [{
      label: t('common.upgrade'),
      slot: 'upgrade',
    }],
    // [
    //   {
    //     label: 'Profile Settings',
    //     to: '/app/settings',
    //   },
    // ],
    [{
      label: 'ben@example.com',
      slot: 'account',
      disabled: true
    }],
    [
      {
        label: t('dashboard.pageTitle'),
        icon: 'i-heroicons-home',
        click: async () => {
          await navigateTo(localePath('/app/dashboard'))
        },
      },
      {
        label: t('common.auth'),
        icon: 'i-heroicons-user-circle',
        click: async () => {
          await navigateTo(localePath('/auth'))
        },
        class: `${isAnonym.value ? '' : 'hidden'}`
      },
      {
        label: 'Plans',
        icon: 'i-heroicons-credit-card',
        click: () => {
          paymentState.setPaymentModalVisibility(true)
        },
      },
      {
        label: t('common.languages'),
        icon: 'i-heroicons-globe-alt',
        slot: 'languages',
        items: [
          {
            label: 'English',
          },
          {
            label: 'Українська',
          },
        ],
      },
      {
        label: t('common.signOut'),
        icon: 'i-heroicons-arrow-right-start-on-rectangle',
        click: logout,
      },
    ],
  ]))

// watchOnce(isUserPaid, (value) => {
//   if (!value) {
//     items.value.unshift([{
//       label: 'Upgrade',
//       slot: 'upgrade',
//     } as any])
//   }
// })

const { $posthog } = useNuxtApp()
async function logout() {
  userState.clean()
  $posthog?.()?.reset()
  await supabaseClient.auth.signOut()
  await navigateTo(localePath('/'))
}
</script>

<template>
  <MarketingTopLine v-if="isMainPage" />
  <nav class="top-0 sticky h-[80px] z-50">
    <div class=" bg-white z-10 left-0 right-0 items-center transition-all duration-300">
      <div class="flex container mx-auto pt-3 justify-between px-4">
        <Logo />
        <div
          v-if="!isThankYouPage"
          class="flex items-center gap-[15px]"
        >
          <template v-if="supabaseUser">
            <HeaderUserInfo v-if="getUserState" />
            <div class="flex items-center">
              <UDropdown
                :items="items"
                :ui="{ width: 'w-[225px]', base: 'overflow-visible' }"
              >
                <div class="flex items-center cursor-pointer">
                  <UIcon
                    class="lg:text-xl text-3xl mr-2"
                    name="i-heroicons-cog-8-tooth"
                  />
                  <UIcon
                    name="i-heroicons-chevron-down"
                    class="text-xl"
                  />
                </div>

                <template #upgrade>
                  <UButton
                    color="primary"
                    variant="outline"
                    :label="t('common.upgrade')"
                    icon="i-heroicons-arrow-down-circle"
                    block
                    @click="paymentState.setPaymentModalVisibility(true)"
                  />
                </template>

                <template #account>
                  <div class="text-left">
                    <p>
                      {{ t('common.signedIn') }}
                    </p>
                    <p class="truncate font-medium text-gray-900 dark:text-white">
                      <span v-if="isAnonym">
                        Anonymous
                      </span>
                      <span v-else>
                        {{ supabaseUser.email }}
                      </span>
                    </p>
                  </div>
                </template>

                <template #languages>
                  <SwitchLanguage />
                </template>
              </UDropdown>
            </div>
          </template>

          <div
            v-else
            class="flex items-center justify-end gap-3"
          >
            <NuxtLinkLocale
              to="/auth"
              class="flex"
            >
              <UButton
                color="blue"
                variant="ghost"
                class="font-bold"
                icon="i-heroicons-user-circle"
              />
            </NuxtLinkLocale>

            <UButton
              class="font-bold"
              :label="t('common.createDocument')"
              @click="userState.setAuthModalVisibility(true)"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
