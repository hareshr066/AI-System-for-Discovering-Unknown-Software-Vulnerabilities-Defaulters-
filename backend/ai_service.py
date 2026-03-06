import os
import json
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def analyze_code_with_ai(file_name: str, code_content: str):
    """
    Sends code content to Groq API (Llama model) to detect vulnerabilities.
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

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert security code analyzer. You strictly respond only with valid JSON arrays representing vulnerabilities found, without conversational padding."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama3-8b-8192",
            temperature=0.1,
        )

        response_text = chat_completion.choices[0].message.content.strip()

        # Clean up response if the AI bundled it in markdown triple backticks
        if response_text.startswith("```"):
            lines = response_text.splitlines()
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].startswith("```"):
                lines = lines[:-1]
            response_text = "\n".join(lines).strip()

        return json.loads(response_text)
    except Exception as e:
        print(f"Error analyzing {file_name} with AI: {e}")
        return []
