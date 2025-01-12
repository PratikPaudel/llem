from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from .routers import audio_router
from .routers.vector_router import router as vector_router
from .routers.summary_router import router as summary_router
import logging
import sys
import os
import httpx
import asyncio
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)

logger = logging.getLogger(__name__)

app = FastAPI(title="Voice Search API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://llem.vercel.app",
        "https://llem-git-main-pratikpaudels-projects.vercel.app",
        "https://llem-kxuu9siin-pratikpaudels-projects.vercel.app",
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


@app.get("/health-check")
async def health_check():
    return {"status": "alive"}


async def keep_alive():
    """Background task to keep the server alive"""
    url = "https://llem.onrender.com/health-check"  # Use the public URL
    async with httpx.AsyncClient() as client:
        while True:
            try:
                current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                logger.info(f"⏰ Ping attempt at: {current_time}")

                response = await client.get(url)
                if response.status_code == 200:
                    logger.info("✅ Keep-alive ping successful")
                else:
                    logger.warning(
                        f"⚠️ Keep-alive ping returned status code: {response.status_code}"
                    )

                # Wait for 14 minutes
                await asyncio.sleep(14 * 60)
            except Exception as e:
                logger.error(f"❌ Keep-alive ping failed: {str(e)}")
                # On error, wait 30 seconds before retry
                await asyncio.sleep(30)


@app.on_event("startup")
async def startup_event():
    """Start background tasks when the app starts"""
    asyncio.create_task(keep_alive())


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")

    uvicorn.run("app.main:app", host=host, port=port, reload=True, log_level="info")
