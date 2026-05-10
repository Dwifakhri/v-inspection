/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/axios'
import { useMasterDataStore } from '../masterData'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/services/axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('useMasterDataStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should have initial state', () => {
    const store = useMasterDataStore()
    expect(store.data).toBe(null)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('should fetch master data successfully', async () => {
    const mockResponse = {
      sow: [{ works: [{ _id: '1', subscope: 'A', subscope_name: 'Test', fields: [] }] }],
      items_raw: [],
      customer: { customer: '1', customer_ref: 'ref', name: 'John' },
    }

    ;(api.get as any).mockResolvedValue({ data: mockResponse })

    const store = useMasterDataStore()
    await store.fetchMasterData()

    expect(store.loading).toBe(false)
    expect(store.data).toEqual(mockResponse)
    expect(store.error).toBeNull()
  })

  it('should handle error when fetching master data', async () => {
    const error = new Error('Failed to fetch master data')
    ;(api.get as any).mockRejectedValue(error)

    const store = useMasterDataStore()
    await store.fetchMasterData()

    expect(store.loading).toBe(false)
    expect(store.error).toBe('Failed to fetch master data')
  })
})
