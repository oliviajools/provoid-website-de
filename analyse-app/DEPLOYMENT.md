# Deployment Guide - NeuroAthletic Analyse auf Hetzner

## Übersicht

| Komponente | Port | Pfad |
|------------|------|------|
| Next.js Website | 3000 | / |
| Analyse Backend | 3001 | /api, /analyse |

---

## 1. Server-Vorbereitung (Hetzner CX22)

### 1.1 Server erstellen
1. Hetzner Cloud Console → Neues Projekt → Server hinzufügen
2. **Location:** Falkenstein oder Nürnberg (DE)
3. **Image:** Ubuntu 24.04
4. **Typ:** CX22 (2 vCPU, 4GB RAM, €4.35/Monat)
5. **SSH Key hinzufügen** (empfohlen)

### 1.2 Erste Verbindung
```bash
ssh root@DEINE_SERVER_IP
```

### 1.3 System updaten & Basis-Pakete installieren
```bash
apt update && apt upgrade -y
apt install -y curl git nginx certbot python3-certbot-nginx ufw
```

### 1.4 Firewall einrichten
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

### 1.5 Node.js 20 LTS installieren
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v  # Sollte v20.x zeigen
```

### 1.6 PM2 installieren
```bash
npm install -g pm2
pm2 startup  # Folge den Anweisungen
```

### 1.7 Deploy-User erstellen (optional, aber empfohlen)
```bash
adduser deploy
usermod -aG sudo deploy
mkdir -p /var/www
chown -R deploy:deploy /var/www
```

---

## 2. Projekte deployen

### 2.1 Verzeichnisse erstellen
```bash
mkdir -p /var/www/provoid-website
mkdir -p /var/www/provoid-analyse
mkdir -p /var/log/pm2
chown -R deploy:deploy /var/www /var/log/pm2
```

### 2.2 Hauptwebsite (Next.js) deployen
```bash
cd /var/www/provoid-website
git clone https://github.com/oliviajools/provoid-website-de.git .
npm install
npm run build
```

### 2.3 Analyse-App deployen
```bash
cd /var/www/provoid-analyse
git clone https://github.com/DEIN_USERNAME/provoid-analyse.git .
npm install

# Frontend bauen
npm run build

# .env erstellen
cp .env.example .env.production
nano .env.production  # Anpassen falls nötig
```

---

## 3. PM2 Prozesse starten

### 3.1 Ecosystem-Datei kopieren
```bash
cd /var/www/provoid-analyse
cp ecosystem.config.cjs /var/www/
```

### 3.2 Beide Apps starten
```bash
cd /var/www
pm2 start ecosystem.config.cjs --env production

# Status prüfen
pm2 status
pm2 logs
```

### 3.3 PM2 beim Neustart automatisch starten
```bash
pm2 save
```

---

## 4. Nginx & SSL einrichten

### 4.1 DNS konfigurieren
Bei deinem Domain-Anbieter:
- **A Record:** `provoid.de` → `DEINE_SERVER_IP`
- **A Record:** `www.provoid.de` → `DEINE_SERVER_IP`

### 4.2 Nginx Konfiguration
```bash
# Konfiguration kopieren
cp /var/www/provoid-analyse/deploy/nginx/provoid.de.conf /etc/nginx/sites-available/provoid.de

# Aktivieren
ln -s /etc/nginx/sites-available/provoid.de /etc/nginx/sites-enabled/

# Default-Seite deaktivieren
rm /etc/nginx/sites-enabled/default

# Konfiguration testen
nginx -t

# Nginx neustarten
systemctl restart nginx
```

### 4.3 SSL-Zertifikat mit Let's Encrypt
```bash
# Zuerst ohne SSL starten (HTTP only)
# Temporär die SSL-Zeilen in der Nginx-Config auskommentieren

# Zertifikat holen
certbot --nginx -d provoid.de -d www.provoid.de

# Automatische Erneuerung testen
certbot renew --dry-run
```

---

## 5. Wartung & Updates

### 5.1 Analyse-App updaten
```bash
cd /var/www/provoid-analyse
git pull
npm install
npm run build
pm2 restart provoid-analyse
```

### 5.2 Website updaten
```bash
cd /var/www/provoid-website
git pull
npm install
npm run build
pm2 restart provoid-website
```

### 5.3 Logs anzeigen
```bash
pm2 logs                    # Alle Logs
pm2 logs provoid-analyse    # Nur Analyse-App
pm2 logs provoid-website    # Nur Website
```

### 5.4 Datenbank-Backup
```bash
# Manuelles Backup
cp /var/www/provoid-analyse/server/neuroathletic.db /var/backups/neuroathletic-$(date +%Y%m%d).db

# Automatisches tägliches Backup (Cron)
crontab -e
# Zeile hinzufügen:
0 3 * * * cp /var/www/provoid-analyse/server/neuroathletic.db /var/backups/neuroathletic-$(date +\%Y\%m\%d).db
```

---

## 6. Troubleshooting

### App startet nicht
```bash
pm2 logs provoid-analyse --lines 50
```

### Port bereits belegt
```bash
lsof -i :3001
kill -9 <PID>
```

### Nginx Fehler
```bash
nginx -t
tail -f /var/log/nginx/provoid.de.error.log
```

### Berechtigungsprobleme
```bash
chown -R deploy:deploy /var/www/provoid-analyse
chmod -R 755 /var/www/provoid-analyse
```

---

## 7. Sicherheits-Checkliste

- [ ] SSH-Key statt Passwort verwenden
- [ ] Root-Login über SSH deaktivieren
- [ ] Firewall aktiv (ufw)
- [ ] Fail2ban installieren: `apt install fail2ban`
- [ ] Regelmäßige Updates: `apt update && apt upgrade`
- [ ] Admin-Passwort der Analyse-App ändern
- [ ] Datenbank-Backups eingerichtet

---

## Schnellreferenz

```bash
# Status aller Apps
pm2 status

# App neustarten
pm2 restart provoid-analyse

# Logs verfolgen
pm2 logs --lines 100

# Nginx neustarten
systemctl restart nginx

# SSL erneuern (automatisch via Cron)
certbot renew
```
