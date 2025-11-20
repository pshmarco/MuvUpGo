document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================
    // 1. OBTENCIÓN DE ELEMENTOS DOM
    // ==========================================================
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');
    const notificationBells = document.querySelectorAll('.notification-bell');
    const backArrows = document.querySelectorAll('.back-arrow');
    const startChallengeButton = document.getElementById('start-challenge-button');
    const addFriendButton = document.querySelector('.add-friend-button');
    const openRoutinesButton = document.getElementById('open-routines-button');
    const createEventButton = document.getElementById('create-event-button');
    const createEventModal = document.getElementById('create-event-modal');
    const closeCreateEventButton = document.getElementById('close-create-event');
    const cancelCreateEventButton = document.getElementById('cancel-create-event');
    const createEventForm = document.getElementById('create-event-form');
    const unlimitedBtn = document.getElementById('unlimited-btn');
    const limitedBtn = document.getElementById('limited-btn');
    const limitInputContainer = document.getElementById('limit-input-container');
    const limitNumberInput = document.getElementById('event-limit-number');
    const streakCount = document.getElementById('streak-count');
    const consecutiveDaysStat = document.getElementById('consecutive-days-stat');
    const resetButton = document.getElementById('reset-button');
    const eventsListContainer = document.getElementById('events-list');
    const friendsListContainer = document.getElementById('friends-list');
    const collectiblesListContainer = document.getElementById('collectibles-list-container');
    const sunMuvPhraseElement = document.getElementById('sun-muv-phrase');
    const routinesListContainer = document.getElementById('routines-list');
    const socialFeedContainer = document.getElementById('social-feed');
    const activityPills = document.querySelectorAll('.activity-pill');
    const friendsFilterPills = document.querySelectorAll('#friends-filter-pills .filter-pill');
    const mapContainer = document.getElementById('map-container');

    // Elementos del Mapa necesarios para la lógica de pines
    const mapInfoPanel = document.querySelector('.map-info-panel'); // Asumido
    const mapGoToEventButton = document.getElementById('map-go-to-event'); // ✅ Corregido el ID
    const mapEventTitle = document.getElementById('map-event-title'); // Asumido
    const mapEventLocation = document.getElementById('map-event-location'); // Asumido

    // Elementos del Perfil
    const levelCharacter = document.getElementById('level-character');
    const profileLevelElement = document.querySelector('#profile-screen .profile-level');
    const profileGreetingIcon = document.querySelector('.greeting-icon');

    const darkModeToggle = document.getElementById('dark-mode-toggle'); 

    // ==========================================================
    // 2. DATA DE LA APLICACIÓN (¡ESTO FALTABA!)
    // ==========================================================

    let userLevel = 6; 
    let currentMapBgIndex = 0;
    let currentActivityFilter = 'all';
    let currentFriendFilter = 'all';

