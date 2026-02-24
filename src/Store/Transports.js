import { defineStore } from 'pinia'
import api from '@/services/api'

export const useTransportsStore = defineStore('transports', {
  state: () => ({
    transports: [],
    selectedTransport: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTransports() {
      this.loading = true
      this.error   = null
      try {
        const res = await api.get('/services', {
          params: { category_id: 5, is_published: 1 },
        })
        const raw = res.data.services ?? res.data ?? []

        this.transports = raw.map(s => ({
          id:          s.id,
          name:        s.name        ?? '—',
          description: s.description ?? '',
          image:       s.service_image_1
                         ? `http://127.0.0.1:8000/storage/${s.service_image_1}`
                         : '/images/Picture 30 .jpg',
          code:        s.transport_code ?? s.code ?? '',
          website:     s.website_url    ?? '',
        }))
      } catch (err) {
        console.error('Failed to fetch transports:', err)
        this.error = 'Failed to load transport services.'
      } finally {
        this.loading = false
      }
    },

    selectTransport(transport) {
      this.selectedTransport = transport
    },
  },
})