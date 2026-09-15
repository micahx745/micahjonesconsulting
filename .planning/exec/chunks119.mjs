// Pass-119 initial-script inventory for the home and services routes.
// Usage: node .planning/exec/chunks119.mjs [base]
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");
const ROUTES = ["/", "/services"];

function scriptSources(html) {
  return [...html.matchAll(/<script\b[^>]*?\s+src\s*=\s*(["'])(.*?)\1/giu)].map(
    (match) => match[2].replace(/&amp;/giu, "&"),
  );
}

async function inspectRoute(route) {
  let html;
  try {
    const response = await fetch(`${BASE}${route}`);
    html = await response.text();
  } catch (error) {
    console.log(`${route} fetch error: ${error instanceof Error ? error.message : error}`);
    return 0;
  }

  let gsapChunks = 0;
  for (const source of scriptSources(html)) {
    try {
      const scriptUrl = new URL(source, `${BASE}${route}`);
      const path = scriptUrl.pathname;
      const response = await fetch(scriptUrl);
      const bytes = new Uint8Array(await response.arrayBuffer());
      const body = new TextDecoder().decode(bytes);
      const isGsap = body.includes("GreenSock") || body.includes("gsap.registerPlugin");
      if (isGsap) gsapChunks++;
      console.log(`${route} ${bytes.byteLength} bytes ${path}${isGsap ? " gsap" : ""}`);
    } catch (error) {
      console.log(
        `${route} 0 bytes ${source.split("?")[0]} fetch-error=${error instanceof Error ? error.message : error}`,
      );
    }
  }
  return gsapChunks;
}

const counts = {};
for (const route of ROUTES) counts[route] = await inspectRoute(route);
console.log(`initial gsap chunks on /: ${counts["/"]}`);
console.log(`initial gsap chunks on /services: ${counts["/services"]}`);
process.exit(0);
