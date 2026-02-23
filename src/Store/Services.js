import { defineStore } from 'pinia'
import api from '@/services/api'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
    selectedService: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchServices() {
      this.loading = true
      this.error   = null
      try {
        const res = await api.get('/services', {
          params: { category_id: 4, is_published: 1 },
        })
        const raw = res.data.services ?? res.data ?? []

        this.services = raw.map(s => ({
          id:          s.id,
          name:        s.name        ?? '—',
          description: s.description ?? '',
          image:       s.service_image_1
                         ? `http://127.0.0.1:8000/storage/${s.service_image_1}`
                         : '/images/Picture 29 .jpg',
          code:        s.service_code ?? s.code ?? '',
          website:     s.website_url  ?? '',
        }))
      } catch (err) {
        console.error('Failed to fetch services:', err)
        this.error = 'Failed to load service apartments.'
      } finally {
        this.loading = false
      }
    },

    selectService(service) {
      this.selectedService = service
    },
  },
})