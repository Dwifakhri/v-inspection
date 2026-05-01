<script setup lang="ts">
import BaseTitle from '../atoms/BaseTitle.vue'
import BreadCrumb from '../molecules/BreadCrumb.vue'
import type { BreadcrumbItem } from '@/types/components/BreadCrumb'

defineProps<{
  title?: string
  breadcrumbs?: BreadcrumbItem[]
}>()
</script>

<template>
  <div class="p-8 bg-gray-200 min-h-svh flex flex-col">
    <BaseTitle v-if="title">
      {{ title }}
    </BaseTitle>
    <BreadCrumb v-if="breadcrumbs" :items="breadcrumbs" />

    <!-- main content -->
    <div class="mt-6 bg-white flex-1">
      <slot />
    </div>
  </div>
</template>
