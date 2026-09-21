/* The Blog page body.

   Fandaqah publishes 370 posts, 185 Arabic and 185 English. They live on
   fandaqah.com/blogs and are not being moved, so this page is an index into
   them, not a copy of them. The whole archive for the current language is
   rendered server side, which means:

     • with JavaScript off, all 185 posts are present, linked and crawlable
     • with JavaScript on, the same markup is filtered live by topic and by
       a text search, and paged 24 at a time

   Titles are derived from the real post slugs. Topics are assigned by keyword
   rules in build/blog-taxonomy.mjs; that is a heuristic over titles, not
   editorial metadata, and it is described as such on the page and in
   DESIGN_UPDATE.md. No post is invented, no date is invented, and no reading
   time is asserted as fact: the archive exposes what can actually be known
   from the published URLs. */

import { readFileSync } from "node:fs";

const POSTS = JSON.parse(readFileSync(new URL("./blog-index.json", import.meta.url), "utf8"));

export const TOPICS = [
  { k: "technology",   t: { ar: "التقنية والأنظمة",            en: "Technology & systems" } },
  { k: "compliance",   t: { ar: "الامتثال والأنظمة الحكومية",  en: "Compliance & regulation" } },
  { k: "revenue",      t: { ar: "الإيرادات والتسعير",          en: "Revenue & pricing" } },
  { k: "growth",       t: { ar: "الأعمال والنمو",              en: "Business & growth" } },
  { k: "distribution", t: { ar: "التوزيع والقنوات",            en: "Distribution & channels" } },
  { k: "operations",   t: { ar: "التشغيل والتدبير",            en: "Operations & housekeeping" } },
  { k: "payments",     t: { ar: "المدفوعات",                   en: "Payments" } },
  { k: "marketing",    t: { ar: "التسويق والسمعة",             en: "Marketing & reputation" } },
  { k: "analytics",    t: { ar: "البيانات والتحليلات",          en: "Data & analytics" } }
];

/* Title case for the English slugs, which arrive lowercased from the URL.
   Acronyms the hospitality industry writes in caps stay in caps. */
const CAPS = new Set(["pms", "rms", "ota", "zatca", "ai", "kpi", "kpis", "pos", "epos", "gds",
                      "roi", "adr", "revpar", "b2b", "f b", "crm", "api", "mice", "rfp", "rfps",
                      "ksa", "vat", "pdpl", "sms", "seo", "erp", "otas", "usp", "faq"]);
