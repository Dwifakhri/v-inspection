import { defineStore } from 'pinia'
import api from '@/services/axios'

export interface SowField {
  _id: string
  name: string
  type: string
  selected: boolean
  value: string
  editableDescription: boolean
  requiredDescription: boolean
  drift_inspection: boolean
}

export interface SowWork {
  _id: string
  subscope: string
  subscope_name: string
  fields: SowField[]
}

export interface ItemRaw {
  id_item: string
  item_code: string
  item_desc: string
  batch: string
  condition: string
  owned: string
  locked: string
  allocation: string
  owned_name: string
  locked_name: string
  qty: number
}

export interface Customer {
  customer: string
  customer_ref: string
  name: string
}

interface MasterData {
  sow: Array<{ works: SowWork[] }>
  items_raw: ItemRaw[]
  customer: Customer | null
  [key: string]: unknown
}

interface MasterDataState {
  data: MasterData | null
  loading: boolean
  error: string | null
}

export const useMasterDataStore = defineStore('masterData', {
  state: (): MasterDataState => ({
    data: null,
    loading: false,
    error: null,
  }),

  getters: {
    sowWorks: (state): SowWork[] => state.data?.sow?.[0]?.works ?? [],
    itemsRaw: (state): ItemRaw[] => state.data?.items_raw ?? [],
    customerOptions: (state): Customer[] => {
      const customer = state.data?.customer
      return customer ? [customer] : []
    },
  },

  actions: {
    async fetchMasterData() {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get<MasterData>('/mock/dataTest.json')
        this.data = data
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch master data'
      } finally {
        this.loading = false
      }
    },
  },
})
