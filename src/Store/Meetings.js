import { defineStore } from 'pinia'
import api from '@/services/api'

export const useMeetingsStore = defineStore('meetings', {
  state: () => ({
    meetings: [],
    selectedMeeting: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMeetings() {
      this.loading = true
      this.error   = null
      try {
        const res = await api.get('/services', {
          params: { category_id: 3, is_published: 1 },
        })
        const raw = res.data.services ?? res.data ?? []

        this.meetings = raw.map(s => ({
          id:          s.id,
          name:        s.name        ?? '—',
          description: s.description ?? '',
          image:       s.service_image_1
                         ? `http://127.0.0.1:8000/storage/${s.service_image_1}`
                         : '/images/Picture 28 .jpg',
          code:        s.meeting_code ?? s.code ?? '',
          website:     s.website_url  ?? '',
        }))
      } catch (err) {
        console.error('Failed to fetch meetings:', err)
        this.error = 'Failed to load meeting rooms.'
      } finally {
        this.loading = false
      }
    },

    selectMeeting(meeting) {
      this.selectedMeeting = meeting
    },
  },
})