class TokenService {
  static setToken(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('abilities', JSON.stringify(data.abilities));
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('abilities');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static getAbilities() {
    try {
      const abilities = JSON.parse(localStorage.getItem('abilities'));
      return Array.isArray(abilities) || typeof abilities === 'object' ? abilities : [];
    } catch {
      return [];
    }
  }
}

export default TokenService;