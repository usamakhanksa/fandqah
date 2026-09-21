/* The pricing page body. Split out of build.mjs because it carries the
   most content of any page: four live plans, a 20-row matrix, a working
   cost calculator and the add-on note. */

import { SITE, UI, PAGES, PLANS, PLAN_META, PLAN_MATRIX } from "./content.mjs";

const T = (o, L) => (o && typeof o === "object" ? (o[L] ?? o.en ?? "") : (o ?? ""));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nf = n => n.toLocaleString("en-US");

const tick = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>`;
const plug = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0Z"/><path d="M12 18v4"/></svg>`;

export function planCards(L) {
  return `
<h2 class="sr">${esc(L === "ar" ? "الباقات المتاحة" : "Available packages")}</h2>
<div class="plans">
  ${PLANS.map((p, i) => `
  <article class="plan ${p.featured ? "plan--featured" : ""} rv" data-rv="${i * 80}">
    ${p.featured ? `<span class="plan__flag">${esc(T(p.tag, L))}</span>` : ""}
    <h3 class="plan__name">${esc(T(p.name, L))}</h3>
    <p class="plan__for">${esc(T(p.for, L))}</p>

    <p class="plan__price">
      <span class="plan__amount">${p.price === 0 ? (L === "ar" ? "مجانًا" : "Free") : nf(p.price)}</span>
      ${p.price === 0 ? "" : `<span class="plan__cur">${PLAN_META.currency}</span>`}
      <span class="plan__per">/ ${esc(T(PLAN_META.period, L))}</span>
    </p>
    <p class="plan__vat">${esc(T(PLAN_META.vatNote, L))}</p>

    ${p.limits.length ? `
    <div class="plan__block">
      <p class="plan__label">${esc(L === "ar" ? "الحدود" : "Limits")}</p>
      <ul class="plan__list">
        ${p.limits.map(x => `<li>${tick}<span>${esc(T(x, L))}</span></li>`).join("")}
      </ul>
    </div>` : ""}

    ${p.integrations.length ? `
    <div class="plan__block">
      <p class="plan__label">${esc(L === "ar" ? "التكامل المتضمَّن" : "Integrations included")}</p>
      <ul class="plan__list plan__list--int">
        ${p.integrations.map(x => `<li>${plug}<span>${esc(T(x, L))}</span></li>`).join("")}
      </ul>
    </div>` : ""}

    <div class="plan__block">
      <p class="plan__label">${esc(L === "ar" ? "المزايا" : "What you get")}</p>
      <ul class="plan__list">
        ${p.features.map(x => `<li>${tick}<span>${esc(T(x, L))}</span></li>`).join("")}
      </ul>
    </div>

    <div class="plan__cta-wrap">
      <a class="btn ${p.featured ? "btn--primary" : "btn--ghost"}"
         href="${SITE.origin}/store">${esc(T(p.cta, L))}</a>
    </div>
  </article>`).join("")}
</div>`;
}

