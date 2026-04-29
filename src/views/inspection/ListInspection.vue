<script setup lang="ts">
import CustomButton from '@/components/atoms/CustomButton.vue'
import CustomInput from '@/components/atoms/CustomInput.vue'
import { Plus } from '@lucide/vue'
</script>

<template>
  <div>
    List Inspection
    <CustomButton id="btnf" text="sd" :icon="Plus" />
    <CustomButton id="btnfd" :icon="Plus" icon-only disabled icon-size="w-6 w-6" />
    <CustomInput id="input" value="sdsd" type="text" disabled />
    <CustomInput id="input" value="sdsd" type="text" />
  </div>
</template>

<style scoped></style>
