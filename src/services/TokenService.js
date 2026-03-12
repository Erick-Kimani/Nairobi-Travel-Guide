// TokenService.js
// With httpOnly cookies, the auth token is owned entirely by the browser and
// the backend. This service no longer stores or reads any token. Its sole
// responsibility is managing the non-sensitive user profile and abilities
// that the frontend needs for routing decisions and UI rendering.

class TokenService {

  // ─── Write ────────────────────────────────────────────────────────────────

  /**
   * Persist user profile and abilities received from the backend after login.
   * The token itself is never passed here — it lives in the httpOnly cookie.
   *
   * @param {Object} data - { user, abilities }
   */
  static setSession(data) {
    if (data.user) {
      sessionStorage.setItem('user', JSON.stringify(data.user));
    }

    if (data.abilities) {
      sessionStorage.setItem('abilities', JSON.stringify(data.abilities));
    }
  }

  // ─── Read ─────────────────────────────────────────────────────────────────

  /**
   * Returns the stored user object, or null if not set.
   */
  static getUser() {
    try {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  /**
   * Returns the stored abilities object, or an empty object if not set.
   */
  static getAbilities() {
    try {
      const abilities = JSON.parse(sessionStorage.getItem('abilities'));
      return (Array.isArray(abilities) || typeof abilities === 'object') && abilities !== null
        ? abilities
        : {};
    } catch {
      return {};
    }
  }

  // ─── Clear ────────────────────────────────────────────────────────────────

  /**
   * Clears all locally stored session data.
   * The httpOnly cookie is cleared by the backend on /logout.
   */
  static clearSession() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('abilities');
  }

  // ─── Auth State ───────────────────────────────────────────────────────────

  /**
   * Returns true if a user profile is present in session storage.
   *
   * NOTE: This is a lightweight, optimistic check for UI purposes only.
   * It does NOT verify the cookie or the backend session. The router guard
   * uses an async /me call for authoritative session verification.
   */
  static hasSession() {
    return !!this.getUser();
  }
}

export default TokenService;