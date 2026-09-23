"""Build web/index.html from the two markdown sources."""
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
tpl = (root / "web/template.html").read_text(encoding="utf-8")
sk = (root / "skoleni/promptovani-8h-skoleni.md").read_text(encoding="utf-8")
rs = (root / "research/promptovani-2026.md").read_text(encoding="utf-8")

sk = re.sub(r'<span style="[^"]*">(.*?)</span>', r'<span class="injection">\1</span>', sk)
sk = sk.replace("<example>", "&lt;example&gt;").replace("</example>", "&lt;/example&gt;")

def safe(s):
    return s.replace("</script", "<\\/script")

out = tpl.replace("__SKOLENI__", safe(sk)).replace("__RESEARCH__", safe(rs))
(root / "web/index.html").write_text(out, encoding="utf-8")
print("ok", len(out))
