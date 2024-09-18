# Business Logic Organization in NuxtGain

## Overview

NuxtGain employs a straightforward and effective approach to organizing business logic, centered around a folder called `bl` (BusinessLogic).

## Structure

```
src/
└── bl/
    └── **/*.store.ts
    └── **/*.api.ts
```

## API Endpoints

We utilize Pinia stores to organize API endpoints, offering several advantages:

- Centralized location for all endpoints
- Easy navigation and maintenance
- Leverages `useFetch` composables with [useful returning values](https://nuxt.com/docs/getting-started/data-fetching#return-values) for Nuxt context and reactivity

Files are named with an `.api.ts` suffix:

```typescript
// users.api.ts
export const useUsersApi = defineStore('usersApi', () => {
  const userState = useUsersStore()
  const fetchUsers = async () => {
    const result = await useFetch('/api/users')
    if (result.data.value) {
      userState.setUsers(result.data.value)
    }
    return result
  }
  // Other API calls...
  return { fetchUsers, /* ... */ }
})
```

## State Management

Regular state is managed in separate files with a `.store.ts` suffix:

```typescript
// users.store.ts
export const useUsersStore = defineStore('users', () => {
  const users = ref([])

  const getUsers = computed(() => users.value)

  const setUsers = (newUsers) => {
    users.value = newUsers
  }
  // State and methods...
  return { users, /* ... */ }
})
```

This separation allows for clear organization of data storage and API interactions.

## Benefits

- Scalability: Easily accommodates project growth
- Flexibility: Adaptable to various use cases
- Simplicity: Straightforward implementation and usage

## Alternative Approaches

While our current method serves well, other design patterns like the Repository pattern could be implemented for more complex scenarios. However, I've opted for simplicity and direct use of the Composition API to avoid unnecessary complexity.

---

This organization method has proven effective, providing a balance between structure and ease of use while leveraging the power of Nuxt and Vue's Composition API.
