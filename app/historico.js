document.addEventListener('DOMContentLoaded', function() {
    // Filtros
    const searchInput = document.getElementById('searchInput');
    const yearFilter = document.getElementById('yearFilter');
    const examTypeFilter = document.getElementById('examTypeFilter');
    
    // Modal de compartilhamento
    const shareModal = document.getElementById('shareModal');
    const shareButtons = document.querySelectorAll('.history-footer .btn-outline:nth-child(2)');
    const closeModalBtn = document.querySelector('.close-btn');
    const cancelShareBtn = document.getElementById('cancelShareButton');
    const shareMethod = document.getElementById('shareMethod');
    const emailGroup = document.getElementById('emailGroup');
    const whatsappGroup = document.getElementById('whatsappGroup');
    
    // Carregar mais histórico
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Filtros - Event listeners
    searchInput.addEventListener('input', filterExams);
    yearFilter.addEventListener('change', filterExams);
    examTypeFilter.addEventListener('change', filterExams);
    
    // Modal de compartilhamento - Event listeners
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            shareModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModalBtn.addEventListener('click', closeModal);
    cancelShareBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            closeModal();
        }
    });
    
    // Mudar método de compartilhamento
    shareMethod.addEventListener('change', function() {
        emailGroup.style.display = this.value === 'email' ? 'block' : 'none';
        whatsappGroup.style.display = this.value === 'whatsapp' ? 'block' : 'none';
    });
    
    // Carregar mais histórico
    loadMoreBtn.addEventListener('click', function() {
        // Simulação de carregamento de mais itens
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
        this.disabled = true;
        
        setTimeout(() => {
            // Aqui você faria uma requisição AJAX para carregar mais itens
            // Por enquanto, apenas simulamos
            const timeline = document.querySelector('.timeline');
            
            // Criar um novo item de histórico (simulação)
            const newItem = document.createElement('div');
            newItem.className = 'timeline-item';
            newItem.innerHTML = `
                <div class="timeline-date">
                    <div class="month-badge">Outubro 2024</div>
                </div>
                <div class="timeline-content">
                    <div class="history-card">
                        <div class="history-header">
                            <span class="exam-date">15 Out 2024</span>
                            <span class="exam-type laboratorial">Exame Laboratorial</span>
                        </div>
                        <div class="history-body">
                            <h3>Colesterol Total e Frações</h3>
                            <div class="history-details">
                                <p><i class="fas fa-map-marker-alt"></i> Unidade Leste</p>
                                <p><i class="fas fa-user-md"></i> Dra. Juliana Mendes</p>
                            </div>
                            <div class="history-badges">
                                <span class="badge badge-success">Realizado</span>
                                <span class="badge badge-primary">Resultado Disponível</span>
                            </div>
                        </div>
                        <div class="history-footer">
                            <button class="btn btn-outline btn-sm">
                                <i class="fas fa-file-pdf"></i> Ver resultados
                            </button>
                            <button class="btn btn-outline btn-sm">
                                <i class="fas fa-share-alt"></i> Compartilhar
                            </button>
                            <button class="btn btn-primary btn-sm">
                                <i class="fas fa-plus"></i> Agendar novo exame
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            timeline.insertBefore(newItem, document.querySelector('.timeline-end'));
            
            // Adicionar event listener ao novo botão de compartilhamento
            newItem.querySelector('.history-footer .btn-outline:nth-child(2)').addEventListener('click', function(e) {
                e.preventDefault();
                shareModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
            
            this.innerHTML = '<i class="fas fa-history"></i> Carregar histórico anterior';
            this.disabled = false;
        }, 1500);
    });
    
    // Função para filtrar exames
    function filterExams() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedYear = yearFilter.value;
        const selectedType = examTypeFilter.value;
        
        document.querySelectorAll('.history-card').forEach(card => {
            const examName = card.querySelector('h3').textContent.toLowerCase();
            const examDate = card.querySelector('.exam-date').textContent;
            const examType = card.querySelector('.exam-type').classList[1];
            
            const matchesSearch = examName.includes(searchTerm);
            const matchesYear = !selectedYear || examDate.includes(selectedYear);
            const matchesType = !selectedType || examType === selectedType;
            
            if (matchesSearch && matchesYear && matchesType) {
                card.parentElement.parentElement.style.display = '';
            } else {
                card.parentElement.parentElement.style.display = 'none';
            }
        });
    }
    
    // Função para fechar modal
    function closeModal() {
        shareModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Simular clique no botão de logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Tem certeza que deseja sair?')) {
            // Redirecionar para a página de login
            window.location.href = 'login.html';
        }
    });
});