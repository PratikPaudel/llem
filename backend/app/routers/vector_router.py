from fastapi import APIRouter, Query
from ..services.vector_service import VectorService
from ..services.query_service import QueryService
from ..models.models import SearchResponse, RefinementResponse  

router = APIRouter()
vector_service = VectorService()
query_service = QueryService()

@router.get("/refine", response_model=RefinementResponse)
async def refine_query(
        query: str = Query(..., description="Original query text to refine")
) -> RefinementResponse:
    # Get the refined query
    refined_query = await query_service.refine_query(query)
    return RefinementResponse(refined_query=refined_query)

@router.get("/search", response_model=SearchResponse)
async def search(
        query: str = Query(..., description="Search query text"),
        limit: int = Query(5, ge=1, le=20, description="Number of results to return")
) -> SearchResponse:
    # Use the provided query (which should already be refined) for search
    results = await vector_service.search(query, limit)
    return SearchResponse(
        results=results,
        refined_query=query  # Include the query in the response
    )