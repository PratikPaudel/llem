from openai import OpenAI

class QueryService:
    def __init__(self):
        self.client = OpenAI(api_key="")

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
                        """
                    },
                    {"role": "user", "content": original_query}
                ],
                temperature=0.7,
                max_tokens=200
            )

            refined_query = response.choices[0].message.content.strip()
            return refined_query

        except Exception as e:
            print(f"Query refinement error: {str(e)}")
            return original_query