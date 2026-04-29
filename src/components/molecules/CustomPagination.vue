<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const goTo = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  emit('update:page', page)
}
</script>

<template>
  <nav>
    <ul class="flex -space-x-px text-sm">
      <!-- prev -->
      <li>
        <button
          @click="goTo(currentPage - 1)"
          class="w-9 h-9 flex items-center justify-center border border-gray-500"
        >
          ‹
        </button>
      </li>

      <!-- pages -->
      <li v-for="p in totalPages" :key="p">
        <button
          @click="goTo(p)"
          :class="[
            'w-9 h-9 border border-gray-500 flex items-center justify-center',
            p === currentPage ? 'bg-gray-300 font-semibold' : '',
          ]"
        >
          {{ p }}
        </button>
      </li>

      <!-- next -->
      <li>
        <button
          @click="goTo(currentPage + 1)"
          class="w-9 h-9 flex items-center justify-center border border-gray-500"
        >
          ›
        </button>
      </li>
    </ul>
  </nav>
</template>
