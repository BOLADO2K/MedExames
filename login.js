document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const copyCredentialsBtn = document.getElementById('copyCredentials');
    
    // Demo credentials
    const demoEmail = 'demo@medexames.com';
    const demoPassword = 'demo123';
    
    // Mostrar/ocultar senha
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
    
    // Copiar credenciais de demonstração
    copyCredentialsBtn.addEventListener('click', function() {
        const textToCopy = `Email: ${demoEmail}\nSenha: ${demoPassword}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            this.style.backgroundColor = '#388e3c';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '#1976d2';
            }, 2000);
        }).catch(err => {
            console.error('Falha ao copiar: ', err);
        });
    });
    
    // Preencher automaticamente ao clicar na div de demo
    document.querySelector('.demo-credentials').addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
            emailInput.value = demoEmail;
            passwordInput.value = demoPassword;
        }
    });
    
    // Validação do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validação simples
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Verificar se são as credenciais de demonstração
        if (email === demoEmail && password === demoPassword) {
            // Simular loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            submitBtn.disabled = true;
            
            // Simular tempo de login
            setTimeout(() => {
                // Redirecionar para a página principal
                window.location.href = 'app/index.html';
            }, 1500);
        } else {
            alert('Credenciais inválidas. Use os dados de demonstração fornecidos.');
        }
    });
    
    // Verificar se há credenciais salvas (lembrar de mim)
    if (localStorage.getItem('rememberEmail')) {
        emailInput.value = localStorage.getItem('rememberEmail');
        document.getElementById('remember').checked = true;
    }
    
    // Lembrar email se marcado
    document.getElementById('remember').addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('rememberEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberEmail');
        }
    });
});
