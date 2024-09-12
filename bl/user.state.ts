export interface UserState {
  cvLeft: number
  generated: number
  subscriptionActive: number
  isPaid: boolean
}

export const useUserState = defineStore('user', () => {
  const paymentState = usePaymentState()
  const log = consola.withTag('userStore')
  const state = ref<UserState>()
  const userAuthVisible = ref(false)
  const userPending = ref(false)
  let refreshData: () => void
  /* --------------------------------- Getters -------------------------------- */
  const getUserState = computed(() => state.value)
  const getUserCvLeft = computed(() => state.value?.cvLeft ?? 0)
  const getUserGenerated = computed(() => state.value?.generated ?? 0)
  const isUserSubscriptionActive = computed(() => state.value?.subscriptionActive)
  const isUserPending = computed(() => userPending.value)
  const isUserPaid = computed(() => state.value?.isPaid)
  const isUserAuthVisible = computed(() => userAuthVisible.value)
  /* --------------------------------- Actions -------------------------------- */
  function isAbleToCreateCv() {
    consola.info('Checking if user is able to create cv', getUserCvLeft.value)
    if (getUserCvLeft.value === 0) {
      paymentState.setPaymentModal('cvCreate')
    }
    return getUserCvLeft.value > 0
  }

  function isAbleToGenerateCv() {
    consola.info('Checking if user is able to generate cv', getUserGenerated.value)
    if (getUserGenerated.value === 0) {
      paymentState.setPaymentModal('cvGenerations')
    }
    return getUserGenerated.value > 0
  }

  async function getUserInfo() {
    const { data, error, refresh, pending } = await useFetch<UserState>('/api/user', {
      lazy: true,
    })

    if (error.value) {
      console.error(error.value.message)
      return null
    }

    refreshData = refresh
    userPending.value = pending.value

    watch(data, (newData) => {
      if (!newData) {
        refresh()
        return
      }

      state.value = data.value!
    }, { immediate: true })
  }

  function refreshUserData() {
    log.info('Refreshing user data')
    return refreshData?.()
  }

  function decreaseCvCount() {
    state.value!.cvLeft--
  }

  function clean() {
    state.value = undefined
  }

  function setAuthModalVisibility(visibility: boolean) {
    userAuthVisible.value = visibility
  }

  return {
    state,
    isUserPending,
    getUserState,
    getUserCvLeft,
    getUserGenerated,
    isUserSubscriptionActive,
    isUserAuthVisible,
    getUserInfo,
    refreshUserData,
    isAbleToCreateCv,
    isAbleToGenerateCv,
    isUserPaid,
    clean,
    setAuthModalVisibility,
    decreaseCvCount,
  }
})
