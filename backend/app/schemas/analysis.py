from pydantic import BaseModel, Field

class ManipulationDetail(BaseModel):
    text: str = Field(description="The exact text snippet from the article that is manipulative.")
    technique: str = Field(description="The emotional manipulation technique used (e.g., Fear Appeal, False Dichotomy, Emotional Anchoring, Bandwagon Effect).")
    explanation: str = Field(description="Detailed explanation of why this snippet is manipulative.")
    counter_tip: str = Field(description="A critical thinking tip to help the reader counter this specific manipulation.")

class MindGuardReport(BaseModel):
    overall_score: int = Field(description="Overall emotional manipulation score from 0 (no manipulation) to 100 (extreme manipulation).")
    manipulations: list[ManipulationDetail] = Field(description="List of detected emotional manipulations.")

class AnalyzeRequest(BaseModel):
    text: str
