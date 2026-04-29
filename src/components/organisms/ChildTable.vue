<script setup lang="ts">
interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Row {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

defineProps<{
  columns: Column[]
  rows: Row[]
}>()
</script>

<template>
  <div class="border border-gray-200">
    <table class="w-full text-sm text-left">
      <thead class="bg-gray-200 text-gray-600 text-sm">
        <tr>
          <th v-for="col in columns" :key="col.key" class="p-4 text-sm font-semibold">
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, i) in rows" :key="i" class="border-b bg-white">
          <td v-for="col in columns" :key="col.key" class="p-4">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
