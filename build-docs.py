#!/usr/bin/env python3
# Convert submission docs (*.md) into readable, on-brand HTML pages.
import re, os, html, glob

ROOT = '/Users/zop.dev/rav/Real/submission'
DOCS = os.path.join(ROOT, 'docs')

# ---------- inline formatting ----------
def inline(text):
    t = html.escape(text, quote=False)
    codes = []
    def stash(m):
        codes.append(m.group(1)); return '\x00%d\x00' % (len(codes) - 1)
    t = re.sub(r'`([^`]+)`', stash, t)
    def linkrepl(m):
        txt, url = m.group(1), m.group(2)
        if url.endswith('.md') and not url.startswith('http'):
            url = url[:-3] + '.html'
        return '<a href="%s">%s</a>' % (url, txt)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', linkrepl, t)
    t = re.sub(r'\*\*([^*]+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<!\*)\*([^*\n]+?)\*(?!\*)', r'<em>\1</em>', t)
    t = re.sub(r'\x00(\d+)\x00', lambda m: '<code>%s</code>' % codes[int(m.group(1))], t)
    return t

# ---------- block parser ----------
def is_table_row(l): return l.lstrip().startswith('|')
def is_sep_row(l):   return bool(re.match(r'^\s*\|?[\s:|-]+\|?\s*$', l)) and '-' in l

def render_table(rows):
    cells = [[c.strip() for c in re.sub(r'^\||\|$', '', r.strip()).split('|')] for r in rows]
    has_header = len(cells) >= 2 and is_sep_row(rows[1])
    out = ['<div class="tw"><table>']; start = 0
    if has_header:
        out.append('<thead><tr>' + ''.join('<th>%s</th>' % inline(c) for c in cells[0]) + '</tr></thead>'); start = 2
    out.append('<tbody>')
    for r in cells[start:]:
        if is_sep_row('|'.join(r)): continue
        out.append('<tr>' + ''.join('<td>%s</td>' % inline(c) for c in r) + '</tr>')
    out.append('</tbody></table></div>'); return '\n'.join(out)

def render_list(items):
    o = []; stack = []
    for indent, typ, text in items:
        if not stack or indent > stack[-1][0]:
            o.append('<%s>' % typ); stack.append((indent, typ))
        else:
            while len(stack) > 1 and indent < stack[-1][0]:
                o.append('</li></%s></li>' % stack[-1][1]); stack.pop()
            o.append('</li>')
        o.append('<li>%s' % inline(text))
    while stack:
        o.append('</li></%s>' % stack[-1][1]); stack.pop()
    return ''.join(o)

def convert(md):
    lines = md.split('\n'); out = []; i = 0; para = []; listbuf = []
    def flush_para():
        if para: out.append('<p>%s</p>' % inline(' '.join(para))); para.clear()
    def flush_list():
        if listbuf: out.append(render_list(listbuf)); listbuf.clear()
    while i < len(lines):
        line = lines[i]
        if line.lstrip().startswith('```'):
            flush_para(); flush_list(); i += 1; code = []
            while i < len(lines) and not lines[i].lstrip().startswith('```'):
                code.append(lines[i]); i += 1
            i += 1; out.append('<pre><code>%s</code></pre>' % html.escape('\n'.join(code), quote=False)); continue
        if is_table_row(line):
            flush_para(); flush_list(); tbl = []
            while i < len(lines) and is_table_row(lines[i]): tbl.append(lines[i]); i += 1
            out.append(render_table(tbl)); continue
        if line.strip() == '': flush_para(); flush_list(); i += 1; continue
        if re.match(r'^\s*([-*_])\1{2,}\s*$', line):
            flush_para(); flush_list(); out.append('<hr>'); i += 1; continue
        m = re.match(r'^(#{1,4})\s+(.*)$', line)
        if m:
            flush_para(); flush_list(); lvl = len(m.group(1))
            out.append('<h%d>%s</h%d>' % (lvl, inline(m.group(2).strip()), lvl)); i += 1; continue
        m = re.match(r'^(\s*)([-*]|\d+\.)\s+(.*)$', line)
        if m:
            flush_para(); indent = len(m.group(1).expandtabs(2))
            typ = 'ol' if m.group(2).endswith('.') else 'ul'
            listbuf.append((indent, typ, m.group(3).strip())); i += 1; continue
        flush_list(); para.append(line.strip()); i += 1
    flush_para(); flush_list(); return '\n'.join(out)

# ---------- template ----------
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" '
         'href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700'
         '&family=Inter:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">')
