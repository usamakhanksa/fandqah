/* Fandaqah — site behaviour. Small on purpose: the CSS does the work. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- mobile nav ---------------- */
  var burger = document.getElementById("burger");
  var mnav = document.getElementById("mnav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = mnav.getAttribute("data-open") === "1";
      mnav.setAttribute("data-open", open ? "0" : "1");
      burger.setAttribute("aria-expanded", open ? "false" : "true");
    });
    mnav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        mnav.setAttribute("data-open", "0");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mnav.getAttribute("data-open") === "1") {
        mnav.setAttribute("data-open", "0");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* ---------------- reveal on scroll, once ---------------- */
  var rv = document.querySelectorAll(".rv");
  if (rv.length) {
    if (!("IntersectionObserver" in window) || reduce) {
      rv.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          var d = parseInt(el.getAttribute("data-rv") || "0", 10);
          setTimeout(function () { el.classList.add("in"); }, d);
          io.unobserve(el);
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });
      rv.forEach(function (el) { io.observe(el); });
    }
  }


  /* ---------------- hero depth ----------------
     Publishes a single 0..1 value as --hp on the hero. The stylesheet
     derives each plane's travel from it, so this writes one property per
     frame rather than styling four elements. Nothing runs under reduced
     motion, and with the JS absent --hp stays 0, which is the static
     composition.                                                       */
  var hero = document.querySelector(".hero");
  if (hero && !reduce) {
    var hTick = false;
    var hPaint = function () {
      hTick = false;
      var h = hero.offsetHeight || 1;
      var p = Math.min(1, Math.max(0, window.scrollY / h));
      hero.style.setProperty("--hp", p.toFixed(4));
    };
    window.addEventListener("scroll", function () {
      if (hTick) return;
      hTick = true;
      requestAnimationFrame(hPaint);
    }, { passive: true });
    window.addEventListener("resize", hPaint);
    hPaint();
  }

  /* ---------------- scroll storytelling ----------------
     The stage sticks while the visitor scrolls its span. Progress
     across that span picks the active step and panel, and is also
     published as --p so CSS can draw the thread. Under reduced
     motion the section is left alone: every panel is already shown
     stacked by the stylesheet.                                  */
  var story = document.querySelector("[data-story]");
  if (story && !reduce) {
    var steps  = story.querySelectorAll(".story__step");
    var panels = story.querySelectorAll(".story__panel");
    var n = Math.min(steps.length, panels.length);

    if (n > 1) {
      var stage = story.querySelector(".story__stage");
      stage.style.position = "sticky";
      stage.style.top = "0";
      story.style.height = (n * 100) + "vh";

      var current = -1, ticking = false;

      var paint = function () {
        ticking = false;
        var r = story.getBoundingClientRect();
        var travel = story.offsetHeight - window.innerHeight;
        if (travel <= 0) return;
        var p = Math.min(1, Math.max(0, -r.top / travel));
        story.style.setProperty("--p", p.toFixed(4));

        var i = Math.min(n - 1, Math.floor(p * n));
        if (i === current) return;
        current = i;
        for (var k = 0; k < n; k++) {
          var on = k === i ? "1" : "0";
          steps[k].setAttribute("data-on", on);
          panels[k].setAttribute("data-on", on);
        }
      };

      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(paint);
      }, { passive: true });
      window.addEventListener("resize", paint);
      paint();

      /* clicking a step jumps to its slice of the span */
      steps.forEach(function (s, i) {
        s.style.cursor = "pointer";
        s.setAttribute("tabindex", "0");
        s.setAttribute("role", "button");
        var go = function () {
          var travel = story.offsetHeight - window.innerHeight;
          var top = story.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: top + travel * ((i + 0.5) / n), behavior: "smooth" });
        };
        s.addEventListener("click", go);
        s.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
        });
      });
    }
  }


  /* ---------------- lead form: validate, submit, report ----------------
     The form still carries a real action and method, so with JS off it
     posts normally and the browser's own validation applies. With JS on
     we take over to give field-level errors, a busy state and an inline
     result, none of which a plain POST navigation can express.

     The endpoint is Fandaqah's existing contact handler. Until it is
     confirmed to accept these field names and to answer CORS, a failed
     send falls back to telling the visitor to call or use WhatsApp
     rather than silently swallowing the enquiry. See DESIGN_UPDATE.md
     section 15.                                                        */
  var lead = document.getElementById("lead");
  if (lead) {
    var status = document.getElementById("lead-status");
    var AR = document.documentElement.lang === "ar";
    var msg = {
      required: AR ? "هذا الحقل مطلوب."            : "This field is required.",
      email:    AR ? "أدخل بريدًا إلكترونيًا صحيحًا."  : "Enter a valid email address.",
      phone:    AR ? "أدخل رقم جوال صحيحًا."         : "Enter a valid phone number.",
      sending:  AR ? "جارٍ الإرسال…"                : "Sending…",
      ok:       AR ? "وصلتنا رسالتك. سنتواصل معك خلال يوم عمل واحد."
                   : "Your message reached us. We will be in touch within one working day.",
      fail:     AR ? "تعذّر الإرسال الآن. اتصل على 920066456 أو راسلنا على واتساب."
                   : "That could not be sent right now. Call 920066456 or message us on WhatsApp."
    };

    var setError = function (field, text) {
      var wrap = field.closest(".field");
      if (!wrap) return;
      var note = wrap.querySelector(".field__err");
      if (text) {
        if (!note) {
          note = document.createElement("p");
          note.className = "field__err";
          note.id = field.id + "-err";
          wrap.appendChild(note);
        }
        note.textContent = text;
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", note.id);
      } else if (note) {
        note.remove();
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
      }
    };

    var checkField = function (f) {
      var v = (f.value || "").trim();
      if (f.hasAttribute("required") && !v) { setError(f, msg.required); return false; }
      if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { setError(f, msg.email); return false; }
      if (v && f.type === "tel" && !/^[+()\-\s\d]{7,20}$/.test(v)) { setError(f, msg.phone); return false; }
      setError(f, "");
      return true;
    };

    lead.querySelectorAll("input, select, textarea").forEach(function (f) {
      if (f.name === "company_url") return;
      f.addEventListener("blur", function () { checkField(f); });
      f.addEventListener("input", function () {
        if (f.getAttribute("aria-invalid") === "true") checkField(f);
      });
    });

    lead.addEventListener("submit", function (e) {
      var fields = [].slice.call(lead.querySelectorAll("input, select, textarea"))
                     .filter(function (f) { return f.name !== "company_url"; });
      var bad = fields.filter(function (f) { return !checkField(f); });
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      if (lead.querySelector('[name="company_url"]').value) { e.preventDefault(); return; }

      e.preventDefault();
      var btn = lead.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = msg.sending;
      lead.setAttribute("data-busy", "1");
      status.hidden = false;
      status.className = "form__status";
      status.textContent = msg.sending;

      fetch(lead.dataset.endpoint, { method: "POST", body: new FormData(lead), mode: "cors" })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r; })
        .then(function () {
          lead.reset();
          status.className = "form__status form__status--ok";
          status.textContent = msg.ok;
        })
        .catch(function () {
          status.className = "form__status form__status--bad";
          status.textContent = msg.fail;
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = btn.dataset.label;
          lead.removeAttribute("data-busy");
        });
    });
  }


  /* ---------------- blog archive: filter, search, page ----------------
     The whole archive is already in the DOM, rendered by the build, so
     with scripts off every post is present and crawlable. This only
     narrows what is shown. Filtering is a hidden attribute toggle, not a
     re-render, so no layout is rebuilt and no link is ever destroyed.   */
  var arc = document.getElementById("arc");
  if (arc) {
    var PAGE = 24;
    var posts  = [].slice.call(arc.querySelectorAll(".post"));
    var chips  = [].slice.call(document.querySelectorAll(".chipf"));
    var q      = document.getElementById("q");
    var more   = document.getElementById("arc-more");
    var empty  = document.getElementById("arc-empty");
    var count  = document.getElementById("arc-count");
    var AR     = document.documentElement.lang === "ar";
    var cat = "all", term = "", shown = PAGE;

    var norm = function (s) {
      /* fold Arabic orthographic variants so a search for "زاتكا" also
         matches "زاتكا،" and alef/yaa spelling differences */
      return (s || "").toLowerCase()
        .replace(/[ً-ْـ]/g, "")
        .replace(/[أإآ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ة/g, "ه");
    };

    var apply = function () {
      var hits = 0;
      posts.forEach(function (el) {
        var okCat = cat === "all" || el.getAttribute("data-cat") === cat;
        var okTerm = !term || norm(el.getAttribute("data-t")).indexOf(term) > -1;
        var match = okCat && okTerm;
        if (match) { hits++; el.hidden = hits > shown; }
        else el.hidden = true;
      });
      empty.hidden = hits !== 0;
      more.hidden = hits <= shown;
      count.hidden = (cat === "all" && !term);
      if (!count.hidden) {
        count.textContent = AR
          ? hits + " مقالًا مطابقًا"
          : hits + (hits === 1 ? " article" : " articles") + " match";
      }
    };

    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        cat = c.getAttribute("data-cat");
        shown = PAGE;
        chips.forEach(function (o) { o.setAttribute("aria-pressed", String(o === c)); });
        apply();
      });
    });

    var timer;
    q.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () { term = norm(q.value.trim()); shown = PAGE; apply(); }, 140);
    });

    more.addEventListener("click", function () {
      shown += PAGE;
      apply();
      /* move focus to the first newly revealed card so the keyboard does
         not get dumped back at the top of the list */
      var next = posts.filter(function (el) { return !el.hidden; })[shown - PAGE];
      if (next) { var a = next.querySelector("a"); if (a) a.focus(); }
    });

    apply();
  }

  /* ---------------- pricing: show what a plan really costs ----------------
     Adds VAT and the one-time setup fee to the selected plan, using the
     figures published on the store. Nothing is estimated here: the rates
     come from data attributes written by the build.                     */
  var calc = document.getElementById("calc");
  if (calc) {
    var sel   = document.getElementById("calc-plan");
    var vat   = parseFloat(calc.dataset.vat || "15");
    var setup = parseFloat(calc.dataset.setup || "300");
    var fmt = function (v) {
      return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    var out = {
      base:  document.getElementById("calc-base"),
      setup: document.getElementById("calc-setup"),
      vat:   document.getElementById("calc-vat"),
      total: document.getElementById("calc-total")
    };
    var run = function () {
      var base = parseFloat(sel.selectedOptions[0].dataset.price || "0");
      var sub = base + setup;
      var tax = sub * (vat / 100);
      out.base.textContent  = fmt(base);
      out.setup.textContent = fmt(setup);
      out.vat.textContent   = fmt(tax);
      out.total.textContent = fmt(sub + tax);
    };
    sel.addEventListener("change", run);
    run();
  }
})();
