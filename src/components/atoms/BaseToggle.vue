<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const toggle = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
}
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <!-- input -->
    <input type="checkbox" class="sr-only peer" :checked="props.modelValue" @change="toggle" />

    <!-- switch -->
    <div
      class="relative w-12 h-6 rounded-full transition-colors"
      :class="props.modelValue ? 'bg-primary' : 'bg-gray-500'"
    >
      <!-- text -->
      <span
        class="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-semibold pointer-events-none"
      >
        <span :class="props.modelValue ? 'text-white' : 'text-transparent'">ON</span>
        <span :class="!props.modelValue ? 'text-gray-600' : 'text-transparent'">OFF</span>
      </span>

      <!-- knob -->
      <span
        class="absolute top-[2px] left-[2px] h-5 w-5 bg-white rounded-full transition-all"
        :class="props.modelValue ? 'translate-x-6' : 'translate-x-0'"
      ></span>
    </div>
  </label>
</template>
