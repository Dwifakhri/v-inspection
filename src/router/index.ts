import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ListInspection',
      component: () => import('@/views/inspection/ListInspection.vue'),
      meta: {
        title: 'List Inspection',
        layout: DefaultLayout,
      },
    },
    {
      path: '/create-inspection',
      name: 'CreateInspection',
      meta: {
        title: 'Create Inspection',
        layout: DefaultLayout,
      },
      component: () => import('@/views/inspection/CreateInspection.vue'),
    },
    {
      path: '/detail-inspection/:id',
      name: 'DetailInspection',
      meta: {
        title: 'Detail Inspection',
        layout: DefaultLayout,
      },
      component: () => import('@/views/inspection/DetailInspection.vue'),
    },
  ],
})

export default router
