<script setup lang="ts">
import type { TabItem } from '@/types/components/CustomTabs'

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
  <ul class="flex flex-wrap text-md text-center text-gray-400">
    <li v-for="item in props.items" :key="item.value" class="me-10">
      <div
        @click="handleClick(item)"
        :disabled="item.disabled"
        class="inline-block pt-2 pb-1 cursor-pointer rounded-t-base transition-colors"
        :class="[
          item.disabled
            ? 'text-fg-disabled cursor-not-allowed'
            : isActive(item)
              ? 'text-primary bg-neutral-secondary-soft underline underline-offset-7 decoration-4'
              : 'hover:text-primary hover:bg-neutral-secondary-soft',
        ]"
      >
        {{ item.label }}
      </div>
    </li>
  </ul>
</template>
