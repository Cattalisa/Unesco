import time
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers.analysis import router as analysis_router
from app.utils.logger import logger

app = FastAPI(
    title="MindGuard API",
    description="Backend API for MindGuard AI Emotional Manipulation Detector",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def request_logging_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.2f}ms")
    return response

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error. Please try again later."}
    )

# Register routers
app.include_router(analysis_router, prefix="/analyze")

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "MindGuard API"}
