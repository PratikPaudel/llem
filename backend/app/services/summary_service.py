from typing import List, Dict
import json
import logging
from openai import OpenAI
from fastapi import HTTPException
from dotenv import load_dotenv
import os
from pathlib import Path

# Get the absolute path to the .env file
base_dir = Path(__file__).resolve().parent.parent.parent
env_path = base_dir / ".env"

# Load environment variables first
if os.getenv("ENVIRONMENT") != "production":
    load_dotenv(dotenv_path=env_path)

logger = logging.getLogger(__name__)


class SummaryService:
    def __init__(self):
        logger.info("Initializing SummaryService")
        if not os.getenv("OPENAI_API_KEY"):
            raise ValueError("OPENAI_API_KEY not found in environment variables")
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    async def summarize_results(self, results: List[Dict], query: str) -> Dict:
        try:
            logger.info(f"Starting summarization for query: {query}")

            stories_prompt = """For each story, provide:
1. A pullquote (verbatim) from the story that is relevant to the user input. Make this the title of the summary.
2. 3-4 key themes relevant to the story
3. A detailed 3-4 paragraph summary of the story
4. Keep it in first person and as if the narrator is telling the most relevant part of the story. Ensure the story's key themes and relevant quotes are naturally woven into the narrative. Start the summary with a relevant feeling that describes how the narrator felt at the beginning of the story (verbatim if possible). You should make sure that the summary starts with a description of the struggle, and then move into the change explored in the story. Then describe the intentional actions the protagonist took. Then describe the realizations resulting from those actions. Stick to the facts of the original story.

Maintain the original meaning and tone. Keep paragraphs properly separated. 

Stories to analyze:\n\n"""

            for idx, result in enumerate(results, 1):
                stories_prompt += f"""Story {idx}:
{result['text']}

---\n"""

            stories_prompt += """Return ONLY a JSON object with this structure:
{
    "formattedStories": [
        {
            "title": "a pullquote (verbatim) from the story that is relevant to the user input",
            "themes": ["theme1", "theme2", "theme3", "theme4"],
            "summarized_content": "First paragraph of the summary...
Second paragraph with more details...
Third paragraph concluding the story..."
        }
    ]
}"""

            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a skilled editor and storyteller who creates detailed, engaging summaries. "
                            "Each summary should be written in a first-person narrative, as if the narrator "
                            "is recounting the most relevant parts of the story. Summaries should be no more than 2 paragraphs long "
                            "with clear paragraph breaks, vivid descriptions, and an emotional tone where appropriate. "
                        ),
                    },
                    {"role": "user", "content": stories_prompt},
                ],
                response_format={"type": "json_object"},
            )

            data = json.loads(response.choices[0].message.content)

            # Add source and score to each story
            for idx, story in enumerate(data["formattedStories"]):
                if idx < len(results):
                    story["source"] = results[idx]["source"]
                    story["score"] = results[idx]["score"]

            return data

        except Exception as e:
            logger.error(
                f"Unexpected error in summarize_results: {str(e)}", exc_info=True
            )
            raise HTTPException(
                status_code=500, detail=f"Failed to generate summary: {str(e)}"
            )
