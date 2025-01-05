from pydantic import BaseModel, ConfigDict
from typing import Optional, List

# Base Models
class TranscriptionResponse(BaseModel):
    text: str
    confidence: Optional[float] = None
    tags: Optional[List[str]] = None

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )

class SearchResult(BaseModel):
    text: str
    score: float
    source: str

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )

class SearchResponse(BaseModel):
    results: List[SearchResult]
    refined_query: str

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )

class RefinementResponse(BaseModel):
    refined_query: str

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )

class ErrorResponse(BaseModel):
    error: str
    details: Optional[str] = None

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )