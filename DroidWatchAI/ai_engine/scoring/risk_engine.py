
class RiskEngine:
    """
    Evaluates final Risk Score and Risk Level by merging Threat Score with contextual parameters.
    """
    def __init__(self):
        
        self.criticality_multipliers = {
            "LOW": 0.7,
            "MEDIUM": 1.0,
            "HIGH": 1.3,
            "CRITICAL": 1.5
        }
        
        
        self.vulnerability_multipliers = {
            "LOW": 0.8,
            "MEDIUM": 1.0,
            "HIGH": 1.2,
            "CRITICAL": 1.4
        }

    def evaluate(self, threat_score: float, asset_criticality: str = "MEDIUM", vulnerability_rating: str = "MEDIUM") -> dict:
        """
        Evaluates overall risk.
        Args:
            threat_score: float (0.0 to 100.0)
            asset_criticality: str ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
            vulnerability_rating: str ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
        Returns:
            dict containing:
                "risk_score": float (0.0 to 100.0)
                "risk_level": str ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
                "asset_criticality": str
                "vulnerability_rating": str
        """
        
        criticality = str(asset_criticality).upper().strip()
        vulnerability = str(vulnerability_rating).upper().strip()

        
        if criticality not in self.criticality_multipliers:
            criticality = "MEDIUM"
        if vulnerability not in self.vulnerability_multipliers:
            vulnerability = "MEDIUM"

        crit_mult = self.criticality_multipliers[criticality]
        vuln_mult = self.vulnerability_multipliers[vulnerability]

        
        risk_score_raw = threat_score * crit_mult * vuln_mult
        
        
        risk_score = min(risk_score_raw, 100.0)
        risk_score = max(risk_score, 0.0)

        
        if risk_score < 15.0:
            risk_level = "LOW"
        elif risk_score < 45.0:
            risk_level = "MEDIUM"
        elif risk_score < 75.0:
            risk_level = "HIGH"
        else:
            risk_level = "CRITICAL"

        
        if threat_score == 0.0:
            risk_score = 0.0
            risk_level = "LOW"

        return {
            "risk_score": round(risk_score, 2),
            "risk_level": risk_level,
            "asset_criticality": criticality,
            "vulnerability_rating": vulnerability
        }
