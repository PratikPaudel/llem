from fastapi import HTTPException
from openai import OpenAI
from pinecone import Pinecone
from typing import List, Dict

class VectorService:
    def __init__(self):
        self.pc = Pinecone(api_key="")
        self.index = self.pc.Index("")
        self.openai_client = OpenAI(api_key="")

    async def search(self, query: str, limit: int = 5) -> List[Dict]:
        try:
            # Create embedding for search query
            embedding_response = self.openai_client.embeddings.create(
                model="text-embedding-ada-002",
                input=query
            )
            query_embedding = embedding_response.data[0].embedding

            # Search Pinecone
            results = self.index.query(
                vector=query_embedding,
                top_k=limit,
                include_metadata=True
            )

            # Format results
            formatted_results = [
                {
                    'text': match['metadata']['text'],
                    'score': float(match['score']),
                    'source': match['metadata'].get('source', 'Unknown')
                }
                for match in results['matches']
            ]

            return formatted_results

        except Exception as e:
            print(f"Search error: {str(e)}") 
            raise HTTPException(status_code=500, detail=str(e))