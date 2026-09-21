/* ============================================================
   Fandaqah static site builder
   Emits Arabic pages at the root and English under /en/,
   each with its own crawlable URL, hreflang pair and JSON-LD.
   Run:  node build/build.mjs
   ============================================================ */

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE, STATS, NAV, UI, PRODUCTS, COMPLIANCE, FEATURES,
  ADVANTAGES, SEGMENTS, FAQ, PAGES, BLOG_TOPICS,
  PLANS, PLAN_META, PLAN_MATRIX
} from "./content.mjs";
import { MODULES, CAPABILITY_GROUPS, DEEP_FEATURES, REPORTS, TESTIMONIALS, ABOUT, FAQ_EXTRA }
  from "./content-extra.mjs";
import { featuresSections } from "./features-body.mjs";
import { aboutSections } from "./about-body.mjs";
import { planCards, planMatrix, costCalc, addonNote } from "./pricing.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LANGS = ["ar", "en"];

/* ---------- helpers ---------- */
const T = (o, L) => (o && typeof o === "object" ? (o[L] ?? o.en ?? "") : (o ?? ""));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const A = (L, ...xs) => xs.join("");

/* asset + link prefix: English pages live one level down */
const P = L => (L === "en" ? "../" : "");
/* path of a page within its own language */
const href = (L, key) => {
  const p = PAGES[key];
  return P(L) + (L === "en" ? "en/" : "") + (p.file === "index.html" ? "" : p.file) || (L === "en" ? "../en/" : "./");
};
/* simpler: build hrefs relative to the current page's directory */
const link = (L, key) => {
  const f = PAGES[key].file;
  return f === "index.html" ? (L === "en" ? "index.html" : "index.html") : f;
};
/* absolute URL for canonical / sitemap / schema */
const abs = (L, key) => {
  const f = PAGES[key].file;
  const base = SITE.origin + (L === "en" ? "/en/" : "/");
  return f === "index.html" ? base : base + f;
};
/* the same page in the other language, as a relative href */
const swap = (L, key) => {
  const f = PAGES[key].file;
  const target = f === "index.html" ? "" : f;
  return L === "ar" ? "en/" + target : "../" + target;
};

/* ---------- icons ---------- */
const ICON = {
  grid:  '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
  scan:  '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M3 12h18"/>',
  pen:   '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  bolt:  '<path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  star:  '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/>',
  chat:  '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 21l1.9-5a8.4 8.4 0 0 1-.9-3.9 8.4 8.4 0 0 1 8.5-8.4 8.4 8.4 0 0 1 8.5 8.3Z"/>',
  coin:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 10a3 3 0 0 0-3-1.5c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2a3 3 0 0 1-3-1.5"/>',
  home:  '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 21v-7h6v7"/>',
  mobile:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>'
};
ICON.layers = '<path d="M12 2.8 2.6 7.6 12 12.4l9.4-4.8Z"/><path d="M2.6 12.4 12 17.2l9.4-4.8"/><path d="M2.6 17 12 21.8l9.4-4.8"/>';
ICON.plug   = '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0Z"/><path d="M12 17v5"/>';

const icon = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n] || ICON.grid}</svg>`;

const tick = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>`;

const SOCIAL_SVG = {
  linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.46-2.2 2.96V21h-4Z"/>',
  x:        '<path d="M17.5 3h3l-6.6 7.6L21.7 21h-5.9l-4.3-5.6L6.4 21H3.3l7.1-8.1L2.6 3h6l3.9 5.2ZM16.4 19.2h1.7L7.7 4.7H5.9Z"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.2" cy="6.8" r="1.2"/>',
  facebook: '<path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.29-.04-1.28-.13-2.43-.13-2.4 0-4.05 1.47-4.05 4.17V9.9H7.5V13h2.72v8Z"/>'
};
const socialIcon = k => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SOCIAL_SVG[k]}</svg>`;

/* ---------- SEO head ---------- */
function head(L, key, extraLd = []) {
  const p = PAGES[key];
  const dir = L === "ar" ? "rtl" : "ltr";
  const canonical = abs(L, key);
  const pre = P(L);
  const ogImg = SITE.origin + "/assets/site/og-card.jpg";

  const ld = [breadcrumbLd(L, key), ...extraLd].filter(Boolean);

  return `<!doctype html>
<html lang="${L}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(T(p.title, L))}</title>
<meta name="description" content="${esc(T(p.desc, L))}">
<meta name="keywords" content="${esc(T(p.keywords, L))}">
<meta name="author" content="${esc(T(SITE.legal, L))}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="canonical" href="${canonical}">

<link rel="alternate" hreflang="ar" href="${abs("ar", key)}">
<link rel="alternate" hreflang="en" href="${abs("en", key)}">
<link rel="alternate" hreflang="x-default" href="${abs("ar", key)}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(T(SITE.brand, L))}">
<meta property="og:locale" content="${L === "ar" ? "ar_SA" : "en_US"}">
<meta property="og:locale:alternate" content="${L === "ar" ? "en_US" : "ar_SA"}">
<meta property="og:title" content="${esc(T(p.title, L))}">
<meta property="og:description" content="${esc(T(p.desc, L))}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(L === "ar" ? "فريق ضيافة سعودي يستخدم نظام فندقة" : "A Saudi hospitality team using the Fandaqah system")}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@fandaqah">
<meta name="twitter:title" content="${esc(T(p.title, L))}">
<meta name="twitter:description" content="${esc(T(p.desc, L))}">
<meta name="twitter:image" content="${ogImg}">

<meta name="theme-color" content="#E95A54">
<meta name="geo.region" content="SA-04">
<meta name="geo.placename" content="${esc(T(SITE.address.city, L))}">

<link rel="icon" href="${pre}favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" href="${pre}assets/site/icon-192.png" sizes="192x192">
<link rel="apple-touch-icon" href="${pre}assets/site/icon-180.png">
<link rel="manifest" href="${pre}site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${pre}assets/css/fandaqah.css">
<link rel="stylesheet" href="${pre}assets/css/fandaqah-parts.css">
${["features", "about"].includes(key) ? `<link rel="stylesheet" href="${pre}assets/css/fandaqah-pages.css">` : ""}
${key === "home" ? `<link rel="preload" as="image" type="image/webp"
      imagesrcset="${pre}assets/site/about-photo-640.webp 640w, ${pre}assets/site/about-photo-960.webp 960w, ${pre}assets/site/about-photo-1280.webp 1280w, ${pre}assets/site/about-photo-1536.webp 1536w"
      imagesizes="(max-width: 900px) 92vw, 46vw" fetchpriority="high">` : ""}
<script>document.documentElement.classList.add("js");</script>

