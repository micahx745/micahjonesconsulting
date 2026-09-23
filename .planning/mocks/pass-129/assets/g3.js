/* Pass-129 G3 "The ladder": your fee carries up.
 *
 * Picking a rung (native radios) swaps the fit line under the board and
 * prints, under the NEXT rung, the Mono kicker and the net figure; the Sprint
 * prints its own line under itself. The default frame (the Audit picked, the
 * credit under the Sprint) is in the HTML, so no-JS shows it.
 *
 * The Audit's $2,500 assembles once as it scrolls in: the live WorkFigures
 * rule (armed only if below the fold at load, IntersectionObserver with
 * rootMargin 0 0 -15% 0, never under reduced motion). */
(function () {
  "use strict";
  var S = JSON.parse(document.getElementById("cw-strings").textContent);
  var sec = document.getElementById("offer");
  var board = sec.querySelector(".cw-g3__board");
  var live = sec.querySelector("[data-live]");
  var fitEl = sec.querySelector("[data-fit]");
  var fig = sec.querySelector("[data-hero-fig]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function replay(node, cls) {
    if (reduce) return;
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
  }

  function pick(key) {
    board.setAttribute("data-picked", key);
    var fit = S.pkgs[key].fit.none;
    fitEl.textContent = fit;
    replay(fitEl, "cw-o-swap");

    Array.prototype.forEach.call(
      board.querySelectorAll("[data-credit]"),
      function (c) {
        c.textContent = "";
        c.classList.remove("is-printing");
      },
    );

    var cell;
    var say;
    if (key === "sprint") {
      cell = board.querySelector('[data-credit="sprint"]');
      cell.appendChild(el("p", "cw-g3__net cw-g3__net--line", S.g3.sprint_line));
      say = S.g3.sprint_line;
    } else {
      var n = S.g3.net[key];
      cell = board.querySelector('[data-credit="' + n[0] + '"]');
      cell.appendChild(el("p", "cw-g3__ck", S.g3.credit_kicker));
      var net = el("p", "cw-g3__net");
      net.appendChild(el("span", "cw-g3__net-fig", n[1]));
      net.appendChild(document.createTextNode(n[2]));
      cell.appendChild(net);
      say = S.g3.credit_kicker + ": " + S.pkgs[n[0]].name + ", " + n[1] + n[2] + ".";
    }
    replay(cell, "is-printing");
    live.textContent = fit + " " + say;
  }

  Array.prototype.forEach.call(
    board.querySelectorAll('input[name="g3-pkg"]'),
    function (r) {
      r.addEventListener("change", function () {
        pick(r.value);
      });
    },
  );

  if (!reduce && fig && fig.getBoundingClientRect().top >= window.innerHeight) {
    fig.classList.add("is-armed");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.disconnect();
          var ended = false;
          function end() {
            if (ended) return;
            ended = true;
            fig.classList.remove("is-armed", "is-assembling");
          }
          fig.addEventListener("animationend", end, { once: true });
          window.setTimeout(end, 1400);
          fig.classList.add("is-assembling");
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 },
    );
    io.observe(fig);
  }
})();
