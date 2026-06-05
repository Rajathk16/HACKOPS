

import sqlite3
import os

DB_PATH = os.getenv("DB_PATH", "./droidwatch.db")

def get_conn():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_conn()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS scans (
            id TEXT PRIMARY KEY,
            apk_name TEXT,
            status TEXT DEFAULT 'pending',
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            scan_id TEXT,
            layer TEXT,
            type TEXT,
            severity TEXT,
            description TEXT,
            details TEXT,
            raw TEXT,
            mitre_technique TEXT,
            defense_triggered INTEGER DEFAULT 0,
            timestamp TEXT,
            FOREIGN KEY(scan_id) REFERENCES scans(id)
        );
    """)
    conn.commit()
    conn.close()

def insert_scan(scan_id, apk_name):
    conn = get_conn()
    conn.execute("INSERT INTO scans (id, apk_name) VALUES (?, ?)", (scan_id, apk_name))
    conn.commit()
    conn.close()

def update_scan_status(scan_id, status):
    conn = get_conn()
    conn.execute("UPDATE scans SET status = ? WHERE id = ?", (status, scan_id))
    conn.commit()
    conn.close()

def insert_event(event_data):
    conn = get_conn()
    conn.execute("""
        INSERT INTO events (
            id, scan_id, layer, type, severity, description, details, raw, mitre_technique, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        event_data.get("id"),
        event_data.get("scan_id"),
        event_data.get("layer"),
        event_data.get("type"),
        event_data.get("severity"),
        event_data.get("description"),
        str(event_data.get("details", "")),
        str(event_data.get("raw", "")),
        event_data.get("mitre_technique"),
        event_data.get("timestamp")
    ))
    conn.commit()
    conn.close()

def get_events_by_scan(scan_id):
    conn = get_conn()
    cursor = conn.execute("SELECT * FROM events WHERE scan_id = ?", (scan_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]