const allEvents = [
    // 🎯 NUEVO: EVENTO FIJO DE LA SEMANA (¡Seguro y en Casa!) 🎯
    {
        id: 'weekly-home-challenge',
        title: 'Burpees & Sentadillas',
        type: 'community', // Tipo: para que no se filtre con 'Solo Amigos'
        tag: 'general', // Etiqueta: para que se muestre con el filtro 'Todo'
        description: '¡Mantente activo y seguro! Entrena desde casa para ganar progreso extra esta semana.',
        date: 'Cada Semana',
        location: 'Tu Casa (Virtual)',
        participants: 'Tú mismo ⭐',
        isWeeklyEvent: true // PROPIEDAD CLAVE para reconocerlo en el renderizado
    },
    // -------------------------------------------------------------
    // TUS EVENTOS ANTERIORES (ahora en la segunda posición en adelante)
    { title: 'FutCristobal', description: 'Para hacer deporte :D', icon: 'fas fa-futbol', cost: 'Gratis', location: 'Cancha -3 851', participants: '2/14', tag: 'soccer', isFriendEvent: true, mapCoords: { top: '15%', left: '75%' } },
    { title: 'Torneo Basket 3v3', description: 'Torneo amistoso benéfico.', icon: 'fas fa-basketball-ball', cost: '$5.000 CLP', location: 'Gimnasio Quinta Normal', participants: '6/6 (Lleno)', tag: 'basketball', isFriendEvent: false, mapCoords: { top: '30%', left: '20%' } },
    { title: 'Clase de Yoga Matinal', description: 'Sesión de estiramiento y meditación.', icon: 'fas fa-hand-holding-heart', cost: 'Gratis', location: 'Salón MACVM', participants: '12/20', tag: 'yoga', isFriendEvent: false, mapCoords: { top: '65%', left: '70%' } },
    { title: 'Gym (asesorado)', description: 'Ruta fácil para principiantes.', icon: 'fas fa-dumbbell', cost: 'Gratis (Para UChile)', location: 'Gimnasio -3 851', participants: '10/15', tag: 'gym', isFriendEvent: false, mapCoords: { top: '10%', left: '80%' } },
    { title: 'Carrera 5K Comunitaria', description: 'Ruta de 5km por el borde del río.', icon: 'fas fa-running', cost: 'Gratis', location: 'Cajón del Maipo', participants: '85 inscritos', tag: 'running', isFriendEvent: false, mapCoords: { top: '80%', left: '45%' } },
    { title: 'Pichanga de Fin de Semana', description: 'Fútbol amateur en la cancha del barrio.', icon: 'fas fa-futbol', cost: '$1.000 CLP', location: 'Cancha Pajaritos', participants: '15/22', tag: 'soccer', isFriendEvent: false, mapCoords: { top: '50%', left: '50%' } }
];

    const friendsList = [
        { name: 'Agustín Henríquez', status: 'Online', isFriend: true },
        { name: 'Cristóbal Garrido', status: 'Online', isFriend: true },
        { name: 'Marco Soto', status: 'Offline', isFriend: true },
        { name: 'Martín Vilches', status: 'Online', isFriend: false },
        { name: 'Vicente Colorín', status: 'Offline', isFriend: false },
        { name: 'Huevito Rey', status: 'Online', isFriend: false }
    ];

    const socialUsers = friendsList.filter(f => f.isFriend);
    const postCaptions = [
        "Me genera mucha impotencia que Chile Sub-20 pierda 3 partidos de 4, y luego el entrenador salga a declarar que tuvieron más posesión y que sometieron¿ a los rivales. No sé que se cree el payaso ese, no le ha ganado a nadie y declara como si fuera Guardiola, por eso Chile está como está 😠😠.",
        "Sinceramente, ¿cuál creen que es la verdadera razón por la que Leandro Fernandez bajó muchísimo el rendimiento del 2024? Yo pienso que es una mezcla entre su lesión y el cambio de esquema del equipo. #VamosLaU 💙🤘",
        "Finalmente aceptas tu destino: hacer deporte, trabajar, estar solo y ser buena persona.",
    ];

    const collectibles = [
        { icon: 'fas fa-futbol', title: 'Futbolín', meta: 'Por participar en 10 eventos de Fútbol.' },
        { icon: 'fas fa-heart', title: 'Fiel con la Racha', meta: 'Por completar 5 días de racha consecutivos.' },
        { icon: 'fas fa-mountain', title: 'Listo para el Everest', meta: 'Por finalizar un evento de Escalada o Montaña.' },
    ];

    const sunMuvPhrases = [
        "La felicidad no es tener lo que quieres, sino que querer lo que tienes",
        "No cuentes los días, hazlos contar",
        "No eres lo que logras, eres lo que superas",
        "Si no te gusta algo, cámbialo. Si no puedes cambiarlo, cambia tu actitud",
        "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito",
        "La mejor manera de predecir el futuro es crearlo",
        "No importa que tan lento, siempre avanza",
        "No te compares con los demás, compárate contigo mismo",
        "La vida es un 10% lo que te pasa y un 90% cómo te comportas",
        "No esperes que pase la tormenta, aprende a bailar bajo la lluvia",
        "El humano solamente vive dos vidas, y la segundaempieza el dia que se da cuenta que tiene una sola",
        "Si no destacas por talento, hazlo por disciplina hasta que parezca que naciste para ello"
    ];

    const routines = [
        { title: 'Fuerza', exercises: '10x Sentadillas, 10x Flexiones, 20x Zancadas.' },
        { title: 'Cardio', exercises: 'Saltos de Tijera, Rodillas al pecho, Escaladores.' },
        { title: 'Core', exercises: 'Plancha, Crunches, Levantamiento de piernas.' },
    ];

    // ==========================================================
    // 3. FUNCIONES (DEFINIDAS ANTES DE SER LLAMADAS)
    // ==========================================================

// ... (Tus funciones existentes: navigateTo, renderEvents, etc.) ...

