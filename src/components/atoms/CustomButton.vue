<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const props = defineProps<{
  variant?: Variant
  size?: Size
  loading?: boolean
  disabled?: boolean
}>()

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-grey-200 text-base hover:bg-grey-300',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

const SIZES = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-3',
}
</script>

<template>
  <button
    :disabled="props.disabled || props.loading"
    class="rounded-md flex items-center justify-center gap-2 transition-colors"
    :class="[VARIANTS[variant ?? 'primary'], SIZES[props.size ?? 'md']]"
  >
    <span
      v-if="props.loading"
      class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
    />

    <slot />
  </button>
</template>
