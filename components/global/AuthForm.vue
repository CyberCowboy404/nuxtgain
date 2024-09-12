<script setup lang='ts'>
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@nuxtbase/auth-ui-vue'

import { englishWords } from '~/i18n/en'

const props = defineProps<{
  redirectTo?: string
}>()
const { t } = useI18n()

const supabaseClient = useSupabaseClient()

const authLocale = {} as any

Object.keys(englishWords.auth).forEach((key) => {
  authLocale[key] = {}
  const item = englishWords.auth[key as keyof typeof englishWords.auth]
  Object.keys(item).forEach((key2) => {
    authLocale[key][key2] = t(`auth.${key}.${key2}`)
  })
})

const redirectTo = computed(() => props.redirectTo || `${globalThis.location?.origin}/auth/finish`)

const authView = ref('magic_link')
</script>

<template>
  <div class="mt-6 relative lg:mx-auto w-full md:max-w-[500px] bg-white rounded-2xl">
    <div class="items-center justify-center">
      <Auth
        v-model:view="authView"
        :providers="[
          'google',
          'linkedin_oidc',
          'github',
        ]"
        :supabase-client="supabaseClient"
        :appearance="{
          theme: ThemeSupa,
        }"
        :redirect-to="redirectTo"
        :localization="{
          variables: authLocale,
        }"
      />
    </div>
  </div>
</template>

<style>

</style>
