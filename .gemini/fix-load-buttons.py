import re

# Read the file
with open(r'c:/Users/abhis/OneDrive/Downloads (OneDrive)/sparq-v15.3/utils.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Replace raw with data in consumerViewPersona line
content = re.sub(
    r'formData\.consumerViewPersona = consumerViewPersonaReverseMap\.get\(raw\["Consumer\'s View of Brand Persona"\]\) \|\| raw\["Consumer\'s View of Brand Persona"\] \|\| \'\';',
    'formData.consumerViewPersona = consumerViewPersonaReverseMap.get(data["Consumer\'s View of Brand Persona"] || data["Consumer View Persona:"]) || data["Consumer\'s View of Brand Persona"] || data["Consumer View Persona:"] || \'\';',
    content
)

# Fix 2: Update Ad Objectives to handle both array and comma-separated string
content = re.sub(
    r'const adObjectivesRaw = Array\.isArray\(raw\["Ad Objectives"\]\) \? raw\["Ad Objectives"\] : \[\];',
    'const adObjectivesRaw = Array.isArray(data["Ad Objectives"]) ? data["Ad Objectives"] : csvToArray(data["Ad Objectives"] || \'\');',
    content
)

# Fix 3: Update Ad Focus similarly
content = re.sub(
    r'const adFocusRaw = Array\.isArray\(raw\["Ad Focus \(in order of priority\)"\]\) \? raw\["Ad Focus \(in order of priority\)"\] : \[\];',
    'const adFocusRaw = Array.isArray(data["Ad Focus (in order of priority)"]) ? data["Ad Focus (in order of priority)"] : csvToArray(data["Ad Focus (in order of priority)"] || \'\');',
    content
)

# Write back
with open(r'c:/Users/abhis/OneDrive/Downloads (OneDrive)/sparq-v15.3/utils.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed load data mapping for button selections")
