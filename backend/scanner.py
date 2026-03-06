import os
from ai_service import analyze_code_with_ai

def scan_directory(directory_path: str):
    """
    Recursively scans the directory, reads text-based files, and calls the AI analyzer on them.
    Returns the total files scanned and the aggregated vulnerabilities found.
    """
    scanned_files_count = 0
    all_vulnerabilities = []

    for root, _, files in os.walk(directory_path):
        for file in files:
            file_path = os.path.join(root, file)

            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                relative_path = os.path.relpath(file_path, directory_path)
                print(f"Analyzing {relative_path}...")

                # Analyze code content
                vulns = analyze_code_with_ai(relative_path, content)

                if isinstance(vulns, list):
                    all_vulnerabilities.extend(vulns)
                elif isinstance(vulns, dict):
                    # Some AI quirks may result in a single dict returned instead of array
                    all_vulnerabilities.append(vulns)

                scanned_files_count += 1
            except UnicodeDecodeError:
                print(f"Skipping binary/unreadable file: {file_path}")
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")

    return {
        "total_files": scanned_files_count,
        "vulnerabilities": all_vulnerabilities
    }
