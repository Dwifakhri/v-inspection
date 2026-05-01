<script setup lang="ts">
import { ref, computed } from 'vue'
import { Pencil, Plus, Minus, ChevronDown, Trash } from '@lucide/vue'
import InspectionWrapper from '@/components/template/InspectionWrapper.vue'
import CustomDropdown from '@/components/organisms/CustomDropdown.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseLabel from '@/components/atoms/BaseLabel.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseToggle from '@/components/atoms/BaseToggle.vue'
import InputField from '@/components/molecules/InputField.vue'
import { useMasterDataStore } from '@/store/modules/masterData'

const breadcrumbs = [
  { label: 'Operation', path: '#', clickable: false },
  { label: 'Yard Service', path: '#', clickable: false },
  { label: 'Create Yard Service', path: '/create-inspection' },
]

const masterDataStore = useMasterDataStore()

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

const sowWorkOptions = computed(() => masterDataStore.sowWorks)
const itemOptions = computed(() => masterDataStore.itemsRaw)
const customerOptions = computed(() => masterDataStore.customerOptions)

const works = computed(() => {
  if (!scopeOfWork.value) return []
  const selected = masterDataStore.sowWorks.find((w) => w._id === scopeOfWork.value)
  return selected?.fields ?? []
})

const items = ref([
  {
    selected: false,
    item: null,
    qty: '',
    lot: '',
    allocation: '',
    owner: '',
    condition: '',
    availQty: '',
    qtyRequired: '',
    inspection: false,
    inspectionQty: '',
  },
])

const hasSelected = computed(() => items.value.some((r) => r.selected))

const toggleRowSelected = (index: number) => {
  const row = items.value[index]
  if (row) row.selected = !row.selected
}

const addRow = () => {
  items.value.push({
    selected: false,
    item: null,
    qty: '',
    lot: '',
    allocation: '',
    owner: '',
    condition: '',
    availQty: '',
    qtyRequired: '',
    inspection: false,
    inspectionQty: '',
  })
}

const deleteSelected = () => {
  items.value = items.value.filter((r) => !r.selected)
}

const incrementQty = (row: (typeof items.value)[number]) => {
  row.qtyRequired = String(Number(row.qtyRequired || 0) + 1)
}

const decrementQty = (row: (typeof items.value)[number]) => {
  row.qtyRequired = String(Math.max(0, Number(row.qtyRequired || 0) - 1))
}
</script>

