<script setup lang="ts">
import TitleBase from '../atoms/TitleBase.vue'
import BreadCrumb from '../molecules/BreadCrumb.vue'
import type { BreadcrumbItem } from '@/types/components/BreadCrumb'

defineProps<{
  title?: string
  breadcrumbs?: BreadcrumbItem[]
}>()
</script>

<template>
  <div class="p-8 bg-gray-300 min-h-svh flex flex-col">
    <TitleBase v-if="title">
      {{ title }}
    </TitleBase>
    <BreadCrumb v-if="breadcrumbs" :items="breadcrumbs" />

    <!-- main content -->
    <div class="mt-6 bg-white flex-1">
      <slot />
    </div>
  </div>
</template>
