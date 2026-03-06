import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Enable Gemini API using user-provided key
genai.configure(api_key="AIzaSyCdO0P2bTIZ_Hu1s9GCdHVLSW5DOSGsopY")

# Specify the reliable JSON-enabling model
model = genai.GenerativeModel('gemini-2.5-flash')

def analyze_code_with_ai(file_name: str, code_content: str):
    """
    Sends code content to Google Gemini API to detect vulnerabilities.
    Expects a JSON string list in response.
    """
    prompt = f"""
    Analyze the following source code and detect potential security vulnerabilities such as buffer overflow, SQL injection, command injection, unsafe input handling, or insecure functions. Also suggest fixes.

    File name: {file_name}

    Source code:
    ```
    {code_content}
    ```

    Return the result strictly as a valid JSON array of objects, with each object having the following keys exactly:
    - "type": string (Vulnerability type like Security, Buffer Overflow)
    - "file": string (The file name provided)
    - "line": integer (The line number where the issue occurs, or null if unknown)
    - "severity": string (Critical, High, Medium, or Low)
    - "description": string (Explanation of the issue)
    - "fix": string (Suggested fix)

    Do not include any other text besides the JSON array. Make sure the JSON is purely formatted without markdown blocks if possible, or only inside a single block.
    """

    import time
    from google.api_core.exceptions import ResourceExhausted

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.1,
                ),
            )

            text = response.text.strip()

            # Clean up response if the AI bundled it in markdown triple backticks
            if text.startswith("```"):
                lines = text.splitlines()
                if len(lines) > 0 and lines[0].startswith("```"):
                    lines = lines[1:]
                if len(lines) > 0 and lines[-1].startswith("```"):
                    lines = lines[:-1]
                text = "\n".join(lines).strip()

            if text.lower().startswith("json"):
                text = text[4:].strip()

            parsed_json = json.loads(text)

            # Structure the data reliably for the scanner generator
            if not isinstance(parsed_json, list):
                if isinstance(parsed_json, dict) and "issues" in parsed_json:
                    return parsed_json["issues"]
                elif isinstance(parsed_json, dict):
                    return [parsed_json]
                else:
                    return []
            return parsed_json

        except ResourceExhausted as e:
            if attempt < max_retries - 1:
                print(f"Gemini API rate limit reached. Waiting 10 seconds... (Attempt {attempt+1}/{max_retries})")
                time.sleep(10)
            else:
                print("Gemini API Rate Limit completely exhausted. Try again later.")
                return []
        except Exception as e:
            import traceback
            traceback.print_exc()
            print(f"Error analyzing {file_name} with Gemini AI: {e}")
            return []

    return []
