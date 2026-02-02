// API-Konfiguration
// Nginx entfernt /analyse prefix, daher einfach relative Pfade verwenden

export const API_BASE_URL = '';

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
