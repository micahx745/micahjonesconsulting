const ts = require('typescript');
const fs = require('node:fs');
const cp = require('node:child_process');
const pattern = /80% Wall|chapter one|the manual|playbook/i;
const paths = cp.execFileSync('git',['ls-files','--','app','components','content','lib'],{encoding:'utf8'}).trim().split('\n');
const hits=[];
for(const file of paths) {
  const source=fs.readFileSync(file,'utf8');
  if(file.endsWith('.mdx')) {
    source.split('\n').forEach((text,i)=>{if(pattern.test(text)) hits.push({file,line:i+1,text});});
    continue;
  }
  if(!/\.[jt]sx?$/.test(file)) continue;
  const tree=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true);
  function walk(n) {
    if(ts.isJsxText(n) || ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      const text=n.text.replace(/\s+/g,' ').trim();
      const isPath=/^(?:@\/|\/|https?:|[\w.-]+\.(?:com|ts|tsx)\/)/.test(text);
      const isLog=/^\[playbook-/.test(text);
      const isIdentifier=/^[\w.-]*playbook[\w.-]*$/i.test(text) && text.toLowerCase()!=='playbook';
      const isCodeAttribute=ts.isJsxAttribute(n.parent) && !['alt','title','aria-label','label','eyebrow'].includes(n.parent.name.text);
      if(pattern.test(text) && !isPath && !isLog && !isIdentifier && !isCodeAttribute) {
        const line=tree.getLineAndCharacterOfPosition(n.getStart(tree)).line+1;
        hits.push({file,line,text});
      }
    }
    ts.forEachChild(n,walk);
  }
  walk(tree);
}
function judgment(file) {
  if(file.startsWith('app/(room)/playbook/')) return 'Direct URL only; retained book page/metadata, no site entry link; noindex,nofollow.';
  if(file==='components/room/Manual.tsx') return 'Unreachable: component is no longer imported or rendered.';
  if(file==='components/color-worlds/PlaybookHeroMedia.tsx') return 'Unreachable: dormant component, no importing route.';
  if(file==='components/color-worlds/PlaybookSignupForm.tsx') return 'Only within retained direct-URL book page; form was not submitted.';
  if(file==='content/work/content-engine.mdx') return 'Reachable at /work/content-engine; client marketing playbook, unrelated to the book. Preserved factual claim.';
  if(file==='lib/catalog.ts') return 'Server-only retained book SKU, no visible site entry point; checkout not invoked.';
  if(file==='lib/package-delivery.ts') return 'Post-purchase email only, not website-rendered; delivery code expressly preserved. Still attaches the book and carries the old refund wording.';
  if(file.startsWith('app/actions/') || file==='lib/playbook-delivery.ts') return 'Retained email/delivery flow, not website-rendered; only after direct book flow invocation. No actions invoked.';
  return 'REVIEW';
}
for(const hit of hits) hit.judgment=judgment(hit.file);
fs.writeFileSync('.planning/qa/pass-104a/remaining-source-hits.json',JSON.stringify(hits,null,2)+'\n');
for(const hit of hits) console.log(`${hit.file}:${hit.line}: ${hit.text}\n  ${hit.judgment}`);
if(hits.some(h=>h.judgment==='REVIEW')) process.exitCode=1;
