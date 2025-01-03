from fastapi import APIRouter, Query
from ..services.vector_service import VectorService
from ..models.models import SearchResponse

router = APIRouter()
vector_service = VectorService()

@router.get("/search", response_model=SearchResponse)
async def search(
        query: str = Query(..., description="Search query text"),
        limit: int = Query(5, ge=1, le=20, description="Number of results to return")
) -> SearchResponse:
    results = await vector_service.search(query, limit)
    return SearchResponse(results=results)