from pydantic import BaseModel
from typing import Optional, List

class TranscriptionResponse(BaseModel):
    text: str
    confidence: Optional[float] = None
    tags: Optional[List[str]] = None
class SearchResult(BaseModel):
    text: str
    score: float
    source: str

class SearchResponse(BaseModel):
    results: List[SearchResult]
class ErrorResponse(BaseModel):
    error: str
    details: Optional[str] = None
    
    
    