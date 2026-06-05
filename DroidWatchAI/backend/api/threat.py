









import json
import os
from flask import Blueprint, jsonify
from backend.utils.logger import get_logger
from ai_engine import analyze_events
from backend.database.db import get_events_by_scan

threat_bp = Blueprint("threat", __name__)
logger = get_logger("threat")

SAMPLE_EVENTS_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "shared", "sample_events.json"
)


@threat_bp.route("/threats/demo", methods=["GET"])
def get_demo_events():
    """
    Returns the sample_events.json for frontend demo/testing.
    Use this when the sandbox isn't running yet.
    """
    try:
        with open(SAMPLE_EVENTS_PATH) as f:
            events = json.load(f)
        return jsonify({"scan_id": "demo", "events": events, "count": len(events)}), 200
    except FileNotFoundError:
        return jsonify({"error": "sample_events.json not found in shared/"}), 404


@threat_bp.route("/threats/<scan_id>", methods=["GET"])
def get_threats(scan_id: str):
    events = get_events_by_scan(scan_id)
    if not events:
        logger.info(f"Threat query for scan_id={scan_id} - No events found")
        return jsonify({
            "scan_id": scan_id,
            "events": [],
            "count": 0,
            "message": "Scan in progress or not found"
        }), 200

    return jsonify({
        "scan_id": scan_id,
        "events": events,
        "count": len(events)
    }), 200


@threat_bp.route("/threats/<scan_id>/summary", methods=["GET"])
def get_summary(scan_id: str):
    """
    Returns the AI-generated threat summary for a scan.
    """
    if scan_id == "demo":
        try:
            with open(SAMPLE_EVENTS_PATH) as f:
                events = json.load(f)
        except FileNotFoundError:
            return jsonify({"error": "sample_events.json not found in shared/"}), 404
    else:
        events = get_events_by_scan(scan_id)

    if not events:
        return jsonify({
            "scan_id": scan_id,
            "threat_level": "LOW",
            "total_score": 0,
            "malware_type": "Benign",
            "mitre_techniques": [],
            "ai_summary": "No events found to analyze.",
            "layer_breakdown": {"network": 0, "filesystem": 0, "system": 0},
            "mitigations": [],
            "confidence": 0,
            "detected_behaviors": {}
        }), 200

    report = analyze_events(events)

    
    mitre_techniques = []
    if "mitre_timeline" in report:
        for item in report["mitre_timeline"]:
            if "technique_id" in item:
                mitre_techniques.append(item["technique_id"])

    return jsonify({
        "scan_id": scan_id,
        "threat_level": report["risk_level"],
        "total_score": report["threat_score"],
        "malware_type": report["malware_category"],
        "confidence": report.get("malware_confidence", 0),
        "mitre_techniques": list(set(mitre_techniques)),
        "ai_summary": report["ai_summary"],
        "layer_breakdown": report.get("layer_scores", {"network": 0, "filesystem": 0, "system": 0}),
        "mitigations": report.get("mitigations", []),
        "detected_behaviors": report.get("detected_behaviors", {})
    }), 200
