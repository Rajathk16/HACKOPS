# DroidWatch AI

AI-Powered Android Cyber Attack & Defense Simulation Platform

---

# Project Structure

```txt
DroidWatch-AI/
│
├── README.md
├── requirements.txt
├── docker-compose.yml
├── .env.example
│
├── docs/
│   ├── architecture.md
│   ├── workflow.md
│   └── screenshots/
│
├── backend/                          [OWNER: Gahan]
│   │
│   ├── app.py
│   ├── config.py
│   │
│   ├── api/
│   │   ├── routes.py
│   │   ├── upload.py
│   │   ├── threat.py
│   │   └── defense.py
│   │
│   ├── core/
│   │   ├── orchestrator.py
│   │   ├── sandbox_manager.py
│   │   └── event_manager.py
│   │
│   ├── database/
│   │   ├── db.py
│   │   ├── models.py
│   │   └── schema.py
│   │
│   └── utils/
│       ├── logger.py
│       └── parser.py
│
├── sandbox/                          [OWNER: Gahan]
│   │
│   ├── emulator/
│   │   ├── launch_emulator.sh
│   │   ├── install_apk.sh
│   │   └── cleanup.sh
│   │
│   ├── adb/
│   │   ├── adb_controller.py
│   │   ├── logcat_reader.py
│   │   └── permission_tracker.py
│   │
│   └── runtime/
│       ├── process_monitor.py
│       ├── service_monitor.py
│       └── sms_monitor.py
│
├── network_analysis/                 [OWNER: Dhanush]
│   │
│   ├── packet_capture/
│   │   ├── tcpdump_runner.py
│   │   ├── wireshark_capture.py
│   │   └── packet_parser.py
│   │
│   ├── traffic_analysis/
│   │   ├── ip_tracker.py
│   │   ├── c2_detector.py
│   │   └── beacon_detector.py
│   │
│   └── defense/
│       ├── firewall_simulator.py
│       ├── blacklist_engine.py
│       └── network_isolation.py
│
├── ai_engine/                        [OWNER: Rajath]
│   │
│   ├── models/
│   │   ├── threat_classifier.py
│   │   ├── behavior_classifier.py
│   │   └── severity_predictor.py
│   │
│   ├── summarizer/
│   │   ├── ai_summary.py
│   │   ├── attack_explainer.py
│   │   └── mitigation_generator.py
│   │
│   └── scoring/
│       ├── threat_score.py
│       └── risk_engine.py
│
├── file_system_analysis/             [OWNER: Rajath + Gahan]
│   │
│   ├── file_monitor.py
│   ├── persistence_detector.py
│   ├── payload_detector.py
│   └── integrity_checker.py
│
├── frontend/                         [OWNER: Thanvi]
│   │
│   ├── public/
│   │
│   └── src/
│       │
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── UploadPage.jsx
│       │   └── ThreatReport.jsx
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── UploadCard.jsx
│       │   ├── AttackTimeline.jsx
│       │   ├── NetworkGraph.jsx
│       │   └── AISummary.jsx
│       │
│       ├── services/
│       │   ├── api.js
│       │   └── websocket.js
│       │
│       └── App.jsx
│
├── shared/                           [OWNER: ALL]
│   ├── constants.py
│   ├── schemas.py
│   └── sample_events.json
│
├── tests/
│   ├── backend_tests/
│   ├── network_tests/
│   ├── ai_tests/
│   └── frontend_tests/
│
└── scripts/
    ├── setup.sh
    ├── run_backend.sh
    ├── run_frontend.sh
    └── reset_environment.sh
```

---

# Team Ownership

| Team Member | Responsibility |
|-------------|----------------|
| **Gahan** | Backend + Sandbox + Integration |
| **Rajath** | AI Engine + File System Analysis |
| **Dhanush** | Network Monitoring + Defense Simulation |
| **Thanvi** | Frontend + Dashboard + Visualization |

---

# Development Workflow

### Gahan
Work inside:

```txt
backend/
sandbox/
```

### Rajath

Work inside:

```txt
ai_engine/
file_system_analysis/
```

### Dhanush

Work inside:

```txt
network_analysis/
```

### Thanvi

Work inside:

```txt
frontend/
```

---

# Branch Workflow

```txt
main
│
├── dev
├── feature/backend-sandbox
├── feature/network-analysis
├── feature/ai-engine
└── feature/frontend-dashboard
```

Commit → Push → Pull Request → Merge to `dev` → Final merge to `main`

---