${ld.map(o => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join("\n")}
</head>
<body>
<a class="skip" href="#main">${esc(T(UI.skip, L))}</a>
`;
}

/* ---------- story visuals ----------
   One small operational readout per story step, so the panel shows the
   product instead of an empty box. Pure markup + CSS, no images and no
   JS: they are decorative, hence aria-hidden, and every value shown is
   either a real published figure or an illustrative interface specimen.
   The invoice figures and the occupancy bars are specimens, not Fandaqah
   performance data, and are documented as such in DESIGN_UPDATE.md. */
function storyViz(i, L) {
  const ar = L === "ar";
  const v = [
    /* 1 - channels syncing */
    `<div class="viz viz--rows">
       ${[["Booking.com", "98%"], ["Agoda", "94%"], [ar ? "الحجز المباشر" : "Direct", "100%"], ["Expedia", "91%"]]
         .map(([n, w]) => `<div class="viz__row"><span>${n}</span><i style="--w:${w}"></i></div>`).join("")}
     </div>`,
    /* 2 - document scan */
    `<div class="viz viz--scan">
       <div class="viz__doc">
         <span class="viz__portrait"></span>
         <span class="viz__lines"><i></i><i></i><i></i></span>
         <span class="viz__beam"></span>
       </div>
       <p class="viz__cap">${ar ? "قراءة الهوية" : "Reading the ID"}</p>
     </div>`,
    /* 3 - the three government platforms */
    `<div class="viz viz--chips">
       ${[[ar ? "شموس" : "Shomoos"], [ar ? "وزارة السياحة" : "Ministry of Tourism"], [ar ? "زاتكا" : "ZATCA"]]
         .map(([n]) => `<span class="viz__chip"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8.4l3.6 3.6L13.5 4.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>${n}</span>`).join("")}
     </div>`,
    /* 4 - housekeeping board */
    `<div class="viz viz--rooms">
       <div class="viz__grid">
         ${["a", "b", "c", "a", "c", "b", "b", "a", "c", "a", "a", "b"]
           .map((st, k) => `<span class="viz__room viz__room--${st}">${101 + k}</span>`).join("")}
       </div>
       <p class="viz__legend">
         ${[["a", ar ? "يُنظّف" : "Cleaning"],
            ["b", ar ? "جاهز" : "Ready"],
            ["c", ar ? "مشغول" : "Occupied"]]
           .map(([st, n]) => `<span><i class="viz__room--${st}"></i>${n}</span>`).join("")}
       </p>
     </div>`,
    /* 5 - invoice slip */
    `<div class="viz viz--slip">
       <div class="viz__slipline"><span>${ar ? "الإقامة" : "Room"}</span><b>1,200.00</b></div>
       <div class="viz__slipline"><span>${ar ? "خدمات" : "Services"}</span><b>180.00</b></div>
       <div class="viz__slipline viz__slipline--vat"><span>${ar ? "ضريبة القيمة المضافة ١٥٪" : "VAT 15%"}</span><b>207.00</b></div>
       <div class="viz__slipline viz__slipline--total"><span>${ar ? "الإجمالي" : "Total"}</span><b>1,587.00</b></div>
       <span class="viz__stamp">${ar ? "زاتكا المرحلة ٢" : "ZATCA Phase 2"}</span>
     </div>`,
    /* 6 - night audit bars */
    `<div class="viz viz--bars">
       <div class="viz__track">${[46, 62, 55, 78, 71, 88, 94].map(h => `<i style="--h:${h}%"></i>`).join("")}</div>
       <p class="viz__cap">${ar ? "الإشغال خلال الأسبوع" : "Occupancy across the week"}</p>
     </div>`
  ];
  return `<div class="story__viz" aria-hidden="true">${v[i] || ""}</div>`;
}

/* ---------- structured data ---------- */
function orgLd(L) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SITE.origin + "/#organization",
    name: T(SITE.legal, L),
    alternateName: T(SITE.brand, L),
    url: SITE.origin,
    logo: SITE.origin + "/assets/site/fandaqah-simple.png",
    foundingDate: SITE.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: T(SITE.address.street, L),
      addressLocality: T(SITE.address.city, L),
      addressRegion: T(SITE.address.region, L),
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country
    },
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: SITE.phoneUnified,
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["ar", "en"]
    }],
    sameAs: SITE.social.map(s => s[1])
  };
}

function softwareLd(L) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: T(SITE.brand, L),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Hotel Property Management System",
    operatingSystem: "Web, iOS, Android",
    url: SITE.origin,
    inLanguage: ["ar", "en"],
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    publisher: { "@id": SITE.origin + "/#organization" },
    offers: {
      "@type": "Offer",
      priceCurrency: "SAR",
      price: "300",
      description: L === "ar"
        ? "رسوم تركيب لمرة واحدة ٣٠٠ ريال سعودي. تُحدَّد قيمة الاشتراك حسب نوع المنشأة وعدد الوحدات. تُضاف ضريبة القيمة المضافة ١٥٪."
        : "One-time setup fee of SAR 300. Subscription pricing is set by property type and unit count. 15% VAT applies.",
      availability: "https://schema.org/InStock"
    },
    featureList: FEATURES.map(f => T(f.t, L))
  };
}

function localBusinessLd(L) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SITE.origin + "/#localbusiness",
    name: T(SITE.legal, L),
    image: SITE.origin + "/assets/site/og-card.jpg",
    url: SITE.origin,
    telephone: SITE.phone,
    priceRange: "SAR",
    address: {
      "@type": "PostalAddress",
      streetAddress: T(SITE.address.street, L),
      addressLocality: T(SITE.address.city, L),
      addressRegion: T(SITE.address.region, L),
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00", closes: "17:00"
    }],
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    sameAs: SITE.social.map(s => s[1])
  };
}

function faqLd(L, key) {
  const list = FAQ[key];
  if (!list || !list.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map(f => ({
      "@type": "Question",
      name: T(f.q, L),
      acceptedAnswer: { "@type": "Answer", text: T(f.a, L) }
    }))
  };
}

function blogLd(L) {
  const posts = BLOG_TOPICS.flatMap(t => t.posts);
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": abs(L, "blog") + "#blog",
    name: T(PAGES.blog.title, L),
    description: T(PAGES.blog.desc, L),
    inLanguage: L,
    publisher: { "@id": SITE.origin + "/#organization" },
    blogPost: posts.map(p => ({
      "@type": "BlogPosting",
      headline: T(p, L),
      url: SITE.origin + p.url,
      inLanguage: L,
      publisher: { "@id": SITE.origin + "/#organization" }
    }))
  };
}

function offersLd(L) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: T(SITE.brand, L) + (L === "ar" ? " الباقات" : " Packages"),
    description: T(PAGES.pricing.desc, L),
    brand: { "@type": "Brand", name: T(SITE.brand, L) },
    offers: PLANS.map(p => ({
      "@type": "Offer",
      name: T(p.name, L),
      price: String(p.price),
      priceCurrency: PLAN_META.currency,
      url: SITE.origin + "/store",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(p.price),
        priceCurrency: PLAN_META.currency,
        valueAddedTaxIncluded: false,
        unitText: "YEAR",
        billingDuration: 1,
        billingIncrement: 1
      },
      description: T(p.for, L)
    }))
  };
}

function breadcrumbLd(L, key) {
  const items = [{ name: T(UI.home, L), url: abs(L, "home") }];
  if (key !== "home") items.push({ name: T(PAGES[key].h1, L), url: abs(L, key) });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name, item: it.url
    }))
  };
}

/* ---------- images ----------
   Every raster asset also exists as a WebP beside it (build/images.mjs
   regenerates them). This emits a <picture> so a browser without WebP
   still gets the original file, and never guesses: if the .webp is not
   on disk the plain <img> is returned unchanged. */
import { existsSync } from "node:fs";
function picture(pre, file, attrs) {
  const webp = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const plain = `<img src="${pre}assets/site/${file}" ${attrs}>`;
  if (webp === file || !existsSync(new URL(`../assets/site/${webp}`, import.meta.url))) return plain;
  return `<picture><source type="image/webp" srcset="${pre}assets/site/${webp}">${plain}</picture>`;
}

/* ---------- editorial photography ----------
   The card and band photographs live in assets/site/photos as a small
   responsive WebP set with one JPEG fallback, cropped at build time by
   build/photos.mjs. Provenance and licence: assets/site/photos/CREDITS.md.
   `stem` is the file stem, so replacing the source photograph needs no
   markup change. */
const PHOTO_SETS = {
  "hotel-reception-lobby":       { w: [480, 720, 1040], fb: 720, ratio: "3/2" },
  "serviced-apartment-corridor": { w: [480, 720, 1040], fb: 720, ratio: "3/2" },
  "chalet-pool-terrace":         { w: [480, 720, 1040], fb: 720, ratio: "3/2" },
  "riyadh-skyline":              { w: [960, 1440, 1920], fb: 1440, ratio: "21/9" },
  "gulf-resort-pool":            { w: [960, 1440, 1920], fb: 1440, ratio: "21/9" },
  "jeddah-albalad":              { w: [960, 1440, 1920], fb: 1440, ratio: "21/9" }
};
function photo(pre, stem, alt, sizes, opts = {}) {
  const set = PHOTO_SETS[stem];
  if (!set) return "";
  const [aw, ah] = set.ratio.split("/").map(Number);
  const h = w => Math.round(w * ah / aw);
  const srcset = set.w.map(w => `${pre}assets/site/photos/${stem}-${w}.webp ${w}w`).join(", ");
  const load = opts.eager ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<picture>
      <source type="image/webp" sizes="${sizes}" srcset="${srcset}">
      <img src="${pre}assets/site/photos/${stem}-${set.fb}.jpg" width="${set.fb}" height="${h(set.fb)}"
           ${load} decoding="async" alt="${esc(alt)}">
    </picture>`;
}

