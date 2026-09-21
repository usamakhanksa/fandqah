/* The Features page body. Split out of build.mjs because it carries the most
   product detail of any page: three lead modules on real screenshots, six
   capability groups, four deep features and the published reports list.

   Every claim on this page traces to fandaqah.com/store/features. See
   build/content-extra.mjs for the provenance note. */

import { MODULES, CAPABILITY_GROUPS, DEEP_FEATURES, REPORTS } from "./content-extra.mjs";

/* ---------- module readouts ----------
   The published module images are small illustrations, not product captures,
   and they read as clip-art when scaled into a feature block. Until real
   screenshots exist these are drawn in markup and CSS instead: same visual
   language as the home page story readouts, no images, no layout shift.

   They are decorative, hence aria-hidden. Every number shown is either a
   published figure or an obvious interface specimen; none is presented as
   Fandaqah performance data. */
function moduleViz(id, L) {
  const ar = L === "ar";
  if (id === "pms") {
    const rooms = ["a", "c", "b", "a", "b", "c", "a", "a", "c", "b", "a", "b", "c", "a", "b", "b"];
    return `<div class="ui ui--board" aria-hidden="true">
      <div class="ui__bar">
        <span class="ui__dot"></span>
        <span class="ui__title">${ar ? "لوحة الاستقبال" : "Front desk"}</span>
        <span class="ui__kpi"><b>78%</b> ${ar ? "إشغال" : "occupancy"}</span>
      </div>
      <div class="ui__rooms">
        ${rooms.map((st, k) => `<span class="ui__room ui__room--${st}">${101 + k}</span>`).join("")}
      </div>
      <div class="ui__foot">
        <span><b class="num">12</b> ${ar ? "وصول اليوم" : "arrivals"}</span>
        <span><b class="num">9</b> ${ar ? "مغادرة اليوم" : "departures"}</span>
        <span class="ui__legend"><i class="ui__room--a"></i>${ar ? "مشغول" : "Occupied"}</span>
        <span class="ui__legend"><i class="ui__room--b"></i>${ar ? "جاهز" : "Ready"}</span>
      </div>
    </div>`;
  }
  if (id === "channel") {
    const rows = [["Booking.com", "420", "98%", ""], ["Agoda", "420", "94%", ""],
                  [ar ? "الحجز المباشر" : "Direct", "395", "100%", " ui__row--direct"],
                  ["Expedia", "420", "91%", ""]];
    return `<div class="ui ui--sync" aria-hidden="true">
      <div class="ui__bar">
        <span class="ui__dot"></span>
        <span class="ui__title">${ar ? "مزامنة القنوات" : "Channel sync"}</span>
        <span class="ui__kpi ui__kpi--live">${ar ? "مباشر" : "live"}</span>
      </div>
      <div class="ui__head"><span>${ar ? "القناة" : "Channel"}</span><span>${ar ? "السعر" : "Rate"}</span><span>${ar ? "المزامنة" : "Sync"}</span></div>
      ${rows.map(([n, r, p, cls]) => `<div class="ui__row${cls}">
        <span class="ui__ch">${n}</span>
        <span class="ui__rate num">${r}</span>
        <span class="ui__bar2"><i style="--w:${p}"></i></span>
      </div>`).join("")}
      <p class="ui__note">${ar ? "تعديل واحد ينعكس على كل القنوات" : "One change lands on every channel"}</p>
    </div>`;
  }
  return `<div class="ui ui--book" aria-hidden="true">
      <div class="ui__bar">
        <span class="ui__dot"></span>
        <span class="ui__title">${ar ? "احجز مباشرة" : "Book direct"}</span>
      </div>
      <div class="ui__fields">
        <span class="ui__field"><i>${ar ? "الوصول" : "Check in"}</i><b>12 / 03</b></span>
        <span class="ui__field"><i>${ar ? "المغادرة" : "Check out"}</i><b>15 / 03</b></span>
        <span class="ui__field"><i>${ar ? "الضيوف" : "Guests"}</i><b>2</b></span>
      </div>
      <div class="ui__total">
        <span>${ar ? "٣ ليالٍ، شامل الضريبة" : "3 nights, tax included"}</span>
        <b class="num">1,380.00</b>
      </div>
      <span class="ui__cta">${ar ? "تأكيد الحجز" : "Confirm booking"}</span>
      <p class="ui__pay">${["mada", "Apple Pay", "Google Pay", "Samsung Pay"].map(x => `<span>${x}</span>`).join("")}</p>
    </div>`;
}

