from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import audio_router
from .routers.vector_router import router as vector_router
from .routers.summary_router import router as summary_router
import logging
import sys
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

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

# Log when routes are added
logger.info("Adding routes to application")
app.include_router(audio_router.router, prefix="/api", tags=["audio"])
app.include_router(vector_router, prefix="/api", tags=["search"])
app.include_router(summary_router, prefix="/api", tags=["summary"])

@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )