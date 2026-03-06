from pydantic import BaseModel
from typing import List, Optional

class VulnerabilityIssue(BaseModel):
    file: str
    type: str
    severity: str
    fix: str
    line: Optional[int] = None
    description: Optional[str] = None

class ScanResult(BaseModel):
    total_files: int
    vulnerabilities_found: int
    issues: List[VulnerabilityIssue]