<template>
  <InspectionWrapper title="Create Yard Service" :breadcrumbs="breadcrumbs">
    <div class="p-10">
      <div class="flex md:flex-row flex-col gap-10">
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
              :items="sowWorkOptions"
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
            <BaseLabel label="Scope Included" required for="scopeIndcluded" />
            <div
              class="flex flex-wrap gap-2 p-3 border border-gray-500 rounded-base bg-white rounded-sm"
            >
              <BaseBadge
                v-for="field in works"
                :key="field._id"
                :label="field.name"
                :variant="field.selected ? 'brand' : 'neutral'"
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
              :items="[]"
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
              :items="[]"
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
        <div class="w-auto md:w-100">
          <div class="flex justify-between md:flex-row flex-col space-y-5">
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
          <div class="flex flex-wrap mt-4">
            <CustomDropdown
              id="customerName"
              v-model="customerName"
              label="Customer Name"
              placeholder="Select Customer Name"
              :items="customerOptions"
              labelKey="name"
              valueKey="customer"
              required
            />
          </div>
        </div>
      </div>
      <div class="rounded-lg mt-2 space-y-4">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h2 class="text-sm font-semibold">Order Information</h2>

          <div class="flex gap-2">
            <BaseButton
              @click="deleteSelected"
              variant="secondary"
              class="flex gap-1 bg-white border-none hover:bg-transparent"
            >
              <Trash class="w-4 h-4" :class="hasSelected ? 'text-red-400' : 'text-disabled'" />
              <span class="text-sm font-semibold" :class="hasSelected ? 'text-red-400' : 'text-disabled'">Delete</span>
            </BaseButton>
            <BaseButton @click="addRow" variant="secondary" class="flex gap-1 bg-white border-none">
              <Plus class="w-4 h-4 text-primary" />
              <span class="text-sm font-semibold">Add Item</span>
            </BaseButton>
          </div>
        </div>

        <!-- Table Header -->
        <div
          class="grid grid-cols-1 md:grid-cols-12 bg-gray-400 gap-3 py-2 mb-0 text-xs text-white font-medium"
        >
          <div class="md:col-span-6 pl-2 md:pl-10">Item Description</div>
          <div class="md:col-span-6 pl-2 md:pl-10">Qty</div>
        </div>

        <!-- Rows -->
        <div
          v-for="(row, index) in items"
          :key="index"
          class="flex flex-col md:flex-row gap-3 border border-gray-300 p-3"
        >
          <!-- Checkbox -->
          <div class="pt-2">
            <input
              type="checkbox"
              :checked="row.selected"
              @change="toggleRowSelected(index)"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 space-y-3">
            <!-- Top Row -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <CustomDropdown
                :id="`items${index}`"
                v-model="row.item"
                placeholder="Select an item"
                :items="itemOptions"
                labelKey="item_desc"
                valueKey="id_item"
                class="md:col-span-7"
              />

              <InputField
                :id="`qty${index}`"
                placeholder="Enter Qty"
                v-model="row.qty"
                class="md:col-span-4 mt-4"
              />
              <BaseButton
                variant="secondary"
                size="iconOnly"
                class="md:col-span-1 self-end md:self-auto w-10 h-10"
              >
                <ChevronDown class="w-6 h-6 text-primary" />
              </BaseButton>
            </div>

            <!-- Detail Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 text-sm">
              <InputField
                :id="`lot${index}`"
                v-model="row.lot"
                class="md:col-span-2"
                label="Lot Selection"
              />

              <InputField
                :id="`allocation${index}`"
                v-model="row.allocation"
                class="md:col-span-2"
                label="Allocation"
              />

              <InputField
                :id="`owner${index}`"
                v-model="row.owner"
                class="md:col-span-2"
                label="Owner"
              />

              <InputField
                :id="`condition${index}`"
                v-model="row.condition"
                class="md:col-span-1"
                label="Condition"
              />

              <InputField
                :id="`availableQty${index}`"
                v-model="row.availQty"
                class="md:col-span-1"
                label="Avail. Qty"
                disabled
              />

              <InputField
                :id="`qtyRequired${index}`"
                v-model="row.qtyRequired"
                type="number"
                class="md:col-span-1"
                label="Qty Required"
              />

              <!-- Inspection -->
              <div class="flex flex-col md:col-span-2">
                <BaseLabel :for="`inspectionRequired${index}`" label="Inspection Required" />
                <div class="flex gap-2 items-start flex-row">
                  <input
                    :id="`inspectionRequired${index}`"
                    v-model="row.inspection"
                    type="checkbox"
                  />
                  <span class="text-xs md:hidden">Inspection</span>
                  <InputField
                    :id="`inspectionQty${index}`"
                    v-model="row.inspectionQty"
                    class="md:col-span-1"
                  />
                </div>
              </div>

              <!-- Qty Controls -->
              <div class="flex gap-1 md:col-span-1 mt-6 items-center">
                <BaseButton
                  @click="decrementQty(row)"
                  variant="secondary"
                  size="iconOnly"
                  class="w-[32px] h-[32px] bg-gray-200 border-none"
                >
                  <Minus class="w-3 h-3" />
                </BaseButton>
                <BaseButton
                  @click="incrementQty(row)"
                  variant="primary"
                  size="iconOnly"
                  class="w-[32px] h-[32px]"
                >
                  <Plus class="w-3 h-3" />
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Note -->
        <div>
          <h2 class="text-sm font-semibold">Order Information</h2>
          <textarea
            placeholder="Enter Note"
            class="w-full mt-2 border rounded p-2 text-sm"
            rows="4"
          />
        </div>

        <!-- Footer -->
        <div class="flex md:flex-row flex-col justify-end gap-3">
          <button class="text-sm text-gray-500">Cancel</button>
          <BaseButton variant="secondary">Save as Draft</BaseButton>
          <BaseButton variant="primary" class="px-10">Submit</BaseButton>
        </div>
      </div>
    </div>
  </InspectionWrapper>
</template>

<style scoped></style>
