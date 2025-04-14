class Auth {
    static login(credentials) {
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('user', JSON.stringify({
        name: 'João Silva',
        email: credentials.email
      }));
    }
  
    static logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  
    static isAuthenticated() {
      return !!localStorage.getItem('authToken');
    }
  
    static currentUser() {
      return JSON.parse(localStorage.getItem('user'));
    }
  }