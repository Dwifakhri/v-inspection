<script setup lang="ts">
import CustomButton from '@/components/atoms/CustomButton.vue'
import InputField from '@/components/molecules/InputField.vue'
import BreadCrumb from '@/components/molecules/BreadCrumb.vue'
import { Plus } from '@lucide/vue'
import TitleBase from '@/components/atoms/TitleBase.vue'
import { ref } from 'vue'
import CustomTabs from '@/components/molecules/CustomTabs.vue'
import CustomTable from '@/components/organisms/CustomTable.vue'

const items = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Flowbite', path: '/projects/flowbite' },
]

const handleClick = (item: any) => {
  console.log('Clicked:', item)
}

const name = ref('')
const activeTab = ref('profile')

const itemss = [
  { label: 'Profile', value: 'profile' },
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Settings', value: 'settings' },
  { label: 'Contacts', value: 'contacts' },
  { label: 'Disabled', value: 'disabled', disabled: true },
]

const columns = [
  { key: 'name', label: 'Product name' },
  { key: 'color', label: 'Color', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
]

const rows = [
  {
    name: 'MacBook Pro 17"',
    color: 'Silver',
    category: 'Laptop',
    price: '$2999',
    description: 'High performance laptop',
  },
  {
    name: 'Surface Pro',
    color: 'White',
    category: 'Laptop PC',
    price: '$1999',
    description: 'Microsoft hybrid device',
  },
]
</script>

<template>
  <div>
    List Inspection'
    <CustomButton>
      <Plus />
      <slot />
    </CustomButton>
    <InputField id="name" label="Name" v-model="name" placeholder="Enter your name" />
    <BreadCrumb :items="items" @click="handleClick" />
    <TitleBase text="Dashboard" />
    <CustomTabs v-model="activeTab" :items="itemss" />
    <CustomTable :columns="columns" :rows="rows">
      <template #expand="{ row }">
        <div><strong>Details:</strong> {{ row.description }}</div>
      </template>
    </CustomTable>
  </div>
</template>

<style scoped></style>
