<template>
  <v-container
    fluid
    class="callback-root d-flex flex-column align-center justify-center"
  >
    <div class="bg-overlay"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="callback-card animate-rise">
      <div class="spinner"></div>
      <p class="callback-text">Signing you in...</p>
      <p class="callback-sub">Please wait while we set up your session</p>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { initCsrf } from '@/services/api';
import api from '@/services/api';

const router    = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  const params        = new URLSearchParams(window.location.search);
  const exchangeToken = params.get('exchange_token');

  try {
    // ── Step 1: Initialise CSRF ──────────────────────────────────────────────
    // Required before any POST request. This also starts a fresh session
    // context on the frontend origin (localhost:5173) so the session cookie
    // set in Step 2 is accepted and stored correctly by the browser.
    await initCsrf();

    if (exchangeToken) {
      // ── Step 2: Exchange the one-time token for a real session ─────────────
      //
      // This POST is a normal Axios request with withCredentials: true.
      // The backend validates the token, logs the user in via the web guard,
      // and the session cookie is set on THIS response — not on a redirect.
      //
      // This is the key fix: session cookies set on Axios responses with
      // withCredentials are handled correctly by the browser, unlike cookies
      // set on cross-origin navigation redirects which get blocked.
      const response = await api.post('/auth/google/exchange', {
        exchange_token: exchangeToken,
      });

      // ── Step 3: Hydrate the store with the returned user data ──────────────
      authStore.login({
        user:      response.data.user,
        abilities: response.data.abilities,
      });

      // ── Step 4: Route based on role ────────────────────────────────────────
      if (response.data.abilities?.admin === true) {
        router.push('/administrator');
      } else {
        router.push('/');
      }

    } else {
      // ── Fallback: no exchange token in URL ─────────────────────────────────
      // Should not normally happen — redirect back to login.
      console.warn('AuthCallback: no exchange_token found in URL.');
      router.push('/login');
    }

  } catch (error) {
    // Token expired (took more than 30s) or was already used — send to login
    console.warn('AuthCallback: session exchange failed.', error.response?.data || error.message);
    router.push('/login');
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

.callback-root {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: #0a0500;
  font-family: 'DM Sans', sans-serif;
}
.bg-overlay {
  position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(135deg, rgba(10,5,0,0.95) 0%, rgba(80,30,0,0.7) 50%, rgba(10,5,0,0.95) 100%);
}
.orb {
  position: absolute; border-radius: 50%; filter: blur(80px);
  z-index: 1; pointer-events: none;
  animation: orb-float 8s ease-in-out infinite alternate;
}
.orb-1 {
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(255,120,30,0.28), transparent 70%);
  top: -100px; left: -120px;
}
.orb-2 {
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(255,200,60,0.18), transparent 70%);
  bottom: -80px; right: -80px; animation-delay: -3s;
}
@keyframes orb-float {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(30px,20px) scale(1.08); }
}
.callback-card {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  padding: 48px 56px; border-radius: 28px;
  background: rgba(255,252,245,0.10);
  border: 1px solid rgba(255,200,120,0.30);
  box-shadow: 0 8px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18);
  backdrop-filter: blur(20px) saturate(1.6);
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
}
.spinner {
  width: 48px; height: 48px;
  border: 3px solid rgba(255,140,40,0.2);
  border-top-color: #FF8C2A; border-radius: 50%;
  animation: spin 0.9s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.callback-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; font-weight: 700; color: #fff; margin: 0;
}
.callback-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem; font-weight: 300;
  color: rgba(255,220,170,0.65); margin: 0;
}
.animate-rise {
  animation: rise-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}
@keyframes rise-in {
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
</style>