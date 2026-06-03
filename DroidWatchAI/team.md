# DroidWatch AI - Team Pending Work

This document tracks the remaining tasks for each team member based on the current codebase.

## 🟢 Rajath (AI Engine)
- [x] **Completed:** Integrated the AI Engine's `analyze_events` pipeline with the backend threat API.
- [x] **Completed:** Refactored the React Dashboard (`AIPanel`, `ThreatMeter`, `LayerStatus`) to consume realistic, dynamic data instead of hardcoded dummies.
- [x] **Completed:** Updated AI models to gracefully fall back to heuristics on Windows Python 3.14 without throwing errors.

## 🔴 Gahan (Backend + Sandbox)
- [ ] **Database:** Replace the `get_threats` stub in `backend/api/threat.py` with real DB queries once the database layer is wired.
- [ ] **Orchestrator:** Implement `orchestrator.start_scan(scan_id, apk_path)` in the upload endpoint (`backend/api/upload.py`).
- [ ] **Status API:** Hook up the `sandbox_manager` and `orchestrator` active scans count in the `/api/status` route.
- [ ] **WebSockets:** Add `socketio.emit` calls in `backend/api/defense.py` and `threat.py` so the frontend dashboard updates live in real-time.

## 🟡 Thanvi (Frontend)
- [ ] **Live Events:** Hook up the dashboard to the WebSocket stream (`ws://localhost:5000`) so the `AttackTimeline` and `ThreatMeter` update dynamically as new threats are detected during a live scan.

## 🟡 Dhanush (Network Analysis)
- [ ] **Sandbox Integration:** Connect the network traffic analysis (`c2_detector`, `beacon_detector`, `packet_parser`) into Gahan's Sandbox Orchestrator pipeline.
