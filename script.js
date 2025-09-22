document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');
    const startButton = document.getElementById('start-button');
    const streakCount = document.getElementById('streak-count');
    const consecutiveDaysStat = document.getElementById('consecutive-days-stat');
    const difficultySelect = document.getElementById('difficulty-select');
    const resetButton = document.getElementById('reset-button');
    const dailyChallengesContainer = document.getElementById('daily-challenges');
    const allChallengesContainer = document.getElementById('all-challenges');

    // Mapeo de desafíos por dificultad
    const challenges = {
        easy: [
            { icon: 'fas fa-walking', title: 'Pasos', goal: '1,000 pasos hoy', type: 'steps' },
            { icon: 'fas fa-music', title: 'Bailar', goal: '5 minutos de baile', type: 'dance' },
            { icon: 'fas fa-seedling', title: 'Meditar', goal: '1 minuto de meditación', type: 'meditate' }
        ],
        medium: [
            { icon: 'fas fa-walking', title: 'Pasos', goal: '5,000 pasos hoy', type: 'steps' },
            { icon: 'fas fa-dumbbell', title: 'Fuerza', goal: '10 minutos de ejercicio', type: 'strength' },
            { icon: 'fas fa-heartbeat', title: 'Resistencia', goal: '15 minutos de cardio', type: 'endurance' }
        ],
        hard: [
            { icon: 'fas fa-running', title: 'Correr', goal: '5 km de trote', type: 'run' },
            { icon: 'fas fa-swimmer', title: 'Nadar', goal: '20 minutos de natación', type: 'swim' },
            { icon: 'fas fa-mountain', title: 'Escalada', goal: '10 metros de escalada', type: 'climb' }
        ],
        competitive: [
            { icon: 'fas fa-medal', title: 'Triatlón', goal: 'Completar 30 min triatlón', type: 'triathlon' },
            { icon: 'fas fa-bicycle', title: 'Ciclismo', goal: 'Subir 500m de elevación', type: 'bike' },
            { icon: 'fas fa-bolt', title: 'Sprint', goal: 'Sprint de 100m en <12s', type: 'sprint' }
        ]
    };

    // Almacena el estado de los desafíos completados en localStorage
    let completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
    let difficulty = localStorage.getItem('difficulty') || 'medium';

    // Maneja la navegación entre pantallas
    function navigateTo(screenId) {
        navItems.forEach(nav => nav.classList.remove('active'));
        screens.forEach(screen => screen.classList.remove('active'));
        
        const targetNav = document.querySelector(`.nav-item[data-screen="${screenId}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
        }
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const screenId = this.getAttribute('data-screen');
            navigateTo(screenId);
        });
    });

    // Nueva funcionalidad del botón "COMENZAR"
    startButton.addEventListener('click', function() {
        navigateTo('challenges-screen');
    });

    // Carga los desafíos al iniciar la aplicación
    function loadChallenges(difficulty) {
        const currentChallenges = challenges[difficulty];
        dailyChallengesContainer.innerHTML = '';
        allChallengesContainer.innerHTML = '';

        currentChallenges.forEach(challenge => {
            const isCompleted = completedChallenges.includes(challenge.type);
            
            // Renderiza el desafío en la pantalla de inicio
            const homeCard = `
                <div class="challenge-card">
                    <div class="challenge-icon"><i class="${challenge.icon}"></i></div>
                    <div class="challenge-info">
                        <div class="challenge-title">${challenge.title}</div>
                        <div class="challenge-goal">${challenge.goal}</div>
                    </div>
                    <div class="challenge-progress-container">
                        <div class="challenge-progress-circle" data-challenge="${challenge.type}">
                            <svg class="challenge-progress-svg">
                                <circle class="challenge-progress-bg" cx="25" cy="25" r="20" />
                                <circle class="challenge-progress-fill" cx="25" cy="25" r="20" stroke-dasharray="${isCompleted ? '125.6' : '0'} 125.6" />
                            </svg>
                            <button class="upload-evidence-btn" data-challenge="${challenge.type}">
                                <i class="fas ${isCompleted ? 'fa-check' : 'fa-camera'}"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            dailyChallengesContainer.innerHTML += homeCard;

            // Renderiza el desafío en la pantalla de retos
            const allCard = `
                <div class="challenge-card">
                    <div class="challenge-icon"><i class="${challenge.icon}"></i></div>
                    <div class="challenge-info">
                        <div class="challenge-title">${challenge.title}</div>
                        <div class="challenge-goal">${challenge.goal}</div>
                    </div>
                    ${isCompleted ? 
                        `<div class="challenge-complete-icon"><i class="fas fa-check-circle checkmark-animation"></i></div>` : 
                        `<button class="challenge-complete-btn" data-challenge="${challenge.type}">Marcar completado</button>`
                    }
                </div>
            `;
            allChallengesContainer.innerHTML += allCard;
        });

        // Vuelve a añadir los listeners a los nuevos botones
        attachEventListeners();
    }

    // Adjunta los listeners a los botones de desafío
    function attachEventListeners() {
        const challengeCompleteBtns = document.querySelectorAll('.challenge-complete-btn');
        const uploadButtons = document.querySelectorAll('.upload-evidence-btn');

        challengeCompleteBtns.forEach(button => {
            button.addEventListener('click', function() {
                const challengeType = this.getAttribute('data-challenge');
                if (!completedChallenges.includes(challengeType)) {
                    completedChallenges.push(challengeType);
                    localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
                    updateProgressDisplay();
                    loadChallenges(difficulty); // Recarga para actualizar el estado visual
                }
            });
        });

        uploadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const challengeType = this.getAttribute('data-challenge');
                if (!completedChallenges.includes(challengeType)) {
                    completedChallenges.push(challengeType);
                    localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
                    updateProgressDisplay();
                    loadChallenges(difficulty);
                }
            });
        });
    }

    // Actualiza la visualización del progreso en la pantalla de inicio
    function updateProgressDisplay() {
        const totalChallenges = challenges[difficulty].length;
        const completedCount = completedChallenges.length;
        const progressPercentage = (completedCount / totalChallenges) * 100;
        
        const progressBar = document.getElementById('daily-progress-bar');
        const progressPercentageText = document.querySelector('.progress-percentage');
        const progressText = document.querySelector('.progress-text');

        if (progressBar && progressPercentageText && progressText) {
            progressBar.style.width = `${progressPercentage}%`;
            progressPercentageText.textContent = `${Math.round(progressPercentage)}%`;
            progressText.textContent = completedCount === totalChallenges ? '¡Completado! 🎉' : '¡Sigue así!';
        }
    }

    // Actualiza los días de racha
    function updateStreak() {
        let currentStreak = parseInt(localStorage.getItem('streak') || 0);
        const lastCompletionDate = localStorage.getItem('lastCompletionDate');
        const today = new Date().toDateString();

        if (lastCompletionDate === today) {
            // Ya se ha completado hoy, no se hace nada
        } else if (completedChallenges.length === challenges[difficulty].length) {
            // Todos los retos del día anterior se completaron
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastCompletionDate === yesterday.toDateString()) {
                currentStreak++;
            } else {
                currentStreak = 1; // Se reinicia si no se completó ayer
            }
            localStorage.setItem('streak', currentStreak);
            localStorage.setItem('lastCompletionDate', today);
        } else {
            // Si no se han completado todos los desafíos del día, la racha se mantiene hasta el final del día
        }

        streakCount.textContent = currentStreak;
        consecutiveDaysStat.textContent = currentStreak;
    }

    // Cambia los desafíos al seleccionar una dificultad
    difficultySelect.addEventListener('change', function() {
        difficulty = this.value;
        localStorage.setItem('difficulty', difficulty);
        completedChallenges = []; // Se reinician los desafíos al cambiar de dificultad
        localStorage.setItem('completedChallenges', '[]');
        loadChallenges(difficulty);
        updateProgressDisplay();
    });

    // Reinicia el progreso del día
    resetButton.addEventListener('click', function() {
        completedChallenges = [];
        localStorage.setItem('completedChallenges', '[]');
        loadChallenges(difficulty);
        updateProgressDisplay();
        alert('Progreso del día reiniciado.');
    });

    // Inicialización
    difficultySelect.value = difficulty; // Establece la dificultad guardada
    loadChallenges(difficulty);
    updateProgressDisplay();
    updateStreak();
});