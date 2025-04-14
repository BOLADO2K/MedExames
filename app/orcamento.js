document.addEventListener('DOMContentLoaded', function() {
    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Modais
    const newBudgetBtn = document.getElementById('newBudgetBtn');
    const newBudgetModal = document.getElementById('newBudgetModal');
    const budgetDetailModal = document.getElementById('budgetDetailModal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const cancelBudgetBtn = document.getElementById('cancelBudgetBtn');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const detailBtns = document.querySelectorAll('.budget-footer .btn-outline:first-child');
    
    // Formulário
    const doctorRequestRadios = document.querySelectorAll('input[name="doctorRequest"]');
    const requestFileGroup = document.getElementById('requestFileGroup');
    
    // Navegação
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Ativar tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover classe active de todos os botões e painéis
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Adicionar classe active ao botão e painel clicado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Mostrar/ocultar campo de anexo conforme seleção
    doctorRequestRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            requestFileGroup.style.display = this.value === 'sim' ? 'block' : 'none';
        });
    });
    
    // Abrir modal novo orçamento
    newBudgetBtn.addEventListener('click', function() {
        newBudgetModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Abrir modal detalhes orçamento
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            budgetDetailModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modais
    function closeModals() {
        newBudgetModal.style.display = 'none';
        budgetDetailModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    cancelBudgetBtn.addEventListener('click', closeModals);
    closeDetailBtn.addEventListener('click', closeModals);
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
    
    // Formulário novo orçamento
    document.getElementById('newBudgetForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envio do formulário
        alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
        closeModals();
        this.reset();
    });
    
    // Logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Tem certeza que deseja sair?')) {
            window.location.href = 'login.html';
        }
    });
    
    // Ativar link correto na navegação
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});