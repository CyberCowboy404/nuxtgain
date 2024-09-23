<script setup lang='ts'>
const props = defineProps<{
  faqs: { q: string, a: string }[]
  ui?: {
    title: string
    icon: string
  }
}>()

const selectedFaq = ref(-1)
function toggleFaq(index: number) {
  selectedFaq.value = index === selectedFaq.value ? -1 : index
}
</script>

<template>
  <div>
    <div
      v-for="(item, index) in faqs"
      :key="index"
      class="space-y-3 mt-5 overflow-hidden border-b"
      @click="toggleFaq(index)"
    >
      <h4 :class="`cursor-pointer pb-5 flex items-center justify-between text-lg font-medium ${ui?.title}`">
        {{ item.q }}
        <Icon v-if="selectedFaq === index" name="mdi:minus" :class="`size-[22px] ml-2 ${ui?.icon}`" />
        <Icon v-else name="mdi:plus" :class="`size-[22px] ml-2 ${ui?.icon}`" />
      </h4>
      <div v-show="selectedFaq === index">
        <div>
          <p class=" pb-4">
            {{ item.a }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>
