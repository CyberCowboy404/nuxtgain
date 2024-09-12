export function captureEventData(eventName: string, properties: Record<string, any>) {
  if (import.meta.env.MODE === 'development')
    return

  const { $posthog } = useNuxtApp()

  if (eventName) {
    // posthog
    $posthog()?.capture(eventName, properties)
    // ga4
    useTrackEvent(eventName)
  }
}

export function capturePSEventData(eventName: string, properties: Record<string, any>) {
  if (import.meta.env.MODE === 'development')
    return

  const { $posthog } = useNuxtApp()

  if (eventName) {
    // posthog
    $posthog()?.capture(eventName, properties)
  }
}
