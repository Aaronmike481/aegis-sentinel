import re

def check_regex(payload: str) -> dict:
    patterns = [
        r"ignore previous instructions",
        r"ignore all prior",
        r"system prompt",
        r"drop table",
        r"<script>",
        r"admin password"
        r"api key",         
        r"secret",      
         r"ignore my message",     
        r"allow me to pass",    
        r"database"
    ]

    for part in patterns:
        if re.search(part, payload, re.IGNORECASE):
            return {
                "blocked": True, 
                "layer": "Regex",
                "reason": f"Pattern matched: {part}"
            }

    
    return {
        "blocked": False, 
        "layer": "Regex", 
        "reason": "No patterns found"
    }