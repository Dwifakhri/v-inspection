<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { useRoute } from 'vue-router'
import type { BreadcrumbItem } from '@/types/components/BreadCrumb'

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const route = useRoute()

const isActive = (path?: string) => {
  return path && route.path === path
}

const getClass = (item: BreadcrumbItem, index: number) => {
  if (item.path && isActive(item.path)) {
    return 'text-sm font-semibold hover:text-primary'
  }

  if (index === 0) {
    return 'text-sm text-gray-400 hover:text-primary'
  }
  return 'text-sm text-body hover:text-primary'
}
</script>

<template>
  <nav class="flex mt-1" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
      <li
        v-for="(item, index) in props.items"
        :key="item.path || index"
        class="inline-flex items-center"
      >
        <div class="flex items-center space-x-1.5">
          <!-- Separator -->
          <ChevronRight v-if="index !== 0" class="w-4 h-4 text-gray-400" />

          <router-link
            v-if="item.path && !isActive(item.path)"
            :to="item.path"
            :class="getClass(item, index)"
          >
            {{ item.label }}
          </router-link>

          <!-- Active -->
          <span v-else class="text-sm font-semibold text-primary">
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
