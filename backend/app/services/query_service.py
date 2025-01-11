from openai import OpenAI
from dotenv import load_dotenv
import os
from pathlib import Path

# Get the absolute path to the .env file
base_dir = Path(__file__).resolve().parent.parent.parent
env_path = base_dir / ".env"

# Load environment variables first
if os.getenv("ENVIRONMENT") != "production":
    load_dotenv(dotenv_path=env_path)


class QueryService:
    def __init__(self):
        if not os.getenv("OPENAI_API_KEY"):
            raise ValueError("OPENAI_API_KEY not found in environment variables")
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    async def refine_query(self, original_query: str) -> str:
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": """Enhance and refine this query to be more descriptive and searchable.
                        - Make it more detailed while maintaining the original intent
                        - Add relevant contextual details and synonyms
                        - Use natural, conversational language
                        - Focus on emotional and experiential aspects if applicable
                        - Keep it under 2-3 sentences
                        """,
                    },
                    {"role": "user", "content": original_query},
                ],
                temperature=0.7,
                max_tokens=200,
            )

            refined_query = response.choices[0].message.content.strip()
            return refined_query

        except Exception as e:
            print(f"Query refinement error: {str(e)}")
            return original_query