function prettyEn(s) {
  return s.split(" ").map((w, i) => {
    if (CAPS.has(w)) return w.toUpperCase();
    if (w.length <= 3 && i > 0 && ["the","and","for","in","on","to","of","a","an","vs","at","by"].includes(w)) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(" ");
}

const title = p => (p.lang === "en" ? prettyEn(p.title) : p.title);

export function blogSections(ctx) {
  const { L, pre, esc, photo } = ctx;
  const ar = L === "ar";
  const mine = POSTS.filter(p => p.lang === L);

  /* The flagship post. Preference order, because "longest title" alone
     surfaced a landing-page slogan rather than a guide:
       1. the title actually announces a complete guide
       2. it sits in compliance or technology, the two pillars of this archive
       3. longest, as a tie-break for depth
     GUIDE_RE matches the published wording in both languages. */
  const GUIDE_RE = /complete guide|the complete|ultimate|الدليل الشامل|دليل شامل/;
  const rank = p => (GUIDE_RE.test(p.title) ? 2 : 0)
                  + (["compliance", "technology"].includes(p.cat) ? 1 : 0);
  const featured = mine.slice().sort((a, b) => (rank(b) - rank(a)) || (b.title.length - a.title.length))[0];
  const isGuide = GUIDE_RE.test(featured.title);

  const rest = mine.filter(p => p.id !== featured.id);
  const counts = Object.fromEntries(TOPICS.map(t => [t.k, mine.filter(p => p.cat === t.k).length]));
  const label = k => (TOPICS.find(t => t.k === k) || { t: { ar: k, en: k } }).t;

  const lead = `
<section class="sec sec--tight">
  <div class="wrap">
    <a class="lead rv" href="${esc(featured.url)}" rel="noopener">
      <div class="lead__shot">
        ${photo(pre, "hotel-reception-lobby", ar
          ? "مكتب استقبال فندق حديث"
          : "A modern hotel reception desk", "(max-width: 900px) 92vw, 46vw")}
        <span class="lead__tint" aria-hidden="true"></span>
      </div>
      <div class="lead__body">
        <p class="lead__meta">
          <span class="tag">${esc(label(featured.cat)[L])}</span>
          ${isGuide ? `<span class="lead__kind">${esc(ar ? "دليل شامل" : "In-depth guide")}</span>` : ""}
        </p>
        <h2 class="lead__t">${esc(title(featured))}</h2>
        <span class="lead__go">${esc(ar ? "اقرأ المقال" : "Read the article")}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </a>
  </div>
</section>`;

  const archive = `
<section class="sec" id="archive">
  <div class="wrap">
    <div class="arc__top rv">
      <div>
        <h2 class="h2 h2--ink">${esc(ar ? "الأرشيف الكامل" : "The full archive")}</h2>
        <p class="body" style="margin-top:8px">${esc(ar
          ? `${mine.length} مقالًا منشورًا على fandaqah.com. الموضوعات مستنتجة من العناوين، لا مصنّفة يدويًا.`
          : `${mine.length} articles published on fandaqah.com. Topics are inferred from titles rather than hand-curated.`)}</p>
      </div>
      <div class="arc__search">
        <label class="sr" for="q">${esc(ar ? "ابحث في المقالات" : "Search the articles")}</label>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input id="q" type="search" autocomplete="off"
               placeholder="${esc(ar ? "ابحث عن زاتكا، الإيرادات، شموس…" : "Search ZATCA, revenue, Shomoos…")}">
      </div>
    </div>

    <div class="arc__chips rv" role="group" aria-label="${esc(ar ? "تصفية حسب الموضوع" : "Filter by topic")}">
      <button type="button" class="chipf" data-cat="all" aria-pressed="true">
        ${esc(ar ? "الكل" : "All")} <b class="num">${mine.length}</b>
      </button>
      ${TOPICS.filter(t => counts[t.k]).map(t => `
      <button type="button" class="chipf" data-cat="${t.k}" aria-pressed="false">
        ${esc(t.t[L])} <b class="num">${counts[t.k]}</b>
      </button>`).join("")}
    </div>

    <p class="arc__count" id="arc-count" role="status" aria-live="polite" hidden></p>

    <ul class="arc" id="arc">
      ${rest.map(p => `
      <li class="post" data-cat="${p.cat}" data-t="${esc(title(p).toLowerCase())}">
        <a href="${esc(p.url)}" rel="noopener">
          <span class="tag tag--sm">${esc(label(p.cat)[L])}</span>
          <h3 class="post__t">${esc(title(p))}</h3>
          <span class="post__go" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
          </span>
        </a>
      </li>`).join("")}
    </ul>

    <p class="arc__empty" id="arc-empty" hidden>${esc(ar
      ? "لا مقالات تطابق البحث. جرّب كلمة أخرى أو اختر موضوعًا."
      : "No articles match that. Try another word, or pick a topic.")}</p>

    <div class="arc__more">
      <button type="button" class="btn btn--ghost" id="arc-more" hidden>${esc(ar ? "عرض المزيد" : "Show more")}</button>
    </div>
  </div>
</section>`;

  const band = `
<section class="band band--short">
  ${photo(pre, "chalet-pool-terrace", ar
    ? "شرفة مسبح في وحدة سياحية بين أشجار النخيل"
    : "A pool terrace at a tourist unit, framed by palms", "100vw")}
  <span class="band__tint" aria-hidden="true"></span>
  <div class="band__in">
    <div class="wrap">
      <p class="band__q rv">${esc(ar
        ? "يكتبها فريق يعمل مع المشغّلين، لا فريق تسويق"
        : "Written by people who work with operators, not by a marketing desk")}</p>
      <p class="band__d rv" data-rv="90">${esc(ar
        ? "الامتثال والتسعير والتشغيل والتوزيع، مشروحة بالأرقام والإجراءات التي تُطبَّق فعلًا في المنشآت السعودية."
        : "Compliance, pricing, operations and distribution, explained with the numbers and the procedures that Saudi properties actually apply.")}</p>
    </div>
  </div>
</section>`;

  return { lead, archive, band };
}
