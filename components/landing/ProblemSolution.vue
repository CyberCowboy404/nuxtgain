<script
  setup
  lang="ts"
>
const { t } = useI18n()
</script>

<template>
  <section
    class="py-14 max-w-4xl mx-auto px-4 md:px-0"
  >
    <h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
      {{ t('landing.problemTitle') }}
    </h2>
    <div class="mt-12 flex flex-col md:flex-row gap-[30px] text-md ">
      <div class="flex-1 p-[30px] rounded-lg flex flex-col gap-4 bg-rose-100/75 text-rose-700">
        <ul>
          <li class="flex items-start gap-2 text-md mb-[10px]">
            <span>
              <Icon
                name="mdi:close"
                class="text-2xl "
              />
            </span>
            <span>
              <b>{{ t('landing.problemPoint1') }}</b>
              {{ t('landing.problemPoint1text') }}
            </span>
          </li>
          <li class="flex items-start gap-2 text-md mb-[10px]">
            <span>
              <Icon
                name="mdi:close"
                class="text-2xl "
              />
            </span>
            <span>
              <b>{{ t('landing.problemPoint2') }}</b>
              {{ t('landing.problemPoint2text') }}
            </span>
          </li>

          <li class="flex items-start gap-2 text-md mb-[10px]">
            <span>
              <Icon
                name="mdi:close"
                class="text-2xl "
              />
            </span>
            <span>
              <b>{{ t('landing.problemPoint3') }}</b>
              {{ t('landing.problemPoint3text') }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section
    class="max-w-4xl mx-auto"
  >
    <div class="mt-12 flex flex-col md:flex-row gap-[30px] text-md ">
      <div class="flex-1 p-[30px] rounded-lg flex flex-col gap-4 bg-emerald-100/70 text-emerald-700">
        <ul>
          <li class="flex items-start gap-2 text-md mb-[10px]">
            <span>
              <Icon
                name="mdi:check"
                class="text-2xl"
              />
            </span>
            <span>
              <b>{{ t('landing.solutionPoint1') }}</b>
              {{ t('landing.solutionPoint1text') }}
            </span>
          </li>
          <li class="flex items-start gap-2 text-md mb-[10px]">
            <span>
              <Icon
                name="mdi:check"
                class="text-2xl "
              />
            </span>
            <span>
              <b>{{ t('landing.solutionPoint2') }}</b>
              {{ t('landing.solutionPoint2text') }}
            </span>
          </li>

          <li class="flex items-start gap-2 text-md mb-[10px]">
            <span>
              <Icon
                name="mdi:check"
                class="text-2xl "
              />
            </span>
            <span>
              <b>{{ t('landing.solutionPoint3') }}</b>
              {{ t('landing.solutionPoint3text') }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
