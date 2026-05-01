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
      :id="props.id"
      :for="props.id"
      class="block mb-1 text-sm text-gray-600"
    >
      <span v-if="props.required" class="text-red-500 ms-1">*</span>
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
      class="block w-full border border-gray-500 rounded-sm bg-gray-50 px-3 py-2 text-base text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm"
    />
  </div>
</template>