CSS = """
:root{--canvas:#0A0B10;--p1:#14161D;--p2:#1A1C25;--ink:#EAEDF4;--body:#C2C8D6;--muted:#8B93A6;
--line:rgba(21,192,122,.14);--accent:#15C07A;--accent-hi:#46DD9B;--sand:#E7C79C;
--display:'Host Grotesk','Inter',system-ui,sans-serif;--font:'Inter',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(130% 70% at 50% -8%,#15171F 0%,var(--canvas) 52%),var(--canvas);
color:var(--body);font-family:var(--font);font-size:16.5px;line-height:1.75;-webkit-font-smoothing:antialiased}
.bar{position:sticky;top:0;z-index:9;background:rgba(10,11,16,.78);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.bar .in{max-width:760px;margin:0 auto;padding:0 24px;height:54px;display:flex;align-items:center;gap:14px}
.bar a.back{font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--body);text-decoration:none;display:inline-flex;gap:7px;align-items:center;transition:color .15s}
.bar a.back:hover{color:var(--ink)}
.bar .sp{flex:1}.bar .tag{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--muted)}
main{max-width:760px;margin:0 auto;padding:46px 24px 30px}
h1{font-family:var(--display);font-weight:600;color:var(--ink);font-size:clamp(30px,5vw,42px);line-height:1.08;letter-spacing:-.025em;margin:0 0 6px}
h2{font-family:var(--display);font-weight:600;color:var(--ink);font-size:23px;letter-spacing:-.015em;margin:42px 0 4px;padding-top:18px;border-top:1px solid var(--line)}
h3{font-family:var(--display);font-weight:600;color:var(--ink);font-size:18px;letter-spacing:-.01em;margin:28px 0 2px}
h4{font-family:var(--font);font-weight:600;color:var(--ink);font-size:15px;margin:22px 0 0}
p{margin:14px 0}
a{color:var(--accent-hi);text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px}
strong{color:var(--ink);font-weight:600}em{color:var(--ink)}
code{font-family:var(--mono);font-size:.86em;background:var(--p2);border:1px solid var(--line);border-radius:5px;padding:1.5px 5px;color:var(--accent-hi)}
pre{background:var(--p1);border:1px solid var(--line);border-radius:12px;padding:16px 18px;overflow-x:auto;margin:18px 0}
pre code{background:none;border:0;padding:0;color:var(--body);font-size:13px;line-height:1.6}
ul,ol{margin:14px 0;padding-left:22px}li{margin:7px 0}li::marker{color:var(--accent)}
hr{border:0;border-top:1px solid var(--line);margin:34px 0}
.tw{overflow-x:auto;margin:18px 0;border:1px solid var(--line);border-radius:12px}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{text-align:left;padding:10px 13px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--accent-hi);font-weight:500;background:rgba(21,192,122,.05)}
tr:last-child td{border-bottom:0}
.nav{max-width:760px;margin:10px auto 60px;padding:0 24px;display:flex;gap:12px;justify-content:space-between}
.nav a{flex:1;border:1px solid var(--line);border-radius:12px;padding:14px 16px;text-decoration:none;background:var(--p1);transition:border-color .15s,transform .15s}
.nav a:hover{border-color:var(--accent);transform:translateY(-2px)}
.nav .k{font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--muted);display:block}
.nav .t{color:var(--ink);font-size:14.5px;font-weight:500;margin-top:3px;display:block}
.nav .next{text-align:right}
"""

def page(title, body, num, total, prev, nxt, base='../'):
    if num == 0:  # standalone (PROCESS)
        tag = 'build journal'
        nav = '<nav class="nav"><a href="%sindex.html"><span class="k">&larr; back</span><span class="t">Back to the showcase</span></a></nav>' % base
    else:
        tag = '%02d / %02d' % (num, total)
        parts = ['<nav class="nav">']
        if prev: parts.append('<a href="%s"><span class="k">&larr; previous</span><span class="t">%s</span></a>' % (prev[0], prev[1]))
        else: parts.append('<a href="%sindex.html"><span class="k">&larr; back</span><span class="t">The showcase</span></a>' % base)
        if nxt: parts.append('<a class="next" href="%s"><span class="k">next &rarr;</span><span class="t">%s</span></a>' % (nxt[0], nxt[1]))
        else: parts.append('<a class="next" href="%sindex.html"><span class="k">done &rarr;</span><span class="t">Back to the showcase</span></a>' % base)
        parts.append('</nav>'); nav = '\n'.join(parts)
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            '<title>%s &middot; morning command center</title>%s<style>%s</style></head><body>'
            '<div class="bar"><div class="in"><a class="back" href="%sindex.html">&larr; Morning command center</a>'
            '<span class="sp"></span><span class="tag">%s</span></div></div>'
            '<main>%s</main>%s</body></html>') % (html.escape(title), FONTS, CSS, base, tag, body, nav)

def title_of(md, fallback):
    m = re.search(r'^#\s+(.*)$', md, re.M); return m.group(1).strip() if m else fallback

# ---------- run ----------
files = sorted(glob.glob(os.path.join(DOCS, '[0-9][0-9]-*.md')))
titles = [title_of(open(f, encoding='utf-8').read(), os.path.basename(f)) for f in files]
total = len(files)
for idx, f in enumerate(files):
    body = convert(open(f, encoding='utf-8').read())
    prev = (os.path.basename(files[idx-1])[:-3] + '.html', titles[idx-1]) if idx > 0 else None
    nxt  = (os.path.basename(files[idx+1])[:-3] + '.html', titles[idx+1]) if idx < total-1 else None
    out = page(titles[idx], body, idx+1, total, prev, nxt, base='../')
    open(os.path.join(DOCS, os.path.basename(f)[:-3] + '.html'), 'w', encoding='utf-8').write(out)
    print('wrote docs/' + os.path.basename(f)[:-3] + '.html')

# PROCESS.md at root
pf = os.path.join(ROOT, 'PROCESS.md')
if os.path.exists(pf):
    pmd = open(pf, encoding='utf-8').read()
    out = page(title_of(pmd, 'How I built this'), convert(pmd), 0, total, None, None, base='')
    open(os.path.join(ROOT, 'PROCESS.html'), 'w', encoding='utf-8').write(out)
    print('wrote PROCESS.html')
print('OK done')
