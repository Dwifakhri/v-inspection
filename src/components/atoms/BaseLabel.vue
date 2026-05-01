<script setup lang="ts">
const props = defineProps<{
  label?: string
  required?: boolean
  for?: string
  id?: string
}>()
</script>

<template>
  <label
    v-if="props.label"
    :id="props.id"
    :for="props.for"
    class="block mb-1 text-sm text-gray-600"
  >
    <span v-if="props.required" class="text-red-500 ms-1">*</span>
    {{ props.label }}
  </label>
</template>
