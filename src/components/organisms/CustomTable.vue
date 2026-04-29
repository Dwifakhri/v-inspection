<script setup lang="ts">
import { ref } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Row {
  [key: string]: any
}

const props = defineProps<{
  columns: Column[]
  rows: Row[]
}>()

const expandedRow = ref<number | null>(null)

const toggleRow = (index: number) => {
  expandedRow.value = expandedRow.value === index ? null : index
}
</script>

<template>
  <div
    class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default"
  >
    <table class="w-full text-sm text-left text-body">
      <!-- HEADER -->
      <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
        <tr>
          <th class="w-10"></th>

          <th v-for="col in props.columns" :key="col.key" class="px-6 py-3 font-medium">
            <div class="flex items-center gap-1">
              {{ col.label }}

              <!-- sort icon -->
              <span v-if="col.sortable">
                <svg class="w-4 h-4">
                  <path
                    d="M8 15l4 4 4-4M8 9l4-4 4 4"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        <template v-for="(row, index) in props.rows" :key="index">
          <!-- MAIN ROW -->
          <tr class="border-b border-default">
            <td class="px-4">
              <button @click="toggleRow(index)">▶</button>
            </td>

            <td v-for="col in props.columns" :key="col.key" class="px-6 py-4">
              {{ row[col.key] }}
            </td>
          </tr>

          <!-- EXPANDED ROW -->
          <tr v-if="expandedRow === index" class="bg-neutral-secondary-soft">
            <td colspan="100%" class="px-6 py-4 text-sm text-body">
              <!-- slot for custom content -->
              <slot name="expand" :row="row" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
