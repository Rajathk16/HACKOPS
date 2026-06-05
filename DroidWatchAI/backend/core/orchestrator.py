import threading
import time
import uuid
import json
import os
from backend.utils.logger import get_logger
from backend.database.db import insert_scan, insert_event, update_scan_status

logger = get_logger("orchestrator")

SAMPLE_EVENTS_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "shared", "sample_events.json"
)

class Orchestrator:
    def __init__(self, event_manager, sandbox_manager):
        self.event_manager = event_manager
        self.sandbox_manager = sandbox_manager
        self.active_scans = 0

    def start_scan(self, scan_id, apk_path):
        logger.info(f"Orchestrator starting scan for {scan_id}")
        self.active_scans += 1
        self.sandbox_manager.allocate_sandbox()
        
        apk_name = os.path.basename(apk_path)
        insert_scan(scan_id, apk_name)
        
        
        thread = threading.Thread(target=self._simulate_scan, args=(scan_id, apk_name), daemon=True)
        thread.start()

    def _simulate_scan(self, scan_id, apk_name):
        try:
            update_scan_status(scan_id, "running")
            self.event_manager.emit_scan_started(scan_id, apk_name)
            
            with open(SAMPLE_EVENTS_PATH) as f:
                events = json.load(f)
            
            
            for raw_event in events:
                time.sleep(0.5)
                
                raw_event["id"] = f"evt_{uuid.uuid4().hex[:6]}"
                raw_event["scan_id"] = scan_id
                
                insert_event(raw_event)
                
                
                
                
                self.event_manager.socketio.emit("NEW_THREAT", {
                    "scan_id": scan_id,
                    "event": raw_event
                })

            summary = {
                "threat_level": "HIGH",
                "total_score": 87,
                "event_count": len(events),
                "malware_type": "Spyware / Remote Access Trojan"
            }
            self.event_manager.emit_scan_complete(scan_id, summary)
            update_scan_status(scan_id, "completed")
            logger.info(f"Scan {scan_id} completed.")
        except Exception as e:
            logger.error(f"Scan failed: {e}")
            update_scan_status(scan_id, "failed")
        finally:
            self.active_scans -= 1
            self.sandbox_manager.release_sandbox()
