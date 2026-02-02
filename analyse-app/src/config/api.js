// API-Konfiguration
// In Produktion: API läuft unter /analyse/api
// In Entwicklung: Vite Proxy leitet /api weiter

const isProduction = import.meta.env.PROD;
export const API_BASE_URL = isProduction ? '/analyse' : '';

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
