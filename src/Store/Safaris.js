import { defineStore } from 'pinia'
import api from '@/services/api'

export const useSafarisStore = defineStore('safaris', {
  state: () => ({
    safaris: [],
    selectedSafari: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchSafaris() {
      this.loading = true
      this.error   = null
      try {
        const res = await api.get('/services', {
          params: { category_id: 4, is_published: 1 },
        })
        const raw = res.data.services ?? res.data ?? []

        this.safaris = raw.map(s => ({
          id:          s.id,
          name:        s.name        ?? '—',
          description: s.description ?? '',
          image:       s.service_image_1
                         ? `http://127.0.0.1:8000/storage/${s.service_image_1}`
                         : '/images/Picture 25 .jpg',
          code:        s.safari_code ?? s.code ?? '',
          website:     s.website_url   ?? '',
        }))
      } catch (err) {
        console.error('Failed to fetch safaris:', err)
        this.error = 'Failed to load safari services.'
      } finally {
        this.loading = false
      }
    },

    selectSafari(safari) {
      this.selectedSafari = safari
    },
  },
})