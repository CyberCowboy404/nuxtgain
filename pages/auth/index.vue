<script setup lang='ts'>
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@nuxtbase/auth-ui-vue'

import { englishWords } from '~/i18n/en'

const { t } = useI18n()

useHead({
  title: 'Magic-Resume Auth',
})

const supabaseClient = useSupabaseClient()

const authLocale = {} as any

Object.keys(englishWords.auth).forEach((key) => {
  authLocale[key] = {}
  const item = englishWords.auth[key as keyof typeof englishWords.auth]
  Object.keys(item).forEach((key2) => {
    authLocale[key][key2] = t(`auth.${key}.${key2}`)
  })
})

const redirectTo = `${globalThis.location?.origin}/auth/finish`
</script>

<template>
  <div class="px-4 md:px-0">
    <AuthForm :redirect-to="redirectTo" />
  </div>
</template>

<style scoped lang='scss'></style>
