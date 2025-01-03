from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import audio_router
from .config import get_settings
from .routers.vector_router import router as vector_router
import os

settings = get_settings()

app = FastAPI(title="Voice Search API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://llem.vercel.app",
        "https://llem-git-main-pratikpaudels-projects.vercel.app",
        "https://llem-kxuu9siin-pratikpaudels-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audio_router.router, prefix="/api", tags=["audio"])
app.include_router(vector_router, prefix="/api", tags=["search"])

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(
        "app.main:app",  # Changed from "main:app" to "app.main:app"
        host=host,
        port=port,
        reload=True
    )
