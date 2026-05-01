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

const SIZES: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-10 py-1"
    :class="[VARIANTS[props.variant ?? 'brand'], SIZES[props.size ?? 'md']]"
  >
    <slot>
      {{ label }}
    </slot>
  </span>
</template>
