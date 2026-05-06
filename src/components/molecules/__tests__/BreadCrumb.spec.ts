import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BreadCrumb from '../BreadCrumb.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

describe('BreadCrumb', () => {
  it('should contain the props items', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(BreadCrumb, {
      global: {
        plugins: [router],
      },
      props: {
        items: [
          { label: 'Quality & HSE', path: '#', clickable: false },
          { label: 'Inspection', path: '#', clickable: false },
          { label: 'Inspection Record', path: '/' },
        ],
      },
    })

    expect(wrapper.text()).toContain('Inspection Record')
  })

  describe('BreadCrumb', () => {
    it('should render items', () => {
      const wrapper = mount(BreadCrumb, {
        global: {
          plugins: [router],
        },
        props: {
          items: [
            { label: 'Home', path: '/' },
            { label: 'Detail', path: '/detail' },
          ],
        },
      })

      expect(wrapper.text()).toContain('Home')
      expect(wrapper.text()).toContain('Detail')
    })
  })
})
