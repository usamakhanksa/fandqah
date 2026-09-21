/* The About page body. Carries the company's own published vision, mission,
   values and partnership statement, plus the ten testimonials published on
   fandaqah.com. Provenance for all of it: build/content-extra.mjs. */

import { ABOUT, TESTIMONIALS } from "./content-extra.mjs";

export function aboutSections(ctx) {
  const { L, pre, esc, T, photo, statsBlock } = ctx;
  const ar = L === "ar";

  /* ---- who we are, with the team photograph ---- */
  const intro = `
<section class="sec sec--tight">
  <div class="wrap">
    <div class="grid grid--split">
      <div class="rv frame frame--tall">
        <picture>
          <source type="image/webp" sizes="(max-width: 900px) 92vw, 46vw"
                  srcset="${pre}assets/site/about-photo-640.webp 640w, ${pre}assets/site/about-photo-960.webp 960w, ${pre}assets/site/about-photo-1280.webp 1280w">
          <img src="${pre}assets/site/about-photo-1280.jpg" width="1536" height="1024" loading="lazy" decoding="async"
               alt="${esc(ar ? "فريق فندقة يستعرض شاشة التكاملات الحكومية" : "The Fandaqah team reviewing the government integrations screen")}">
        </picture>
      </div>
      <div class="stack rv" data-rv="120">
        <span class="eyebrow">${esc(ar ? "من نحن" : "Who we are")}</span>
        <h2 class="h2 h2--ink">${esc(ar
          ? "تقنية ضيافة مبنية على خبرة تشغيل حقيقية"
          : "Hospitality technology built on real operating experience")}</h2>
        <p class="body">${esc(T(ABOUT.intro, L))}</p>
        <dl class="factlist">
          <div><dt>${esc(ar ? "التأسيس" : "Founded")}</dt><dd class="num">2019</dd></div>
          <div><dt>${esc(ar ? "المقر" : "Head office")}</dt><dd>${esc(ar ? "الخبر، المنطقة الشرقية" : "Al Khobar, Eastern Province")}</dd></div>
          <div><dt>${esc(ar ? "الاسم النظامي" : "Registered name")}</dt><dd>${esc(ar ? "شركة فندقة لتقنية المعلومات" : "Fandaqah Information Technology Company")}</dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>`;

  /* ---- vision and mission, given equal weight ---- */
  const vm = `
<section class="sec sec--cream">
  <div class="wrap">
    <div class="grid grid--2 vm">
      <article class="vm__card rv">
        <span class="vm__label">${esc(T(ABOUT.vision.label, L))}</span>
        <p class="vm__text">${esc(T(ABOUT.vision.text, L))}</p>
      </article>
      <article class="vm__card vm__card--alt rv" data-rv="100">
        <span class="vm__label">${esc(T(ABOUT.mission.label, L))}</span>
        <p class="vm__text">${esc(T(ABOUT.mission.text, L))}</p>
      </article>
    </div>
  </div>
</section>`;

  /* ---- the partnership, which is the real differentiator ---- */
  const partner = `
<section class="sec sec--tight">
  <div class="wrap">
    <div class="pull rv">
      <h2 class="h3">${esc(T(ABOUT.partnership.t, L))}</h2>
      <p class="pull__d">${esc(T(ABOUT.partnership.d, L))}</p>
    </div>
  </div>
</section>`;

  /* ---- where we work ---- */
  const band = `
<section class="band band--short">
  ${photo(pre, "jeddah-albalad", ar
    ? "الرواشين الخشبية التاريخية في جدة البلد بين أشجار النخيل"
    : "The historic wooden rawasheen of Jeddah Al-Balad framed by date palms", "100vw")}
  <span class="band__tint" aria-hidden="true"></span>
  <div class="band__in">
    <div class="wrap">
      <p class="band__q rv">${esc(ar
        ? "سوق واحد نعرفه جيدًا"
        : "One market, known properly")}</p>
      <p class="band__d rv" data-rv="90">${esc(ar
        ? "من الفنادق الحضرية إلى الشقق المخدومة والوحدات السياحية الموسمية، تعمل منشآت الضيافة السعودية تحت أنظمة ومواسم ومتطلبات إفصاح لا تشبه غيرها. النظام مبني لها، لا مُكيَّف عليها."
        : "From city hotels to serviced apartments and seasonal tourist units, Saudi hospitality runs under regulations, seasons and disclosure requirements that are its own. The system is built for them rather than adapted to them.")}</p>
    </div>
  </div>
</section>`;

  /* ---- values. Five of them, so the grid is set to five at the top
         breakpoint rather than leaving an orphan row of two. ---- */
  const values = `
<section class="sec">
  <div class="wrap">
    <div class="center stack rv" style="max-width:640px;margin-bottom:44px">
      <h2 class="h2 h2--ink">${esc(ar ? "قيمنا الأساسية" : "Our core values")}</h2>
    </div>
    <div class="vals">
      ${ABOUT.values.map((v, i) => `
      <article class="val rv" data-rv="${i * 70}">
        <span class="val__n num">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="h4">${esc(T(v.t, L))}</h3>
        <p class="body">${esc(T(v.d, L))}</p>
      </article>`).join("")}
    </div>
  </div>
</section>`;

  /* ---- testimonials, exactly as published ---- */
  const voices = `
<section class="sec sec--cream" id="voices">
  <div class="wrap">
    <div class="center stack rv" style="max-width:700px;margin-bottom:44px">
      <h2 class="h2 h2--ink">${esc(ar ? "آراء عملائنا" : "What operators say")}</h2>
      <p class="lede">${esc(ar
        ? "منشورة على موقع فندقة. الأسماء والمسميات الوظيفية كما وردت، دون إضافة."
        : "Published on the Fandaqah site. Names and job titles are reproduced as given, with nothing added.")}</p>
    </div>
    <ul class="voices">
      ${TESTIMONIALS.map((v, i) => `
      <li class="voice rv" data-rv="${(i % 3) * 70}">
        <blockquote class="voice__q">${esc(T(v.q, L))}</blockquote>
        <p class="voice__by"><b>${esc(T(v.name, L))}</b><span>${esc(T(v.role, L))}</span></p>
      </li>`).join("")}
    </ul>
  </div>
</section>`;

  /* ---- closing statement ---- */
  const closing = `
<section class="sec sec--tight">
  <div class="wrap">
    <p class="closing rv">${esc(T(ABOUT.closing, L))}</p>
  </div>
</section>`;

  return { intro, vm, partner, band, values, voices, closing };
}
