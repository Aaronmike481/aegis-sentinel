from pyproc_worker import expose, run_worker
from defense.regex.regex import check_regex
from defense.gly.gly import check_glyph
from defense.huawei.Huawei import check_huawei_ai
from attack.attack_worker import apply_attack

@expose
def process_attack(req: dict) -> dict:
    payload = req.get("payload", "")
    mode = req.get("mode", "direct")
    
    # 1. IF PYRIT MODE (Commented out for now)
    # if mode == "pyrit":
    #     return await run_pyrit_crescendo(...)
        
    
    if mode in ["emoji", "base64", "upside_down", "leet", "url"]:
        payload = apply_attack(payload, mode)
        
    # 3. DEFENSE LAYERS
    res1 = check_regex(payload)
    if res1["blocked"]: return {"status": "BLOCKED", "layer": res1["layer"], "reason": res1["reason"]}
        
    res2 = check_glyph(payload)
    if res2["blocked"]: return {"status": "BLOCKED", "layer": res2["layer"], "reason": res2["reason"]}
        
    res3 = check_huawei_ai(payload)
    if res3["blocked"]: return {"status": "BLOCKED", "layer": res3["layer"], "reason": res3["reason"]}
        
    return {"status": "ALLOWED", "layer": "None", "reason": "Payload is safe"}

if __name__ == "__main__":
    run_worker()