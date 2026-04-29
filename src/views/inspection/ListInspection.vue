<script setup lang="ts">
import { ref } from 'vue'
import { Search, FileDown, Plus } from '@lucide/vue'
import InspectionWrapper from '@/components/template/InspectionWrapper.vue'
import CustomTabs from '@/components/molecules/CustomTabs.vue'
import CustomTable from '@/components/organisms/CustomTable.vue'
import BaseBadge from '@/components/atoms/BaseBadge.vue'
import BaseTooltip from '@/components/atoms/BaseTooltip.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import TableInfo from '@/components/molecules/TableInfo.vue'
import CustomPagination from '@/components/molecules/CustomPagination.vue'

const breadcrumbs = [
  { label: 'Quality & HSE', path: '#', clickable: false },
  { label: 'Inspection', path: '#', clickable: false },
  { label: 'Inspection Record', path: '/' },
]

const tabs = [
  { label: 'Open', value: 'open' },
  { label: 'For Review', value: 'for_review' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending Journal', value: 'pending_journal', disabled: true },
]

const columns = [
  { key: 'req_no', label: 'Request No.', sortable: true, width: '120px' },
  { key: 'location', label: 'Location', sortable: true },
  { key: 'scope_of_work', label: 'Scope of Work', sortable: true, width: '150px' },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'date_submitted', label: 'Date Submitted', sortable: true, width: '140px' },
  { key: 'ecd', label: 'ECD', sortable: true },
  { key: 'related_to', label: 'Related To', sortable: true, width: '120px' },
  { key: '3rd_party', label: '3rd Party', sortable: true, width: '120px' },
  { key: 'status', label: 'Status', sortable: true },
]

const itemsTable = [
  {
    req_no: 'REQ-0001',
    location: 'Location A',
    scope_of_work: 'Scope of Work A',
    type: 'Type A',
    date_submitted: '2023-01-01',
    ecd: 'ECD A',
    related_to: 'Related To A',
    '3rd_party': 3,
    status: 'New',
    children: [
      {
        item_desc: 'Item A',
        ownership: 'Ownership A',
        lot_no: 'Lot No. A',
        qty: 3,
        progress: 50,
      },
    ],
  },
  {
    req_no: 'REQ-0002',
    location: 'Location B',
    scope_of_work: 'Scope of Work B',
    type: 'Type B',
    date_submitted: '2023-01-02',
    ecd: 'ECD B',
    related_to: 'Related To B',
    '3rd_party': 3,
    status: 'Draft',
    children: [
      {
        item_desc: 'Item B',
        ownership: 'Ownership B',
        lot_no: 'Lot No. B',
        qty: 3,
        progress: 0,
      },
    ],
  },
]

const childColumns = [
  { key: 'item_desc', label: 'Item Description', sortable: true },
  { key: 'ownership', label: 'Ownership', sortable: true },
  { key: 'lot_no', label: 'Lot No.', sortable: true },
  { key: 'qty', label: 'Qty', sortable: true },
  { key: 'progress', label: 'Progress', sortable: true },
]

const activeTab = ref('open')
const page = ref(1)
</script>

<template>
  <InspectionWrapper title="Inspection Record" :breadcrumbs="breadcrumbs">
    <!-- HEADER -->
    <div class="flex md:flex-row flex-col justify-between items-end border-b border-gray-200 px-6">
      <CustomTabs :items="tabs" v-model="activeTab" />
      <div class="py-2 flex gap-2">
        <BaseButton variant="secondary" size="iconOnly" class="p-2">
          <Search class="w-4 h-4 text-primary" />
        </BaseButton>
        <BaseButton variant="secondary" class="flex gap-1">
          <FileDown class="w-4 h-4 text-primary" />
          <span class="text-sm font-semibold">Export</span>
        </BaseButton>
      </div>
    </div>

    <!-- TABLE -->
    <div class="px-6 py-4">
      <BaseButton variant="primary" class="ml-auto mb-4 flex gap-1" size="lg">
        <Plus class="w-4 h-4 text-white" />
        <span class="text-xs">Create Request</span>
      </BaseButton>
      <CustomTable
        :columns="columns"
        :rows="itemsTable"
        :child-columns="childColumns"
        with-child
        with-data-pagination
      >
        <template #status="{ row }">
          <BaseBadge :label="row.status" :variant="row.status === 'New' ? 'brand' : 'neutral'" />
        </template>
        <template #scope_of_work="{ row }">
          <BaseTooltip text="Visual Thread, Visual Body, Full Length Drift">
            <button class="bg-brand px-4 py-2 rounded-base">{{ row.scope_of_work }}</button>
          </BaseTooltip>
        </template>
        <template #related_to="{ row }">
          <p class="text-primary">{{ row.related_to }}</p>
        </template>
        <template #3rd_party="{ row }">
          <div
            class="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
          >
            {{ row['3rd_party'] }}
          </div>
        </template>
      </CustomTable>
    </div>

    <!-- PAGINATION & TABLE INFO -->
    <div class="flex justify-between px-6 py-4">
      <TableInfo :total="itemsTable.length" />
      <CustomPagination :current-page="page" :total-pages="1" @update:page="page = $event" />
    </div>
  </InspectionWrapper>
</template>

<style scoped></style>
