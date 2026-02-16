import api from './api';
import TokenService from './TokenService';

class AuthService {
    
  static isLoggedIn() {
    return !!TokenService.getToken();
  }

  // 🛠️ Updated to handle both single strings and arrays of roles
  static hasAbility(ability) {
    const abilities = TokenService.getAbilities();
    if (!abilities) return false;

    // If 'ability' is an array, check if the user has AT LEAST one of them
    if (Array.isArray(ability)) {
      return ability.some(role => abilities[role] === true);
    }

    // Otherwise, treat it as a single string lookup
    return abilities?.[ability] === true;
  }

  static async logout() {
    try {
      await api.post('/logout');
      console.log('Token revoked on backend');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      TokenService.removeToken();
      localStorage.clear();
    }
  }
}

export default AuthService;