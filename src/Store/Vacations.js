import { defineStore } from 'pinia'
import api from '@/services/api'

export const useVacationsStore = defineStore('vacations', {
  state: () => ({
    vacations: [],
    selectedVacation: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchVacations() {
      this.loading = true
      this.error   = null
      try {
        const res = await api.get('/services', {
          params: { category_id: 1, is_published: 1 },
        })
        const raw = res.data.services ?? res.data ?? []

        this.vacations = raw.map(s => ({
          id:          s.id,
          name:        s.name        ?? '—',
          description: s.description ?? '',
          image:       s.service_image_1
                         ? `http://127.0.0.1:8000/storage/${s.service_image_1}`
                         : '/images/Picture 25 .jpg',
          code:        s.vacation_code ?? s.code ?? '',
          website:     s.website_url   ?? '',
        }))
      } catch (err) {
        console.error('Failed to fetch vacations:', err)
        this.error = 'Failed to load vacation hotels.'
      } finally {
        this.loading = false
      }
    },

    selectVacation(vacation) {
      this.selectedVacation = vacation
    },
  },
})