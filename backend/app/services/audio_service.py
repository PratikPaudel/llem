﻿from fastapi import UploadFile, HTTPException
from openai import OpenAI
import tempfile
import os
import logging
from typing import IO
from dotenv import load_dotenv
from pathlib import Path

# Get the absolute path to the .env file
base_dir = Path(__file__).resolve().parent.parent.parent
env_path = base_dir / ".env"

# Load environment variables first
if os.getenv("ENVIRONMENT") != "production":
    load_dotenv(dotenv_path=env_path)

logger = logging.getLogger(__name__)


class AudioService:
    def __init__(self):
        if not os.getenv("OPENAI_API_KEY"):
            raise ValueError("OPENAI_API_KEY not found in environment variables")
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def transcribe_audio(file: UploadFile) -> str:
    audio_service = AudioService()
    logger.info("Starting transcription process")

    # Check file format hi there
    allowed_formats = (
        ".flac",
        ".mp3",
        ".mp4",
        ".mpeg",
        ".mpga",
        ".m4a",
        ".ogg",
        ".wav",
        ".webm",
    )
    if not file.filename.lower().endswith(allowed_formats):
        raise HTTPException(
            400,
            f"Unsupported file format. Must be one of: {', '.join(allowed_formats)}",
        )

    temp_file: IO | None = None
    temp_file_path: str | None = None

    try:
        # Create a temporary file
        temp_file = tempfile.NamedTemporaryFile(
            delete=False, suffix=os.path.splitext(file.filename)[1]
        )
        temp_file_path = temp_file.name

        # Write the uploaded file content
        contents = await file.read()
        temp_file.write(contents)
        temp_file.flush()
        # Important: Close the file before OpenAI tries to read it
        temp_file.close()

        # Transcribe using the new OpenAI API format
        with open(temp_file_path, "rb") as audio_file:
            transcript = audio_service.client.audio.transcriptions.create(
                model="whisper-1", file=audio_file, response_format="text"
            )

        return transcript

    except Exception as e:
        logger.error(f"Transcription error: {str(e)}")
        raise HTTPException(500, f"Transcription failed: {str(e)}")

    finally:
        # Clean up in the finally block to ensure it always runs
        try:
            if temp_file_path and os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
        except Exception as e:
            logger.error(f"Error cleaning up temporary file: {str(e)}")
