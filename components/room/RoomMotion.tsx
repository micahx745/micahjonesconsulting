"use client";

// components/room/RoomMotion.tsx — the home's one client component.
//
// Pass-101 phase 2. This is the port of the verified template's inline script:
// the travelling ground, the bar at the seam, the clips, and the whole §16.3
// motion set. It touches the DOM by id and by [data-anim] / [data-rise], the
// way the template does, so the sections stay server components with no
// hydration cost of their own.
//
// EVERY LINE HERE IS OPTIONAL. The page's rest state is its FINISHED state:
// --fx / --fy carry the measured fingertip in :root, so the headline lands on
// the finger with no JavaScript at all, and the §16.3 rest states are gated
// behind the `js` class this file adds — which it never adds under
// prefers-reduced-motion. So the reduced-motion render and the scripting-off
// render are the same finished frame. That is §16.3's closing rule, enforced by
// construction. A throw here has to leave a whole page, so the body sits inside
// one try/catch, exactly as the template's does.
//
// No GSAP (quarantined to components/TitleCard.tsx), no animation library, no
// @keyframes: every item is a transition between two declared states in
// app/room.css. Lenis stays where it is — mounted once at the root layout.

import { useEffect } from "react";
import { useLenis } from "@/components/LenisProvider";

// §16.3-1. MEASURED on public/video/a2-hold-720.mp4 at 24fps: the pointing
// hand's leftmost pixel first comes within 6px of its final x (248 of 1280) at
// frame 61 — t = 2.5417s. §16.3 estimated ~3.4s; this is the clip's own number,
// rounded DOWN to the frame boundary so the light is never late.
const ARRIVAL = 2.54;