/* ---------- chrome ---------- */

function header(L, key) {
  const pre = P(L);
  const logo = `${pre}assets/site/logo-300.webp`;
  const navItems = NAV.map(n =>
    `<a href="${link(L, n.key)}"${key === n.key ? ' aria-current="page"' : ""}>${esc(T(n, L))}</a>`
  ).join("\n        ");

  return `
<header class="hdr">
  <div class="wrap wrap--wide hdr__in">
    <a class="hdr__logo" href="${link(L, "home")}" aria-label="${esc(T(SITE.brand, L))}">
      <img src="${logo}" srcset="${pre}assets/site/logo-150.webp 150w, ${pre}assets/site/logo-300.webp 300w"
           sizes="80px" alt="${esc(T(SITE.brand, L))}" width="350" height="150" fetchpriority="high">
    </a>

    <nav class="nav" aria-label="${L === "ar" ? "التنقل الرئيسي" : "Primary"}">
        ${navItems}
    </nav>

    <div class="hdr__act">
      <a class="lang" href="${swap(L, key)}" hreflang="${L === "ar" ? "en" : "ar"}"
         lang="${L === "ar" ? "en" : "ar"}">${esc(T(UI.langSwitch, L))}</a>
      <a class="btn btn--primary btn--sm only-lg" href="${SITE.app.trial}">${esc(T(UI.trial, L))}</a>
      <button class="burger" id="burger" type="button" aria-expanded="false"
              aria-controls="mnav" aria-label="${esc(T(UI.menu, L))}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>

  <div class="mnav" id="mnav" data-open="0">
    <ul>
      ${NAV.map(n => `<li><a href="${link(L, n.key)}">${esc(T(n, L))}</a></li>`).join("\n      ")}
    </ul>
    <a class="btn btn--primary" href="${SITE.app.trial}">${esc(T(UI.trial, L))}</a>
    <a class="btn btn--ghost" href="${SITE.app.login}" style="margin-top:12px">${esc(T(UI.login, L))}</a>
  </div>
</header>
`;
}

function footer(L) {
  const pre = P(L);
  const addr = SITE.address;
  return `
<footer class="ftr">
  <div class="wrap wrap--wide">
    <div class="ftr__grid">
      <div>
        <img class="ftr__logo" src="${pre}assets/site/fandaqah-hotel-white.png"
             alt="${esc(T(SITE.brand, L))}" width="160" height="38">
        <p class="small" style="color:var(--on-dark-soft);max-width:34ch">${esc(L === "ar"
          ? "نظام سحابي سعودي لإدارة الفنادق والشقق المخدومة والمنتجعات، متكامل مع زاتكا وشموس ووزارة السياحة."
          : "The Saudi cloud system for hotels, serviced apartments and resorts, integrated with ZATCA, Shomoos and the Ministry of Tourism.")}</p>
      </div>

      <div>
        <h3 class="ftr__h">${esc(T(UI.product, L))}</h3>
        <ul>
          <li><a href="${link(L, "features")}">${esc(T(NAV[0], L))}</a></li>
          <li><a href="${link(L, "pricing")}">${esc(T(NAV[1], L))}</a></li>
          <li><a href="${SITE.app.trial}">${esc(T(UI.trial, L))}</a></li>
          <li><a href="${SITE.app.login}">${esc(T(UI.login, L))}</a></li>
        </ul>
      </div>

      <div>
        <h3 class="ftr__h">${esc(T(UI.company, L))}</h3>
        <ul>
          <li><a href="${link(L, "about")}">${esc(T(NAV[2], L))}</a></li>
          <li><a href="${link(L, "blog")}">${esc(T(NAV[3], L))}</a></li>
          <li><a href="${link(L, "contact")}">${esc(T(NAV[4], L))}</a></li>
          <li><a href="${link(L, "privacy")}">${esc(T(UI.privacy, L))}</a></li>
          <li><a href="${link(L, "terms")}">${esc(T(UI.terms, L))}</a></li>
        </ul>
      </div>

      <div>
        <h3 class="ftr__h">${esc(T(UI.contactNav, L))}</h3>
        <address style="font-style:normal">
          <ul>
            <li><a href="tel:${SITE.phoneUnified}" class="num">${SITE.phoneUnified}</a></li>
            <li><a href="https://wa.me/${SITE.whatsapp}" class="num" dir="ltr">${SITE.phone}</a></li>
            <li class="small" style="color:var(--on-dark-dim)">${esc(T(addr.street, L))}<br>${esc(T(addr.city, L))} ${addr.postal}</li>
            <li class="small" style="color:var(--on-dark-dim)">${esc(T(SITE.hours, L))}</li>
          </ul>
        </address>
      </div>
    </div>

    <div class="ftr__bot">
      <span>© ${new Date().getFullYear()} ${esc(T(SITE.legal, L))}. ${esc(T(UI.rights, L))}</span>
      <div class="ftr__soc">
        ${SITE.social.map(([k, u]) =>
          `<a href="${u}" aria-label="${k}" rel="noopener">${socialIcon(k)}</a>`).join("\n        ")}
      </div>
    </div>
  </div>
</footer>

<script src="${P(L)}assets/js/fandaqah.js" defer></script>
</body>
</html>
`;
}

/* ---------- shared blocks ---------- */
function crumbs(L, key) {
  if (key === "home") return "";
  return `
<div class="wrap" style="padding-top:22px">
  <nav aria-label="${L === "ar" ? "مسار التنقل" : "Breadcrumb"}">
    <ol class="crumb">
      <li><a href="${link(L, "home")}">${esc(T(UI.home, L))}</a></li>
      <li aria-current="page">${esc(T(PAGES[key].h1, L))}</li>
    </ol>
  </nav>
</div>`;
}

function pageHero(L, key) {
  const p = PAGES[key];
  return `
<section class="hero">
  <div class="wrap stack rv">
    <h1 class="h1" style="color:var(--ink);max-width:20ch">${esc(T(p.h1, L))}</h1>
    <p class="lede">${esc(T(p.lede, L))}</p>
  </div>
</section>`;
}

function faqBlock(L, key) {
  const list = FAQ[key];
  if (!list || !list.length) return "";
  return `
<section class="sec sec--cream" id="faq">
  <div class="wrap">
    <div class="center stack rv" style="max-width:720px;margin-bottom:44px">
      <h2 class="h2 h2--ink">${esc(T(UI.faqTitle, L))}</h2>
    </div>
    <div class="faq" style="max-width:860px;margin-inline:auto">
      ${list.map((f, i) => `
      <details class="rv" data-rv="${i * 50}"${i === 0 ? " open" : ""}>
        <summary>${esc(T(f.q, L))}</summary>
        <div class="faq__a">${esc(T(f.a, L))}</div>
      </details>`).join("")}
    </div>
  </div>
</section>`;
}

/* ---------- the Riyadh band ----------
   A photographic breath between the two longest runs of cards. It carries
   the market claim and three published figures, nothing new: the numbers
   are the same ones the stats block uses. */
