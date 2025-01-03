from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import audio_router
from .config import get_settings
from .routers.vector_router import router as vector_router

settings = get_settings()

app = FastAPI(title="Voice Search API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "llem.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(audio_router.router, prefix="/api", tags=["audio"])
app.include_router(vector_router, prefix="/api", tags=["search"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
