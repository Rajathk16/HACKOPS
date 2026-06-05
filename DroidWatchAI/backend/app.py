







import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from dotenv import load_dotenv

from backend.api.routes import register_routes
from backend.core.event_manager import EventManager
from backend.core.sandbox_manager import SandboxManager
from backend.core.orchestrator import Orchestrator
from backend.database.db import init_db
from backend.utils.logger import get_logger

load_dotenv()
logger = get_logger("app")


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "droidwatch-dev-secret")
app.config["UPLOAD_FOLDER"] = os.getenv("UPLOAD_FOLDER", "./uploads")
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024  

CORS(app, origins="*")
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")


os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
init_db()
event_manager = EventManager(socketio)
sandbox_manager = SandboxManager()
orchestrator = Orchestrator(event_manager, sandbox_manager)


register_routes(app, socketio, event_manager, orchestrator, sandbox_manager)


@socketio.on("connect")
def on_connect():
    logger.info("Client connected")
    socketio.emit("status", {"message": "Connected to DroidWatch AI", "status": "ready"})

@socketio.on("disconnect")
def on_disconnect():
    logger.info("Client disconnected")

@socketio.on("ping")
def on_ping(data):
    socketio.emit("pong", {"message": "pong", "data": data})


if __name__ == "__main__":
    logger.info("Starting DroidWatch AI backend on port 5000")
    socketio.run(app, host="0.0.0.0", port=5000, debug=True, allow_unsafe_werkzeug=True)
