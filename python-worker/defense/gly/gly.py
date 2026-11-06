import regex
import unicodedata

def check_glyph(payload: str) -> dict:
    text = unicodedata.normalize('NFKC', payload)
    
    # this catches invisible chars (\p{Cf}) Or emojis (\p{Emoji})
    # catche mixed scripts (Latin + Cyrillic in the same word)
    pattern = r'\p{Cf}|\p{Emoji}|\b[^\s]*(?=.*\p{Latin})(?=.*\p{Cyrillic})[^\s]*\b'
    
    if regex.search(pattern, text):
        return {
            "blocked": True, 
            "layer": "GlyphGuard", 
            "reason": "Unicode anomaly detected (Invisible chars, Emojis, or Mixed-script spoofing)"
        }

    return {"blocked": False, "layer": "GlyphGuard", "reason": "Passed"}