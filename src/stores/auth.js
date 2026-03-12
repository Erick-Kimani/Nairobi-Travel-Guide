// stores/auth.js
// Pinia auth store — reactive auth state for the entire Vue application.
//
// The frontend never stores or reads the auth token — it lives in Laravel's
// httpOnly session cookie, managed entirely by the browser and backend.
// This store holds only the non-sensitive user profile and abilities.

import TokenService from '@/services/TokenService';
import AuthService  from '@/services/authService';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Restored from sessionStorage on page load so state survives a refresh.
    // The router guard re-validates against /me on each page load, so
    // this is an optimistic starting value only.
    user:            TokenService.getUser(),
    abilities:       TokenService.getAbilities(),
    isAuthenticated: TokenService.hasSession(),
  }),

  getters: {
    // Returns the current user's display name, or null if not logged in.
    userName: (state) => state.user?.name ?? null,

    // Returns true if the current user has admin ability.
    isAdmin: (state) => state.abilities?.admin === true,
  },

  actions: {
    /**
     * Called after a successful manual login or OAuth callback.
     * Persists user + abilities to sessionStorage and updates reactive state.
     *
     * @param {Object} payload - { user, abilities }
     */
    login(payload) {
      TokenService.setSession(payload);
      this.user            = payload.user;
      this.abilities       = payload.abilities;
      this.isAuthenticated = true;
      localStorage.setItem('isUserLoggedIn', 'true');
    },

    /**
     * Called after the router guard verifies a session via /me on page load.
     * Refreshes the store with the latest user data from the backend.
     *
     * @param {Object} payload - { user, abilities }
     */
    setSessionFromServer(payload) {
      TokenService.setSession(payload);
      this.user            = payload.user;
      this.abilities       = payload.abilities;
      this.isAuthenticated = true;
    },

    /**
     * Logs the user out:
     * 1. Calls backend /logout — invalidates the Laravel session server-side
     *    and clears the httpOnly session cookie in the browser response.
     * 2. Clears all local session data (user, abilities, localStorage flag).
     * 3. Resets Pinia state to unauthenticated.
     * 4. Redirects to /login.
     *
     * The redirect uses window.location.href (hard redirect) rather than
     * router.push() to ensure the router guard's sessionChecked flag is
     * reset on the next page load — giving a clean slate.
     */
    async logout() {
      await AuthService.logout();

      // Clear all reactive state
      this.user            = null;
      this.abilities       = {};
      this.isAuthenticated = false;

      // Hard redirect to login — resets the router guard session flags
      // and ensures no stale state carries over
      window.location.href = '/login';
    },
  },
});