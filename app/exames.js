if (!Auth.isAuthenticated()) {
    window.location.href = '/login';
  }
  
  // Carrega dados específicos da página
  document.addEventListener('DOMContentLoaded', () => {
    loadExames();
  });
  
document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Toggle dropdown menu
    const userPic = document.querySelector('.user-pic');
    const dropdown = document.querySelector('.dropdown');
    
    if (userPic && dropdown) {
        userPic.addEventListener('click', function() {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.user-area') && dropdown) {
            dropdown.style.display = 'none';
        }
    });
    
    // Filter dropdown functionality
    const filterBtn = document.querySelector('.filter-btn');
    const filterMenu = document.querySelector('.filter-menu');
    
    if (filterBtn && filterMenu) {
        filterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close filter menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.filter-dropdown')) {
                filterMenu.style.display = 'none';
            }
        });
        
        // Prevent menu from closing when clicking inside it
        filterMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const examCards = document.querySelectorAll('.exam-card');
            
            examCards.forEach(card => {
                const examName = card.querySelector('h3').textContent.toLowerCase();
                const examDetails = card.querySelector('.exam-details').textContent.toLowerCase();
                
                if (examName.includes(searchTerm) || examDetails.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Exam actions buttons
    const viewButtons = document.querySelectorAll('.btn-primary');
    viewButtons.forEach(button => {
        if (button.textContent.includes('Visualizar')) {
            button.addEventListener('click', function() {
                const examName = this.closest('.exam-card').querySelector('h3').textContent;
                alert(`Visualizando exame: ${examName}`);
                // Here you would implement the viewer or modal
            });
        }
    });
    
    const downloadButtons = document.querySelectorAll('.btn-outline');
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Download')) {
            button.addEventListener('click', function() {
                const examName = this.closest('.exam-card').querySelector('h3').textContent;
                alert(`Iniciando download do exame: ${examName}`);
                // Simulate download
                setTimeout(() => {
                    alert(`Download de ${examName} concluído!`);
                }, 1500);
            });
        }
    });
    
    const shareButtons = document.querySelectorAll('.btn-outline');
    shareButtons.forEach(button => {
        if (button.textContent.includes('Compartilhar')) {
            button.addEventListener('click', function() {
                const examName = this.closest('.exam-card').querySelector('h3').textContent;
                // Display sharing options modal
                const sharingOptions = ['E-mail', 'WhatsApp', 'Médico', 'Link'];
                const optionsHTML = sharingOptions.map(option => `<button class="share-option">${option}</button>`).join('');
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Compartilhar ${examName}</h3>
                            <button class="close-btn">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Escolha como deseja compartilhar:</p>
                            <div class="sharing-options">
                                ${optionsHTML}
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Add modal styles

                // Add modal styles
                const style = document.createElement('style');
                style.textContent = `
                    .modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                    }
                    
                    .modal-content {
                        background-color: white;
                        border-radius: 10px;
                        width: 90%;
                        max-width: 400px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    }
                    
                    .modal-header {
                        padding: 15px;
                        border-bottom: 1px solid #e1e4e8;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .close-btn {
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                    }
                    
                    .modal-body {
                        padding: 15px;
                    }
                    
                    .sharing-options {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                        margin-top: 15px;
                    }
                    
                    .share-option {
                        padding: 10px;
                        border: 1px solid #e1e4e8;
                        border-radius: 5px;
                        background: none;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }
                    
                    .share-option:hover {
                        background-color: #f5f7fa;
                    }
                `;
                document.head.appendChild(style);
                
                // Handle modal close
                const closeBtn = modal.querySelector('.close-btn');
                closeBtn.addEventListener('click', () => {
                    modal.remove();
                    style.remove();
                });
                
                // Handle click outside modal to close
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                        style.remove();
                    }
                });
                
                // Handle sharing options
                const shareOptions = modal.querySelectorAll('.share-option');
                shareOptions.forEach(option => {
                    option.addEventListener('click', () => {
                        alert(`Compartilhando por ${option.textContent}...`);
                        modal.remove();
                        style.remove();
                    });
                });
            });
        }
    });
    
    // Schedule collection button
    const scheduleButtons = document.querySelectorAll('.btn-primary');
    scheduleButtons.forEach(button => {
        if (button.textContent.includes('Agendar Coleta')) {
            button.addEventListener('click', function() {
                const examName = this.closest('.exam-card').querySelector('h3').textContent;
                alert(`Redirecionando para agendamento de coleta para: ${examName}`);
                // Here you would redirect to the scheduling page
            });
        }
    });
    
    // Print request button
    const printButtons = document.querySelectorAll('.btn-outline');
    printButtons.forEach(button => {
        if (button.textContent.includes('Imprimir Pedido')) {
            button.addEventListener('click', function() {
                const examName = this.closest('.exam-card').querySelector('h3').textContent;
                alert(`Preparando impressão do pedido para: ${examName}`);
                // Here you would open a print dialog or generate a PDF
                window.print();
            });
        }
    });
    
    // Populate "Todos" tab with combined content
    function populateAllExamsTab() {
        const allExamsTab = document.getElementById('todos');
        const examsContent = [];
        
        // Collect content from other tabs
        document.querySelectorAll('.tab-content:not(#todos)').forEach(tab => {
            const clone = tab.querySelector('.exams-list').cloneNode(true);
            examsContent.push(...Array.from(clone.children));
        });
        
        // Create exams list container if it doesn't exist
        let examsList = allExamsTab.querySelector('.exams-list');
        if (!examsList) {
            examsList = document.createElement('div');
            examsList.className = 'exams-list';
            allExamsTab.innerHTML = '';
            allExamsTab.appendChild(examsList);
        }
        
        // Add all exams to the container
        examsContent.forEach(item => {
            examsList.appendChild(item.cloneNode(true));
        });
        
        // Reattach event listeners for the cloned elements
        attachEventListeners(allExamsTab);
    }
    
    // Helper function to attach event listeners to cloned elements
    function attachEventListeners(container) {
        // Re-attach button event listeners as needed
        // This would be expanded based on all the button types in your app
    }
    
    // Populate the "Todos" tab initially
    populateAllExamsTab();
});
