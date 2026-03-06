import os
import shutil
import uuid
from typing import Dict, Any

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from models import ScanResult, VulnerabilityIssue
from scanner import scan_directory
from utils import extract_zip, clear_directory

app = FastAPI(title="AI Vulnerability Scanner Backend")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"status": "ok", "message": "AI Vulnerability Scanner Backend is running."}

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# In-memory storage for scan results mapping (demo purpose)
scan_results_db: Dict[str, Any] = {
    "latest": {
        "total_files": 0,
        "vulnerabilities_found": 0,
        "issues": []
    }
}

@app.post("/upload-folder")
async def upload_folder(file: UploadFile = File(...)):
    """Receives any file, clears previous uploads, and saves or extracts it."""
    clear_directory(UPLOAD_DIR)

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    extract_path = os.path.join(UPLOAD_DIR, "extracted_" + str(uuid.uuid4())[:8])
    os.makedirs(extract_path, exist_ok=True)

    if file.filename.endswith('.zip'):
        success = extract_zip(file_location, extract_path)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to extract zip file")
        os.remove(file_location)
    else:
        # Move single file into extraction target folder instead of keeping at root
        shutil.move(file_location, os.path.join(extract_path, file.filename))

    return {"message": "File uploaded and processed successfully", "extract_path": extract_path}

@app.post("/scan", response_model=ScanResult)
async def start_scan():
    """Finds extracted source, runs the scan, constructs dashboard-compatible result."""
    extracted_dirs = [os.path.join(UPLOAD_DIR, d) for d in os.listdir(UPLOAD_DIR) if os.path.isdir(os.path.join(UPLOAD_DIR, d))]

    if not extracted_dirs:
        raise HTTPException(status_code=400, detail="No source code found. Please upload a folder/file first.")

    target_dir = extracted_dirs[0]
    scan_output = scan_directory(target_dir)

    issues = []
    for vuln in scan_output["vulnerabilities"]:
        if not isinstance(vuln, dict):
            continue

        severity = vuln.get("severity", "Medium")
        if severity not in ["Critical", "High", "Medium", "Low"]:
            severity = "Medium"

        issues.append(VulnerabilityIssue(
            file=vuln.get("file", "unknown"),
            type=vuln.get("type", vuln.get("vulnerability", "Unknown Issue")),
            severity=severity,
            fix=vuln.get("fix", "No fix suggested by AI."),
            line=vuln.get("line"),
            description=vuln.get("description", vuln.get("explanation", ""))
        ))

    result = ScanResult(
        total_files=scan_output["total_files"],
        vulnerabilities_found=len(issues),
        issues=issues
    )

    # Store result for dashboard fetching
    scan_results_db["latest"] = result.model_dump()

    return result

@app.get("/results", response_model=ScanResult)
async def get_results():
    """Endpoint for frontend to retrieve previous scan results."""
    return scan_results_db["latest"]

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
