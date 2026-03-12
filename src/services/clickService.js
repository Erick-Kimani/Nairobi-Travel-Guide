import api from '@/services/api';

// ─── Guest Token Helpers ───────────────────────────────────────────────────────

/**
 * Returns a persistent guest token from localStorage.
 * Creates one on first call and reuses it for the lifetime of the browser session.
 * Once the user registers/logs in, their real identity takes over on the backend —
 * but the token stays in localStorage so historical guest clicks remain linkable.
 */
function getOrCreateGuestToken() {
    const KEY = 'guestToken';
    let token = localStorage.getItem(KEY);
    if (!token) {
        const uuid = crypto.randomUUID?.()
            ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
        token = 'guest_' + uuid;
        localStorage.setItem(KEY, token);
    }
    return token;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export default {
    // CSRF cookie no longer needed — Bearer token handles auth
    getCsrfCookie() {
        return Promise.resolve();
    },

    /**
     * Track a website link click.
     * Works for both registered users and guests.
     *
     * - If the user is logged in, the api instance already attaches their
     *   Bearer token; the backend records them as a registered user.
     * - If the user is a guest, no Bearer token is present, but the
     *   X-Guest-Token header lets the backend assign the click to a
     *   consistent guest identity across multiple page views.
     */
    trackClick(serviceId) {
        const guestToken = getOrCreateGuestToken();

        return api.post(
            '/track-click',
            { service_id: serviceId },
            {
                headers: {
                    'X-Guest-Token': guestToken,
                },
            }
        );
    },

    // Fetch analytics — sends Bearer token automatically (auth-protected route)
    getAnalytics() {
        return api.get('/click-analytics');
    },

    // Summary stats — registered vs guest click breakdown
    getSummary() {
        return api.get('/click-summary');
    },
};