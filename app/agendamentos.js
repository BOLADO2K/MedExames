document.addEventListener('DOMContentLoaded', function() {
    // Modal de Novo Agendamento
    const newAppointmentBtn = document.querySelector('.new-appointment-btn');
    const appointmentModal = document.getElementById('appointmentModal');
    const closeBtn = appointmentModal.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelButton');
    
    // Abrir modal
    newAppointmentBtn.addEventListener('click', function() {
        appointmentModal.style.display = 'flex';
    });
    
    // Fechar modal
    function closeModal() {
        appointmentModal.style.display = 'none';
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora dele
    appointmentModal.addEventListener('click', function(event) {
        if (event.target === appointmentModal) {
            closeModal();
        }
    });
    
    // Controle do calendário
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthEl = document.getElementById('currentMonth');
    
    let currentDate = new Date(2025, 3, 14); // 14 de abril de 2025
    
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Atualizar título do mês
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        currentMonthEl.textContent = `${monthNames[month]} ${year}`;
        
        // Essa função seria expandida para gerar os dias do calendário dinamicamente
        // Por simplicidade, usamos o HTML estático neste exemplo
        console.log(`Calendário atualizado para: ${monthNames[month]} ${year}`);
    }
    
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });
    
    // Interação com os dias do calendário
    const calendarDays = document.querySelectorAll('.calendar-day');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            // Remover seleção anterior
            document.querySelectorAll('.calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Adicionar classe de seleção
            this.classList.add('selected');
            
            // Se o dia tem agendamento, mostrar detalhes
            if (this.classList.contains('has-appointment')) {
                // Rolar para a seção de agendamentos
                const appointmentsList = document.querySelector('.appointments-list');
                appointmentsList.scrollIntoView({ behavior: 'smooth' });
                
                // Realçar o cartão correspondente
                const day = this.textContent.trim().split('\n')[0];
                const appointmentCards = document.querySelectorAll('.appointment-card');
                
                appointmentCards.forEach(card => {
                    const cardDay = card.querySelector('.day').textContent;
                    
                    if (cardDay === day) {
                        card.style.boxShadow = '0 0 0 2px var(--primary-color)';
                        setTimeout(() => {
                            card.style.boxShadow = '';
                        }, 2000);
                    }
                });
            } else {
                // Se não tem agendamento, perguntar se deseja agendar
                const dayNum = this.textContent.trim().split('\n')[0];
                
                if (!this.classList.contains('prev-month') && !this.classList.contains('next-month')) {
                    if (confirm(`Deseja criar um novo agendamento para o dia ${dayNum}?`)) {
                        // Abrir modal de agendamento com a data pré-selecionada
                        appointmentModal.style.display = 'flex';
                        
                        // Preencher data no formulário
                        const dateInput = document.getElementById('appointmentDate');
                        const month = currentDate.getMonth() + 1;
                        const formattedMonth = month < 10 ? `0${month}` : month;
                        const formattedDay = dayNum < 10 ? `0${dayNum}` : dayNum;
                        
                        dateInput.value = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`;
                        
                        // Atualizar horários disponíveis
                        updateAvailableTimes();
                    }
                }
            }
        });
    });
    
    // Formulário dinâmico
    const examTypeSelect = document.getElementById('examType');
    const specificExamSelect = document.getElementById('specificExam');
    const appointmentDateInput = document.getElementById('appointmentDate');
    const appointmentTimeSelect = document.getElementById('appointmentTime');
    
    // Formulário dinâmico (continuação)
examTypeSelect.addEventListener('change', function() {
    specificExamSelect.disabled = this.value === '';
    
    if (this.value !== '') {
        // Limpar opções atuais
        specificExamSelect.innerHTML = '<option value="">Selecione o exame específico</option>';
        
        // Adicionar opções com base no tipo selecionado
        switch(this.value) {
            case 'laboratorial':
                addExamOptions(['Hemograma Completo', 'Glicemia', 'Colesterol Total e Frações', 
                               'Triglicérides', 'TSH e T4 Livre', 'Ácido Úrico', 'Ureia e Creatinina']);
                break;
            case 'imagem':
                addExamOptions(['Raio-X', 'Ultrassonografia', 'Tomografia Computadorizada', 
                               'Ressonância Magnética', 'Mamografia', 'Densitometria Óssea']);
                break;
            case 'cardiologico':
                addExamOptions(['Eletrocardiograma', 'Teste Ergométrico', 'Ecocardiograma', 
                               'Holter 24h', 'MAPA (Monitorização Ambulatorial da Pressão Arterial)']);
                break;
            case 'outro':
                addExamOptions(['Endoscopia Digestiva Alta', 'Colonoscopia', 'Audiometria', 
                               'Espirometria', 'Eletroencefalograma']);
                break;
        }
    }
});

function addExamOptions(exams) {
    for (const exam of exams) {
        const option = document.createElement('option');
        option.value = exam.toLowerCase().replace(/\s+/g, '-');
        option.textContent = exam;
        specificExamSelect.appendChild(option);
    }
}

// Atualização dos horários disponíveis quando uma data é selecionada
appointmentDateInput.addEventListener('change', updateAvailableTimes);

function updateAvailableTimes() {
    appointmentTimeSelect.disabled = appointmentDateInput.value === '';
    
    if (appointmentDateInput.value !== '') {
        // Limpar opções atuais
        appointmentTimeSelect.innerHTML = '<option value="">Selecione o horário</option>';
        
        // Simular horários disponíveis (em um sistema real, isso viria do servidor)
        const availableTimes = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
                              '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', 
                              '16:00', '16:30', '17:00', '17:30'];
        
        // Remover alguns horários aleatoriamente para simular indisponibilidade
        const selectedDate = new Date(appointmentDateInput.value);
        const dateKey = selectedDate.toISOString().split('T')[0];
        
        // Usar o dia da data como semente para pseudo-aleatoriedade consistente
        const unavailableSlots = selectedDate.getDate() % 3 + 1;
        const unavailableIndices = [];
        
        while (unavailableIndices.length < unavailableSlots) {
            const randomIndex = Math.floor(Math.random() * availableTimes.length);
            if (!unavailableIndices.includes(randomIndex)) {
                unavailableIndices.push(randomIndex);
            }
        }
        
        // Adicionar horários disponíveis
        for (let i = 0; i < availableTimes.length; i++) {
            if (!unavailableIndices.includes(i)) {
                const option = document.createElement('option');
                option.value = availableTimes[i];
                option.textContent = availableTimes[i];
                appointmentTimeSelect.appendChild(option);
            }
        }
    }
}

// Validação e submissão do formulário
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validar formulário
    if (!validateForm()) {
        return;
    }
    
    // Coleta de dados do formulário
    const formData = {
        examType: examTypeSelect.value,
        specificExam: specificExamSelect.value,
        location: document.getElementById('location').value,
        date: appointmentDateInput.value,
        time: appointmentTimeSelect.value,
        notes: document.getElementById('notes').value
    };
    
    // Simulação de envio (em um sistema real, isso seria uma requisição AJAX)
    console.log('Dados do agendamento:', formData);
    
    // Simular sucesso
    alert('Agendamento realizado com sucesso!');
    closeModal();
    
    // Atualizar lista de agendamentos (em um sistema real, isso recarregaria os dados)
    simulateNewAppointment(formData);
});

function validateForm() {
    let isValid = true;
    
    // Validar campos obrigatórios
    if (examTypeSelect.value === '') {
        alert('Por favor, selecione o tipo de exame.');
        isValid = false;
    } else if (specificExamSelect.value === '') {
        alert('Por favor, selecione o exame específico.');
        isValid = false;
    } else if (document.getElementById('location').value === '') {
        alert('Por favor, selecione a unidade.');
        isValid = false;
    } else if (appointmentDateInput.value === '') {
        alert('Por favor, selecione a data do agendamento.');
        isValid = false;
    } else if (appointmentTimeSelect.value === '') {
        alert('Por favor, selecione o horário do agendamento.');
        isValid = false;
    }
    
    return isValid;
}

function simulateNewAppointment(formData) {
    // Criar elemento para o novo agendamento
    const date = new Date(formData.date);
    const day = date.getDate();
    const month = date.getMonth();
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Atualizar o calendário
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(calDay => {
        const dayNum = parseInt(calDay.textContent.trim().split('\n')[0]);
        if (dayNum === day && !calDay.classList.contains('prev-month') && !calDay.classList.contains('next-month')) {
            calDay.classList.add('has-appointment');
            
            // Adicionar indicador se não existir
            if (!calDay.querySelector('.appointment-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'appointment-indicator';
                calDay.appendChild(indicator);
            }
        }
    });
    
    // Criar novo card de agendamento
    const appointmentsList = document.querySelector('.appointments-list');
    
    // Obter nome do exame específico
    const examName = specificExamSelect.options[specificExamSelect.selectedIndex].textContent;
    
    // Determinar detalhes com base na unidade selecionada
    const locationSelect = document.getElementById('location');
    const locationName = locationSelect.options[locationSelect.selectedIndex].textContent;
    let locationDetails;
    
    switch(formData.location) {
        case 'centro':
            locationDetails = 'Unidade Centro - Sala 201';
            break;
        case 'norte':
            locationDetails = 'Unidade Norte - 2º andar';
            break;
        case 'sul':
            locationDetails = 'Unidade Sul - Bloco B';
            break;
        default:
            locationDetails = locationName;
    }
    
    // Criar elemento HTML do card
    const newCard = document.createElement('div');
    newCard.className = 'appointment-card';
    newCard.innerHTML = `
        <div class="appointment-date">
            <div class="date-box">
                <span class="day">${day}</span>
                <span class="month">${monthNames[month]}</span>
            </div>
            <div class="time">${formData.time}</div>
        </div>
        <div class="appointment-details">
            <h4>${examName}</h4>
            <p><i class="fas fa-flask"></i> ${examTypeSelect.options[examTypeSelect.selectedIndex].textContent}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${locationDetails}</p>
            <p><i class="fas fa-info-circle"></i> ${formData.notes || 'Nenhuma observação adicional'}</p>
        </div>
        <div class="appointment-actions">
            <button class="btn btn-outline btn-sm">
                <i class="fas fa-sync-alt"></i> Remarcar
            </button>
            <button class="btn btn-outline btn-sm">
                <i class="fas fa-map"></i> Ver localização
            </button>
            <button class="btn btn-danger btn-sm">
                <i class="fas fa-times"></i> Cancelar
            </button>
        </div>
    `;
    
    // Adicionar à lista de agendamentos
    appointmentsList.appendChild(newCard);
    
    // Destacar o novo card
    newCard.style.boxShadow = '0 0 0 2px var(--primary-color)';
    setTimeout(() => {
        newCard.style.boxShadow = '';
    }, 2000);
    
    // Rolar para o novo card
    newCard.scrollIntoView({ behavior: 'smooth' });
}

// Upload de arquivo - mostrar nome do arquivo selecionado
const fileInput = document.getElementById('medicalOrder');
const fileLabel = document.querySelector('.file-upload-label span');

fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
        fileLabel.textContent = this.files[0].name;
    } else {
        fileLabel.textContent = 'Anexar pedido médico (opcional)';
    }
});

// Inicializar a área do usuário
const userArea = document.querySelector('.user-area');
const userPic = document.querySelector('.user-pic');
const dropdown = document.querySelector('.dropdown');

userPic.addEventListener('click', function() {
    dropdown.classList.toggle('active');
});

// Fechar dropdown ao clicar fora
document.addEventListener('click', function(event) {
    if (!userArea.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Logout
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();
    if (confirm('Deseja realmente sair?')) {
        // Em um sistema real, isso enviaria uma requisição de logout
        window.location.href = 'login.html';
    }
});

// Inicializar calendário
updateCalendar();
});