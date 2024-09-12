export default async function () {
  const client = useSupabaseClient()
  const { $posthog } = useNuxtApp()

  const { data: { user }, error } = await client.auth.getUser()

  if (error) {
    return
  }

  if (user) {
    $posthog?.()?.identify(user.id, {
      email: user.email,
    })
  }
}
