<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { useRoute, useRouter } from 'vue-router'
import type { BreadcrumbItem } from '@/types/components/BreadCrumb'

const props = defineProps<{
  items: BreadcrumbItem[]
}>()

const emit = defineEmits<{
  (e: 'click', item: BreadcrumbItem): void
}>()

const route = useRoute()
const router = useRouter()

const isActive = (path: string) => {
  return route.path === path
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

const handleClick = (item: BreadcrumbItem) => {
  if (item.path && !isActive(item.path) && item.clickable) {
    router.push(item.path)
    emit('click', item)
  }
}
</script>

<template>
  <nav class="flex mt-1" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse flex-wrap">
      <li v-for="(item, index) in props.items" :key="item.path" class="inline-flex items-center">
        <div class="flex items-center space-x-1.5">
          <ChevronRight v-if="index !== 0" class="w-4 h-4 text-gray-400" />

          <button
            v-if="item.path && !isActive(item.path)"
            @click="handleClick(item)"
            :class="getClass(item, index)"
          >
            {{ item.label }}
          </button>

          <span v-else class="inline-flex items-center text-sm">
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
