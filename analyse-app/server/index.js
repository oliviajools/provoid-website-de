import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS Konfiguration
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? (process.env.CORS_ORIGINS || 'https://provoid.de').split(',')
    : true,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Statische Dateien für Produktion (Frontend)
// Nach Nginx rewrite werden Anfragen ohne /analyse-Prefix empfangen
app.use(express.static(path.join(__dirname, '../dist')));

// Initialize Database
const db = new Database(path.join(__dirname, 'neuroathletic.db'));

// Create tables with enhanced security
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date TEXT,
    team TEXT,
    position TEXT,
    dominant_hand TEXT DEFAULT 'right',
    dominant_foot TEXT DEFAULT 'right',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Add player_code column if not exists (for existing databases)
  -- This is handled separately below

  CREATE TABLE IF NOT EXISTS test_sessions (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL,
    test_date TEXT DEFAULT CURRENT_TIMESTAMP,
    total_score REAL,
    percentile REAL,
    notes TEXT,
    completed INTEGER DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS test_results (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    test_name TEXT NOT NULL,
    raw_score REAL,
    normalized_score REAL,
    reaction_time_ms REAL,
    accuracy_percent REAL,
    trials_completed INTEGER,
    errors INTEGER,
    metadata TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES test_sessions(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS normative_data (
    id TEXT PRIMARY KEY,
    age_group TEXT NOT NULL,
    category TEXT NOT NULL,
    test_name TEXT NOT NULL,
    mean_score REAL,
    std_deviation REAL,
    percentile_25 REAL,
    percentile_50 REAL,
    percentile_75 REAL,
    percentile_90 REAL
  );

  -- Privacy consent tracking table
  CREATE TABLE IF NOT EXISTS privacy_consents (
    id TEXT PRIMARY KEY,
    player_id TEXT,
    session_id TEXT,
    consent_data_collection INTEGER NOT NULL DEFAULT 0,
    consent_data_storage INTEGER NOT NULL DEFAULT 0,
    consent_data_processing INTEGER NOT NULL DEFAULT 0,
    consent_age_confirmation INTEGER NOT NULL DEFAULT 0,
    ip_address TEXT,
    user_agent TEXT,
    consent_timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    revoked_at TEXT,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE SET NULL
  );

  -- Audit log for data access and modifications
  CREATE TABLE IF NOT EXISTS audit_log (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    user_info TEXT,
    old_values TEXT,
    new_values TEXT,
    ip_address TEXT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Admin users table
  CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Admin sessions table
  CREATE TABLE IF NOT EXISTS admin_sessions (
    id TEXT PRIMARY KEY,
    admin_id TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
  );

  -- Team codes table
  CREATE TABLE IF NOT EXISTS team_codes (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    team_name TEXT NOT NULL,
    description TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Create indexes for better query performance
  CREATE INDEX IF NOT EXISTS idx_team_codes_code ON team_codes(code);
  CREATE INDEX IF NOT EXISTS idx_test_sessions_player ON test_sessions(player_id);
  CREATE INDEX IF NOT EXISTS idx_test_results_session ON test_results(session_id);
  CREATE INDEX IF NOT EXISTS idx_privacy_consents_player ON privacy_consents(player_id);
  CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON audit_log(timestamp);
  CREATE INDEX IF NOT EXISTS idx_audit_log_table ON audit_log(table_name);
  CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
`);

// Add player_code column if it doesn't exist (migration for existing DB)
try {
  db.exec('ALTER TABLE players ADD COLUMN player_code TEXT UNIQUE');
  console.log('Added player_code column to players table');
} catch (e) {
  // Column already exists, ignore
}

// Create index for player_code (after migration)
try {
  db.exec('CREATE INDEX IF NOT EXISTS idx_players_code ON players(player_code)');
} catch (e) {
  // Index might already exist
}

// Enable foreign key constraints
db.pragma('foreign_keys = ON');

// Helper function to log audit entries
const logAudit = (action, tableName, recordId, oldValues = null, newValues = null, userInfo = null) => {
  const id = uuidv4();
  db.prepare(`
    INSERT INTO audit_log (id, action, table_name, record_id, user_info, old_values, new_values)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, action, tableName, recordId, userInfo, JSON.stringify(oldValues), JSON.stringify(newValues));
};

// Input validation helper
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().slice(0, 500);
};

// Insert normative data for youth players (based on neuroscientific research)
const insertNormative = db.prepare(`
  INSERT OR REPLACE INTO normative_data (id, age_group, category, test_name, mean_score, std_deviation, percentile_25, percentile_50, percentile_75, percentile_90)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const normativeData = [
  // Movement Planning & Execution (Reaction times in ms, accuracy in %)
  ['n1', '12-14', 'movement_planning', 'simple_reaction', 280, 45, 310, 280, 250, 220],
  ['n2', '12-14', 'movement_planning', 'choice_reaction', 420, 65, 470, 420, 370, 330],
  ['n3', '12-14', 'movement_planning', 'motor_sequencing', 75, 12, 65, 75, 85, 92],
  ['n4', '15-17', 'movement_planning', 'simple_reaction', 250, 40, 280, 250, 220, 195],
  ['n5', '15-17', 'movement_planning', 'choice_reaction', 380, 55, 420, 380, 340, 305],
  ['n6', '15-17', 'movement_planning', 'motor_sequencing', 82, 10, 74, 82, 90, 95],
  
  // Perception & Orientation
  ['n7', '12-14', 'perception', 'visual_tracking', 70, 15, 58, 70, 82, 90],
  ['n8', '12-14', 'perception', 'spatial_awareness', 68, 14, 56, 68, 80, 88],
  ['n9', '12-14', 'perception', 'peripheral_vision', 65, 16, 52, 65, 78, 86],
  ['n10', '15-17', 'perception', 'visual_tracking', 78, 12, 68, 78, 88, 94],
  ['n11', '15-17', 'perception', 'spatial_awareness', 76, 13, 65, 76, 87, 93],
  ['n12', '15-17', 'perception', 'peripheral_vision', 73, 14, 62, 73, 84, 91],
  
  // Situation Analysis & Decision Making
  ['n13', '12-14', 'decision_making', 'pattern_recognition', 65, 18, 50, 65, 80, 88],
  ['n14', '12-14', 'decision_making', 'tactical_decision', 60, 20, 44, 60, 76, 85],
  ['n15', '12-14', 'decision_making', 'anticipation', 62, 17, 48, 62, 76, 84],
  ['n16', '15-17', 'decision_making', 'pattern_recognition', 75, 15, 63, 75, 87, 94],
  ['n17', '15-17', 'decision_making', 'tactical_decision', 72, 16, 59, 72, 85, 92],
  ['n18', '15-17', 'decision_making', 'anticipation', 74, 14, 63, 74, 85, 92],
  
  // Attention & Focus
  ['n19', '12-14', 'attention', 'sustained_attention', 68, 16, 55, 68, 81, 89],
  ['n20', '12-14', 'attention', 'selective_attention', 64, 18, 49, 64, 79, 87],
  ['n21', '12-14', 'attention', 'divided_attention', 58, 20, 42, 58, 74, 83],
  ['n22', '15-17', 'attention', 'sustained_attention', 76, 13, 66, 76, 86, 93],
  ['n23', '15-17', 'attention', 'selective_attention', 74, 14, 63, 74, 85, 92],
  ['n24', '15-17', 'attention', 'divided_attention', 70, 16, 57, 70, 83, 90],
  
  // Physical Self-Regulation
  ['n25', '12-14', 'self_regulation', 'inhibitory_control', 62, 19, 46, 62, 78, 86],
  ['n26', '12-14', 'self_regulation', 'arousal_regulation', 60, 18, 45, 60, 75, 83],
  ['n27', '12-14', 'self_regulation', 'stress_response', 58, 20, 42, 58, 74, 82],
  ['n28', '15-17', 'self_regulation', 'inhibitory_control', 72, 15, 60, 72, 84, 91],
  ['n29', '15-17', 'self_regulation', 'arousal_regulation', 70, 14, 59, 70, 81, 88],
  ['n30', '15-17', 'self_regulation', 'stress_response', 68, 16, 55, 68, 81, 88],
];

normativeData.forEach(data => insertNormative.run(...data));

// API Routes

// Players
app.get('/api/players', (req, res) => {
  const players = db.prepare('SELECT * FROM players ORDER BY last_name, first_name').all();
  res.json(players);
});

app.get('/api/players/:id', (req, res) => {
  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(req.params.id);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  res.json(player);
});

app.post('/api/players', (req, res) => {
  const { first_name, last_name, birth_date, team, position, dominant_hand, dominant_foot } = req.body;
  const id = uuidv4();
  
  db.prepare(`
    INSERT INTO players (id, first_name, last_name, birth_date, team, position, dominant_hand, dominant_foot)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, first_name, last_name, birth_date, team, position, dominant_hand || 'right', dominant_foot || 'right');
  
  res.json({ id, first_name, last_name, birth_date, team, position, dominant_hand, dominant_foot });
});

