from fastapi import HTTPException
from openai import OpenAI
from pinecone import Pinecone
from typing import List, Dict
import os
from dotenv import load_dotenv
from pathlib import Path

# Get the absolute path to the .env file
base_dir = Path(__file__).resolve().parent.parent.parent
env_path = base_dir / ".env"

# Load environment variables first
if os.getenv("ENVIRONMENT") != "production":
    load_dotenv(dotenv_path=env_path)

# Debug line to check if the API key is loaded
if not os.getenv("PINECONE_API_KEY"):
    raise ValueError("PINECONE_API_KEY not found in environment variables")


class VectorService:
    def __init__(self):
        self.pc = Pinecone(
            api_key=os.getenv("PINECONE_API_KEY"),
            environment=os.getenv("PINECONE_ENVIRONMENT", "us-west1-gcp"),
        )
        self.index = self.pc.Index(os.getenv("PINECONE_INDEX_NAME", "langchainvector"))
        self.openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    async def search(self, query: str, limit: int = 5) -> List[Dict]:
        try:
            # Create embedding for search query
            embedding_response = self.openai_client.embeddings.create(
                model="text-embedding-ada-002", input=query
            )
            query_embedding = embedding_response.data[0].embedding

            # Search Pinecone
            results = self.index.query(
                vector=query_embedding, top_k=limit, include_metadata=True
            )

            # Format results
            formatted_results = [
                {
                    "text": match["metadata"]["text"],
                    "score": float(match["score"]),
                    "source": match["metadata"].get("source", "Unknown"),
                }
                for match in results["matches"]
            ]

            return formatted_results

        except Exception as e:
            print(f"Search error: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
