/* Pass-129 mock base: a vanilla port of the two live client behaviours that
 * change how the page LOOKS, so the stripped static page matches the live one.
 *
 * 1. WorldSwitcher (components/color-worlds/WorldSwitcher.tsx): the section
 *    closest to viewport centre writes its world's bg/fg/accent onto the
 *    [data-mode="cw"] root; the live CSS cross-fades it (0.7s). Same map, same
 *    rootMargin, same picker.
 * 2. The nav chip (components/color-worlds/Nav.tsx): .is-scrolled once
 *    scrollY > 40.
 *
 * Not ported (their no-JS frames show instead, the frames a reduced-motion
 * visitor gets on live): SplitReveal's GSAP word reveal, the receipts clip
 * inside $20M+, the exits scoreboard, Lenis smoothing, the hero parallax.
 */
(function () {
  "use strict";
  var WORLDS = {
    terracotta: { bg: "#9E3C25", fg: "#ECE3D0", accent: "#2A1F18" },
    bone: { bg: "#ECE3D0", fg: "#2A1F18", accent: "#9E3C25" },
    petrol: { bg: "#1A4548", fg: "#ECE3D0", accent: "#C9982F" },
    espresso: { bg: "#2A1F18", fg: "#ECE3D0", accent: "#9E3C25" },
  };
  var root = document.querySelector('[data-mode="cw"]');
  if (!root) return;

  function setWorld(name) {
    var w = WORLDS[name];
    if (!w) return;
    root.style.setProperty("--cw-bg", w.bg);
    root.style.setProperty("--cw-fg", w.fg);
    root.style.setProperty("--cw-accent", w.accent);
    root.setAttribute("data-mock-world", name);
  }

  var sections = Array.prototype.slice.call(
    document.querySelectorAll("[data-world]"),
  );

  function pickCentered(list) {
    var mid = window.innerHeight / 2;
    var best = null;
    var bestD = Infinity;
    list.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    });
    return best;
  }

  var first = pickCentered(sections);
  if (first) setWorld(first.getAttribute("data-world"));

  var io = new IntersectionObserver(
    function (entries) {
      var hit = [];
      entries.forEach(function (e) {
        if (e.isIntersecting) hit.push(e.target);
      });
      if (!hit.length) return;
      var t = hit.length === 1 ? hit[0] : pickCentered(hit) || hit[0];
      setWorld(t.getAttribute("data-world"));
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
  );
  sections.forEach(function (s) {
    io.observe(s);
  });

  var nav = document.querySelector(".cw-nav");
  var pending = false;
  function applyNav() {
    pending = false;
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  function onScroll() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(applyNav);
  }
  applyNav();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();
