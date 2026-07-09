// Demo password - change this in production
const DEMO_PASSWORD = 'demo123';

// Colors for the color game
const COLORS = [
    { name: 'Rot', color: '#e53935' },
    { name: 'Blau', color: '#1e88e5' },
    { name: 'Grün', color: '#43a047' },
    { name: 'Gelb', color: '#fdd835' },
    { name: 'Orange', color: '#fb8c00' },
    { name: 'Lila', color: '#8e24aa' }
];

// Emojis for counting game
const COUNT_EMOJIS = ['🍎', '⭐', '🌸', '🐱', '❤️', '🌈'];

let currentColorAnswer = null;
let currentCountAnswer = null;
let breathingInterval = null;
let currentAnchorPhoto = null;

// Demo anchors (stored in memory for demo)
let memoryAnchors = [
    { id: 1, title: 'Unser Hochzeitstag', description: 'Hamburg, 1975', photo: null },
    { id: 2, title: 'Enkelkind Lisa', description: 'Erster Schultag', photo: null }
];

// ===== Password & Navigation =====
function checkPassword() {
    const input = document.getElementById('access-password');
    const error = document.getElementById('password-error');
    
    if (input.value === DEMO_PASSWORD) {
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('patient-screen').classList.remove('hidden');
        error.classList.add('hidden');
        updateTime();
        setInterval(updateTime, 1000);
    } else {
        error.classList.remove('hidden');
        input.value = '';
        input.focus();
    }
}

function logout() {
    document.getElementById('patient-screen').classList.add('hidden');
    document.getElementById('password-screen').classList.remove('hidden');
    document.getElementById('access-password').value = '';
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// ===== Time Display =====
function updateTime() {
    const now = new Date();
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('current-date');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;
    
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()}. ${months[now.getMonth()]} ${now.getFullYear()}`;
}

// ===== Games =====
function showGame(type) {
    if (type === 'color') {
        document.getElementById('color-modal').classList.remove('hidden');
        nextColorRound();
    } else if (type === 'counting') {
        document.getElementById('counting-modal').classList.remove('hidden');
        nextCountingRound();
    }
}

// Color Game
function nextColorRound() {
    const feedback = document.getElementById('color-feedback');
    feedback.classList.add('hidden');
    
    // Pick random color as answer
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    const options = shuffled.slice(0, 4);
    currentColorAnswer = options[Math.floor(Math.random() * 4)];
    
    // Display question
    document.getElementById('color-question').textContent = `Tippen Sie auf: ${currentColorAnswer.name}`;
    
    // Display color buttons
    const grid = document.getElementById('color-options');
    grid.innerHTML = '';
    options.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.style.backgroundColor = c.color;
        btn.textContent = c.name;
        btn.onclick = () => checkColorAnswer(c.name);
        grid.appendChild(btn);
    });
}

function checkColorAnswer(selected) {
    const feedback = document.getElementById('color-feedback');
    feedback.classList.remove('hidden');
    
    if (selected === currentColorAnswer.name) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✓ Richtig! Sehr gut!';
    } else {
        feedback.className = 'feedback wrong';
        feedback.textContent = `✗ Das war ${selected}. Richtig wäre: ${currentColorAnswer.name}`;
    }
}

// Counting Game
function nextCountingRound() {
    const feedback = document.getElementById('counting-feedback');
    feedback.classList.add('hidden');
    
    // Random count between 1 and 6
    currentCountAnswer = Math.floor(Math.random() * 6) + 1;
    const emoji = COUNT_EMOJIS[Math.floor(Math.random() * COUNT_EMOJIS.length)];
    
    // Display objects
    const display = document.getElementById('counting-objects');
    display.innerHTML = '';
    for (let i = 0; i < currentCountAnswer; i++) {
        const span = document.createElement('span');
        span.textContent = emoji;
        display.appendChild(span);
    }
    
    // Display number buttons
    const grid = document.getElementById('counting-options');
    grid.innerHTML = '';
    for (let i = 1; i <= 8; i++) {
        const btn = document.createElement('button');
        btn.className = 'count-btn';
        btn.textContent = i;
        btn.onclick = () => checkCountAnswer(i);
        grid.appendChild(btn);
    }
}

function checkCountAnswer(selected) {
    const feedback = document.getElementById('counting-feedback');
    feedback.classList.remove('hidden');
    
    if (selected === currentCountAnswer) {
        feedback.className = 'feedback correct';
        feedback.textContent = '✓ Richtig! Sehr gut!';
    } else {
        feedback.className = 'feedback wrong';
        feedback.textContent = `✗ Es waren ${currentCountAnswer} Objekte.`;
    }
}

// ===== Calming Screen =====
function showCalm() {
    document.getElementById('calm-modal').classList.remove('hidden');
}

function startBreathing() {
    const circle = document.getElementById('breathing-circle');
    const text = document.getElementById('breathing-text');
    const btn = document.getElementById('breathing-btn');
    
    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
        circle.classList.remove('inhale', 'exhale');
        text.textContent = 'Start';
        btn.textContent = 'Atemübung starten';
        return;
    }
    
    btn.textContent = 'Stoppen';
    let inhale = true;
    
    function breathe() {
        if (inhale) {
            circle.classList.remove('exhale');
            circle.classList.add('inhale');
            text.textContent = 'Einatmen...';
        } else {
            circle.classList.remove('inhale');
            circle.classList.add('exhale');
            text.textContent = 'Ausatmen...';
        }
        inhale = !inhale;
    }
    
    breathe();
    breathingInterval = setInterval(breathe, 4000);
}

// ===== Memory Anchors =====
function showAnchors() {
    document.getElementById('anchor-modal').classList.remove('hidden');
    renderAnchors();
}

function renderAnchors() {
    const list = document.getElementById('anchors-list');
    const noAnchors = document.getElementById('no-anchors');
    
    if (memoryAnchors.length === 0) {
        list.innerHTML = '';
        noAnchors.classList.remove('hidden');
    } else {
        noAnchors.classList.add('hidden');
        list.innerHTML = memoryAnchors.map(anchor => `
            <div class="anchor-card">
                <div style="height: 120px; background: linear-gradient(135deg, #e1bee7, #ce93d8); display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                    ${anchor.photo ? `<img src="${anchor.photo}" alt="${anchor.title}">` : '💝'}
                </div>
                <div class="anchor-card-info">
                    <div class="anchor-card-title">${anchor.title}</div>
                    <div class="anchor-card-desc">${anchor.description || ''}</div>
                </div>
            </div>
        `).join('');
    }
}

function showAddAnchor() {
    document.getElementById('add-anchor-modal').classList.remove('hidden');
    // Reset form
    document.getElementById('anchor-title').value = '';
    document.getElementById('anchor-description').value = '';
    document.getElementById('anchor-preview').innerHTML = '<span>📷</span>';
    currentAnchorPhoto = null;
}

function handleAnchorPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentAnchorPhoto = e.target.result;
            document.getElementById('anchor-preview').innerHTML = `<img src="${currentAnchorPhoto}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

function saveAnchor() {
    const title = document.getElementById('anchor-title').value.trim();
    const description = document.getElementById('anchor-description').value.trim();
    
    if (!title) {
        alert('Bitte geben Sie einen Titel ein.');
        return;
    }
    
    memoryAnchors.push({
        id: Date.now(),
        title: title,
        description: description,
        photo: currentAnchorPhoto
    });
    
    closeModal('add-anchor-modal');
    renderAnchors();
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    // Start time immediately
    updateTime();
    setInterval(updateTime, 1000);
    
    document.getElementById('access-password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
});
