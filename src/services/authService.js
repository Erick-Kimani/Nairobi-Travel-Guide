// authService.js
import api from './api';
import TokenService from './TokenService';

class AuthService {

  /**
   * Lightweight optimistic check based on local session data.
   * Used for UI decisions like showing/hiding nav items.
   */
  static isLoggedIn() {
    return TokenService.hasSession();
  }

  /**
   * Authoritative session check — calls the backend /me endpoint.
   * Returns { user, abilities } on success, or null if unauthenticated.
   *
   * A 401 here is EXPECTED for guest users and is silently treated as
   * "no session" — it never triggers a redirect on its own.
   * Route protection is handled by the router guard in index.js.
   */
  static async verifySession() {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch {
      // 401 = guest user, no session — this is normal, not an error
      return null;
    }
  }

  /**
   * Checks if the current user has a given ability or any in an array.
   * Reads from local session storage — no network call needed.
   *
   * @param {string|string[]} ability
   * @returns {boolean}
   */
  static hasAbility(ability) {
    const abilities = TokenService.getAbilities();
    if (!abilities) return false;

    if (Array.isArray(ability)) {
      return ability.some(role => abilities[role] === true);
    }

    return abilities?.[ability] === true;
  }

  /**
   * Logs out by invalidating the Laravel session on the backend,
   * then clears all local session data.
   */
  static async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      TokenService.clearSession();
      localStorage.removeItem('isUserLoggedIn');
    }
  }
}

export default AuthService;