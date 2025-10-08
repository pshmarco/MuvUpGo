document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');
    const notificationBells = document.querySelectorAll('.notification-bell');
    const backArrows = document.querySelectorAll('.back-arrow');
    const startChallengeButton = document.getElementById('start-challenge-button');
    const addFriendButton = document.querySelector('.add-friend-button');
    const openRoutinesButton = document.getElementById('open-routines-button');
    const streakCount = document.getElementById('streak-count');
    const consecutiveDaysStat = document.getElementById('consecutive-days-stat');
    const resetButton = document.getElementById('reset-button');
    const eventsListContainer = document.getElementById('events-list');
    const friendsListContainer = document.getElementById('friends-list');
    const collectiblesListContainer = document.querySelector('.collectibles-list');
    const sunMuvPhraseElement = document.getElementById('sun-muv-phrase');
    const routinesListContainer = document.getElementById('routines-list');
    const routinesSectionTitle = document.querySelector('#routines-screen .section-title');

    // --- Data de la Aplicación ---
    const allEvents = [
        { title: 'Partido Basket 3v3', description: 'Torneo amistoso en la cancha central.', icon: 'fas fa-basketball-ball', cost: '$5.000 CLP', location: 'Gimnasio Quinta Normal', participants: '6/6 (Lleno)' },
        { title: 'Clase de Yoga Matinal', description: 'Sesión de estiramiento y meditación.', icon: 'fas fa-seedling', cost: 'Gratis', location: 'Salón Las Condes', participants: '12/20' },
        { title: 'Escalada (15 personas)', description: 'Ruta fácil para principiantes.', icon: 'fas fa-mountain', cost: 'Gratis (Para UChile)', location: 'Gimnasio Domeyko', participants: '10/15' },
        { title: 'Carrera 5K Comunitaria', description: 'Ruta de 5km por el borde del río.', icon: 'fas fa-running', cost: 'Gratis', location: 'Ribera del Río, Ñuñoa', participants: '85 inscritos' }
    ];

    const friendsList = [
        { name: 'Agustín Henríquez', status: 'Online', isFriend: true },
        { name: 'Cristóbal Garrido', status: 'Online', isFriend: true },
        { name: 'Marco Soto', status: 'Offline', isFriend: true },
        { name: 'Martín Vilches', status: 'Online', isFriend: false },
        { name: 'Vicente Colorín', status: 'Offline', isFriend: false },
        { name: 'Huevito Rey', status: 'Online', isFriend: false }
    ];

    const collectibles = [
        // Ícono actualizado a fa-futbol
        { icon: 'fas fa-futbol', title: 'Futbolín', meta: 'Por participar en 10 eventos de Fútbol.' },
        { icon: 'fas fa-heart', title: 'Fiel con la Racha', meta: 'Por completar 5 días de racha consecutivos.' },
        { icon: 'fas fa-mountain', title: 'Listo para el Everest', meta: 'Por finalizar un evento de Escalada o Montaña.' },
    ];

    const sunMuvPhrases = [
        "¡Tu cuerpo es capaz de cosas increíbles, solo dale el inicio!",
        "¡Recuerda que cada paso cuenta, no te rindas!",
        "La mejor vista viene después de la subida más dura. ¡Vamos por ello!",
        "No necesitas ser perfecto para inspirar a otros. ¡Solo comienza!",
        "El dolor de hoy será la fuerza de mañana. ¡Sigue moviéndote!"
    ];
    
    // Nombres de rutinas simplificados
    const routines = [
        { title: 'Fuerza', exercises: '10x Sentadillas, 10x Flexiones, 20x Zancadas.' },
        { title: 'Cardio', exercises: 'Saltos de Tijera, Rodillas al pecho, Escaladores.' },
        { title: 'Core', exercises: 'Plancha, Crunches, Levantamiento de piernas.' },
    ];
    
    // Actualizar título de Rutinas
    if (routinesSectionTitle) {
        routinesSectionTitle.textContent = 'Mis Rutinas';
    }


    // --- Funciones de Navegación ---
    function navigateTo(screenId) {
        navItems.forEach(nav => nav.classList.remove('active'));
        screens.forEach(screen => screen.classList.remove('active'));
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        const targetNav = document.querySelector(`.nav-item[data-screen="${screenId}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
        } else if (screenId === 'friends-screen' || screenId === 'routines-screen') {
            // Mantener la pestaña principal activa (Home o Events) si la navegación es a una sub-pantalla
            if (screenId === 'friends-screen') {
                 document.querySelector(`.nav-item[data-screen="home-screen"]`).classList.add('active');
            } else if (screenId === 'routines-screen') {
                 document.querySelector(`.nav-item[data-screen="challenges-screen"]`).classList.add('active');
            }
        } else {
            document.querySelector(`.nav-item[data-screen="home-screen"]`).classList.add('active');
        }
    }

    // Navegación con los iconos de la barra inferior
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const screenId = this.getAttribute('data-screen');
            navigateTo(screenId);
        });
    });
    
    // Navegación con la campana (a Mensajes)
    notificationBells.forEach(bell => {
        bell.addEventListener('click', () => navigateTo('messages-screen'));
    });

    // Navegación con flechas de retroceso
    backArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const screenId = this.getAttribute('data-screen');
            navigateTo(screenId);
        });
    });

    // Funcionalidad del botón "INICIAR DESAFÍO"
    startChallengeButton.addEventListener('click', function() {
        navigateTo('challenges-screen');
    });
    
    // Funcionalidad del botón "AGREGAR AMIGO"
    addFriendButton.addEventListener('click', function() {
        navigateTo('friends-screen');
    });
    
    // Funcionalidad del botón "Rutinas"
    openRoutinesButton.addEventListener('click', function() {
        navigateTo('routines-screen');
    });

    // --- Funciones de Renderizado ---
    
    // Renderiza la lista de eventos con las ubicaciones actualizadas
    function renderEvents() {
        eventsListContainer.innerHTML = '';
        allEvents.forEach(event => {
            const eventCard = `
                <div class="event-card">
                    <div class="event-top">
                        <div class="event-info">
                            <h3>${event.title}</h3>
                            <p>${event.description}</p>
                        </div>
                        <div class="event-cost">${event.cost}</div>
                    </div>
                    <div class="event-details">
                        <div class="event-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.location}</span>
                        </div>
                        <div class="event-participants">
                            <i class="fas fa-users"></i>
                            <span>${event.participants}</span>
                        </div>
                    </div>
                </div>
            `;
            eventsListContainer.innerHTML += eventCard;
        });
    }

    // Renderiza la lista de amigos (Dividido en Tus Bullas y Sugeridos)
    function renderFriendsList() {
        const myFriends = friendsList.filter(f => f.isFriend);
        const suggestedFriends = friendsList.filter(f => !f.isFriend);

        friendsListContainer.innerHTML = '';

        // Render Tus Bullas
        let friendsHtml = '';
        myFriends.forEach(friend => {
            friendsHtml += `
                <div class="friend-item">
                    <div class="friend-details">
                        <div class="friend-avatar"><i class="fas fa-user"></i></div>
                        <div>
                            <div class="friend-name">${friend.name}</div>
                            <div class="friend-status" style="color: ${friend.status === 'Online' ? '#4CAF50' : 'var(--medium-gray)'}">${friend.status}</div>
                        </div>
                    </div>
                    <button class="friend-action-btn">Mensaje</button>
                </div>
            `;
        });
        
        // Render Sugeridos
        if (suggestedFriends.length > 0) {
            friendsHtml += '<h2 class="section-title">Sugeridos</h2>';
            suggestedFriends.forEach(friend => {
                friendsHtml += `
                    <div class="friend-item">
                        <div class="friend-details">
                            <div class="friend-avatar"><i class="fas fa-user"></i></div>
                            <div>
                                <div class="friend-name">${friend.name}</div>
                                <div class="friend-status" style="color: ${friend.status === 'Online' ? '#4CAF50' : 'var(--medium-gray)'}">${friend.status}</div>
                            </div>
                        </div>
                        <button class="friend-action-btn add-btn">Añadir</button>
                    </div>
                `;
            });
        }

        friendsListContainer.innerHTML = friendsHtml;
    }
    
    // Renderiza los coleccionables con sus nuevos nombres y metas
    function renderCollectibles() {
        collectiblesListContainer.innerHTML = '';
        collectibles.forEach(item => {
            const collectibleItem = `
                <div class="collectible-item">
                    <div class="collectible-icon"><i class="${item.icon}"></i></div>
                    <div class="collectible-info">
                        <div class="collectible-title">${item.title}</div>
                        <div class="collectible-meta">${item.meta}</div>
                    </div>
                </div>
            `;
            collectiblesListContainer.innerHTML += collectibleItem;
        });
    }
    
    // Renderiza las rutinas modelo
    function renderRoutines() {
        routinesListContainer.innerHTML = '';
        routines.forEach(routine => {
            const routineCard = `
                <div class="routine-card">
                    <div class="routine-details">
                        <h3>${routine.title}</h3>
                        <p>${routine.exercises}</p>
                    </div>
                    <button class="start-routine-btn">INICIAR</button>
                </div>
            `;
            routinesListContainer.innerHTML += routineCard;
        });
    }

    // Sol Muv: Asigna una frase motivacional aleatoria
    function updateSunMuv() {
        const randomIndex = Math.floor(Math.random() * sunMuvPhrases.length);
        sunMuvPhraseElement.textContent = sunMuvPhrases[randomIndex];
    }
    
    // Actualiza los días de racha
    function updateStreak() {
        let currentStreak = parseInt(localStorage.getItem('streak') || 5);
        streakCount.textContent = currentStreak;
        consecutiveDaysStat.textContent = currentStreak;
    }

    // --- Event Listeners y Lógica ---

    // Reinicia el progreso
    resetButton.addEventListener('click', function() {
        localStorage.setItem('streak', '0');
        localStorage.removeItem('lastCompletionDate');
        updateStreak();
        alert('Racha y Progreso reiniciados (Simulación).');
    });

    // Inicialización
    renderEvents();
    renderFriendsList();
    renderCollectibles();
    renderRoutines();
    updateSunMuv();
    updateStreak();
    
    // Se asegura de que la pestaña de inicio esté activa al cargar
    navigateTo('home-screen');
});