// ------------------------------------------------------------------------
// --- 3.X Función del Modo Oscuro ---
// ------------------------------------------------------------------------

function toggleDarkMode() {
    // 1. Alterna la clase 'dark-mode' en el body
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // 2. Guarda la preferencia en el navegador
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Opcional: Asegura que el estado del switch refleje el tema
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
    }
}

    // --- 3.1 Funciones de Navegación ---
    function navigateTo(screenId) {
        if (screenId === 'messages-screen') {
            document.querySelector('#messages-screen .back-arrow').setAttribute('data-screen', 'home-screen'); 
        } else {
            navItems.forEach(nav => nav.classList.remove('active'));
            const targetNav = document.querySelector(`.nav-item[data-screen="${screenId}"]`);
            if (targetNav) {
                targetNav.classList.add('active');
            }
        }
        
        screens.forEach(screen => screen.classList.remove('active'));
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            // Mantenemos esta línea con la variable mapInfoPanel, asumiendo que existe en el HTML
            if (screenId !== 'map-screen' && mapInfoPanel) {
                mapInfoPanel.classList.add('hidden');
            }
        }
    }
    
    // --- 3.2 Funciones de Renderizado ---
    
// En script.js, a partir de la línea 158

// Renderiza la lista de eventos con la funcionalidad de filtro
function renderEvents() {
    // 1. Identificar el evento fijo y separar los eventos dinámicos
    const fixedEvent = allEvents.find(event => event.isWeeklyEvent); // Busca el evento semanal
    let dynamicEvents = allEvents.filter(event => !event.isWeeklyEvent); // Deja solo los demás (los que se filtran)
    
    // Limpia el contenedor, ¡es crucial para el nuevo orden!
    eventsListContainer.innerHTML = ''; 
    
    // 2. Comprobar y Mostrar PRIMERO el Evento Fijo
    // Se muestra si el filtro de actividad es 'all' o 'general' (lo que definimos para el evento en casa)
    const isFilterCompatibleWithFixedEvent = currentActivityFilter === 'all' || currentActivityFilter === 'general';

    if (fixedEvent && isFilterCompatibleWithFixedEvent) {
        // Creamos la tarjeta del evento fijo
        const fixedCard = createEventCardDOM(fixedEvent, true); // Usamos una nueva función para crear el DOM
        eventsListContainer.appendChild(fixedCard);
    }
    
    // 3. Filtrar y Mostrar los Eventos Dinámicos
    let dynamicEventsFound = false;

    dynamicEvents.forEach(event => {
        // Lógica de filtro:
        const matchesActivity = currentActivityFilter === 'all' || event.tag === currentActivityFilter;
        let matchesFriendship;
        if (currentFriendFilter === 'all') {
            matchesFriendship = true;
        } else if (currentFriendFilter === 'community') {
            // Un evento NO es de amigo. El evento fijo ya fue manejado.
            matchesFriendship = !event.isFriendEvent; 
        } else if (currentFriendFilter === 'friends') {
            matchesFriendship = event.isFriendEvent;
        }
        
        const isVisible = matchesActivity && matchesFriendship;
        
        if (isVisible) {
            const eventCard = createEventCardDOM(event, false); // Creamos la tarjeta dinámica
            eventsListContainer.appendChild(eventCard);
            dynamicEventsFound = true;
        }
    });

    // 4. Manejo de lista vacía
    if (!dynamicEventsFound && (!fixedEvent || !isFilterCompatibleWithFixedEvent)) {
         // ... (Tu código para mostrar el mensaje de "No hay eventos" si aplica) ...
    }
}


