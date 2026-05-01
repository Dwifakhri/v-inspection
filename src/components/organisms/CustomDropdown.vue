<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { activeDropdownId } from '@/composables/useDropdown'

const props = defineProps<{
  id: string
  label?: string
  placeholder?: string
  items: any[]
  labelKey?: string
  valueKey?: string
  required?: boolean
  modelValue?: string | null
}>()

const emit = defineEmits(['update:modelValue'])

const buttonId = `${props.id}-button`
const menuId = `${props.id}-menu`
const labelId = `${props.id}-label`

// Global open state (ONLY ONE OPEN)
const isOpen = computed({
  get: () => activeDropdownId.value === props.id,
  set: (val) => {
    activeDropdownId.value = val ? props.id : null
  },
})

// helpers
const getLabel = (item: any) => {
  return props.labelKey ? item[props.labelKey] : item.label
}

const getValue = (item: any) => {
  return props.valueKey ? item[props.valueKey] : item.value
}

// selected item
const selectedItem = computed(() => {
  return props.items.find((i) => getValue(i) === props.modelValue) || null
})

// actions
const toggle = (e: MouseEvent) => {
  e.stopPropagation()
  isOpen.value = !isOpen.value
}

const selectItem = (item: any) => {
  emit('update:modelValue', getValue(item))
  activeDropdownId.value = null
}

// outside click
const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
  if (!dropdownRef.value?.contains(e.target as Node)) {
    activeDropdownId.value = null
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    activeDropdownId.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div class="inline-block w-full">
    <!-- Label -->
    <label v-if="label" :id="labelId" :for="buttonId" class="block mb-1 text-sm text-gray-600">
      <span v-if="required" class="text-red-500 ms-1">*</span>
      {{ label }}
    </label>

    <div ref="dropdownRef" class="relative">
      <!-- Button -->
      <button
        :id="buttonId"
        @click="toggle"
        type="button"
        class="inline-flex items-center justify-between w-full bg-gray-100 border border-gray-500 rounded-sm hover:bg-gray-200 focus:ring-1 focus:ring-gray-400 text-sm px-4 py-2"
        :aria-expanded="isOpen"
        :aria-labelledby="label ? labelId : undefined"
        :aria-required="required"
      >
        <span class="text-gray-600">
          {{ selectedItem ? getLabel(selectedItem) : placeholder || 'Select option' }}
        </span>

        <ChevronDown class="w-4 h-4" />
      </button>

      <!-- Menu -->
      <div
        v-show="isOpen"
        :id="menuId"
        class="absolute mt-2 z-10 w-full bg-white border border-gray-600 rounded shadow-lg"
      >
        <ul class="p-2 text-sm text-gray-600">
          <li v-for="item in items" :key="getValue(item)">
            <button
              @click="selectItem(item)"
              class="w-full text-left p-2 rounded hover:bg-gray-100"
            >
              {{ getLabel(item) }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
