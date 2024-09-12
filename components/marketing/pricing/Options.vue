<script
  setup
  lang='ts'
>
const { t } = useI18n()

const paymentState = usePaymentState()
const { getBasicProductLink, getBundleProductLink } = storeToRefs(paymentState)

const { isMobile } = useDevice()

const activePrice = ref(1)

async function goToCheckout(link: string) {
  const _link = paymentState.generateProductLink(link)
  await navigateTo(_link, { external: true })
}
</script>

<template>
  <div class="flex flex-col gap-4 lg:static z-10 bg-white">
    <section @mouseenter="activePrice = 0">
      <a
        :href="getBasicProductLink"
        target="_blank"
        class="
        flex gap-3 border-2 border-brand-green rounded-lg cursor-pointer pointer-events-auto
        px-3 py-3 text-xl items-center justify-between
        "
      >
        <div class="flex items-center gap-4">
          <div
            class="transition-all rounded-full size-[22px] border border-brand-green"
            :class="activePrice === 0 ? 'border-[6px]' : 'border'"
          />
          <div>
            <b class="text-base md:text-lg text-brand-blue">$6.90</b>
          </div>
        </div>

        <span class="text-center text-sm md:text-base plan-desc font-medium">
          2 CV + 10 AI Generations
        </span>
        <UButton
          :variant="activePrice === 0 ? 'solid' : 'outline'"
          :size="isMobile ? 'xs' : 'lg'"
          class="transition-all capitalize"
          @click="goToCheckout(paymentState.getBasicOneTime.link)"
        >
          <span
            v-if="isMobile"
            class="font-bold"
          >
            {{ t('priceTrust.ctaMob') }}
          </span>

          <span
            v-else
            class="font-bold"
          >
            {{ t('priceTrust.cta') }}
          </span>
        </UButton>
      </a>
    </section>

    <section
      @click="goToCheckout(paymentState.getBundleOneTime.link)"
      @mouseenter="activePrice = 1"
    >
      <a
        :href="getBundleProductLink"
        target="_blank"
        class="
        flex gap-3 border-2 border-brand-green rounded-lg cursor-pointer pointer-events-auto
        px-3 py-3 text-xl items-center justify-between relative
        "
      >
        <div class="flex items-center gap-4">
          <div
            class="transition-all rounded-full size-[22px] border-brand-green"
            :class="activePrice === 1 ? 'border-[6px]' : 'border'"
          />
          <div>
            <b class="text-base md:text-lg text-brand-blue">$14.90</b>
            <span
              class="
            discount-tag top-0 absolute bg-white shadow border border-brand-green
            text-base pl-2 text-neutral-3"
            >
              52% OFF
            </span>
          </div>
        </div>

        <span class="text-center text-sm md:text-base plan-desc font-medium">5 CV + 30 AI Generations</span>
        <UButton
          :size="isMobile ? 'xs' : 'lg'"
          :variant="activePrice === 1 ? 'solid' : 'outline'"
          class="transition-all capitalize"
          @click="goToCheckout(paymentState.getBasicOneTime.link)"
        >
          <span
            v-if="isMobile"
            class="font-bold"
          >
            {{ t('priceTrust.ctaMob') }}
          </span>

          <span
            v-else
            class="font-bold"
          >
            {{ t('priceTrust.cta') }}
          </span>
        </UButton>
      </a>
    </section>
  </div>
</template>

<style
  scoped
  lang='scss'
></style>
