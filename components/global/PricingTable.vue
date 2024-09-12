<script setup lang="ts">
const props = defineProps<{
  free: boolean
}>()
const paymentState = usePaymentState()
const user = useSupabaseUser()

const { t, tm, rt } = useI18n()
const oneTimeProducts = computed(() => [
  {
    id: 1,
    name: t('landing.freeTitle'),
    code: 'free',
    subtitle: t('landing.freeSubtitle'),
    price: 0,
    features: t('landing.freeFeatures'),
    buttonText: t('landing.freeButton'),
    link: '/auth',
    disabled: !props.free,
  },
  {
    id: paymentState.getBasicOneTime.id,
    name: t('landing.basicTitle'),
    code: 'basic',
    subtitle: t('landing.basicSubtitle'),
    price: paymentState.getBasicOneTime.price,
    discounted: '9$',
    features: t('landing.basicFeatures'),
    buttonText: t('landing.basicButton'),
    link: paymentState.getBasicOneTime.link,
  },
  {
    id: paymentState.getBundleOneTime.id,
    name: t('landing.bundleTitle'),
    code: 'bundle',
    price: paymentState.getBundleOneTime.price,
    discounted: '17$',
    subtitle: t('landing.bundleSubtitle'),
    features: t('landing.bundleFeatures'),
    buttonText: t('landing.bundleButton'),
    link: paymentState.getBundleOneTime.link,
  },
])

const subscriptionProducts = computed(() => [
  {
    id: 4,
    name: t('subscriptionProducts.proTitle'),
    code: 'professional',
    price: paymentState.getProSubscription.price,
    subtitle: t('subscriptionProducts.proSubtitle'),
    features: t('subscriptionProducts.proFeatures'),
    buttonText: t('subscriptionProducts.proButton'),
    link: paymentState.getProSubscription.link,
  },
  {
    id: 5,
    name: t('subscriptionProducts.customTitle'),
    code: 'custom',
    subtitle: t('subscriptionProducts.customSubtitle'),
    features: t('subscriptionProducts.customFeatures'),
    buttonText: t('subscriptionProducts.customButton'),
  },
])

const tabs = computed(() => [
  { key: 'one_time', label: t('landing.oneTime'), default: true },
  // { key: 'subscription', label: t('tabs.subscription') },
])

const isOneTime = ref(true)

const products = computed(() => isOneTime.value ? oneTimeProducts.value : subscriptionProducts.value)

async function priceClicked(link?: string) {
  if (user.value && link) {
    const _link = paymentState.generateProductLink(link)
    await navigateTo(_link, { external: true })
  } else {
    getStartedAnonymously()
  }
}
</script>

<template>
  <div class="max-w-screen-lg mx-auto">
    <UTabs
      :items="tabs"
      class="max-w-sm mx-auto mb-8"
      @change="isOneTime = !isOneTime"
    />
    <div
      class="grid gap-8 place-items-center"
      :class="{
        'lg:grid-cols-2': !isOneTime,
        'lg:grid-cols-3 md:grid-cols-2': isOneTime && free,
        'lg:grid-cols-2 md:grid-cols-1': isOneTime && !free,
      }"
    >
      <template v-for="product in products" :key="product.id">
        <UCard
          v-if="!product.disabled"
          class="cursor-pointer flex flex-col max-w-sm text-center justify-center flex-1 max-w-[320px] relative hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
          :class="{
            'shadow-brand-green shadow-lg hover:shadow-brand-green': product.code === 'bundle',
          }"
        >
          <div @click="priceClicked(product.link)">
            <div
              v-if="product.code === 'bundle'"
              class="absolute top-0 right-0 bg-brand-green text-white px-2 py-1 rounded-bl-lg font-semibold uppercase text-xs"
            >
              {{ t('common.popular') }}
            </div>
            <div class="flex flex-col flex-grow">
              <h3 class="text-3xl font-semibold mb-4">
                {{ product.name }}
              </h3>
              <h4 class="text-md font-semibold text-gray-500 mb-4 subtitle">
                {{ product.subtitle }}
              </h4>
              <p class="text-5xl font-medium text-primary flex justify-center gap-[20px] items-end">
                <span v-if="product.discounted" class="text-neutral-4 text-xl line-through">
                  {{ product.discounted }}
                </span>
                <span>
                  {{ product.code === 'custom' ? 'Custom' : `$${product.price}` }}
                </span>
              </p>
              <p
                :class="{ invisible: product.code === 'free' || product.code === 'custom' }"
                class="mt-2 font-medium"
              >
                {{ isOneTime ? t('landing.oneTime') : 'Per Month' }}
              </p>
              <div
                class="text-start my-4 flex-grow"
                :class="{
                  'min-h-[270px]': isOneTime,
                  'min-h-[320px]': !isOneTime,
                }"
              >
                <ul>
                  <li
                    v-for="feature in tm(product.features)"
                    :key="feature"
                    class="my-1 flex items-center gap-1"
                  >
                    <UIcon
                      name="i-solar-check-circle-bold-duotone"
                      class="h-4 w-4"
                    /> {{ rt(feature) }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-auto">
              <UButton
                block
                size="lg"
                external
              >
                {{ product?.buttonText ? product.buttonText : 'Subscribe' }}
              </UButton>
              <!-- <LandingCommonMoneyBack v-if="product.code !== 'free'" /> -->
            </div>
          </div>
        </UCard>
      </template>
    </div>
  </div>
</template>