// En script.js, alrededor de la línea 147 (Reemplaza la función completa)
function createEventCardDOM(event, isFixedEvent) {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    
    // Añadimos una clase especial si es el evento fijo para darle un estilo único
    if (isFixedEvent) {
        eventCard.classList.add('fixed-weekly-event'); 
    }
    
    eventCard.classList.toggle('is-friend', event.isFriendEvent);
    eventCard.setAttribute('data-tag', event.tag);
    
    // El indicador para el evento de un 'Bulla' o para el evento fijo
    let indicatorHTML;
    if (isFixedEvent) {
        // Mantiene tu texto modificado 'Reto del Día 🏆'
        indicatorHTML = `<p style="color: var(--accent); font-weight: 700;"> Reto del Día 🏆</p>`; 
    } else if (event.isFriendEvent) {
        indicatorHTML = `<p style="color: var(--secondary); font-weight: 700;">¡Evento de un Bulla!</p>`;
    } else {
        indicatorHTML = `<p>${event.description}</p>`;
    }
    
    // 🎯 CORRECCIÓN CLAVE: Define el costo
    // Usa 'event.cost' si existe; si es nulo o indefinido, usa 'Gratis'.
    const eventCost = event.cost || 'Unirme'; 
    // ------------------------------------

    eventCard.innerHTML = `
        <div class="event-top">
            <div class="event-info">
                <h3>${event.title}</h3>
                ${indicatorHTML}
            </div>
            <div class="event-cost">${eventCost}</div>
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
    `;
    return eventCard;
}

    // Renderiza la lista de amigos
    function renderFriendsList() {
        const myFriends = friendsList.filter(f => f.isFriend);
        const suggestedFriends = friendsList.filter(f => !f.isFriend);

        friendsListContainer.innerHTML = '';

        let friendsHtml = '';

        // Render Tus Bullas
        if (myFriends.length > 0) {
            friendsHtml += '<h2 class="friendsss-title">Tus Bullas</h2>';
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
        }
        
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
    
    // Renderiza los coleccionables (Ahora en Perfil)
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

    // Inicializa la pantalla de Red Social (Simulación con captions variados)
    function renderSocialFeed() {
        socialFeedContainer.innerHTML = '';
        
        // Sección "Tus Bullas" (Amigos)
        const friendsSection = document.createElement('div');
        friendsSection.innerHTML = '<h2 class="section-title">Tus Bullas</h2>';
        socialFeedContainer.appendChild(friendsSection);
        
        socialUsers.forEach((user, index) => {
            const post = document.createElement('div');
            post.classList.add('social-post');
            
            const caption = postCaptions[index % postCaptions.length];
            const timeAgo = ['Hace 2h', 'Hace 1h', 'Hace 30min', 'Hace 15min'][index % 4];
            const initialLikes = Math.floor(Math.random() * 50) + 5; 
            
            post.innerHTML = `
                <div class="post-header">
                    <div class="post-avatar"><i class="fas fa-user"></i></div>
                    <span class="post-username">${user.name}</span>
                </div>
                <div class="post-content">
                    ${caption}
                </div>
                <div class="post-actions">
                    <div class="like-section">
                        <i class="far fa-heart like-button"></i>
                        <span class="like-count">${initialLikes}</span>
                    </div>
                    <span class="post-time">${timeAgo}</span>
                </div>
            `;
            
            const likeButton = post.querySelector('.like-button');
            const likeCount = post.querySelector('.like-count');
            let currentLikes = initialLikes;
            let isLiked = false;
            
            likeButton.addEventListener('click', function() {
                if (!isLiked) {
                    this.classList.add('liked');
                    this.classList.remove('far');
                    this.classList.add('fas');
                    currentLikes++;
                    isLiked = true;
                } else {
                    this.classList.remove('liked');
                    this.classList.remove('fas');
                    this.classList.add('far');
                    currentLikes--;
                    isLiked = false;
                }
                likeCount.textContent = currentLikes;
            });

            socialFeedContainer.appendChild(post);
        });
        
        // Sección "Recomendaciones y Comunidad"
        const communitySection = document.createElement('div');
        communitySection.innerHTML = '<h2 class="section-title">Recomendaciones y Comunidad</h2>';
        socialFeedContainer.appendChild(communitySection);
        
        // Posts de la comunidad (usuarios no amigos)
        const communityUsers = friendsList.filter(f => !f.isFriend);
        const communityCaptions = [
            "No puede ser que el desastre de Harry Maguire sea futbolista profesional, y despúes estoy yo que entreno todos los días para nada, cada vez veo más lejano el sueño de ser futbolista profesional, aún más cuando veo en la tele que hay chicos de 17 en europa. Me toco estudiar para cálculo no más 😔😔😔.",
            "Hace rato que no salía a trotar en la mañana, definitivamente mejoró mi estado de ánimo y dormí re bien. Recomendado por la Universidad de Coloros, Colorado.",
            "Hola, estoy funado, pero gracias a MuvUp Go! me estoy rehabilitando para ser un ciudadano ejemplar. Sin duda la mejor aplicación que he visto en los últimos 5 minutos (me acabo de despertar)."
        ];
        
        communityUsers.forEach((user, index) => {
            const post = document.createElement('div');
            post.classList.add('social-post');
            
            const caption = communityCaptions[index % communityCaptions.length];
            const timeAgo = ['Hace 4h', 'Hace 6h', 'Hace 1d', 'Hace 2d'][index % 4];
            const initialLikes = Math.floor(Math.random() * 30) + 2;
            
            post.innerHTML = `
                <div class="post-header">
                    <div class="post-avatar"><i class="fas fa-users"></i></div>
                    <span class="post-username">${user.name}</span>
                </div>
                <div class="post-content">
                    ${caption}
                </div>
                <div class="post-actions">
                    <div class="like-section">
                    <i class="far fa-heart like-button"></i>
                        <span class="like-count">${initialLikes}</span>
                </div>
                    <span class="post-time">${timeAgo}</span>
                </div>
            `;
            
            const likeButton = post.querySelector('.like-button');
            const likeCount = post.querySelector('.like-count');
            let currentLikes = initialLikes;
            let isLiked = false;
            
            likeButton.addEventListener('click', function() {
                if (!isLiked) {
                    this.classList.add('liked');
                    this.classList.remove('far');
                    this.classList.add('fas');
                    currentLikes++;
                    isLiked = true;
                } else {
                    this.classList.remove('liked');
                    this.classList.remove('fas');
                    this.classList.add('far');
                    currentLikes--;
                    isLiked = false;
                }
                likeCount.textContent = currentLikes;
            });

            socialFeedContainer.appendChild(post);
        });
    }

    // Inicializa la pantalla de Mapa (Simulación)
    function renderMapPins() {
        mapContainer.querySelectorAll('.map-pin').forEach(pin => pin.remove());
        
        allEvents.forEach(event => {
            if (event.mapCoords) {
                const pin = document.createElement('i');
                pin.classList.add('fas', 'fa-map-marker-alt', 'map-pin');
                pin.style.top = event.mapCoords.top;
                pin.style.left = event.mapCoords.left;
                pin.setAttribute('data-event-title', event.title);
                pin.setAttribute('data-event-location', event.location);
                pin.setAttribute('data-event-tag', event.tag);
                pin.setAttribute('data-event-friend', event.isFriendEvent ? 'true' : 'false');

                pin.addEventListener('click', function() {
                    // Verificamos si los elementos existen antes de usarlos
                    if (mapEventTitle) mapEventTitle.textContent = this.getAttribute('data-event-title');
                    if (mapEventLocation) mapEventLocation.textContent = this.getAttribute('data-event-location');
                    if (mapInfoPanel) mapInfoPanel.classList.remove('hidden');
                    
                    if (mapGoToEventButton) {
                        mapGoToEventButton.setAttribute('data-event-tag', this.getAttribute('data-event-tag'));
                        mapGoToEventButton.setAttribute('data-friend-event', this.getAttribute('data-event-friend')); 
                    }
                });
                
                mapContainer.appendChild(pin);
            }
        });
    }

    // Lógica del Personaje de Nivel (Copiado de tu código)
    function updateLevelCharacter() {
        let iconClass = '';
        let levelText = '';
        let levelColor = '';
        let characterDescription = '';

        if (profileLevelElement) {
             profileLevelElement.textContent = `Nivel ${userLevel}`;
        }
        
        if (userLevel <= 2) {
            iconClass = 'fas fa-child';
            levelText = 'Novato';
            levelColor = '#FFC107'; 
            characterDescription = 'Un principiante tímido comenzando su viaje';
        } else if (userLevel <= 4) {
            iconClass = 'fas fa-walking';
            levelText = 'Caminante';
            levelColor = '#4CAF50';
            characterDescription = 'Un caminante decidido ganando confianza';
        } else if (userLevel <= 6) {
            iconClass = 'fas fa-running';
            levelText = 'Corredor';
            levelColor = '#2196F3';
            characterDescription = 'Un corredor enérgico mejorando su resistencia';
        } else if (userLevel <= 8) {
            iconClass = 'fas fa-dumbbell';
            levelText = 'Entrenador';
            levelColor = '#FF9800';
            characterDescription = 'Un entrenador dedicado construyendo fuerza';
        } else if (userLevel <= 10) {
            iconClass = 'fas fa-fire';
            levelText = 'Atleta';
            levelColor = '#F44336';
            characterDescription = 'Un atleta apasionado con gran determinación';
        } else if (userLevel <= 12) {
            iconClass = 'fas fa-mountain';
            levelText = 'Escalador';
            levelColor = '#795548';
            characterDescription = 'Un escalador audaz conquistando desafíos';
        } else if (userLevel <= 14) {
            iconClass = 'fas fa-bolt';
            levelText = 'Velocista';
            levelColor = '#9C27B0';
            characterDescription = 'Un velocista explosivo con gran potencia';
        } else if (userLevel <= 16) {
            iconClass = 'fas fa-shield-alt';
            levelText = 'Guerrero';
            levelColor = '#607D8B';
            characterDescription = 'Un guerrero disciplinado con gran resistencia';
        } else if (userLevel <= 18) {
            iconClass = 'fas fa-trophy';
            levelText = 'Campeón';
            levelColor = '#FFD700';
            characterDescription = 'Un campeón experimentado dominando su arte';
        } else if (userLevel <= 19) {
            iconClass = 'fas fa-crown';
            levelText = 'Maestro';
            levelColor = '#E91E63';
            characterDescription = 'Un maestro legendario con habilidades supremas';
        } else {
            iconClass = 'fas fa-star';
            levelText = 'Leyenda';
            levelColor = '#00BCD4';
            characterDescription = 'Una leyenda viviente, el pináculo del deporte';
        }
        
        if (levelCharacter) {
            levelCharacter.innerHTML = `
                <div class="character-container" title="${characterDescription}">
                    <i class="${iconClass}" style="color: ${levelColor}; font-size: 2rem;"></i>
                    <div class="character-glow" style="box-shadow: 0 0 20px ${levelColor}40;"></div>
                </div>
            `;
        }
    }


    // Sol Muv: Asigna una frase motivacional aleatoria
    function updateSunMuv() {
        const randomIndex = Math.floor(Math.random() * sunMuvPhrases.length);
        if (sunMuvPhraseElement) {
             sunMuvPhraseElement.textContent = sunMuvPhrases[randomIndex];
        }
    }
    
    // Actualiza los días de racha
    function updateStreak() {
        let currentStreak = parseInt(localStorage.getItem('streak') || 5);
        if (streakCount) streakCount.textContent = currentStreak;
        if (consecutiveDaysStat) consecutiveDaysStat.textContent = currentStreak;
    }

// ==========================================================
// 4. LISTENERS DE EVENTOS (ROBUSTO)
// ==========================================================

// 1. Listeners de Modo Oscuro (solo si existe el switch)
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', toggleDarkMode); 
}

