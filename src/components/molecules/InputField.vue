<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  label: String,
  modelValue: { type: String, required: true },
  placeholder: String,
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mb-4">
    <!-- Label -->
    <label
      v-if="props.label"
      :for="props.id"
      class="flex items-center text-sm text-gray-500 font-medium mb-2"
    >
      {{ props.label }}
    </label>

    <!-- Input -->
    <input
      :id="props.id"
      :name="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="handleInput"
      :required="props.required"
      :disabled="props.disabled"
      class="block w-full border border-gray-300 rounded-sm bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200 sm:text-sm"
    />
  </div>
</template>
