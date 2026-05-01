<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InspectionWrapper from '@/components/template/InspectionWrapper.vue'

const route = useRoute()

const breadcrumbs = computed(() => [
  { label: 'Quality & HSE', path: '#', clickable: false },
  { label: 'Inspection', path: '/', clickable: true },
  { label: `${route.meta.title} - ${route.params.id}`, path: '#', clickable: false },
])
</script>
<template>
  <InspectionWrapper :title="String(route.meta.title ?? 'Detail')" :breadcrumbs="breadcrumbs" />
</template>

<style scoped></style>