// --- 4.1 Navegación (Generalmente seguros con querySelectorAll) ---
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const screenId = this.getAttribute('data-screen');
        navigateTo(screenId);
    });
});

notificationBells.forEach(bell => {
    bell.addEventListener('click', () => navigateTo('messages-screen'));
});

backArrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
        const screenId = this.getAttribute('data-screen');
        navigateTo(screenId);
    });
});

// --- LISTENERS PARA LOS FILTROS DE EVENTOS (¡NUEVO BLOQUE!) ---

// Filtros de Actividad (Running, Yoga, etc.)
activityPills.forEach(pill => {
    pill.addEventListener('click', function() {
        const newFilter = this.getAttribute('data-filter');
        currentActivityFilter = newFilter;

        // Actualiza la clase 'active-pill' para el estilo
        activityPills.forEach(p => p.classList.remove('active-pill'));
        this.classList.add('active-pill');

        // Vuelve a renderizar la lista de eventos con el nuevo filtro
        renderEvents();
    });
});

// Filtros de Amigos/Comunidad/Todos
friendsFilterPills.forEach(pill => {
    pill.addEventListener('click', function() {
        const newFilter = this.getAttribute('data-filter');
        currentFriendFilter = newFilter;

        // Actualiza la clase 'active-filter' para el estilo
        friendsFilterPills.forEach(p => p.classList.remove('active-filter'));
        this.classList.add('active-filter');

        // Vuelve a renderizar la lista de eventos con el nuevo filtro
        renderEvents();
    });
});

