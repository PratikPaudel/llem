from fastapi import APIRouter, UploadFile, File
from ..services.audio_service import transcribe_audio

router = APIRouter()

@router.post("/transcribe")
async def transcribe_audio_route(file: UploadFile = File(...)):
    text = await transcribe_audio(file)
    return {"text": text}