function riyadhBand(L) {
  const pre = P(L);
  return `
<section class="band">
  ${photo(pre, "riyadh-skyline", L === "ar"
    ? "برج المملكة في أفق مدينة الرياض تحت سماء صافية"
    : "The Kingdom Centre tower on the Riyadh skyline under a clear sky", "100vw")}
  <span class="band__tint" aria-hidden="true"></span>
  <div class="band__in">
    <div class="wrap">
      <p class="band__q rv">${esc(L === "ar"
        ? "بُني للسوق السعودي، لا مترجمًا إليه"
        : "Built for the Saudi market, not translated into it")}</p>
      <p class="band__d rv" data-rv="90">${esc(L === "ar"
        ? "الامتثال لزاتكا وشموس ووزارة السياحة ليس إضافة تُشترى لاحقًا، بل جزء من النظام منذ أول يوم تشغيل. الواجهة عربية أصلًا، والدعم بتوقيت المملكة."
        : "Compliance with ZATCA, Shomoos and the Ministry of Tourism is not an add-on bought later; it is part of the system from the first day of operation. The interface is Arabic first, and support runs on Saudi time.")}</p>
      <p class="band__meta rv" data-rv="150">
        <span><b class="num">800+</b> ${esc(L === "ar" ? "منشأة" : "properties")}</span>
        <span><b class="num">250,000+</b> ${esc(L === "ar" ? "حجز تمت معالجته" : "bookings processed")}</span>
        <span><b class="num">15</b> ${esc(L === "ar" ? "تكامل مع أنظمة خارجية" : "external integrations")}</span>
      </p>
    </div>
  </div>
</section>`;
}

