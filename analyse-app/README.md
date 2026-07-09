# NeuroAthletic Analysis - Neuroathletische Leistungsdiagnostik

Eine web-basierte Plattform zur neurowissenschaftlich fundierten Analyse kognitiver und sensomotorischer Fähigkeiten für Sportlerinnen.

## 🧠 Testbereiche

### 1. Bewegungsplanung & -ausführung
- **Neuronale Grundlage:** Prämotorischer Kortex, Supplementär-motorisches Areal, Basalganglien, Kleinhirn
- **Tests:**
  - Einfache Reaktionszeit (Simple RT)
  - Wahlreaktionszeit (Choice RT)
  - Motorische Sequenzierung

### 2. Wahrnehmung & Orientierung
- **Neuronale Grundlage:** Visueller Kortex (V1-V5), Parietallappen, Vestibuläres System
- **Tests:**
  - Multiple Object Tracking (MOT)
  - Räumliches Arbeitsgedächtnis
  - Periphere Wahrnehmung

### 3. Situationsanalyse & Entscheidungsfindung
- **Neuronale Grundlage:** Dorsolateraler präfrontaler Kortex, Anteriorer cingulärer Kortex
- **Tests:**
  - Mustererkennung
  - Taktische Entscheidungsfindung
  - Antizipation & Vorhersage

### 4. Aufmerksamkeit & Fokus
- **Neuronale Grundlage:** Dorsales & Ventrales Aufmerksamkeitsnetzwerk
- **Tests:**
  - Continuous Performance Test (CPT) - Daueraufmerksamkeit
  - Stroop-Test - Selektive Aufmerksamkeit
  - Dual-Task - Geteilte Aufmerksamkeit

### 5. Körperliche Selbstregulation
- **Neuronale Grundlage:** Insula, Limbisches System, Präfrontale Kontrollregionen
- **Tests:**
  - Go/No-Go - Inhibitorische Kontrolle
  - Stress-Performance Test
  - Atemkohärenz

## 🚀 Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten (Frontend + Backend)
npm run dev
```

Die Anwendung läuft dann auf:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 📊 Scoring-System

- **Gesamtscore:** Gewichteter Durchschnitt aller Bereichsscores (0-100%)
- **Bereichsscores:** Durchschnitt der Subtests pro Kategorie
- **Normierung:** Basierend auf altersgerechten Referenzwerten für Jugendspielerinnen (12-17 Jahre)

### Interpretation
- **85-100%:** Exzellent
- **70-84%:** Überdurchschnittlich
- **55-69%:** Durchschnittlich
- **40-54%:** Unterdurchschnittlich
- **< 40%:** Entwicklungsbedarf

## 🔬 Wissenschaftliche Grundlagen

Die Testbatterie basiert auf etablierten neuropsychologischen Paradigmen:

| Test | Paradigma | Literatur |
|------|-----------|-----------|
| Simple/Choice RT | Donders' Subtraktionsmethode | Donders (1868) |
| MOT | Multiple Object Tracking | Pylyshyn & Storm (1988) |
| CPT | Continuous Performance Test | Rosvold et al. (1956) |
| Stroop | Stroop-Interferenz | Stroop (1935) |
| Go/No-Go | Response Inhibition | Logan et al. (1984) |

## 💾 Datenbank

SQLite-Datenbank mit folgenden Tabellen:
- `players` - Spielerinnen-Stammdaten
- `test_sessions` - Testsitzungen
- `test_results` - Einzelergebnisse
- `normative_data` - Referenzwerte

## 🛠 Technologie-Stack

- **Frontend:** React 18, Vite, TailwindCSS, Recharts
- **Backend:** Node.js, Express
- **Datenbank:** SQLite (better-sqlite3)
- **UI-Icons:** Lucide React

## 📱 Features

- Spielerinnen-Verwaltung mit Stammdaten
- 5 wissenschaftlich fundierte Testbereiche
- Interaktive Tests mit Echtzeit-Feedback
- Radar-Chart Visualisierung des Neuroathletischen Profils
- Entwicklungsverlauf über mehrere Testungen
- Automatische Trainingsempfehlungen
- Für Jugendspielerinnen optimierte Benutzeroberfläche

## ⚠️ Hinweis

Diese Testbatterie dient der sportlichen Leistungsdiagnostik und ersetzt keine klinisch-neuropsychologische Untersuchung. Bei Verdacht auf neurologische oder kognitive Beeinträchtigungen ist eine fachärztliche Konsultation erforderlich.

## 📄 Lizenz

MIT License
