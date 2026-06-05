import time

class SandboxManager:
    def __init__(self):
        self.is_ready = True
        self.active_sandboxes = 0

    def get_status(self):
        return {
            "ready": self.is_ready,
            "active_count": self.active_sandboxes
        }

    def allocate_sandbox(self):
        self.active_sandboxes += 1
        return True

    def release_sandbox(self):
        if self.active_sandboxes > 0:
            self.active_sandboxes -= 1
