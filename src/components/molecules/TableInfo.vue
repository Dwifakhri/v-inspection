<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <div class="mt-4">
    <span class="text-sm text-gray-600">
      Showing
      <span class="font-semibold text-heading">{{ total }}</span>
      Entries
    </span>
  </div>
</template>
