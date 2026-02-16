import TokenService from '@/services/TokenService';
import AuthService from '@/services/authService';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: TokenService.isAuthenticated(),
  }),
  actions: {
    login(tokenData) {
      TokenService.setToken(tokenData);
      this.isAuthenticated = true;
    },
    async logout() {
      await AuthService.logout();
      this.isAuthenticated = false;
    },
  },
});