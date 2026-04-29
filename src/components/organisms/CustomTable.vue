<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { ChevronUp, ChevronDown } from '@lucide/vue'
import ChildTable from './ChildTable.vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

interface Row {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  childrenRow?: Row[]
}

const props = defineProps<{
  columns: Column[]
  childColumns?: Column[]
  rows: Row[]
  withChild?: boolean
}>()

const expandedRows = ref<number[]>([])

const toggleRow = (index: number) => {
  if (expandedRows.value.includes(index)) {
    expandedRows.value = expandedRows.value.filter((i) => i !== index)
  } else {
    expandedRows.value.push(index)
  }
}

const isExpanded = (index: number) => expandedRows.value.includes(index)
</script>

<template>
  <div
    class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-gray-200"
  >
    <table class="w-full text-sm text-left text-body">
      <!-- HEADER -->
      <thead class="text-sm text-white bg-gray-400 border-b border-gray-200">
        <tr>
          <th
            v-for="col in props.columns"
            :key="col.key"
            scope="col"
            class="px-6 py-3 font-medium"
            :style="{ width: col.width }"
          >
            <div class="flex items-center gap-1 w-full" :style="{ width: col.width }">
              {{ col.label }}

              <!-- sort icon -->
              <span v-if="col.sortable" class="flex items-center flex-col">
                <ChevronUp class="ws-3 h-3" />
                <ChevronDown class="w-3 h-3" />
              </span>
            </div>
          </th>
          <th class="w-10"></th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        <template v-for="(row, index) in props.rows" :key="index">
          <!-- MAIN ROW -->
          <tr class="border-b border-gray-400">
            <td v-for="col in props.columns" :key="col.key" scope="row" class="px-6 py-4">
              <slot :name="col.key" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>

            <td v-if="withChild" class="px-4">
              <BaseButton @click="toggleRow(index)" variant="secondary" size="iconOnly">
                <ChevronDown class="w-6 h-6 text-primary" />
              </BaseButton>
            </td>
          </tr>

          <tr
            v-if="isExpanded(index)"
            :class="props.withChild ? 'bg-gray-50' : 'bg-neutral-secondary-soft'"
          >
            <td colspan="100%">
              <ChildTable
                v-if="row.children && props.childColumns"
                :columns="props.childColumns"
                :rows="row.children"
              />

              <!-- fallback -->
              <div v-else class="text-sm text-body">
                <slot name="expand" :row="row" />
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