export function planMatrix(L) {
  const cell = v => {
    if (v === 1) return `<td class="yes" aria-label="${L === "ar" ? "متوفر" : "included"}">${tick.replace("24 24", "24 24")}</td>`;
    if (v === 0) return `<td class="no" aria-label="${L === "ar" ? "غير متوفر" : "not included"}">–</td>`;
    return `<td class="val">${esc(v)}</td>`;
  };
  return `
<div class="matrix-scroll rv">
  <table class="matrix">
    <caption>${esc(L === "ar"
      ? "مقارنة الباقات الأربع. الأسعار سنوية وغير شاملة ضريبة القيمة المضافة."
      : "The four packages compared. Prices are annual and exclude VAT.")}</caption>
    <thead>
      <tr>
        <th scope="col">${esc(L === "ar" ? "الميزة" : "Capability")}</th>
        ${PLANS.map(p => `<th scope="col" style="text-align:center">${esc(T(p.name, L))}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${PLAN_MATRIX.map(r => `
      <tr>
        <th scope="row">${esc(T(r.k, L))}</th>
        ${r.v.map(cell).join("")}
      </tr>`).join("")}
      <tr>
        <th scope="row">${esc(L === "ar" ? "السعر السنوي (ر.س، دون ضريبة)" : "Annual price (SAR, ex-VAT)")}</th>
        ${PLANS.map(p => `<td class="val">${p.price === 0 ? (L === "ar" ? "مجانًا" : "Free") : nf(p.price)}</td>`).join("")}
      </tr>
    </tbody>
  </table>
</div>`;
}

export function costCalc(L) {
  return `
<div class="card rv" id="calc" data-vat="${PLAN_META.vat}" data-setup="${PLAN_META.setupFee}"
     style="padding:clamp(24px,3.4vw,40px)">
  <h3 class="h4">${esc(L === "ar" ? "احسب التكلفة الفعلية للسنة الأولى" : "Work out the real first-year cost")}</h3>
  <p class="body" style="margin-top:10px">${esc(L === "ar"
    ? "السعر المعروض على الباقات لا يشمل الضريبة ولا رسوم التثبيت. اختر باقة لترى الإجمالي كما سيظهر عند الدفع."
    : "The price on each package excludes VAT and the setup fee. Pick a package to see the total as it appears at checkout.")}</p>

  <div class="field" style="margin-top:22px;max-width:320px">
    <label for="calc-plan">${esc(L === "ar" ? "الباقة" : "Package")}</label>
    <select id="calc-plan">
      ${PLANS.map((p, i) => `<option data-price="${p.price}"${i === 2 ? " selected" : ""}>${esc(T(p.name, L))}</option>`).join("")}
    </select>
  </div>

  <ul class="breakdown" style="margin-top:20px">
    <li><span>${esc(L === "ar" ? "سعر الباقة (سنويًا)" : "Package price (annual)")}</span>
        <span class="v">${PLAN_META.currency} <span id="calc-base">0.00</span></span></li>
    <li><span>${esc(L === "ar" ? "رسوم التثبيت" : "Setup fee")}
        <span class="muted">${esc(L === "ar" ? "مرة واحدة فقط" : "one time only")}</span></span>
        <span class="v">${PLAN_META.currency} <span id="calc-setup">0.00</span></span></li>
    <li><span>${esc(L === "ar" ? "ضريبة القيمة المضافة" : "VAT")} (${PLAN_META.vat}%)</span>
        <span class="v">${PLAN_META.currency} <span id="calc-vat">0.00</span></span></li>
    <li><span>${esc(L === "ar" ? "الإجمالي للسنة الأولى" : "First-year total")}</span>
        <span class="v">${PLAN_META.currency} <span id="calc-total">0.00</span></span></li>
  </ul>

  <p class="small" style="margin-top:16px">${esc(L === "ar"
    ? "رسوم التثبيت تُدفع مرة واحدة عند بدء التشغيل، فلا تتكرر في السنوات التالية."
    : "The setup fee is charged once at onboarding, so it does not recur in later years.")}</p>
  <p class="small" style="margin-top:8px">${esc(T(PLAN_META.gateway, L))}</p>
</div>`;
}

export function addonNote(L) {
  return `
<div class="card card--glass rv" style="padding:clamp(24px,3.4vw,36px)">
  <h3 class="h4">${esc(L === "ar" ? "الإضافات" : "Add-ons")}</h3>
  <p class="body" style="margin-top:10px">${esc(L === "ar"
    ? "يمكن تعزيز أي باقة بإضافات تُختار عند إتمام الاشتراك: تمديد التكاملات الحكومية، وزيادة رصيد الرسائل النصية، وربط قنوات إضافية. تتراوح أسعار الإضافات المعروضة في المتجر بين ٣٥٠ و١٨٠٠ ريال سعودي حسب الإضافة."
    : "Any package can be extended with add-ons chosen at checkout: longer government integration terms, more SMS credit, and extra channel connections. Add-on prices shown in the store range from SAR 350 to SAR 1,800 depending on the item.")}</p>
  <a class="btn btn--ghost btn--sm" style="margin-top:20px" href="${SITE.origin}/store">${esc(L === "ar" ? "اطّلع على الإضافات في المتجر" : "See add-ons in the store")}</a>
</div>`;
}
