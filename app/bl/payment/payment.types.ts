interface ProductState {
  id: string
  priceId: string
  name: string
  price: string
  link: string
}

interface PaymentState {
  paymentModalVisible: boolean
  paymentModal: {
    title: string
    body: string
  }
  subscriptions: ProductState[]
  oneTime: ProductState[]
}