// Botón "Ver en Hub" (Ahora que el elemento fue encontrado)
if (mapGoToEventButton) {
    mapGoToEventButton.addEventListener('click', function() {
        // En un proyecto completo, esta lógica aplicaría el filtro del evento seleccionado en el mapa
        // Pero por ahora, solo aseguramos que navegue a la pantalla de Eventos
        navigateTo('challenges-screen'); 
    });
}

// --- 4.2 Botones de Acción Individuales (NECESITAN if) ---
if (startChallengeButton) { // ✅ AÑADIDO IF
    startChallengeButton.addEventListener('click', function() { navigateTo('challenges-screen'); });
}

if (addFriendButton) { // ✅ AÑADIDO IF
    addFriendButton.addEventListener('click', function() { navigateTo('friends-screen'); });
}

if (openRoutinesButton) { // ✅ AÑADIDO IF
    openRoutinesButton.addEventListener('click', function() { navigateTo('routines-screen'); });
}

if (profileGreetingIcon) { // (Ya lo tenías, bien!)
    profileGreetingIcon.addEventListener('click', () => navigateTo('profile-screen'));
}

// Tu bloque del mapa ya estaba bien envuelto, solo tienes que asegurarte
// de que no esté DENTRO del IF de darkModeToggle.

if (mapGoToEventButton) {
    mapGoToEventButton.addEventListener('click', function() {
        // ... (Tu lógica existente aquí) ...
    });
}


