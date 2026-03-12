// api.js
// Global Axios instance for Sanctum SPA session authentication.
//
// How Sanctum SPA auth works:
// 1. GET  /sanctum/csrf-cookie  → Laravel starts a session and sets:
//                                  - XSRF-TOKEN cookie (readable by JS)
//                                  - laravel_session cookie (httpOnly)
// 2. POST /api/login            → Axios sends XSRF-TOKEN as X-XSRF-TOKEN
//                                  header automatically. Laravel authenticates
//                                  and stores the user in the session.
// 3. GET  /api/me               → Browser sends laravel_session cookie.
//                                  Sanctum reads session → resolves user → 200
//
// withCredentials: true is required for the browser to send cookies
// on cross-origin requests from localhost:5173 to localhost:8000.

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';
const ROOT_URL = BASE_URL.replace(/\/api$/, '');

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
  withCredentials: true,
});

// ─── CSRF Initialisation ──────────────────────────────────────────────────────
// Fetches the XSRF-TOKEN cookie from Laravel once per page load.
// Must be called before any POST/PUT/DELETE request.
// Axios reads XSRF-TOKEN automatically and sends it as X-XSRF-TOKEN.

let csrfInitialised = false;

export async function initCsrf() {
  if (csrfInitialised) return;
  await axios.get(`${ROOT_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
  csrfInitialised = true;
}

// ─── Response Interceptor ─────────────────────────────────────────────────────
// IMPORTANT: We do NOT globally redirect on 401 here.
//
// Reason: Many API calls happen on PUBLIC pages (service listings, blogs,
// click tracking etc.) where guests are not authenticated. A 401 on those
// calls is expected and should NOT send the user to the login page.
//
// Auth-protected route redirection is handled entirely by the router guard
// in index.js, which checks meta.requiresAuth before allowing navigation.
// Individual components can handle their own 401s where needed.
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;