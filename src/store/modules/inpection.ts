import { defineStore } from 'pinia'

export interface InspectionChild {
  item_desc: string
  ownership: string
  lot_no: string
  qty: number
  progress: number
}

export interface Inspection {
  id: string
  req_no: string
  location: string
  scope_of_work: string
  type: string
  date_submitted: string
  ecd: string
  related_to: string
  '3rd_party': number
  status: 'New' | 'In Progress' | 'Ready to Review' | 'Completed' | 'Draft'
  children: InspectionChild[]
}

export type TabKey = 'open' | 'for_review' | 'completed'

const STATUS_MAP: Record<TabKey, Inspection['status'][]> = {
  open: ['New', 'In Progress'],
  for_review: ['Ready to Review'],
  completed: ['Completed'],
}

const mockInspections: Inspection[] = [
  {
    id: '1',
    req_no: 'REQ-0001',
    location: 'Yard A',
    scope_of_work: 'ADNOC Requirements',
    type: 'New Arrival',
    date_submitted: '2025-04-01',
    ecd: '2025-04-15',
    related_to: 'RRIN-2025-0001',
    '3rd_party': 2,
    status: 'New',
    children: [
      { item_desc: 'Casing 13 3/8", 68 PPF, L80', ownership: 'OFFSHORE', lot_no: 'PO-2024-001-A', qty: 5, progress: 0 },
    ],
  },
  {
    id: '2',
    req_no: 'REQ-0002',
    location: 'Yard B',
    scope_of_work: 'Visual Inspection',
    type: 'Maintenance',
    date_submitted: '2025-04-03',
    ecd: '2025-04-20',
    related_to: 'RRIN-2025-0002',
    '3rd_party': 1,
    status: 'In Progress',
    children: [
      { item_desc: 'Tubing 2 7/8", 6.5 PPF, L80', ownership: 'MITME', lot_no: 'PO-2024-002-B', qty: 10, progress: 40 },
      { item_desc: 'Drill Collar 6.5"', ownership: 'OFFSHORE', lot_no: 'PO-2024-003-C', qty: 3, progress: 20 },
    ],
  },
  {
    id: '3',
    req_no: 'REQ-0003',
    location: 'Yard A',
    scope_of_work: 'Full Inspection',
    type: 'On Spot',
    date_submitted: '2025-04-05',
    ecd: '2025-04-18',
    related_to: 'RRIN-2025-0003',
    '3rd_party': 3,
    status: 'Ready to Review',
    children: [
      { item_desc: 'Casing 9 5/8", 47 PPF, P110', ownership: 'MITME', lot_no: 'PO-2024-004-D', qty: 8, progress: 100 },
    ],
  },
  {
    id: '4',
    req_no: 'REQ-0004',
    location: 'Yard C',
    scope_of_work: 'ADNOC Requirements',
    type: 'New Arrival',
    date_submitted: '2025-03-20',
    ecd: '2025-04-01',
    related_to: 'RRIN-2025-0002',
    '3rd_party': 2,
    status: 'Completed',
    children: [
      { item_desc: 'Casing 13 3/8", 68 PPF, L80, JFELION, R3, Coated', ownership: 'OFFSHORE', lot_no: 'PO-2024-00457-A-RR', qty: 2, progress: 100 },
    ],
  },
  {
    id: '5',
    req_no: 'REQ-0005',
    location: 'Yard B',
    scope_of_work: 'Visual Inspection',
    type: 'Maintenance',
    date_submitted: '2025-03-25',
    ecd: '2025-04-05',
    related_to: 'RRIN-2025-0004',
    '3rd_party': 1,
    status: 'Completed',
    children: [
      { item_desc: 'Tubing 3 1/2", 9.3 PPF, N80', ownership: 'MITME', lot_no: 'PO-2024-005-E', qty: 15, progress: 100 },
    ],
  },
]

interface InspectionState {
  list: Inspection[]
  current: Inspection | null
  loading: boolean
  error: string | null
}

export const useInspectionStore = defineStore('inspection', {
  state: (): InspectionState => ({
    list: [],
    current: null,
    loading: false,
    error: null,
  }),

  getters: {
    byTab: (state) => (tab: TabKey): Inspection[] => {
      const statuses = STATUS_MAP[tab]
      return state.list.filter((i) => statuses.includes(i.status))
    },

    countByTab: (state) => (tab: TabKey): number => {
      const statuses = STATUS_MAP[tab]
      return state.list.filter((i) => statuses.includes(i.status)).length
    },
  },

  actions: {
    async fetchInspections() {
      this.loading = true
      this.error = null
      try {
        // Replace with api.get('/inspections') when backend is ready
        await Promise.resolve()
        this.list = mockInspections
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch inspections'
      } finally {
        this.loading = false
      }
    },

    async fetchInspectionById(id: string) {
      this.loading = true
      this.error = null
      try {
        // Replace with api.get(`/inspections/${id}`) when backend is ready
        await Promise.resolve()
        const found = this.list.find((i) => i.id === id) ?? mockInspections.find((i) => i.id === id)
        this.current = found ?? null
        if (!this.current) this.error = 'Inspection not found'
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch inspection'
      } finally {
        this.loading = false
      }
    },

    async createInspection(payload: Omit<Inspection, 'id' | 'status'>) {
      this.loading = true
      this.error = null
      try {
        // Replace with api.post('/inspections', payload) when backend is ready
        await Promise.resolve()
        const newInspection: Inspection = {
          ...payload,
          id: String(Date.now()),
          status: 'New',
        }
        this.list.unshift(newInspection)
        this.current = newInspection
        return newInspection
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Failed to create inspection'
        return null
      } finally {
        this.loading = false
      }
    },
  },
})
