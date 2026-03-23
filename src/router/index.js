// router/index.js
// Navigation guard logic:
//
// - Public pages (requiresAuth: false) are ALWAYS accessible — guests and
//   logged-in users alike. No /me call is made for these routes.
//
// - Protected pages (requiresAuth: true) trigger a /me check on first visit.
//   If the session is invalid the user is redirected to /login.
//
// - Guest-only pages (guestOnly: true) redirect logged-in users away.
//
// - The /me check only ever runs ONCE per page load (sessionChecked flag).
//   Subsequent navigations reuse the cached result.

import { createRouter, createWebHistory } from 'vue-router';

// Views
import Home                from '@/views/Home.vue';
import Explore             from '@/views/Explore.vue';
import Login               from '@/views/Login.vue';
import Signup              from '@/views/Signup.vue';
import ContactUs           from '@/views/ContactUs.vue';
import ClickAnalytics      from '@/views/ClickAnalytics.vue';
import Transit             from '@/views/Transit.vue';
import TransitDetails      from '@/views/TransitDetails.vue';
import Administrator       from '@/views/Administrator.vue';
import Choice              from '@/views/Choice.vue';
import Safari              from '@/views/Safari.vue';
import SafariDetails       from '@/views/SafariDetails.vue';
import Airport             from '@/views/Airport.vue';
import AirportDetails      from '@/views/AirportDetails.vue';
import Vacation            from '@/views/Vacation.vue';
import VacationDetails     from '@/views/VacationDetails.vue';
import SpecialRegistration from '@/views/SpecialRegistration.vue';
import AuthCallback        from '@/views/AuthCallback.vue';
import Blog                from '@/components/Blog.vue';
import FAQ                 from '@/views/FAQ.vue';

import AuthService  from '@/services/authService';
import TokenService from '@/services/TokenService';
import { useAuthStore } from '@/stores/auth';

const routes = [

  /* ── Guest-only (redirect away if already logged in) ── */
  { path: '/login',   name: 'login',   component: Login,   meta: { guestOnly: true, hideLayout: false } },
  { path: '/signup',  name: 'signup',  component: Signup,  meta: { guestOnly: true, hideLayout: false } },

  /* ── OAuth callback — always public, never blocked ── */
  { path: '/auth/callback', name: 'auth-callback', component: AuthCallback, meta: { hideLayout: true } },

  /* ══════════════════════════════════════════════════════
     PUBLIC PAGES — requiresAuth: false
     Accessible by ALL users including guests.
     No session check is performed for these routes.
     Click tracking, browsing, and guest features all work here.
  ══════════════════════════════════════════════════════ */
  { path: '/',                name: 'home',              component: Home,                 meta: { requiresAuth: false } },
  { path: '/blog',            name: 'blog',              component: Blog,                 meta: { requiresAuth: false } },
  { path: '/choice',          name: 'choice',            component: Choice,               meta: { requiresAuth: false } },
  { path: '/contactus',       name: 'contactus',         component: ContactUs,            meta: { requiresAuth: false } },
  { path: '/explore',         name: 'explore',           component: Explore,              meta: { requiresAuth: false } },
  { path: '/vacation',        name: 'vacation',          component: Vacation,             meta: { requiresAuth: false } },
  { path: '/vacationdetails', name: 'vacationdetails',   component: VacationDetails,      meta: { requiresAuth: false } },
  { path: '/transit',         name: 'transit',           component: Transit,              meta: { requiresAuth: false } },
  { path: '/transitdetails',  name: 'transitdetails',    component: TransitDetails,       meta: { requiresAuth: false } },
  { path: '/safari',          name: 'safari',            component: Safari,               meta: { requiresAuth: false } },
  { path: '/safaridetails',   name: 'safaridetails',     component: SafariDetails,        meta: { requiresAuth: false } },
  { path: '/airport',         name: 'airport',           component: Airport,              meta: { requiresAuth: false } },
  { path: '/airportdetails',  name: 'airportdetails',    component: AirportDetails,       meta: { requiresAuth: false } },
  { path: '/faq',             name: 'faq',               component: FAQ,                  meta: { requiresAuth: false } },

  /* ══════════════════════════════════════════════════════
     PROTECTED PAGES — requiresAuth: true
     Only /administrator and /clickanalytics require auth.
     Both also have role/ability checks.
  ══════════════════════════════════════════════════════ */
  {
    path: '/administrator',
    name: 'administrator',
    component: Administrator,
    meta: { requiresAuth: true, ability: 'admin' },
  },
  {
    path: '/clickanalytics',
    name: 'clickanalytics',
    component: ClickAnalytics,
    meta: { requiresAuth: true, ability: ['admin', 'manager'] },
  },
 {
  path: '/specialregistration',
  name: 'specialregistration',
  component: SpecialRegistration,
  meta: { requiresAuth: false },
},

  /* ── Fallback ── */
  { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/* ══════════════════════════════════════════════════════════
   GLOBAL AUTH GUARD
   
   Key design principles:
   1. Public routes (requiresAuth: false) ALWAYS proceed — no /me call,
      no session check, no redirect. Guests browse freely.
   2. /me is only called when navigating to a requiresAuth: true route.
   3. /me is called at most ONCE per page load (sessionChecked flag).
   4. Guest-only routes redirect away only if we already know the session
      is valid — no extra /me call just to check.
══════════════════════════════════════════════════════════ */

let sessionChecked = false;
let sessionValid   = false;

router.beforeEach(async (to, from, next) => {

  // ── 1. OAuth callback — always let through immediately ────────────────────
  if (to.name === 'auth-callback') {
    return next();
  }

  // ── 2. Public routes — let ALL users through with zero checks ─────────────
  //    Guests, logged-in users, admins — everyone can access these.
  //    No /me call, no session verification, no redirect.
  if (!to.meta.requiresAuth && !to.meta.guestOnly) {
    return next();
  }

  // ── 3. Guest-only routes (login/signup) ───────────────────────────────────
  //    Only redirect away if we already know the session is valid.
  //    Do NOT call /me here — that would loop on login page for guests.
  if (to.meta.guestOnly) {
    if (sessionValid) {
      const abilities = TokenService.getAbilities();
      return next(abilities?.admin === true ? '/administrator' : '/');
    }
    return next();
  }

  // ── 4. Protected routes — verify session ONCE per page load ───────────────
  //    Only reaches here if to.meta.requiresAuth === true.
  if (!sessionChecked) {
    const sessionData = await AuthService.verifySession();

    if (sessionData) {
      const authStore = useAuthStore();
      authStore.setSessionFromServer(sessionData);
      sessionValid = true;
    } else {
      TokenService.clearSession();
      localStorage.removeItem('isUserLoggedIn');
      sessionValid = false;
    }

    sessionChecked = true;
  }

  // ── 5. Block unauthenticated access to protected routes ───────────────────
  if (to.meta.requiresAuth && !sessionValid) {
    return next('/login');
  }

  // ── 6. Ability / role check ───────────────────────────────────────────────
  if (to.meta.ability) {
    if (!AuthService.hasAbility(to.meta.ability)) {
      alert('404 Page Not Found.');
      return next('/');
    }
  }

  next();
});

export default router;