export function RoomMotion() {
  const lenis = useLenis();

  useEffect(() => {
    let cleanup = () => {};
    try {
      const reduce =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const root = document.documentElement;
      const home = document.querySelector<HTMLElement>(".rl-home");
      const bar = document.getElementById("bar");
      const op = document.getElementById("operator");
      const work = document.getElementById("work");
      const ask = document.getElementById("contact");
      const room = document.getElementById("room");
      const opstage = document.getElementById("opstage");
      const chips = document.getElementById("herochips");
      const h1 = document.getElementById("h1");
      const filmVid = document.getElementById(
        "filmvid",
      ) as HTMLVideoElement | null;
      const opVid = document.getElementById("opvid") as HTMLVideoElement | null;
      const foot = document.querySelector<HTMLElement>(".foot");
      const risers = Array.from(
        document.querySelectorAll<HTMLElement>("[data-rise]"),
      );
      const anims = Array.from(
        document.querySelectorAll<HTMLElement>("[data-anim]"),
      );
      const darks = [room, op, ask, foot];

      if (!home || !work) return;
      if (!reduce) home.classList.add("js");

      let lastP = -1;
      let queued = false;
      let opStarted = false;
      let wordLit = false;
      let rowUp = false;

      const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

      const play = (v: HTMLVideoElement | null) => {
        if (!v || reduce || v.ended) return;
        const r = v.play();
        if (r && typeof r.catch === "function") r.catch(() => {});
      };

      // §16.3-9 / §3. One source of light: --p is written from scroll, and the
      // INK is a hard switch at p >= .5 (html.lit) while the GROUND travels.
      const light = () => {
        const h = window.innerHeight;
        const line = h * 0.55;
        const w = work.getBoundingClientRect().top;
        const zone = Math.min(h * 0.38, 320);
        let p = clamp((line - (w - zone)) / zone);
        if (reduce) p = p > 0.5 ? 1 : 0;
        if (p !== lastP) {
          root.style.setProperty("--p", p.toFixed(4));
          root.classList.toggle("lit", p >= 0.5);
          lastP = p;
        }
      };

      // §16.3-2: the bar slides down and fades in AT THE SEAM, and "never
      // again" — so `on` is only ever added. Toggling it re-ran the entrance
      // every time the hero's chips passed the bar's edge going back up.
      const chrome = () => {
        if (!bar) return;
        const edge = bar.getBoundingClientRect().height || 40;
        if (reduce || window.innerWidth <= 899) {
          bar.classList.add("on");
        } else if (chips) {
          if (chips.getBoundingClientRect().bottom <= edge)
            bar.classList.add("on");
        } else if (window.scrollY >= window.innerHeight) {
          bar.classList.add("on");
        }
        let dark = false;
        for (const d of darks) {
          if (!d) continue;
          const r = d.getBoundingClientRect();
          if (r.top <= edge && r.bottom >= edge) {
            dark = true;
            break;
          }
        }
        bar.classList.toggle("dark", dark);
      };

      // §16.3-1: the copper word lights when the fingertip arrives, and `I
      // build the` rises as the clip starts. Both are one-way: once lit, lit.
      const lightWord = () => {
        if (wordLit || !h1) return;
        wordLit = true;
        h1.classList.add("on");
      };
      const raiseRow = () => {
        if (rowUp || !h1) return;
        rowUp = true;
        h1.classList.add("up");
      };

      // §16.3-2..8: one pass over every [data-anim]. The attribute's value is
      // the fraction of the viewport that is the reading line for that element;
      // crossing it adds `in` and nothing ever removes it.
      const anim = () => {
        const h = window.innerHeight;
        for (const el of anims) {
          if (el.classList.contains("in")) continue;
          let at = parseFloat(el.getAttribute("data-anim") || "");
          if (!(at > 0)) at = 0.85;
          if (el.getBoundingClientRect().top < h * at) el.classList.add("in");
        }
      };

      const rise = () => {
        const h = window.innerHeight;
        for (const el of risers) {
          if (el.classList.contains("in")) continue;
          if (el.getBoundingClientRect().top < h * 0.92) el.classList.add("in");
        }
      };

      let io: IntersectionObserver | null = null;
      if (reduce) {
        filmVid?.pause();
        opVid?.pause();
      } else if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              const isRoom = e.target === room;
              const v = isRoom ? filmVid : opVid;
              if (!v) continue;
              if (e.intersectionRatio < 0.1) {
                if (!v.paused) v.pause();
                continue;
              }
              if (!isRoom && !opStarted) {
                if (e.intersectionRatio >= 0.35) opStarted = true;
                else continue;
              }
              if (v.paused) play(v);
            }
          },
          { threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1] },
        );
        if (room) io.observe(room);
        if (opstage) {
          opVid?.pause();
          io.observe(opstage);
        }
      }

      // §15.1. Operator, twice: "i see no vids". Autoplay of a muted inline clip
      // is allowed by policy, but a client can still refuse or defer it, and the
      // FIRST user gesture is the one moment a refusal can be undone. One
      // handler, four gesture kinds, passive and once: it plays the hero unless
      // it has already ended (clip A runs forward once and holds — restarting a
      // held clip would be the one motion nobody asked for) and the operator
      // clip only when it is >= 35% visible, the observer's own threshold.
      let kicked = false;
      const kick = () => {
        if (kicked || reduce) return;
        kicked = true;
        if (filmVid && !filmVid.ended) play(filmVid);
        if (opVid && opstage) {
          const r = opstage.getBoundingClientRect();
          const h = window.innerHeight;
          const vis = Math.max(0, Math.min(r.bottom, h) - Math.max(r.top, 0));
          if (r.height > 0 && vis / r.height >= 0.35) {
            opStarted = true;
            play(opVid);
          }
        }
      };

      const GEST = ["pointerdown", "touchstart", "keydown", "wheel"] as const;
      if (!reduce) {
        for (const g of GEST) {
          window.addEventListener(g, kick, { passive: true, once: true });
        }
      }

      // §16.3-1, the wiring. `timeupdate` is the trigger the brief names;
      // `seeked` is the same test applied to a seek (which is how the verifier
      // drives the clip), and `ended` plus the load-time check are the "already
      // past it" case. The two fallback timers exist because the rest state of
      // this page is its FINISHED state: if a client refuses to play the clip at
      // all, the word still has to light and the row still has to stand up.
      let t1: number | undefined;
      let t2: number | undefined;
      const atTime = () => {
        if (!filmVid) return;
        if (filmVid.currentTime > 0) raiseRow();
        if (filmVid.currentTime >= ARRIVAL || filmVid.ended) lightWord();
      };
      const onEnded = () => {
        raiseRow();
        lightWord();
      };
      if (!reduce && filmVid) {
        filmVid.addEventListener("timeupdate", atTime);
        filmVid.addEventListener("seeked", atTime);
        filmVid.addEventListener("loadedmetadata", atTime);
        filmVid.addEventListener("play", raiseRow);
        filmVid.addEventListener("playing", raiseRow);
        filmVid.addEventListener("ended", onEnded);
        atTime();
        t1 = window.setTimeout(raiseRow, 1600);
        t2 = window.setTimeout(() => {
          if (filmVid.paused && filmVid.currentTime === 0) lightWord();
        }, 6000);
      }

      const tick = () => {
        try {
          light();
        } catch {
          /* one dead leg must not take the others */
        }
        try {
          chrome();
        } catch {
          /* ditto */
        }
        try {
          if (!reduce) rise();
        } catch {
          /* ditto */
        }
        try {
          if (!reduce) anim();
        } catch {
          /* ditto */
        }
      };
      const schedule = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          tick();
        });
      };

      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      tick();
      if (!reduce) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            rise();
            anim();
          });
        });
      }

      cleanup = () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        for (const g of GEST) window.removeEventListener(g, kick);
        if (filmVid) {
          filmVid.removeEventListener("timeupdate", atTime);
          filmVid.removeEventListener("seeked", atTime);
          filmVid.removeEventListener("loadedmetadata", atTime);
          filmVid.removeEventListener("play", raiseRow);
          filmVid.removeEventListener("playing", raiseRow);
          filmVid.removeEventListener("ended", onEnded);
        }
        if (t1) window.clearTimeout(t1);
        if (t2) window.clearTimeout(t2);
        io?.disconnect();
        root.style.removeProperty("--p");
        root.classList.remove("lit");
        home.classList.remove("js");
      };
    } catch (e) {
      if (typeof console !== "undefined" && console.error) console.error(e);
    }
    return () => cleanup();
  }, []);

  // The in-page anchors (#room, #proof, #manual, #price) are handed to the
  // Lenis instance the ROOT layout already mounts, so the bar's links travel
  // with the same easing as the wheel. With reduced motion LenisProvider
  // short-circuits and this hook returns nothing, which leaves the browser's
  // own instant jump — the correct behaviour there.
  useEffect(() => {
    if (!lenis) return;
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      const a = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href") || "";
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      ev.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 1.1 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}