export function featuresSections(ctx) {
  const { L, pre, esc, T, icon, tick, picture, photo } = ctx;
  const ar = L === "ar";

  /* ---- three lead modules, alternating sides ---- */
  const modules = MODULES.map((m, i) => `
<section class="sec ${i % 2 ? "sec--cream" : ""} mod" id="${m.id}">
  <div class="wrap">
    <div class="grid grid--split ${i % 2 ? "grid--flip" : ""}">
      <div class="stack rv">
        <span class="mod__eyebrow">${esc(T(m.eyebrow, L))}</span>
        <h2 class="h2 h2--ink">${esc(T(m.t, L))}</h2>
        <p class="lede">${esc(T(m.lede, L))}</p>
        <ul class="ticks">
          ${T(m.points, L).map(x => `<li>${tick}<span>${esc(x)}</span></li>`).join("\n          ")}
        </ul>
      </div>
      <div class="rv mod__shot" data-rv="120">
        ${moduleViz(m.id, L)}
      </div>
    </div>
  </div>
</section>`).join("\n");

  /* ---- editorial band ---- */
  const band = `
<section class="band band--short">
  ${photo(pre, "hotel-reception-lobby", ar
    ? "مكتب استقبال فندق حديث وموظف يعمل على النظام"
    : "A modern hotel reception desk with a member of staff working at the system", "100vw")}
  <span class="band__tint" aria-hidden="true"></span>
  <div class="band__in">
    <div class="wrap">
      <p class="band__q rv">${esc(ar
        ? "كل ما سبق يظهر في مكان واحد: شاشة الاستقبال"
        : "All of it surfaces in one place: the front desk screen")}</p>
      <p class="band__d rv" data-rv="90">${esc(ar
        ? "حالة الوحدات، ونسبة الإشغال، ووافدو اليوم ومغادروه، وإضافة حجز سريع. الموظف الجديد يفهمها في أول وردية."
        : "Unit statuses, the day’s occupancy, today’s arrivals and departures, and quick booking entry. A new member of staff reads it in their first shift.")}</p>
    </div>
  </div>
</section>`;

  /* ---- capability groups ---- */
  const groups = `
<section class="sec" id="capabilities">
  <div class="wrap">
    <div class="center stack rv" style="max-width:720px;margin-bottom:48px">
      <h2 class="h2 h2--ink">${esc(ar ? "ما الذي يشغّله النظام فعليًا" : "What the system actually runs")}</h2>
      <p class="lede">${esc(ar
        ? "كل بند أدناه منشور على موقع فندقة. القائمة كاملة لا مختارة، حتى تعرف ما ستحصل عليه قبل العرض التوضيحي."
        : "Every item below is published on the Fandaqah site. The list is complete rather than curated, so you know what you get before the demo.")}</p>
    </div>
    <div class="grid grid--3 caps">
      ${CAPABILITY_GROUPS.map((g, i) => `
      <article class="card cap rv" data-rv="${(i % 3) * 80}">
        <div class="card__icon">${icon(g.icon)}</div>
        <h3 class="h4">${esc(T(g.t, L))}</h3>
        <ul class="cap__list">
          ${T(g.items, L).map(x => `<li>${esc(x)}</li>`).join("\n          ")}
        </ul>
      </article>`).join("")}
    </div>
  </div>
</section>`;

  /* ---- deep features ---- */
  const deep = `
<section class="sec sec--forest" id="deep">
  <div class="wrap">
    <div class="stack rv" style="max-width:720px;margin-bottom:46px">
      <h2 class="h2" style="color:var(--on-dark)">${esc(ar
        ? "أربع تفاصيل تصنع الفرق عند الاستقبال"
        : "Four details that decide how the front desk feels")}</h2>
    </div>
    <div class="grid grid--2 deep">
      ${DEEP_FEATURES.map((f, i) => `
      <article class="deep__item rv" data-rv="${(i % 2) * 90}">
        <p class="deep__fig"><b class="num">${esc(f.figure)}</b><span>${esc(T(f.figureLabel, L))}</span></p>
        <h3 class="h4" style="color:var(--on-dark)">${esc(T(f.t, L))}</h3>
        <p class="body" style="color:var(--on-dark-soft)">${esc(T(f.d, L))}</p>
      </article>`).join("")}
    </div>
  </div>
</section>`;

  /* ---- the published reports list ---- */
  const reports = `
<section class="sec sec--tight" id="reports">
  <div class="wrap">
    <div class="card rv" style="padding:clamp(28px,4vw,48px)">
      <h2 class="h3" style="margin-bottom:10px">${esc(ar ? "التقارير الجاهزة" : "Reports out of the box")}</h2>
      <p class="body" style="margin-bottom:24px;max-width:62ch">${esc(ar
        ? "مجموعة تقارير تمكّنك من اتخاذ القرار، بما فيها تقرير الإفصاح الشهري لمنصة بلدي."
        : "A reporting set you can make decisions on, including the monthly Balady disclosure report.")}</p>
      <ul class="chips">
        ${T(REPORTS, L).map(r => `<li class="chip-t">${esc(r)}</li>`).join("\n        ")}
      </ul>
    </div>
  </div>
</section>`;

  return { modules, band, groups, deep, reports };
}
