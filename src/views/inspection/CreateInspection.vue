<script setup lang="ts">
import { ref } from 'vue'
import { Pencil, Plus } from '@lucide/vue'
import InspectionWrapper from '@/components/template/InspectionWrapper.vue'
import CustomDropdown from '@/components/organisms/CustomDropdown.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseLabel from '@/components/atoms/BaseLabel.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseToggle from '@/components/atoms/BaseToggle.vue'
import InputField from '@/components/molecules/InputField.vue'

const breadcrumbs = [
  { label: 'Operation', path: '#', clickable: false },
  { label: 'Yard Service', path: '#', clickable: false },
  { label: 'Create Yard Service', path: '/create-inspection' },
]

const serviceType = ref(null)
const scopeOfWork = ref(null)
const location = ref(null)
const relatedTo = ref(null)
const isChargeToCustomer = ref(true)
const customerName = ref(null)
const DCCode = ref('')

const serviceTypeOptions = [
  { label: 'New Arrival', value: 'new_arrival' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'On Spot', value: 'on_spot' },
]
const works = [
  { id: '1', name: 'Visual Thread', selected: true },
  { id: '2', name: 'Visual Body', selected: true },
  { id: '3', name: 'Full Length Drift', selected: true },
  { id: '4', name: 'End Drift', selected: false },
]
</script>

<template>
  <InspectionWrapper title="Create Yard Service" :breadcrumbs="breadcrumbs">
    <div class="flex md:flex-row flex-col p-10 gap-10">
      <div class="w-full lg:w-2/3 space-y-5">
        <div class="flex md:flex-row flex-col items-end gap-4">
          <CustomDropdown
            id="serviceType"
            v-model="serviceType"
            label="Service Type"
            placeholder="Select Service Type"
            :items="serviceTypeOptions"
            labelKey="label"
            valueKey="value"
            required
            class="md:max-w-[250px]"
          />
          <CustomDropdown
            id="scopeOfWork"
            v-model="scopeOfWork"
            label="Scope of Work"
            placeholder="Select a Scope of Work Name"
            :items="serviceTypeOptions"
            required
            labelKey="subscope_name"
            valueKey="_id"
            class="md:max-w-[400px]"
          />
          <div class="flex flex-col md:flex-row gap-2 me-auto">
            <BaseButton variant="secondary" size="iconOnly" class="p-3 w-fit border-none mt-auto">
              <Pencil class="w-4 h-4 text-primary" />
            </BaseButton>
            <p class="text-sm font-semibold mt-2 mx-5">Or</p>
            <BaseButton variant="secondary" class="flex gap-1 mt-auto whitespace-nowrap">
              <Plus class="w-4 h-4 text-primary" />
              <span class="text-sm font-semibold flex-1">Create New SOW</span>
            </BaseButton>
          </div>
        </div>
        <div>
          <BaseLabel label="Scope of Work" required for="scopeOfWork" />
          <div
            class="flex flex-wrap gap-2 p-3 border border-gray-500 rounded-base bg-white rounded-sm"
          >
            <BaseBadge
              v-for="item in works"
              :key="item.id"
              :label="item.name"
              variant="neutral"
              size="sm"
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-4">
          <CustomDropdown
            id="location"
            v-model="location"
            label="Location"
            placeholder="Select Location"
            :items="serviceTypeOptions"
            labelKey="label"
            valueKey="value"
            required
            class="md:max-w-[200px]"
          />
          <div>
            <BaseLabel label="Estimated Completion Date" required for="estimatedCompletionDate" />
            <input
              type="date"
              name="estimatedCompletionDate"
              id="estimatedCompletionDate"
              class="datePicker w-full md:w-[300px]"
            />
          </div>

          <CustomDropdown
            id="relatedTo"
            v-model="relatedTo"
            label="Related To"
            placeholder="Select Related To"
            :items="serviceTypeOptions"
            labelKey="label"
            valueKey="value"
            required
            class="md:max-w-[200px]"
          />
        </div>
        <p class="text-sm mt-4">Custom Field Header</p>
        <hr class="border-gray-300 -mt-4" />
        <InputField
          id="DCCode"
          label="D/C Code"
          placeholder="Enter D/C Code"
          v-model="DCCode"
          class="md:max-w-[220px]"
        />
      </div>
      <div class="border-l border-dotted border-gray-500 h-100 hidden md:block"></div>
      <div class="w-100">
        <div class="flex justify-between flex-row space-y-5">
          <div>
            <BaseLabel label="Charge to Customer" required for="chargeToCustomer" />
            <BaseToggle
              v-model="isChargeToCustomer"
              showText
              onLabel="YES"
              offLabel="NO"
              class="ml-2 mt-2"
            />
          </div>
          <div>
            <BaseLabel label="Status" class="font-semibold" for="status" />
            <BaseBadge label="Draft" variant="neutral" size="sm" class="px-2" />
          </div>
        </div>
        <CustomDropdown
          id="customerName"
          v-model="customerName"
          label="Customer Name"
          placeholder="Select Customer Name"
          :items="serviceTypeOptions"
          labelKey="label"
          valueKey="value"
          required
        />
      </div>
    </div>
  </InspectionWrapper>
</template>

<style scoped></style>
