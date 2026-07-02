from fastapi import APIRouter, HTTPException, status
from app.schemas.analysis import AnalyzeRequest, MindGuardReport
from app.services.gemini_service import gemini_service
from google.genai.errors import APIError, ClientError

router = APIRouter(tags=["Analysis"])

@router.post("", response_model=MindGuardReport)
async def analyze_text(request: AnalyzeRequest):
    try:
        report = await gemini_service.analyze_text(request.text, request.language)
        return report
    except ClientError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid request to AI engine: {e.message}"
        )
    except APIError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI engine error: {e.message}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal analysis error: {str(e)}"
        )
