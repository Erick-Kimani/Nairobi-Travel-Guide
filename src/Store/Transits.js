import { defineStore } from 'pinia'
import api from '@/services/api'

export const useTransitsStore = defineStore('transits', {
  state: () => ({
    transits: [],
    selectedTransit: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTransits() {
      this.loading = true
      this.error   = null
      try {
        // Fetch published services for Transit Hotels (category_id = 2)
        const res = await api.get('/services', {
          params: { category_id: 2, is_published: 1 },
        })
        const raw = res.data.services ?? res.data ?? []

        // Normalise DB fields to match what the transit page template expects
        this.transits = raw.map(s => ({
          id:          s.id,
          name:        s.name        ?? '—',
          description: s.description ?? '',
          image:       s.service_image_1
                         ? `http://127.0.0.1:8000/storage/${s.service_image_1}`
                         : '/images/Picture 8 .jpg',
          code:        s.transit_code ?? s.code ?? '',
          website:     s.website_url  ?? '',
        }))
      } catch (err) {
        console.error('Failed to fetch transits:', err)
        this.error = 'Failed to load transit hotels.'
      } finally {
        this.loading = false
      }
    },

    selectTransit(transit) {
      this.selectedTransit = transit
    },
  },
})