/* Pass-129 G1 "Where is it stuck?": tap an answer and the row locks (CSS,
 * :has(:checked)); the box answers: its fit line swaps to that area and
 * "Covers: <label>." is written in above the buy button. The size row swaps
 * the box to another package. Strings come from #cw-strings only; every
 * swap is announced in the polite region, in those same strings. */
(function () {
  "use strict";
  var S = JSON.parse(document.getElementById("cw-strings").textContent);
  var sec = document.getElementById("offer");
  var live = sec.querySelector("[data-live]");
  var pkgs = Array.prototype.slice.call(sec.querySelectorAll(".cw-g1__pkg"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var area = null;
  var pkg = "audit";

  function labelOf(v) {
    for (var i = 0; i < S.areas.length; i++) {
      if (S.areas[i][0] === v) return S.areas[i][1];
    }
    return null;
  }
  function replay(el, cls) {
    if (!el || reduce) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function render(changed) {
    var lbl = labelOf(area);
    pkgs.forEach(function (art) {
      var key = art.getAttribute("data-pkg");
      var on = key === pkg;
      if (on) {
        art.removeAttribute("data-off");
        art.removeAttribute("inert");
      } else {
        art.setAttribute("data-off", "");
        art.setAttribute("inert", "");
      }
      var fit = art.querySelector("[data-fit]");
      var next = S.pkgs[key].fit[area || "none"];
      if (fit.textContent !== next) {
        fit.textContent = next;
        if (on && changed === "area") replay(fit, "cw-o-swap");
      }
      if (lbl) {
        var cov = art.querySelector("[data-covers]");
        var covLabel = art.querySelector("[data-covers-label]");
        var same = cov.classList.contains("is-on") && covLabel.textContent === lbl;
        covLabel.textContent = lbl;
        cov.classList.add("is-on");
        if (on && !same && changed === "area") {
          replay(cov.querySelector(".cw-pbox__area"), "cw-o-write");
        }
      }
      if (on && changed === "pkg") replay(art.querySelector(".cw-pbox__in"), "cw-o-swap");
    });

    var p = S.pkgs[pkg];
    var msg = p.fit[area || "none"];
    if (changed === "pkg") msg = p.name + ", " + p.price + ". " + msg;
    if (lbl) msg += " " + S.covers_pre + lbl + ".";
    live.textContent = msg;
  }

  Array.prototype.forEach.call(
    sec.querySelectorAll('input[name="g1-area"]'),
    function (r) {
      r.addEventListener("change", function () {
        area = r.value;
        render("area");
      });
    },
  );
  Array.prototype.forEach.call(
    sec.querySelectorAll('input[name="g1-pkg"]'),
    function (r) {
      r.addEventListener("change", function () {
        pkg = r.value;
        render("pkg");
      });
    },
  );
})();
