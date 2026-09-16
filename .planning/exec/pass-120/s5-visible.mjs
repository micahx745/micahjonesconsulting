// Visible text of an HTML page: <head>, <script>, <style> and tags removed.
let s = "";
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  s = s
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&middot;/g, "·")
    .replace(/\s+/g, " ");
  process.stdout.write(s);
});