function ctaBand(L) {
  const pre = P(L);
  return `
<section class="sec">
  <div class="wrap">
    <div class="cta cta--photo rv">
      ${photo(pre, "gulf-resort-pool", L === "ar"
        ? "منتجع خليجي بمسبح ونخيل عند الغروب"
        : "A Gulf resort pool lined with palms at golden hour", "100vw")}
      <span class="cta__tint" aria-hidden="true"></span>
      <div class="stack" style="max-width:640px;margin-inline:auto;position:relative;z-index:2">
        <h2 class="h2">${esc(L === "ar" ? "الضيافة الحديثة تستحق نظامًا ذكيًا" : "Modern hospitality deserves an intelligent system")}</h2>
        <p class="lede" style="color:var(--on-dark-soft)">${esc(L === "ar"
          ? "ابدأ نسخة تجريبية مجانية، أو اطلب عرضًا توضيحيًا على بيانات منشأتك."
          : "Start a free trial, or request a walkthrough using your own property data.")}</p>
        <div class="btn-row" style="justify-content:center">
          <a class="btn btn--primary" href="${SITE.app.trial}">${esc(T(UI.trial, L))}</a>
          <a class="btn btn--onforest" href="${link(L, "contact")}">${esc(T(UI.demo, L))}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function statsBlock(L, onForest = false) {
  return `
<div class="stats">
  ${STATS.map((s, i) => `
  <div class="rv" data-rv="${i * 70}">
    <p class="stat__v num">${esc(s.v)}<span>${esc(s.suffix)}</span></p>
    <p class="stat__k">${esc(T(s.k, L))}</p>
  </div>`).join("")}
</div>`;
}

function complianceBlock(L) {
  const pre = P(L);
  return `
<section class="sec sec--grad-b" id="compliance">
  <div class="wrap">
    <div class="center stack rv" style="max-width:760px;margin-bottom:48px">
      <span class="eyebrow">${esc(L === "ar" ? "التكامل والامتثال" : "Integration & compliance")}</span>
      <h2 class="h2">${esc(L === "ar" ? "متوافق مع الأنظمة السعودية من اليوم الأول" : "Compliant with Saudi regulation from day one")}</h2>
      <p class="lede">${esc(L === "ar"
        ? "الامتثال ليس إضافة تُشترى لاحقًا. الربط مع الجهات الحكومية مبني داخل النظام، فتُرفع البيانات تلقائيًا دون إدخال يدوي."
        : "Compliance is not an add-on you buy later. Government integration is built into the system, so data is filed automatically with no manual entry.")}</p>
    </div>
    <div class="grid grid--3">
      ${COMPLIANCE.map((c, i) => `
      <article class="card card--lift rv" data-rv="${i * 90}">
        ${picture(pre, c.img, `alt="${esc(T(c.t, L))}" width="120" height="60" loading="lazy" decoding="async" style="height:52px;width:auto;object-fit:contain;margin-bottom:20px"`)}
        <h3 class="h4">${esc(T(c.t, L))}</h3>
        <p class="body">${esc(T(c.d, L))}</p>
      </article>`).join("")}
    </div>
  </div>
</section>`;
}

/* ============================================================
   page bodies
   ============================================================ */

function homeBody(L) {
  const pre = P(L);
  const p = PAGES.home;
  return `
<main id="main">

<section class="hero">
  <span class="hero__glow" aria-hidden="true"></span>
  <div class="wrap wrap--wide">
    <div class="grid grid--split">
      <div class="stack rv">
        <span class="eyebrow">${esc(L === "ar" ? "نظام ضيافة سعودي" : "Saudi hospitality platform")}</span>
        <h1 class="h1" style="color:var(--ink)">${esc(T(p.h1, L))}</h1>
        <p class="lede">${esc(T(p.lede, L))}</p>
        <div class="btn-row">
          <a class="btn btn--primary" href="${SITE.app.trial}">${esc(T(UI.trial, L))}</a>
          <a class="btn btn--ghost" href="${link(L, "contact")}">${esc(T(UI.demo, L))}</a>
        </div>
        <div class="hero__badges" style="margin-top:8px">
          <span class="badge"><b class="num">800+</b> ${esc(L === "ar" ? "منشأة" : "properties")}</span>
          <span class="badge"><b class="num">99.9%</b> ${esc(L === "ar" ? "كفاءة تشغيلية" : "uptime efficiency")}</span>
          <span class="badge"><b>24/7</b> ${esc(L === "ar" ? "دعم فني" : "support")}</span>
        </div>
      </div>

      <div class="rv" data-rv="140" style="position:relative">
        <div class="frame">
          <picture>
            <source type="image/webp" sizes="(max-width: 900px) 92vw, 46vw"
                    srcset="${pre}assets/site/about-photo-640.webp 640w, ${pre}assets/site/about-photo-960.webp 960w, ${pre}assets/site/about-photo-1280.webp 1280w, ${pre}assets/site/about-photo-1536.webp 1536w">
            <img src="${pre}assets/site/about-photo-1280.jpg" width="1536" height="1024" fetchpriority="high" decoding="async"
                 alt="${esc(L === "ar" ? "فريق ضيافة سعودي يراجع شاشة التكاملات في نظام فندقة" : "A Saudi hospitality team reviewing the integrations screen in Fandaqah")}">
          </picture>
        </div>
        <div class="chip">
          <p class="stat__v num" style="font-size:28px">250k<span>+</span></p>
          <p class="stat__k">${esc(L === "ar" ? "حجز تمت معالجته" : "bookings processed")}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- products -->
<section class="sec" id="products">
  <div class="wrap">
    <div class="center stack rv" style="max-width:760px;margin-bottom:48px">
      <h2 class="h2">${esc(L === "ar" ? "الحلول الشاملة للضيافة الحديثة" : "A complete system for modern hospitality")}</h2>
      <p class="lede">${esc(L === "ar"
        ? "ثلاثة أنظمة تعمل كنظام واحد، على قاعدة بيانات واحدة، فلا ازدواج في الحجوزات ولا تعارض في الأرقام."
        : "Three systems working as one, on a single database, so bookings cannot double and figures cannot disagree.")}</p>
    </div>
    <div class="grid grid--3">
      ${PRODUCTS.map((pr, i) => `
      <article class="card card--lift rv" data-rv="${i * 90}">
        ${picture(pre, pr.img, `alt="${esc(T(pr.t, L))}" width="120" height="120" loading="lazy" decoding="async" style="height:64px;width:auto;object-fit:contain;margin-bottom:20px"`)}
        <h3 class="h4">${esc(T(pr.t, L))}</h3>
        <p class="body">${esc(T(pr.d, L))}</p>
      </article>`).join("")}
    </div>
  </div>
</section>

${complianceBlock(L)}

<!-- the edge, on forest -->
<section class="sec sec--forest">
  <div class="wrap">
    <div class="center stack rv" style="max-width:720px;margin-bottom:52px">
      <h2 class="h2" style="color:var(--on-dark)">${esc(L === "ar" ? "مبني على خبرة تشغيل حقيقية" : "Built on real operational experience")}</h2>
      <p class="lede" style="color:var(--on-dark-soft)">${esc(L === "ar"
        ? "صُمم بشراكة مع مشغّلي ضيافة، لا في معزل عنهم."
        : "Designed in partnership with hospitality operators, not in isolation from them.")}</p>
    </div>
    <div class="grid grid--4">
      ${ADVANTAGES.map((a, i) => `
      <article class="card card--forest rv" data-rv="${i * 80}">
        <div class="card__icon"><img src="${pre}assets/site/${a.svg}" alt="" width="28" height="28" loading="lazy"></div>
        <h3 class="h4" style="color:var(--on-dark)">${esc(T(a.t, L))}</h3>
        <p class="body" style="color:var(--on-dark-soft)">${esc(T(a.d, L))}</p>
      </article>`).join("")}
    </div>
    <div style="margin-top:64px">${statsBlock(L, true)}</div>
  </div>
</section>

${riyadhBand(L)}

<!-- who we serve -->
<section class="sec sec--cream" id="segments">
  <div class="wrap">
    <div class="center stack rv" style="max-width:700px;margin-bottom:48px">
      <h2 class="h2 h2--ink">${esc(L === "ar" ? "منصة واحدة، مضبوطة على طريقتك في الاستضافة" : "One platform, tuned to how you host")}</h2>
    </div>
    <div class="grid grid--3">
      ${SEGMENTS.map((s, i) => `
      <article class="card card--lift card--photo rv" data-rv="${i * 90}">
        <div class="shot">
          ${photo(pre, s.photo, T(s.photoAlt, L), "(max-width: 700px) 92vw, (max-width: 1040px) 46vw, 31vw")}
          <span class="shot__tint" aria-hidden="true"></span>
          <span class="shot__veil" aria-hidden="true"></span>
          <h3 class="shot__t">${esc(T(s.t, L))}</h3>
        </div>
        <div class="card--photo__body">
          <p class="body">${esc(T(s.d, L))}</p>
        </div>
      </article>`).join("")}
    </div>
  </div>
</section>

<!-- scroll storytelling: one booking, end to end -->
<section class="sec sec--forest story" data-story style="padding-block:0">
  <div class="story__stage">
    <div class="wrap wrap--wide">
      <div class="story__grid">

        <div>
          <span class="eyebrow">${esc(L === "ar" ? "رحلة حجز واحد" : "One booking, end to end")}</span>
          <h2 class="h2" style="color:var(--brand-ink);margin:18px 0 26px">${esc(L === "ar"
            ? "تابع حجزًا واحدًا من القناة إلى التدقيق"
            : "Follow a single booking from channel to audit")}</h2>
          <div class="story__rail story__thread">
            ${[
              [L === "ar" ? "يصل الحجز" : "The booking lands",
               L === "ar" ? "من قناة حجز أو من محرك الحجز المباشر، ويظهر فورًا في لوحة الاستقبال." : "From a booking channel or your own direct engine, appearing at once on the front desk board."],
              [L === "ar" ? "يصل الضيف" : "The guest arrives",
               L === "ar" ? "تُمسح الهوية أو الجواز وتُقيَّد البيانات تلقائيًا." : "The ID or passport is scanned and the data is entered automatically."],
              [L === "ar" ? "تُرفع البيانات" : "The data is filed",
               L === "ar" ? "يُسجَّل النزيل في شموس وتُرفع بيانات الإشغال إلى وزارة السياحة." : "The guest is registered with Shomoos and occupancy is filed to the Ministry of Tourism."],
              [L === "ar" ? "يعمل التشغيل" : "Operations run",
               L === "ar" ? "تتولّد مهام التدبير الفندقي من المغادرات، ويحدّثها الفريق من الجوال." : "Housekeeping tasks generate themselves from checkouts and the team updates them from a phone."],
              [L === "ar" ? "تُصدر الفاتورة" : "The invoice issues",
               L === "ar" ? "فاتورة إلكترونية متوافقة مع المرحلة الثانية من زاتكا، بضريبة ١٥٪ محتسبة." : "A ZATCA Phase 2 compliant e-invoice, with 15% VAT calculated."],
              [L === "ar" ? "يُغلق اليوم" : "The day closes",
               L === "ar" ? "تدقيق ليلي وتقارير موحّدة، بما فيها إفصاح منصة بلدي." : "Night audit and consolidated reports, including Balady disclosure."]
            ].map(([t, d], i) => `
            <div class="story__step" data-on="${i === 0 ? 1 : 0}">
              <span class="story__num">${String(i + 1).padStart(2, "0")}</span>
              <span>
                <span class="story__t">${esc(t)}</span>
                <span class="story__d">${esc(d)}</span>
              </span>
            </div>`).join("")}
          </div>
        </div>

        <div class="story__panels">
          ${[
            ["40+", L === "ar" ? "قناة حجز مرتبطة" : "connected channels",
             L === "ar" ? "مزامنة ثنائية الاتجاه" : "Two-way synchronisation",
             L === "ar" ? "تُزامَن الأسعار والإتاحة لحظيًا، فلا يُنشأ الحجز المزدوج أصلًا بدل معالجته بعد وقوعه." : "Rates and availability sync in real time, so the double booking is never created rather than being cleaned up afterwards."],
            ["< 2", L === "ar" ? "ثانية لكل وثيقة" : "seconds per document",
             L === "ar" ? "الماسح الفوري" : "The instant scanner",
             L === "ar" ? "تقنية مسح تقرأ الهوية أو الجواز وتُدخل البيانات بدقة، فيختفي الطابور عند الاستقبال." : "Scanning that reads an ID or passport and enters the data accurately, so the queue at the desk disappears."],
            ["3", L === "ar" ? "جهات حكومية" : "government platforms",
             L === "ar" ? "الامتثال مبني في النظام" : "Compliance built in",
             L === "ar" ? "شموس ووزارة السياحة وزاتكا. الربط داخل المنصة، لا إضافة تُشترى لاحقًا." : "Shomoos, the Ministry of Tourism and ZATCA. The integration is inside the platform, not an add-on bought later."],
            ["24/7", L === "ar" ? "تشغيل ودعم" : "operation and support",
             L === "ar" ? "التدبير على الطيار الآلي" : "Housekeeping on autopilot",
             L === "ar" ? "تتولّد مهام التنظيف من المغادرات وتُوزَّع على الفريق، ويرى الاستقبال الحالة مباشرة." : "Cleaning tasks generate from checkouts and distribute to the team, and the front desk sees status live."],
            ["15%", L === "ar" ? "ضريبة محتسبة تلقائيًا" : "VAT calculated automatically",
             L === "ar" ? "فوترة زاتكا" : "ZATCA invoicing",
             L === "ar" ? "فوترة إلكترونية متوافقة مع المرحلة الثانية، تُحتسب فيها الضريبة وتُرفع الفاتورة دون خطوات يدوية." : "Phase 2 compliant e-invoicing, with tax calculated and the invoice filed without manual steps."],
            ["250,000+", L === "ar" ? "حجز تمت معالجته" : "bookings processed",
             L === "ar" ? "تقارير تُغلق اليوم" : "Reports that close the day",
             L === "ar" ? "تدقيق ليلي وتقارير موحّدة عبر المنشآت، بما فيها إفصاح بلدي ومؤشرات الأداء." : "Night audit and consolidated cross-property reports, including Balady disclosure and performance indicators."]
          ].map(([fig, figlabel, h, d], i) => `
          <article class="story__panel" data-on="${i === 0 ? 1 : 0}">
            ${storyViz(i, L)}
            <div class="story__copy">
              <p class="story__figure"><b class="num">${esc(fig)}</b><span>${esc(figlabel)}</span></p>
              <h3>${esc(h)}</h3>
              <p>${esc(d)}</p>
            </div>
          </article>`).join("")}
        </div>

      </div>
    </div>
  </div>
</section>

${faqBlock(L, "home")}
${ctaBand(L)}
</main>`;
}

function featuresBody(L) {
  const pre = P(L);
  const { modules, band, groups, deep, reports } =
    featuresSections({ L, pre, esc, T, icon, tick, picture, photo });
  return `
<main id="main">
${crumbs(L, "features")}
${pageHero(L, "features")}
${modules}
${band}
${groups}
${deep}
${reports}
${complianceBlock(L)}
${faqBlock(L, "features")}
${ctaBand(L)}
</main>`;
}

function pricingBody(L) {
  return `
<main id="main">
${crumbs(L, "pricing")}
${pageHero(L, "pricing")}

<section class="sec sec--tight">
  <div class="wrap wrap--wide">
    ${planCards(L)}
    <p class="small center rv" style="margin-top:26px;max-width:70ch">${esc(L === "ar"
      ? "كل الأسعار سنوية وغير شاملة ضريبة القيمة المضافة. تُضاف رسوم تثبيت لمرة واحدة قدرها ٣٠٠ ريال سعودي عند بدء التشغيل."
      : "All prices are annual and exclude VAT. A one-time setup fee of SAR 300 is added at onboarding.")}</p>
  </div>
</section>

<section class="sec sec--grad-b">
  <div class="wrap">
    <div class="grid grid--aside">
      ${costCalc(L)}
      ${addonNote(L)}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap wrap--wide">
    <div class="center stack rv" style="max-width:700px;margin-bottom:40px">
      <h2 class="h2">${esc(L === "ar" ? "ما الذي يتغيّر بين الباقات" : "What actually changes between packages")}</h2>
      <p class="lede">${esc(L === "ar"
        ? "الفرق الحقيقي ليس في عدد المزايا، بل في التكامل الحكومي وإدارة عدة منشآت."
        : "The real difference is not the feature count. It is government integration and multi-property control.")}</p>
    </div>
    ${planMatrix(L)}
  </div>
</section>

<section class="sec sec--forest">
  <div class="wrap">
    <div class="grid grid--split">
      <div class="stack rv">
        <span class="eyebrow">${esc(L === "ar" ? "كيف تختار" : "How to choose")}</span>
        <h2 class="h2" style="color:var(--brand-ink)">${esc(L === "ar" ? "اختر حسب الامتثال، لا حسب عدد الغرف" : "Choose on compliance, not on room count")}</h2>
        <p class="lede" style="color:var(--on-dark-soft)">${esc(L === "ar"
          ? "معظم المنشآت تختار الباقة الخطأ لأنها تحسب الغرف فقط. السؤال الأهم: ما الجهات التي يجب أن ترفع لها بياناتك؟"
          : "Most properties pick the wrong package because they count rooms. The better question is which authorities you must file data to.")}</p>
      </div>
      <div class="stack rv" data-rv="120">
        ${[
          [L === "ar" ? "منشأة واحدة تحت ١٠ وحدات" : "One property under 10 units",
           L === "ar" ? "ابدأ بـ ستارتر. مجانية، وتغطي الاستقبال والحجوزات والتقارير الأساسية." : "Start on Starter. It is free and covers front desk, reservations and basic reports."],
          [L === "ar" ? "منشأة واحدة حتى ١٠٠ وحدة" : "One property up to 100 units",
           L === "ar" ? "كور تضيف التدبير الفندقي والفوترة وإدارة الإيرادات ومحرك الحجز." : "Core adds housekeeping, invoicing, revenue management and the booking engine."],
          [L === "ar" ? "تحتاج شموس والسياحة أو عدة منشآت" : "You need Shomoos and Tourism, or several properties",
           L === "ar" ? "كونكت. تضيف الربط الحكومي والحجز المركزي وتكامل نقاط البيع." : "Connect. It adds government filing, central reservations and POS integration."],
          [L === "ar" ? "تحتاج زاتكا وموقعًا وربط القنوات" : "You need ZATCA, a website and channel connectivity",
           L === "ar" ? "برو. تضيف الفوترة الإلكترونية للمرحلة الثانية والموقع والربط بمواقع الحجز." : "Pro. It adds Phase 2 e-invoicing, your website and booking-site connectivity."]
        ].map(([t, d]) => `
        <div class="card card--forest">
          <h3 class="h4" style="color:var(--brand-ink)">${esc(t)}</h3>
          <p class="body" style="color:var(--on-dark-soft);margin-top:8px">${esc(d)}</p>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>

${faqBlock(L, "pricing")}
${ctaBand(L)}
</main>`;
}

function aboutBody(L) {
  const pre = P(L);
  const { intro, vm, partner, band, values, voices, closing } =
    aboutSections({ L, pre, esc, T, photo, statsBlock });
  return `
<main id="main">
${crumbs(L, "about")}
${pageHero(L, "about")}
${intro}
${vm}
${partner}
${band}

<section class="sec sec--forest">
  <div class="wrap">
    <div class="center stack rv" style="max-width:640px;margin-bottom:44px">
      <h2 class="h2" style="color:var(--on-dark)">${esc(L === "ar" ? "أثر حقيقي في السوق السعودي" : "Real effect in the Saudi market")}</h2>
    </div>
    ${statsBlock(L, true)}
  </div>
</section>

${values}
${voices}
${closing}
${faqBlock(L, "about")}
${ctaBand(L)}
</main>`;
}

function blogBody(L) {
  return `
<main id="main">
${crumbs(L, "blog")}
${pageHero(L, "blog")}

<section class="sec sec--tight">
  <div class="wrap">
    ${BLOG_TOPICS.map((topic, i) => `
    <section style="margin-bottom:56px">
      <div class="stack rv" style="margin-bottom:26px">
        <h2 class="h3">${esc(T(topic.t, L))}</h2>
        <p class="body">${esc(T(topic.d, L))}</p>
      </div>
      <div class="grid grid--3">
        ${topic.posts.map((post, j) => `
        <article class="card card--lift rv" data-rv="${j * 80}">
          <h3 class="h4" style="line-height:1.4">
            <a href="${SITE.blogRoot.replace("/blogs", "")}${post.url}" rel="noopener">${esc(T(post, L))}</a>
          </h3>
          <p class="small" style="margin-top:14px;color:var(--brand-deep);font-weight:700">${esc(T(UI.readMore, L))} →</p>
        </article>`).join("")}
      </div>
    </section>`).join("")}

    <div class="center rv">
      <a class="btn btn--primary" href="${SITE.blogRoot}" rel="noopener">${esc(T(UI.allPosts, L))}</a>
    </div>
  </div>
</section>

${ctaBand(L)}
</main>`;
}

function contactBody(L) {
  const a = SITE.address;
  return `
<main id="main">
${crumbs(L, "contact")}
${pageHero(L, "contact")}

<section class="sec sec--tight">
  <div class="wrap">
    <div class="grid grid--aside">

      <form class="card rv" id="lead" novalidate data-endpoint="${SITE.origin}/store/contact_us"
            style="padding:clamp(26px,3.6vw,42px)"
            action="${SITE.origin}/store/contact_us" method="post">
        <!-- spam trap: a real person never fills this, it is hidden from
             both the eye and the accessibility tree. Server must reject
             any submission where it is non-empty. -->
        <div class="hp" aria-hidden="true">
          <label for="company-url">${esc(L === "ar" ? "لا تملأ هذا الحقل" : "Leave this field empty")}</label>
          <input id="company-url" name="company_url" type="text" tabindex="-1" autocomplete="off">
        </div>
        <h2 class="h3" style="margin-bottom:24px">${esc(L === "ar" ? "أرسل لنا رسالة" : "Send us a message")}</h2>

        <div class="grid grid--2" style="gap:0 20px">
          <div class="field">
            <label for="name">${esc(L === "ar" ? "الاسم الكامل" : "Full name")}</label>
            <input id="name" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="email">${esc(L === "ar" ? "البريد المهني" : "Work email")}</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
        </div>

        <div class="grid grid--2" style="gap:0 20px">
          <div class="field">
            <label for="phone">${esc(L === "ar" ? "رقم الجوال" : "Mobile number")}</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr">
          </div>
          <div class="field">
            <label for="ptype">${esc(L === "ar" ? "نوع المنشأة" : "Property type")}</label>
            <select id="ptype" name="property_type">
              <option>${esc(L === "ar" ? "فندق أو منتجع" : "Hotel or resort")}</option>
              <option>${esc(L === "ar" ? "شقق مخدومة" : "Serviced apartments")}</option>
              <option>${esc(L === "ar" ? "شاليه أو وحدة سياحية" : "Chalet or tourist unit")}</option>
              <option>${esc(L === "ar" ? "أخرى" : "Other")}</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label for="units">${esc(L === "ar" ? "عدد الوحدات" : "Number of units")}</label>
          <input id="units" name="units" type="number" min="1" inputmode="numeric">
        </div>

        <div class="field">
          <label for="msg">${esc(L === "ar" ? "كيف يمكننا المساعدة؟" : "How can we help?")}</label>
          <textarea id="msg" name="message" rows="5"></textarea>
        </div>

        <button class="btn btn--primary" type="submit" style="width:100%" data-label="${esc(T(UI.demo, L))}">${esc(T(UI.demo, L))}</button>
        <p class="form__status" id="lead-status" role="status" aria-live="polite" hidden></p>
        <p class="small" style="margin-top:14px">${esc(L === "ar"
          ? "سنتواصل معك خلال يوم عمل واحد. لا رسائل ترويجية."
          : "We will get back to you within one business day. No marketing spam.")}</p>
      </form>

      <aside class="stack rv" data-rv="120">
        <div class="card card--glass">
          <h2 class="h4">${esc(L === "ar" ? "تواصل مباشر" : "Reach us directly")}</h2>
          <ul style="margin-top:18px;display:flex;flex-direction:column;gap:16px">
            <li>
              <p class="small" style="font-weight:700;color:var(--ink)">${esc(L === "ar" ? "الرقم الموحد" : "Unified number")}</p>
              <a class="num" href="tel:${SITE.phoneUnified}" style="font-size:18px;font-weight:700">${SITE.phoneUnified}</a>
            </li>
            <li>
              <p class="small" style="font-weight:700;color:var(--ink)">${esc(L === "ar" ? "واتساب" : "WhatsApp")}</p>
              <a class="num" dir="ltr" href="https://wa.me/${SITE.whatsapp}" rel="noopener"
                 style="font-size:18px;font-weight:700">${SITE.phone}</a>
            </li>
            <li>
              <p class="small" style="font-weight:700;color:var(--ink)">${esc(L === "ar" ? "ساعات العمل" : "Working hours")}</p>
              <p class="small">${esc(T(SITE.hours, L))}</p>
            </li>
            <li>
              <p class="small" style="font-weight:700;color:var(--ink)">${esc(L === "ar" ? "المقر" : "Head office")}</p>
              <address class="small" style="font-style:normal">
                ${esc(T(a.street, L))}<br>${esc(T(a.city, L))} ${a.postal}<br>${esc(L === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia")}
              </address>
            </li>
          </ul>
          <a class="btn btn--primary btn--sm" style="margin-top:22px;width:100%"
             href="https://wa.me/${SITE.whatsapp}" rel="noopener">${esc(T(UI.whatsapp, L))}</a>
        </div>
      </aside>

    </div>
  </div>
</section>

${faqBlock(L, "contact")}
</main>`;
}

/* ---- legal pages: real structure, content marked for legal review ---- */
function legalBody(L, key) {
  const isPrivacy = key === "privacy";
  const secs = isPrivacy
    ? (L === "ar"
      ? [["البيانات التي نجمعها", "نجمع بيانات الحساب والمنشأة التي تزوّدنا بها، وبيانات النزلاء التي تُدخلها في النظام لأغراض التشغيل والامتثال النظامي، إضافة إلى بيانات الاستخدام التقنية."],
         ["كيف نستخدم البيانات", "تُستخدم البيانات لتشغيل الخدمة، والوفاء بالمتطلبات النظامية أمام الجهات المختصة مثل هيئة الزكاة والضريبة والجمارك ومنصة شموس ووزارة السياحة، ولتحسين المنصة وتقديم الدعم الفني."],
         ["مشاركة البيانات", "لا تُباع البيانات. تُشارك فقط مع الجهات الحكومية بحكم المتطلبات النظامية، ومع مزودي الخدمات التقنية اللازمين لتشغيل المنصة، وفق اتفاقيات حماية بيانات."],
         ["حماية البيانات", "تُخزَّن البيانات على خوادم آمنة مع تشفير لملفات النزلاء، وتحقق آلي من الهوية، وضوابط وصول حسب الصلاحية."],
         ["الاحتفاظ بالبيانات", "يُحتفظ بالبيانات للمدة التي تقتضيها المتطلبات النظامية والتشغيلية، ثم تُحذف أو تُجهَّل."],
         ["حقوقك", "يحق لك الوصول إلى بياناتك وتصحيحها وطلب تصديرها أو حذفها ضمن ما تسمح به الأنظمة السعودية ذات العلاقة."],
         ["التواصل", "لأي استفسار يتعلق بالخصوصية، تواصل معنا عبر الرقم الموحد أو نموذج التواصل."]]
      : [["Data we collect", "We collect the account and property data you provide, the guest data you enter into the system for operational and regulatory purposes, and technical usage data."],
         ["How we use data", "Data is used to operate the service, to meet regulatory obligations to authorities such as ZATCA, the Shomoos platform and the Ministry of Tourism, and to improve the platform and provide support."],
         ["Data sharing", "We do not sell data. It is shared only with government authorities where regulation requires it, and with the technical service providers necessary to run the platform, under data protection agreements."],
         ["Data protection", "Data is stored on secure servers with encryption of guest profiles, automated identity verification, and role-based access controls."],
         ["Data retention", "Data is retained for as long as regulatory and operational requirements demand, then deleted or anonymised."],
         ["Your rights", "You may access, correct, export or request deletion of your data, within what the applicable Saudi regulations permit."],
         ["Contact", "For any privacy enquiry, contact us on the unified number or through the contact form."]])
    : (L === "ar"
      ? [["قبول الشروط", "باستخدامك منصة فندقة فإنك توافق على هذه الشروط وعلى سياسة الخصوصية المرتبطة بها."],
         ["الاشتراك والرسوم", "تُحدَّد قيمة الاشتراك حسب نوع المنشأة وعدد الوحدات والإضافات. تُطبَّق رسوم تركيب لمرة واحدة قدرها ٣٠٠ ريال سعودي، وتُضاف ضريبة القيمة المضافة ١٥٪ على الإجمالي."],
         ["استخدام الخدمة", "تلتزم باستخدام المنصة للأغراض المشروعة المتعلقة بتشغيل منشأتك، وبعدم إساءة استخدام الوصول أو محاولة اختراق النظام."],
         ["بيانات النزلاء", "أنت المسؤول عن صحة بيانات النزلاء المُدخلة وعن التزامك بالمتطلبات النظامية المتعلقة بها، وتوفّر المنصة أدوات الرفع والامتثال."],
         ["التوفّر والدعم", "نسعى لتوفّر تشغيلي مرتفع مع دعم فني على مدار الساعة للمشتركين، وقد تحدث فترات صيانة مجدولة يُعلَن عنها مسبقًا."],
         ["إنهاء الخدمة", "يجوز لأي من الطرفين إنهاء الاشتراك وفق الشروط التعاقدية المتفق عليها، مع إتاحة تصدير بياناتك."],
         ["القانون الواجب التطبيق", "تخضع هذه الشروط لأنظمة المملكة العربية السعودية."]]
      : [["Acceptance of terms", "By using the Fandaqah platform you agree to these terms and to the associated privacy policy."],
         ["Subscription and fees", "Subscription value is determined by property type, unit count and add-ons. A one-time setup fee of SAR 300 applies, and 15% VAT is added to the total."],
         ["Use of the service", "You agree to use the platform for lawful purposes related to operating your property, and not to misuse access or attempt to compromise the system."],
         ["Guest data", "You are responsible for the accuracy of guest data entered and for your regulatory obligations relating to it; the platform provides the filing and compliance tooling."],
         ["Availability and support", "We aim for high operational availability with 24/7 technical support for subscribers. Scheduled maintenance windows may occur and are announced in advance."],
         ["Termination", "Either party may terminate the subscription under the agreed contractual terms, with your data made available for export."],
         ["Governing law", "These terms are governed by the laws of the Kingdom of Saudi Arabia."]]);

  return `
<main id="main">
${crumbs(L, key)}
${pageHero(L, key)}

<section class="sec sec--tight">
  <div class="wrap wrap--read">
    <div class="card rv" style="padding:clamp(26px,3.6vw,48px);background:var(--notice-bg);border-color:var(--notice-line)">
      <p class="small" style="color:var(--notice-ink)"><strong>${esc(L === "ar" ? "ملاحظة:" : "Note:")}</strong>
      ${esc(L === "ar"
        ? "هذه صياغة هيكلية جاهزة للمراجعة القانونية، وضعت لتعكس ممارسات المنصة الفعلية. يجب اعتمادها من مستشاركم القانوني قبل النشر."
        : "This is a structural draft prepared to reflect the platform's actual practices. It must be reviewed and approved by your legal counsel before publication.")}</p>
    </div>

    <div class="stack" style="margin-top:36px">
      ${secs.map((s, i) => `
      <section class="rv" data-rv="${i * 40}" style="margin-bottom:12px">
        <h2 class="h4" style="margin-bottom:10px">${esc(s[0])}</h2>
        <p class="body">${esc(s[1])}</p>
      </section>`).join("")}
      <p class="small" style="margin-top:28px">${esc(L === "ar" ? "آخر تحديث: " : "Last updated: ")}${new Date().toISOString().slice(0, 10)}</p>
    </div>
  </div>
</section>
</main>`;
}

/* ---------- assembly ---------- */
const BODIES = {
  home: homeBody, features: featuresBody, pricing: pricingBody,
  about: aboutBody, blog: blogBody, contact: contactBody,
  privacy: L => legalBody(L, "privacy"), terms: L => legalBody(L, "terms")
};

function extraLd(L, key) {
  const out = [];
  if (key === "home") out.push(orgLd(L), softwareLd(L));
  if (key === "about" || key === "contact") out.push(localBusinessLd(L));
  if (key === "blog") out.push(blogLd(L));
  if (key === "pricing") out.push(offersLd(L));
  const f = faqLd(L, key);
  if (f) out.push(f);
  return out;
}

function build() {
  const keys = Object.keys(PAGES);
  let n = 0;

  for (const L of LANGS) {
    for (const key of keys) {
      const html = head(L, key, extraLd(L, key)) + header(L, key) + BODIES[key](L) + footer(L);
      const out = L === "en"
        ? join(ROOT, "en", PAGES[key].file)
        : join(ROOT, PAGES[key].file);
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, html, "utf8");
      n++;
    }
  }

  /* sitemap */
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const key of keys) {
    for (const L of LANGS) {
      urls.push(`  <url>
    <loc>${abs(L, key)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${key === "home" || key === "blog" ? "weekly" : "monthly"}</changefreq>
    <priority>${key === "home" ? "1.0" : key === "privacy" || key === "terms" ? "0.3" : "0.8"}</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${abs("ar", key)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs("en", key)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs("ar", key)}"/>
  </url>`);
    }
  }
  /* Preserve the 370 existing blog URLs. Shipping a 16-URL sitemap over
     the live one would drop every post from the index. */
  let blogCount = 0;
  try {
    const raw = readFileSync(join(ROOT, "build", "blog-urls.txt"), "utf8");
    for (const u of raw.split(String.fromCharCode(10)).map(x => x.trim()).filter(Boolean)) {
      blogCount++;
      urls.push(`  <url>
    <loc>${u.replace(/&/g, "&amp;")}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }
  } catch { /* no blog list present: core pages only */ }

  writeFileSync(join(ROOT, "sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`, "utf8");

  /* robots */
  writeFileSync(join(ROOT, "robots.txt"),
`# robots.txt for fandaqah.com
User-agent: *
Allow: /
Disallow: /app/
Disallow: /api/
Disallow: /auth/
Disallow: /*?*utm_
Disallow: /*?ref=

# AI answer engines are welcome to read and cite the public pages.
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`, "utf8");

  /* llms.txt — the GEO layer: a clean, citable summary for AI answer engines */
  writeFileSync(join(ROOT, "llms.txt"),
`# Fandaqah (فندقة)

> Fandaqah is a Saudi cloud hospitality management platform for hotels, serviced
> apartments, resorts and chalets. It combines a Property Management System (PMS),
> a channel manager and a direct booking engine in one system, with native
> integration to Saudi government platforms.

## Company
- Legal name: ${SITE.legal.en} (${SITE.legal.ar})
- Head office: ${SITE.address.street.en}, ${SITE.address.city.en} ${SITE.address.postal}, Saudi Arabia
- Unified phone: ${SITE.phoneUnified} · WhatsApp: ${SITE.phone}
- Hours: ${SITE.hours.en}
- Languages: Arabic and English (full RTL interface, reports and support)

## Verified scale
- 800+ partner hotels and properties
- 250,000+ bookings processed
- 15 system integrations
- 92% customer satisfaction
- 99.9% operational efficiency; 24/7 technical support

## What makes it distinct
Native compliance with Saudi regulation, built in rather than added on:
- ZATCA (Zakat, Tax and Customs Authority): Phase 2 e-invoicing, automatic 15% VAT
- Ministry of Tourism: automatic filing to the National Tourism Monitoring Platform
- Shomoos platform: guest registration and identity verification
- Balady platform: disclosure reporting

## Core products
${PRODUCTS.map(p => `- ${p.t.en}: ${p.d.en}`).join("\n")}

## Notable capabilities
${FEATURES.map(f => `- ${f.t.en}`).join("\n")}

## Pricing
- One-time setup fee: SAR 300
- VAT: 15% added to the total
- Subscription: set by property type, unit count and add-ons; quote on request
- A free trial is available with no credit card

## Pages
${LANGS.flatMap(L => Object.keys(PAGES).map(k => `- ${abs(L, k)} (${L})`)).join("\n")}

## Blog
370+ articles on Saudi hotel operations, ZATCA compliance, Shomoos integration,
revenue management and direct bookings: ${SITE.blogRoot}
`, "utf8");

  console.log(`pages written : ${n}  (${keys.length} × ${LANGS.length})`);
  console.log(`  ar → /            ${keys.map(k => PAGES[k].file).join(", ")}`);
  console.log(`  en → /en/         same set`);
  console.log(`sitemap.xml   : ${urls.length} urls (${urls.length - blogCount} core with hreflang + ${blogCount} blog posts preserved)`);
  console.log(`robots.txt    : written (AI crawlers allowed)`);
  console.log(`llms.txt      : written`);
}

build();
