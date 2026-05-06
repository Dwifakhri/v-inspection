import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'


describe('BaseButton', () => {
  it('should render correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Button',
      },
    })
    expect(wrapper.text()).toContain('Button')
  })

  it('should emit click event', () => {
    const wrapper = mount(BaseButton)
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
  it('should apply default variant', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.classes()).toContain('bg-primary')
  })
  it('should show spinner when loading', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.find('span').exists()).toBe(true)
  })
  it('should disable button when disabled', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.element.disabled).toBe(true)
  })
})
