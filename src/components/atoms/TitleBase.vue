<script setup lang="ts">
const props = defineProps<{
  text?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  variant?: 'default' | 'primary' | 'subtle'
}>()

const tag = props.as ?? 'h2'

const baseClass = 'font-semibold tracking-tight'

const variantClass = {
  default: 'text-body',
  primary: 'text-primary',
  subtle: 'text-body-subtle',
}

const sizeClass = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-lg',
  h5: 'text-base',
  h6: 'text-sm',
  p: 'text-base',
  span: 'text-sm',
}
</script>

<template>
  <component :is="tag" :class="[baseClass, sizeClass[tag], variantClass[variant ?? 'default']]">
    <slot>{{ text }}</slot>
  </component>
</template>
