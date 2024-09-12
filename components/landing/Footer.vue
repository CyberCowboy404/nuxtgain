Here's the updated code with the strings added to the en and ua translation files and the t function used for
translations:
<script
  setup
  lang="tsx"
>
const { t } = useI18n()
const footerLinks = [
  {
    href: '/',
    name: t('landing.home'),
  },

  {
    href: '/auth',
    name: t('landing.login'),
  },

  {
    href: '/blog',
    name: t('landing.blog'),
  },

  {
    href: '/pricing',
    name: t('landing.pricing'),
  },

  {
    href: '/#features',
    name: t('landing.features'),
  },
]

const legalLinks = [
  {
    href: '/legal/terms-of-use',
    name: t('landing.termsOfUse'),
  },
  {
    href: '/legal/privacy-policy',
    name: t('landing.privacyPolicy'),
  },
]

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 class="text-xl font-bold mb-4 text-neutral-4">
      {title}
    </h2>
  )
}
</script>

<template>
  <UDivider class="mt-24 mb-8" />
  <footer class="container px-4 py-5 flex mx-auto justify-center">
    <div class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div class="flex flex-col gap-[10px]">
        <Logo />
        <div class="mt-4 sm:mt-0 text-xs">
          {{ t('landing.builtWith') }}
          <NuxtLink
            class="text-brand-blue"
            to="https://twitter.com/CyberCowboy404"
          >
            @CyberCowboy404
          </NuxtLink>
        </div>
        <div class="mt-4 sm:mt-0 text-xs">
          &copy; {{ new Date().getFullYear() }} {{ t('landing.allRightsReserved') }}
        </div>
      </div>
      <div>
        <SectionHeader :title="t('landing.links')" />
        <ul class="">
          <li
            v-for="item in footerLinks"
            :key="item.name"
            class="text-sm text-gray-500 mb-[7px]"
          >
            <NuxtLinkLocale :to="item.href">
              {{ item.name }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader :title="t('landing.legal')" />
        <ul class="">
          <li
            v-for="item in legalLinks"
            :key="item.name"
            class="text-sm text-gray-500 mb-[7px]"
          >
            <NuxtLinkLocale :to="item.href">
              {{ item.name }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader :title="t('landing.community')" />
        <ul class="flex flex-col gap-1">
          <li class="text-sm text-gray-500 mb-[7px]">
            <a
              href="https://www.linkedin.com/company/magicresumeai/about"
              target="_blank"
              class="flex items-center gap-2"
            >
              <Icon
                name="devicon:linkedin"
                class="size-[18px]"
              />
              <span>LinkedIn</span>
            </a>
          </li>
          <li class="text-sm text-gray-500 mb-[7px]">
            <a
              href="https://discord.gg/wENrGUUnwx"
              target="_blank"
              class="flex items-center gap-2"
            >
              <Icon
                name="skill-icons:discord"
                class="size-[18px]"
              />
              <span>Discord</span>
            </a>
          </li>
          <li class="text-sm text-gray-500 mb-[7px]">
            <a
              href="https://x.com/MagicResumeAI"
              target="_blank"
              class="flex items-center gap-2"
            >
              <Icon
                name="ri:twitter-x-fill"
                class="size-[18px]"
              />
              <span>X</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- <div>
        <SectionHeader :title="t('common.changeLanguage')" />
        <SwitchLanguage class="text-gray-500 text-sm" />
      </div> -->
    </div>
  </footer>
</template>
