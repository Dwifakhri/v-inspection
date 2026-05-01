<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  text: string
}>()

const show = ref(false)

const onEnter = () => (show.value = true)
const onLeave = () => (show.value = false)
</script>

<template>
  <div class="relative inline-block" @mouseenter="onEnter" @mouseleave="onLeave">
    <!-- trigger -->
    <div>
      <slot />
    </div>

    <!-- tooltip -->
    <transition name="fade">
      <div
        v-if="show"
        class="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-500 rounded-base shadow-xs whitespace-nowrap"
      >
        {{ props.text }}

        <!-- arrow -->
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-gray-500 rotate-45"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
