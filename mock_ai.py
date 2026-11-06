from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class ChatRequest(BaseModel):
    payload: str

@app.post("/chat")
def chat(req: ChatRequest):
    # This is a fake AI i'll use to test my firewall
    return {
        "status": "success",
        "target_ai_response": f"Target AI received your message: '{req.payload}'. I am a secure LLM.",
        "model": "Mock-GPT-4"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)