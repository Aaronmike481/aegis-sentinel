
import urllib.parse

# from pyrit.common import initialize_pyrit, IN_MEMORY
# from pyrit.orchestrator import CrescendoOrchestrator
# from pyrit.prompt_target import OpenAIChatTarget
import base64
"""

async def run_pyrit_crescendo(target_url: str, api_key: str, objective: str) -> dict:
    initialize_pyrit(memory_db_type=IN_MEMORY)
    
    target = OpenAIChatTarget(endpoint=target_url, api_key=api_key, model_name="gpt-4o-mini")
    adversarial = OpenAIChatTarget(endpoint=target_url, api_key=api_key, model_name="gpt-4o")
    
    orchestrator = CrescendoOrchestrator(
        objective_target=target,
        adversarial_chat=adversarial,
        scoring_target=adversarial,
        max_turns=5,
    )
    
    await orchestrator.run_attack_async(objective=objective)
    
    return {"status": "ATTACK_COMPLETE", "layer": "PyRIT", "turns": 5}
"""
def emoji(text: str) -> str:
    encoding = ""
    for char in text:
        encoding += chr(0xE0100 + (ord(char) % 16))
    return f"🤖{encoding}🤖"

def b64_encode(text: str) -> str:
    return base64.b64encode(text.encode()).decode()

def upside_down(text: str) -> str:
    flip_map = str.maketrans("abcdefghijklmnopqrstuvwxyz", "ɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎz")
    return text.translate(flip_map)[::-1]

def leetspeak(text: str) -> str:
    leet_map = str.maketrans("aeiost", "431057")
    return text.translate(leet_map)

def url_encode(text: str) -> str:
    return urllib.parse.quote(text)

CONVERTERS = {
    "emoji": emoji,
    "base64": b64_encode,
    "upside_down": upside_down,
    "leet": leetspeak,
    "url": url_encode,
}

def apply_attack(payload: str, technique: str) -> str:
    converter = CONVERTERS.get(technique)
    if not converter:
        return payload
    return converter(payload)