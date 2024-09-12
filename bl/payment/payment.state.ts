export const usePaymentState = defineStore('paymentState', () => {
  const { t } = useI18n()
  const localePath = useLocalePath()
  const prices = {
    prod: [
      {
        id: 'prod_Q6A9N5wfffOXZU',
        priceId: 'price_1PFxpURqUPDTe8XNS5mUBDm2',
        name: 'basic',
        price: '6.90',
        link: 'https://buy.stripe.com/7sI28e8jCgnh3CM5kk',
      },
      {
        id: 'prod_Q6A9A9MTH7tU7q',
        priceId: 'price_1PFxpRRqUPDTe8XNJC7c47Fh',
        name: 'bundle',
        price: '14.90',
        link: 'https://buy.stripe.com/00g3cigQ8c71b5eeUV',
      }
    ],
    dev: [
      {
        id: 'prod_PzU8d9FEWc2TPx',
        priceId: 'price_1P9VA1RqUPDTe8XNX9o4vzjV',
        name: 'basic',
        price: '6.90',
        link: 'https://buy.stripe.com/test_9AQaG35Ix8vhavC5kl',
      },
      {
        id: 'prod_PzUAiGHXVrXwO3',
        priceId: 'price_1P9VBrRqUPDTe8XNhcGpuUPF',
        name: 'bundle',
        price: '14.90',
        link: 'https://buy.stripe.com/test_8wM01p5Ix8vh7jq9AA',
      }
    ]
  }
  const state = reactive<PaymentState>({
    paymentModalVisible: false,
    paymentModal: {
      title: 'Choose a plan to continue',
      body: '',
    },
    subscriptions: [
      {
        id: 'prod_PzUCz9kx9hHY0h',
        priceId: 'price_1P9VDdRqUPDTe8XNrimCV8LU',
        name: 'pro',
        price: '24.99',
        link: 'https://buy.stripe.com/test_bIY3dB9YN6n933aeUW',
      }
    ],
    oneTime: import.meta.dev ? prices.dev : prices.prod,
  })

  /* --------------------------------- Getters -------------------------------- */
  const getProSubscription = computed(() => state.subscriptions[0])
  const getBasicOneTime = computed(() => state.oneTime[0])
  const getBundleOneTime = computed(() => state.oneTime[1])
  const isPaymentModalVisible = computed(() => state.paymentModalVisible)
  const getModalTitle = computed(() => state.paymentModal.title || 'Choose a plan to continue')
  const getModalBody = computed(() => state.paymentModal.body)

  const getBasicProductLink = computed(() => {
    const user = useSupabaseUser()
    const url = new URL(getBasicOneTime.value.link)

    user.value && url.searchParams.append('client_reference_id', user.value.id)
    url.searchParams.append('prefilled_email', `${user.value?.email}`)
    return url.toString()
  })

  const getBundleProductLink = computed(() => {
    const user = useSupabaseUser()
    const url = new URL(getBundleOneTime.value.link)

    user.value && url.searchParams.append('client_reference_id', user.value.id)
    url.searchParams.append('prefilled_email', `${user.value?.email}`)
    return url.toString()
  })

  /* --------------------------------- Actions -------------------------------- */

  function generateProductLink(productLink: string) {
    const user = useSupabaseUser()
    const url = new URL(productLink)

    url.searchParams.append('client_reference_id', user.value!.id)
    url.searchParams.append('prefilled_email', `${user.value?.email}`)
    return url.toString()
  }

  function setPaymentModalVisibility(visible: boolean) {
    state.paymentModalVisible = visible
  }

  function setPaymentModal(product: 'cvCreate' | 'cvGenerations' | 'cvPdfDownload' | 'cvEdit' | 'cvReady' | 'template') {
    const texts = {
      cvCreate: {
        title: t('payment.cvCreate.title'),
        body: t('payment.cvCreate.body')
      },
      cvGenerations: {
        title: t('payment.cvGenerations.title'),
        body: t('payment.cvGenerations.body')
      },
      cvPdfDownload: {
        title: t('payment.cvPdfDownload.title'),
        body: t('payment.cvPdfDownload.body')
      },
      cvEdit: {
        title: t('payment.cvEdit.title'),
        body: t('payment.cvEdit.body')
      },
      cvReady: {
        title: t('payment.cvReady.title'),
        body: t('payment.cvReady.body')
      }
    }

    state.paymentModal.title = texts[product].title
    state.paymentModal.body = texts[product].body

    setPaymentModalVisibility(true)
  }

  function openPaymentModalWithText(title: string, body: string) {
    state.paymentModal.title = title
    state.paymentModal.body = body
    state.paymentModalVisible = true
  }

  // async function createProduct(name: string, description: string, price: number, interval = null) {
  //   const client = await useClientStripe()
  //   const product = await client.products.create({
  //     name,
  //     description,
  //   })

  //   const price_data = {
  //     product: product.id,
  //     unit_amount: price * 100, // Price in cents
  //     currency: 'usd',
  //     recurring: {},
  //   }

  //   if (interval) {
  //     price_data.recurring = { interval }
  //   }

  //   const stripePrice = await client.prices.create(price_data)
  //   return stripePrice.id
  // }

  return {
    getProSubscription,
    getBasicOneTime,
    getBundleOneTime,
    isPaymentModalVisible,
    getModalTitle,
    getModalBody,
    getBasicProductLink,
    getBundleProductLink,
    generateProductLink,
    setPaymentModalVisibility,
    setPaymentModal,
    openPaymentModalWithText
  }
})
