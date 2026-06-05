






from flask import Flask
from flask_socketio import SocketIO
from backend.api.upload import upload_bp
from backend.api.threat import threat_bp
from backend.api.defense import defense_bp
from backend.core.event_manager import EventManager
from backend.core.orchestrator import Orchestrator
from backend.core.sandbox_manager import SandboxManager


def register_routes(app: Flask, socketio: SocketIO, event_manager: EventManager, orchestrator: Orchestrator, sandbox_manager: SandboxManager):
    """Register all API blueprints."""

    
    upload_bp.event_manager = event_manager
    upload_bp.socketio = socketio
    upload_bp.orchestrator = orchestrator

    threat_bp.event_manager = event_manager
    defense_bp.event_manager = event_manager

    app.register_blueprint(upload_bp,  url_prefix="/api")
    app.register_blueprint(threat_bp,  url_prefix="/api")
    app.register_blueprint(defense_bp, url_prefix="/api")

    
    @app.route("/health")
    def health():
        return {"status": "ok", "service": "DroidWatch AI", "version": "0.1.0"}, 200

    @app.route("/api/status")
    def status():
        return {
            "status": "running",
            "sandbox_ready": sandbox_manager.get_status()["ready"],
            "active_scans": orchestrator.active_scans,
        }, 200
