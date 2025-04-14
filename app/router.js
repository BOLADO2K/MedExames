class Router {
    constructor(routes) {
      this.routes = routes;
      this.init();
    }
  
    init() {
      window.addEventListener('popstate', () => this.route());
      document.addEventListener('DOMContentLoaded', () => this.route());
      document.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
          e.preventDefault();
          this.navigateTo(e.target.href);
        }
      });
    }
  
    async route() {
      const path = window.location.pathname;
      const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/404');
      
      if (route) {
        const html = await fetch(route.template).then(res => res.text());
        document.getElementById('app').innerHTML = html;
        if (route.script) {
          const script = document.createElement('script');
          script.src = route.script;
          document.body.appendChild(script);
        }
      }
    }
  
    navigateTo(path) {
      window.history.pushState({}, '', path);
      this.route();
    }
  }
  
  // Configuração das rotas
  const routes = [
    { path: '/', template: './pages/home.html', script: './js/home.js' },
    { path: '/login', template: './pages/login.html', script: './js/login.js' },
    { path: '/exames', template: './pages/exames.html', script: './js/exames.js' },
    { path: '/404', template: './pages/404.html' }
  ];
  
  new Router(routes); 