import re

with open('src/components/Hero/Hero.css', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    r'rgba\(168,\s*85,\s*247,\s*': r'rgba(255, 255, 255, ',
    r'#a855f7': '#ffffff',
    r'#a78bfa': '#cccccc',
    r'#d8b4fe': '#e5e5e5',
    r'#c084fc': '#dddddd',
    r'#22c55e': '#ffffff',
    r'#ef4444': '#777777',
    r'#7f1d1d': '#222222',
    r'#eab308': '#aaaaaa',
    r'rgba\(34,\s*197,\s*94,\s*': r'rgba(255, 255, 255, ',
    r'rgba\(239,\s*68,\s*68,\s*': r'rgba(119, 119, 119, ',
}

for pattern, repl in replacements.items():
    content = re.sub(pattern, repl, content, flags=re.IGNORECASE)

with open('src/components/Hero/Hero.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Hero.css updated.")
