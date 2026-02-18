import api from '@/services/api'; // use the configured api instance, not raw axios

export default {
  // CSRF cookie no longer needed — Bearer token handles auth
  getCsrfCookie() {
    return Promise.resolve(); // keep method so component doesn't break
  },

  // Track a click — now sends Bearer token automatically
  trackClick(serviceId) {
    return api.post('/track-click', { service_id: serviceId });
  },

  // Fetch analytics — now sends Bearer token automatically
  getAnalytics() {
    return api.get('/click-analytics');
  }
};