import hashlib
from google import genai
from google.genai import types
from google.genai.errors import APIError, ClientError, ServerError
from app.schemas.analysis import MindGuardReport
from app.config import settings
from app.utils.logger import logger

class GeminiService:
    def __init__(self):
        # GenAI Client initialization using config settings
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self._cache = {}  # In-memory dictionary cache

    def _get_cache_key(self, text: str) -> str:
        return hashlib.sha256(text.encode("utf-8")).hexdigest()

    async def analyze_text(self, text: str) -> MindGuardReport:
        if not text.strip():
            return MindGuardReport(overall_score=0, manipulations=[])

        cache_key = self._get_cache_key(text)
        if cache_key in self._cache:
            logger.info("Cache hit for analyze_text.")
            return self._cache[cache_key]

        prompt = (
            "You are an expert in media and information literacy (MIL) and rhetorical analysis. "
            "Analyze the following text to identify emotional manipulation techniques (e.g. fear appeals, "
            "false dichotomies, emotional anchoring, bandwagon effects, authority fallacies, rage-bait, etc.). "
            "Highlight the specific text snippets, explain why they are manipulative, and provide critical thinking tips."
        )

        try:
            logger.info("Calling Gemini API...")
            # Call Gemini API asynchronously using the .aio interface
            response = await self.client.aio.models.generate_content(
                model="gemini-3-flash-preview",
                contents=[prompt, text],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=MindGuardReport
                )
            )
            
            # Validate and return Pydantic model
            report = MindGuardReport.model_validate_json(response.text)
            
            # Save to cache
            self._cache[cache_key] = report
            
            # Simple cache eviction (keep cache size small for MVP)
            if len(self._cache) > 1000:
                self._cache.pop(next(iter(self._cache)))
                
            return report

        except ClientError as e:
            logger.error(f"Gemini Client Error: {e.message}")
            raise
        except ServerError as e:
            logger.error(f"Gemini Server Error: {e.message}")
            raise
        except APIError as e:
            logger.error(f"Gemini API Error: {e.message}")
            raise

# Singleton instance
gemini_service = GeminiService()
