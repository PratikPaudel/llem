from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
from ..services.summary_service import SummaryService
import logging

logger = logging.getLogger(__name__)

router = APIRouter()
summary_service = SummaryService()

class SearchResult(BaseModel):
    text: str
    score: float
    source: str

class SummarizeRequest(BaseModel):
    results: List[SearchResult]
    query: str

class FormattedStory(BaseModel):
    title: str
    themes: List[str]
    summarized_content: str
    source: str
    score: float

class SummaryResponse(BaseModel):
    formattedStories: List[FormattedStory]

@router.post("/summarize", response_model=SummaryResponse)
async def summarize_search_results(request: SummarizeRequest) -> SummaryResponse:
    """
    Summarize search results using GPT.
    """
    try:
        logger.info(f"Received summarization request for query: {request.query}")
        logger.info(f"Number of results to summarize: {len(request.results)}")

        # Log first result for debugging
        if request.results:
            logger.info(f"Sample first result: {request.results[0].dict()}")

        # Convert Pydantic models to dict
        results = [result.dict() for result in request.results]

        logger.info("Calling summary service")
        # Get summary from service
        summary_data = await summary_service.summarize_results(
            results=results,
            query=request.query
        )

        return SummaryResponse(**summary_data)

    except Exception as e:
        logger.error(f"Summarization failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Summarization failed: {str(e)}"
        )