app.put('/api/players/:id', (req, res) => {
  const { first_name, last_name, birth_date, team, position, dominant_hand, dominant_foot } = req.body;
  
  db.prepare(`
    UPDATE players SET first_name = ?, last_name = ?, birth_date = ?, team = ?, position = ?, dominant_hand = ?, dominant_foot = ?
    WHERE id = ?
  `).run(first_name, last_name, birth_date, team, position, dominant_hand, dominant_foot, req.params.id);
  
  res.json({ success: true });
});

app.delete('/api/players/:id', (req, res) => {
  db.prepare('DELETE FROM test_results WHERE session_id IN (SELECT id FROM test_sessions WHERE player_id = ?)').run(req.params.id);
  db.prepare('DELETE FROM test_sessions WHERE player_id = ?').run(req.params.id);
  db.prepare('DELETE FROM players WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Test Sessions
app.get('/api/sessions', (req, res) => {
  const sessions = db.prepare(`
    SELECT ts.*, p.first_name, p.last_name, p.team
    FROM test_sessions ts
    JOIN players p ON ts.player_id = p.id
    ORDER BY ts.test_date DESC
  `).all();
  res.json(sessions);
});

app.get('/api/sessions/:id', (req, res) => {
  const session = db.prepare(`
    SELECT ts.*, p.first_name, p.last_name, p.birth_date, p.team, p.position
    FROM test_sessions ts
    JOIN players p ON ts.player_id = p.id
    WHERE ts.id = ?
  `).get(req.params.id);
  
  if (!session) return res.status(404).json({ error: 'Session not found' });
  
  const results = db.prepare('SELECT * FROM test_results WHERE session_id = ?').all(req.params.id);
  res.json({ ...session, results });
});

app.get('/api/players/:playerId/sessions', (req, res) => {
  const sessions = db.prepare(`
    SELECT * FROM test_sessions WHERE player_id = ? ORDER BY test_date DESC
  `).all(req.params.playerId);
  res.json(sessions);
});

app.post('/api/sessions', (req, res) => {
  const { player_id, notes } = req.body;
  const id = uuidv4();
  
  db.prepare(`
    INSERT INTO test_sessions (id, player_id, notes)
    VALUES (?, ?, ?)
  `).run(id, player_id, notes || '');
  
  res.json({ id, player_id });
});

app.put('/api/sessions/:id/complete', (req, res) => {
  const { total_score, percentile } = req.body;
  
  db.prepare(`
    UPDATE test_sessions SET completed = 1, total_score = ?, percentile = ?
    WHERE id = ?
  `).run(total_score, percentile, req.params.id);
  
  res.json({ success: true });
});

// Test Results
app.post('/api/results', (req, res) => {
  const { session_id, category, subcategory, test_name, raw_score, normalized_score, reaction_time_ms, accuracy_percent, trials_completed, errors, metadata } = req.body;
  const id = uuidv4();
  
  db.prepare(`
    INSERT INTO test_results (id, session_id, category, subcategory, test_name, raw_score, normalized_score, reaction_time_ms, accuracy_percent, trials_completed, errors, metadata)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, session_id, category, subcategory, test_name, raw_score, normalized_score, reaction_time_ms, accuracy_percent, trials_completed, errors, JSON.stringify(metadata || {}));
  
  res.json({ id });
});

app.get('/api/results/session/:sessionId', (req, res) => {
  const results = db.prepare('SELECT * FROM test_results WHERE session_id = ?').all(req.params.sessionId);
  res.json(results);
});

// Normative Data
app.get('/api/normative/:ageGroup/:category', (req, res) => {
  const data = db.prepare(`
    SELECT * FROM normative_data WHERE age_group = ? AND category = ?
  `).all(req.params.ageGroup, req.params.category);
  res.json(data);
});

// Statistics
app.get('/api/stats/player/:playerId', (req, res) => {
  const sessions = db.prepare(`
    SELECT ts.*, 
      (SELECT AVG(normalized_score) FROM test_results tr WHERE tr.session_id = ts.id AND tr.category = 'movement_planning') as movement_score,
      (SELECT AVG(normalized_score) FROM test_results tr WHERE tr.session_id = ts.id AND tr.category = 'perception') as perception_score,
      (SELECT AVG(normalized_score) FROM test_results tr WHERE tr.session_id = ts.id AND tr.category = 'decision_making') as decision_score,
      (SELECT AVG(normalized_score) FROM test_results tr WHERE tr.session_id = ts.id AND tr.category = 'attention') as attention_score,
      (SELECT AVG(normalized_score) FROM test_results tr WHERE tr.session_id = ts.id AND tr.category = 'self_regulation') as regulation_score
    FROM test_sessions ts
    WHERE ts.player_id = ? AND ts.completed = 1
    ORDER BY ts.test_date DESC
  `).all(req.params.playerId);
  
  res.json(sessions);
});

// Privacy Consent Routes
app.post('/api/consent', (req, res) => {
  const { player_id, session_id, consents, user_agent } = req.body;
  const id = uuidv4();
  
  db.prepare(`
    INSERT INTO privacy_consents (id, player_id, session_id, consent_data_collection, consent_data_storage, consent_data_processing, consent_age_confirmation, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    player_id || null,
    session_id || null,
    consents?.dataCollection ? 1 : 0,
    consents?.dataStorage ? 1 : 0,
    consents?.dataProcessing ? 1 : 0,
    consents?.ageConfirmation ? 1 : 0,
    user_agent || null
  );
  
  logAudit('CREATE', 'privacy_consents', id, null, { player_id, session_id });
  res.json({ id, success: true });
});

app.get('/api/consent/:playerId', (req, res) => {
  const consent = db.prepare(`
    SELECT * FROM privacy_consents 
    WHERE player_id = ? AND revoked_at IS NULL
    ORDER BY consent_timestamp DESC LIMIT 1
  `).get(req.params.playerId);
  
  res.json(consent || null);
});

app.post('/api/consent/:id/revoke', (req, res) => {
  const consent = db.prepare('SELECT * FROM privacy_consents WHERE id = ?').get(req.params.id);
  
  db.prepare(`
    UPDATE privacy_consents SET revoked_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(req.params.id);
  
  logAudit('REVOKE', 'privacy_consents', req.params.id, consent, { revoked: true });
  res.json({ success: true });
});

// Audit Log Routes (for admin purposes)
app.get('/api/audit', (req, res) => {
  const { limit = 100, table_name, action } = req.query;
  
  let query = 'SELECT * FROM audit_log WHERE 1=1';
  const params = [];
  
  if (table_name) {
    query += ' AND table_name = ?';
    params.push(table_name);
  }
  if (action) {
    query += ' AND action = ?';
    params.push(action);
  }
  
  query += ' ORDER BY timestamp DESC LIMIT ?';
  params.push(parseInt(limit));
  
  const logs = db.prepare(query).all(...params);
  res.json(logs);
});

// Data Export Route (GDPR compliance)
app.get('/api/export/player/:playerId', (req, res) => {
  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(req.params.playerId);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  
  const sessions = db.prepare('SELECT * FROM test_sessions WHERE player_id = ?').all(req.params.playerId);
  const sessionIds = sessions.map(s => s.id);
  
  let results = [];
  if (sessionIds.length > 0) {
    const placeholders = sessionIds.map(() => '?').join(',');
    results = db.prepare(`SELECT * FROM test_results WHERE session_id IN (${placeholders})`).all(...sessionIds);
  }
  
  const consents = db.prepare('SELECT * FROM privacy_consents WHERE player_id = ?').all(req.params.playerId);
  
  logAudit('EXPORT', 'players', req.params.playerId, null, { exported: true });
  
  res.json({
    export_date: new Date().toISOString(),
    player,
    sessions,
    results,
    consents
  });
});

// Data Deletion Route (GDPR compliance - Right to be forgotten)
app.delete('/api/gdpr/player/:playerId', (req, res) => {
  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(req.params.playerId);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  
  // Log before deletion
  logAudit('DELETE_GDPR', 'players', req.params.playerId, player, null);
  
  // Delete all related data (cascades handle sessions and results)
  db.prepare('DELETE FROM privacy_consents WHERE player_id = ?').run(req.params.playerId);
  db.prepare('DELETE FROM players WHERE id = ?').run(req.params.playerId);
  
  res.json({ success: true, message: 'All player data has been permanently deleted' });
});

// ============ ADMIN AUTHENTICATION ============

// Simple hash function (for demo - use bcrypt in production)
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};

// Create default admin if not exists
const defaultAdmin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get('admin');
if (!defaultAdmin) {
  const adminId = uuidv4();
  db.prepare('INSERT INTO admin_users (id, username, password_hash) VALUES (?, ?, ?)').run(
    adminId, 'admin', simpleHash('provoid2024')
  );
  console.log('Default admin created: admin / provoid2024');
}

// Verify admin token middleware
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  const session = db.prepare(`
    SELECT s.*, u.username FROM admin_sessions s 
    JOIN admin_users u ON s.admin_id = u.id 
    WHERE s.token = ? AND s.expires_at > datetime('now')
  `).get(token);
  
  if (!session) return res.status(401).json({ error: 'Invalid or expired token' });
  
  req.admin = { id: session.admin_id, username: session.username };
  next();
};

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  const admin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
  if (!admin || admin.password_hash !== simpleHash(password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = uuidv4() + '-' + uuidv4();
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  
  db.prepare('INSERT INTO admin_sessions (id, admin_id, token, expires_at) VALUES (?, ?, ?, ?)').run(
    sessionId, admin.id, token, expiresAt
  );
  
  logAudit('ADMIN_LOGIN', 'admin_users', admin.id, null, { username });
  res.json({ token, username: admin.username, expiresAt });
});

// Admin logout
app.post('/api/admin/logout', verifyAdmin, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
  res.json({ success: true });
});

// Verify admin session
app.get('/api/admin/verify', verifyAdmin, (req, res) => {
  res.json({ valid: true, username: req.admin.username });
});

// Get all sessions (admin only)
app.get('/api/admin/all-sessions', verifyAdmin, (req, res) => {
  const sessions = db.prepare(`
    SELECT s.*, p.first_name, p.last_name, p.team
    FROM test_sessions s
    JOIN players p ON s.player_id = p.id
    ORDER BY s.test_date DESC
    LIMIT 50
  `).all();
  res.json(sessions);
});

// Change admin password
app.post('/api/admin/change-password', verifyAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  const admin = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(req.admin.id);
  if (admin.password_hash !== simpleHash(currentPassword)) {
    return res.status(401).json({ error: 'Current password incorrect' });
  }
  
  db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').run(
    simpleHash(newPassword), req.admin.id
  );
  
  logAudit('PASSWORD_CHANGE', 'admin_users', req.admin.id);
  res.json({ success: true });
});

// ============ PLAYER CODE SYSTEM ============

// Generate unique player code (e.g., "ANNA2024" or "MAX1234")
function generatePlayerCode(firstName) {
  const prefix = firstName.toUpperCase().slice(0, 4).padEnd(4, 'X');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${suffix}`;
}

// Generate code for existing player (admin only)
app.post('/api/admin/players/:id/generate-code', verifyAdmin, (req, res) => {
  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(req.params.id);
  if (!player) return res.status(404).json({ error: 'Spielerin nicht gefunden' });
  
  let code;
  let attempts = 0;
  do {
    code = generatePlayerCode(player.first_name);
    const existing = db.prepare('SELECT id FROM players WHERE player_code = ?').get(code);
    if (!existing) break;
    attempts++;
  } while (attempts < 10);
  
  db.prepare('UPDATE players SET player_code = ? WHERE id = ?').run(code, req.params.id);
  logAudit('GENERATE_CODE', 'players', req.params.id, { old_code: player.player_code }, { new_code: code });
  
  res.json({ success: true, player_code: code });
});

// Get all players with their codes and latest results (admin only)
app.get('/api/admin/players-overview', verifyAdmin, (req, res) => {
  const players = db.prepare(`
    SELECT 
      p.*,
      (SELECT COUNT(*) FROM test_sessions ts WHERE ts.player_id = p.id AND ts.completed = 1) as completed_tests,
      (SELECT ts.total_score FROM test_sessions ts WHERE ts.player_id = p.id AND ts.completed = 1 ORDER BY ts.test_date DESC LIMIT 1) as latest_score,
      (SELECT ts.test_date FROM test_sessions ts WHERE ts.player_id = p.id AND ts.completed = 1 ORDER BY ts.test_date DESC LIMIT 1) as latest_test_date
    FROM players p
    ORDER BY p.last_name, p.first_name
  `).all();
  res.json(players);
});

// Bulk generate codes for all players without codes (admin only)
app.post('/api/admin/generate-all-codes', verifyAdmin, (req, res) => {
  const playersWithoutCode = db.prepare('SELECT * FROM players WHERE player_code IS NULL').all();
  const generated = [];
  
  for (const player of playersWithoutCode) {
    let code;
    let attempts = 0;
    do {
      code = generatePlayerCode(player.first_name);
      const existing = db.prepare('SELECT id FROM players WHERE player_code = ?').get(code);
      if (!existing) break;
      attempts++;
    } while (attempts < 10);
    
    db.prepare('UPDATE players SET player_code = ? WHERE id = ?').run(code, player.id);
    generated.push({ id: player.id, name: `${player.first_name} ${player.last_name}`, code });
  }
  
  res.json({ success: true, generated_count: generated.length, generated });
});

// Player login with code (public endpoint)
app.post('/api/player-login', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ error: 'Code erforderlich' });
  }
  
  const player = db.prepare(`
    SELECT p.*, 
      (SELECT ts.id FROM test_sessions ts WHERE ts.player_id = p.id AND ts.completed = 0 ORDER BY ts.test_date DESC LIMIT 1) as pending_session_id
    FROM players p 
    WHERE p.player_code = ?
  `).get(code.toUpperCase());
  
  if (!player) {
    return res.status(404).json({ error: 'Ungültiger Code' });
  }
  
  res.json({ 
    success: true, 
    player: {
      id: player.id,
      first_name: player.first_name,
      last_name: player.last_name,
      team: player.team
    },
    pending_session_id: player.pending_session_id
  });
});

// ============ TEAM CODES ============

// Verify team code (public endpoint)
app.post('/api/verify-code', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ error: 'Code erforderlich' });
  }
  
  const teamCode = db.prepare('SELECT * FROM team_codes WHERE code = ? AND is_active = 1').get(code.toUpperCase());
  
  if (!teamCode) {
    return res.status(404).json({ error: 'Ungültiger Code' });
  }
  
  res.json({ valid: true, team_name: teamCode.team_name, code_id: teamCode.id });
});