// --- 4.4 Modales y Formularios (NECESITAN if) ---

if (createEventButton) { // ✅ AÑADIDO IF
    createEventButton.addEventListener('click', function() { createEventModal.classList.remove('hidden'); });
}

if (closeCreateEventButton) { // ✅ AÑADIDO IF
    closeCreateEventButton.addEventListener('click', function() { createEventModal.classList.add('hidden'); });
}

if (cancelCreateEventButton) { // ✅ AÑADIDO IF
    cancelCreateEventButton.addEventListener('click', function() { createEventModal.classList.add('hidden'); });
}

if (createEventModal) { // ✅ AÑADIDO IF
    createEventModal.addEventListener('click', function(e) { 
        if (e.target === createEventModal) createEventModal.classList.add('hidden'); 
    });
}

if (unlimitedBtn) { // ✅ AÑADIDO IF
    unlimitedBtn.addEventListener('click', function() {
        unlimitedBtn.classList.add('active');
        limitedBtn.classList.remove('active');
        if (limitInputContainer) limitInputContainer.classList.add('hidden'); // Chequear contenedor también
        if (limitNumberInput) limitNumberInput.removeAttribute('required'); // Chequear input también
    });
}

if (limitedBtn) { // ✅ AÑADIDO IF
    limitedBtn.addEventListener('click', function() {
        limitedBtn.classList.add('active');
        unlimitedBtn.classList.remove('active');
        if (limitInputContainer) limitInputContainer.classList.remove('hidden'); // Chequear contenedor
        if (limitNumberInput) limitNumberInput.setAttribute('required', 'required'); // Chequear input
    });
}

if (createEventForm) { // ✅ AÑADIDO IF
    createEventForm.addEventListener('submit', function(e) {
        // ... (Tu lógica de formulario aquí) ...
    });
}


// --- 4.5 Reset de Racha (Perfil) ---
if (resetButton) { // ✅ AÑADIDO IF
    resetButton.addEventListener('click', function() {
        localStorage.setItem('streak', '0');
        localStorage.removeItem('lastCompletionDate');
        updateStreak();
        updateLevelCharacter();
    });
}

// ==========================================================
// 5. INICIALIZACIÓN (LLAMADAS DE FUNCIONES)
// ==========================================================

// 1. LÓGICA DEL MODO OSCURO (Solo aplica el tema guardado)
// ESTE BLOQUE DEBE ESTAR SEPARADO PARA QUE EL RESTO DEL SCRIPT CORRA
if (localStorage.getItem('theme') === 'dark') { 
    document.body.classList.add('dark-mode');
    if (darkModeToggle) {
        darkModeToggle.checked = true; 
    }
}

// 2. EJECUCIÓN DE TODAS LAS FUNCIONES DE INICIALIZACIÓN
// ESTO SE EJECUTA SIEMPRE, SIN IMPORTAR EL MODO DE COLOR.
updateLevelCharacter();
updateSunMuv();
updateStreak();
renderEvents(); 
renderFriendsList();
renderCollectibles();
renderRoutines();
renderSocialFeed();
renderMapPins();

// 3. Muestra la pantalla inicial
navigateTo('home-screen');
})
// NOTA: El cierre del 'DOMContentLoaded' debe ir al final de todo el archivo.
