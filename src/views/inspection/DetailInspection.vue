<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InspectionWrapper from '@/components/template/InspectionWrapper.vue'

const route = useRoute()

const breadcrumbs = computed(() => [
  { label: 'Quality & HSE', path: '#' },
  { label: 'Inspection', path: '/' },
  {
    label: `${route.meta.title} - ${route.params.id}`,
    path: `/detail-inspection/${route.params.id}`,
  },
])
</script>
<template>
  <InspectionWrapper :title="String(route.meta.title ?? 'Detail')" :breadcrumbs="breadcrumbs" />
</template>

<style scoped></style>
