import re

# Read the file
with open(r'c:/Users/abhis/OneDrive/Downloads (OneDrive)/sparq-v15.3/hooks/usePillarOperations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the pattern
pattern = r'"overview": "Translated Overview",\s+"frames":'
replacement = '"overview": "Translated Overview",\n        "story": "Translated full narrative story text",\n        "frames":'
content = re.sub(pattern, replacement, content)

# Write back
with open(r'c:/Users/abhis/OneDrive/Downloads (OneDrive)/sparq-v15.3/hooks/usePillarOperations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed translation prompt - added story field")
