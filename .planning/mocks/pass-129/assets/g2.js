/* Pass-129 G2 "The tab": the scroll prints the order.
 *
 * A print line at 90% of the viewport is the print head. Each [data-print]
 * row gets --p = the share of the row that has risen above it, so its ink
 * appears top to bottom exactly as it passes. Position, not time: stop
 * scrolling and the print stops. --p only grows, so a printed row stays
 * printed. The total's $2,500 assembles once (0.8s, the live cw-wx-assemble
 * keyframes) when its row is through the head.
 *
 * Armed only when there is something left to print at load (the WorkFigures
 * rule) and never under reduced motion; unarmed, every row is printed, which
 * is also the no-JS frame. A jump (an anchor such as the hero's "Start the
 * Audit", or any single scroll step longer than 3/4 of a screen) prints
 * whatever lands in view: the print is for scrolling through, not for
 * arriving. Focus entering the tab prints everything, so a keyboard user never
 * lands on an unprinted chip.
 *
 * Picking an area writes its label into the row (a 180ms wipe) and says so in
 * the polite region. */
(function () {
  "use strict";
  var S = JSON.parse(document.getElementById("cw-strings").textContent);
  var sec = document.getElementById("offer");
  var tab = sec.querySelector("[data-tab]");
  var live = sec.querySelector("[data-live]");
  var rows = Array.prototype.slice.call(tab.querySelectorAll("[data-print]"));
  var totalIdx = rows.indexOf(tab.querySelector("[data-total]"));
  var fig = tab.querySelector("[data-fig]");
  var val = tab.querySelector("[data-area-val]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var LINE = 0.9;
  var p = rows.map(function () {
    return 1;
  });
  var armed = false;
  var assembled = false;
  var pending = false;
  var lastY = window.scrollY;

  function set(i, v) {
    p[i] = v;
    rows[i].style.setProperty("--p", v.toFixed(4));
  }

  function finish() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    tab.classList.remove("is-armed");
    armed = false;
  }

  function maybeFinish() {
    if (!armed) return;
    for (var i = 0; i < p.length; i++) if (p[i] < 1) return;
    if (fig.classList.contains("is-assembled")) finish();
  }

  function assemble() {
    if (assembled) return;
    assembled = true;
    var ended = false;
    function end() {
      if (ended) return;
      ended = true;
      fig.classList.remove("is-assembling");
      fig.classList.add("is-assembled");
      maybeFinish();
    }
    fig.addEventListener("animationend", end, { once: true });
    window.setTimeout(end, 1400);
    fig.classList.add("is-assembling");
  }

  function measure() {
    pending = false;
    if (!armed) return;
    var vh = window.innerHeight;
    var line = vh * LINE;
    var jump = Math.abs(window.scrollY - lastY) > vh * 0.75;
    lastY = window.scrollY;
    rows.forEach(function (r, i) {
      if (p[i] >= 1) return;
      var box = r.getBoundingClientRect();
      var v = jump && box.top < vh ? 1 : (line - box.top) / Math.max(1, box.height);
      v = Math.min(1, Math.max(0, v));
      if (v > p[i]) set(i, v);
    });
    if (p[totalIdx] >= 1) assemble();
    maybeFinish();
  }

  function onScroll() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(measure);
  }

  function printAll() {
    if (!armed) return;
    rows.forEach(function (r, i) {
      set(i, 1);
    });
    assemble();
  }

  if (!reduce) {
    var lastTop = rows[rows.length - 1].getBoundingClientRect().top;
    if (lastTop > window.innerHeight * LINE) {
      armed = true;
      rows.forEach(function (r, i) {
        set(i, 0);
      });
      tab.classList.add("is-armed");
      measure();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      tab.addEventListener("focusin", printAll);
    }
  }

  function labelOf(v) {
    for (var i = 0; i < S.areas.length; i++) {
      if (S.areas[i][0] === v) return S.areas[i][1];
    }
    return null;
  }

  Array.prototype.forEach.call(
    tab.querySelectorAll('input[name="g2-area"]'),
    function (inp) {
      inp.addEventListener("change", function () {
        var lbl = labelOf(inp.value);
        val.textContent = lbl;
        if (!reduce) {
          val.classList.remove("cw-o-write");
          void val.offsetWidth;
          val.classList.add("cw-o-write");
        }
        live.textContent = S.g2.area_item + ": " + lbl;
      });
    },
  );
})();
