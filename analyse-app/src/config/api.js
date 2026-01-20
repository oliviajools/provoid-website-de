// API-Konfiguration
// Für Entwicklung: leer lassen (nutzt Vite Proxy)
// Für Produktion: Hetzner-Server-URL eintragen, z.B. 'https://api.provoid.de'

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
