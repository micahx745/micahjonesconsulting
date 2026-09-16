// usage: node .planning/exec/p120-text.mjs <url> <needle>        -> count of literal needle
//        node .planning/exec/p120-text.mjs <url> --re <regex>    -> count of regex matches
const [url, a, b] = process.argv.slice(2);
const html = await (await fetch(url)).text();
const text = html
  .replace(/<head[\s\S]*?<\/head>/i, " ")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ");
const n = a === "--re" ? (text.match(new RegExp(b, "g")) ?? []).length : text.split(a).length - 1;
console.log(n);