// Get all team codes (admin only)
app.get('/api/admin/team-codes', verifyAdmin, (req, res) => {
  const codes = db.prepare('SELECT * FROM team_codes ORDER BY created_at DESC').all();
  res.json(codes);
});

// Create new team code (admin only)
app.post('/api/admin/team-codes', verifyAdmin, (req, res) => {
  const { team_name, description } = req.body;
  
  if (!team_name) {
    return res.status(400).json({ error: 'Team-Name erforderlich' });
  }
  
  const id = uuidv4();
  const code = generateCode();
  
  db.prepare('INSERT INTO team_codes (id, code, team_name, description) VALUES (?, ?, ?, ?)').run(
    id, code, team_name, description || null
  );
  
  logAudit('CREATE', 'team_codes', id, null, { team_name, code });
  res.json({ id, code, team_name, description });
});

// Update team code (admin only)
app.put('/api/admin/team-codes/:id', verifyAdmin, (req, res) => {
  const { team_name, description, is_active } = req.body;
  
  const existing = db.prepare('SELECT * FROM team_codes WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Code nicht gefunden' });
  }
  
  db.prepare('UPDATE team_codes SET team_name = ?, description = ?, is_active = ? WHERE id = ?').run(
    team_name || existing.team_name,
    description !== undefined ? description : existing.description,
    is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active,
    req.params.id
  );
  
  logAudit('UPDATE', 'team_codes', req.params.id, existing, { team_name, description, is_active });
  res.json({ success: true });
});

// Delete team code (admin only)
app.delete('/api/admin/team-codes/:id', verifyAdmin, (req, res) => {
  const existing = db.prepare('SELECT * FROM team_codes WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Code nicht gefunden' });
  }
  
  db.prepare('DELETE FROM team_codes WHERE id = ?').run(req.params.id);
  logAudit('DELETE', 'team_codes', req.params.id, existing);
  res.json({ success: true });
});

// Helper function to generate a random code
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// SPA Fallback für React Router (alle nicht-API Routen)
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`NeuroAthletic Analysis Server running on port ${PORT} (${NODE_ENV})`);
});
