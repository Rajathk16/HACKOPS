






from dataclasses import dataclass, field
from typing import Optional, Any
from datetime import datetime
import uuid


class Severity:
    CRITICAL = "critical"
    HIGH     = "high"
    MEDIUM   = "medium"
    LOW      = "low"
    INFO     = "info"

SEVERITY_SCORE = {
    Severity.CRITICAL: 100,
    Severity.HIGH:      75,
    Severity.MEDIUM:    50,
    Severity.LOW:       25,
    Severity.INFO:       5,
}


class Layer:
    NETWORK    = "network"
    FILESYSTEM = "filesystem"
    SYSTEM     = "system"


class EventType:
    
    C2_CALLBACK   = "c2_callback"
    DNS_ABUSE     = "dns_abuse"
    BEACONING     = "beaconing"
    SUSPICIOUS_IP = "suspicious_ip"
    TRAFFIC_SPIKE = "traffic_spike"

    
    HIDDEN_FILE       = "hidden_file_creation"
    PAYLOAD_DROP      = "payload_drop"
    PERSISTENCE_FILE  = "persistence_mechanism"
    STORAGE_ABUSE     = "storage_abuse"

    
    PERMISSION_ABUSE  = "permission_abuse"
    BACKGROUND_SVC    = "background_service"
    SMS_INTERCEPT     = "sms_intercept"
    ACCESSIBILITY     = "accessibility_abuse"
    PRIVILEGE_ESC     = "privilege_escalation"


class DefenseAction:
    BLOCK_IP         = "block_ip"
    QUARANTINE_FILE  = "quarantine_file"
    REVOKE_PERMISSION = "revoke_permission"
    KILL_PROCESS     = "kill_process"
    ISOLATE_NETWORK  = "isolate_network"
    TERMINATE_SERVICE = "terminate_service"


class WSEvents:
    NEW_THREAT      = "new_threat"
    DEFENSE_TRIGGER = "defense_trigger"
    SCAN_STARTED    = "scan_started"
    SCAN_COMPLETE   = "scan_complete"
    THREAT_SUMMARY  = "threat_summary"
    ERROR           = "error"


@dataclass
class ThreatEvent:
    layer:       str
    type:        str
    severity:    str
    description: str
    details:     dict         = field(default_factory=dict)
    raw:         str          = ""
    mitre_technique: str      = ""
    defense_triggered: bool   = False
    id:          str          = field(default_factory=lambda: f"evt_{uuid.uuid4().hex[:6]}")
    timestamp:   str          = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self) -> dict:
        return {
            "id":                self.id,
            "timestamp":         self.timestamp,
            "layer":             self.layer,
            "type":              self.type,
            "severity":          self.severity,
            "description":       self.description,
            "details":           self.details,
            "raw":               self.raw,
            "mitre_technique":   self.mitre_technique,
            "defense_triggered": self.defense_triggered,
        }

    @property
    def score(self) -> int:
        return SEVERITY_SCORE.get(self.severity, 0)


@dataclass
class ThreatSummary:
    apk_name:       str
    threat_level:   str
    total_score:    int
    event_count:    int
    layer_breakdown: dict
    malware_type:   str
    mitre_techniques: list
    ai_summary:     str
    defense_actions: list
    timestamp:      str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self) -> dict:
        return self.__dict__
