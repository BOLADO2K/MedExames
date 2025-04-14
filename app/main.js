document.addEventListener('DOMContentLoaded', function() {
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
    
    // Handling logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Tem certeza que deseja sair?')) {
                // Here you would handle logout logic
                alert('Logout realizado com sucesso!');
                window.location.href = 'login.html';
            }
        });
    }
    
    // Handling appointment actions
    const rescheduleButtons = document.querySelectorAll('.btn-outline');
    rescheduleButtons.forEach(button => {
        if (button.textContent === 'Remarcar') {
            button.addEventListener('click', function() {
                alert('Função de reagendamento será aberta aqui.');
            });
        }
    });
    
    const cancelButtons = document.querySelectorAll('.btn-danger');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
                alert('Agendamento cancelado com sucesso!');
                // Here you would handle the cancellation
                this.closest('.appointment').style.opacity = '0.5';
            }
        });
    });
    
    // Handling exam result actions
    const viewButtons = document.querySelectorAll('.btn-primary');
    viewButtons.forEach(button => {
        if (button.textContent === 'Visualizar') {
            button.addEventListener('click', function() {
                alert('O resultado do exame será exibido aqui.');
            });
        }
    });
    
    const downloadButtons = document.querySelectorAll('.btn-outline');
    downloadButtons.forEach(button => {
        if (button.textContent === 'Download') {
            button.addEventListener('click', function() {
                alert('Iniciando download do resultado...');
                // Simulate download
                setTimeout(() => {
                    alert('Download concluído!');
                }, 1500);
            });
        }
    });
    
    // Handling budget actions
    const approveButtons = document.querySelectorAll('.btn-success');
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Confirmar aprovação deste orçamento?')) {
                alert('Orçamento aprovado! Redirecionando para pagamento...');
                // Here you would redirect to payment page
            }
        });
    });
    
    const detailButtons = document.querySelectorAll('.btn-outline');
    detailButtons.forEach(button => {
        if (button.textContent === 'Detalhes') {
            button.addEventListener('click', function() {
                alert('Detalhes do orçamento serão exibidos aqui.');
            });
        }
    });
    
    // Simulated data loading
    simulateDataLoading();
});

// Function to simulate data loading with a loading spinner
function simulateDataLoading() {
    // This would be expanded in a real application to fetch data from an API
    console.log('Loading user data...');
    // Simulating API delay
    setTimeout(() => {
        console.log('Data loaded successfully!');
    }, 1000);
}

// Function to format dates (for future use)
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Function for notification handling (for future implementation)
function showNotification(message, type = 'info') {
    // This would be implemented to show toast notifications
    console.log(`${type.toUpperCase()}: ${message}`);
}