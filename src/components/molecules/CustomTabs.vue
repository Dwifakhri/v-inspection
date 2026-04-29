<script setup lang="ts">
interface TabItem {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  items: TabItem[]
  modelValue: string | number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const isActive = (item: TabItem) => item.value === props.modelValue

const handleClick = (item: TabItem) => {
  if (!item.disabled && !isActive(item)) {
    emit('update:modelValue', item.value)
  }
}
</script>

<template>
  <ul class="flex flex-wrap text-lg text-center text-gray-400 border-b border-gray-200">
    <li v-for="item in props.items" :key="item.value" class="me-2">
      <button
        @click="handleClick(item)"
        :disabled="item.disabled"
        class="inline-block px-4 py-2 cursor-pointer rounded-t-base transition-colors"
        :class="[
          item.disabled
            ? 'text-fg-disabled cursor-not-allowed'
            : isActive(item)
              ? 'text-primary bg-neutral-secondary-soft'
              : 'hover:text-primary hover:bg-neutral-secondary-soft',
        ]"
      >
        {{ item.label }}
      </button>
    </li>
  </ul>
</template>
