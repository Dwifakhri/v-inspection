<script setup lang="ts">
type Variant = 'brand' | 'neutral'
type Size = 'sm' | 'md'

const props = defineProps<{
  label: string
  variant?: Variant
  size?: Size
}>()

const VARIANTS: Record<Variant, string> = {
  brand: 'bg-brand-softer border-gray-400',
  neutral: 'bg-gray-200 border-gray-200 text-gray-700',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-12 py-1"
    :class="[VARIANTS[props.variant ?? 'brand']]"
  >
    <slot>
      {{ label }}
    </slot>
  </span>
</template>
