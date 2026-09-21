# Fandaqah — DESIGN_UPDATE.md

Rebuild of the Fandaqah hospitality-technology website: bilingual Arabic/English,
a strict five-colour palette, a scroll-driven product story, and a generated page
set with SEO, AEO and GEO structure.

| | |
|---|---|
| **Local URL** | `http://localhost:4700/` (Arabic root) · `http://localhost:4700/en/` (English) |
| **Serve with** | `node <scroll-craft>/scripts/serve.mjs --root . --port 4700` |
| **Rebuild with** | `node build/build.mjs` (pages, sitemap, robots, llms.txt) |
| **Rebuild images** | `node build/images.mjs` (needs ffmpeg with libwebp) |
| **Pages** | 16 (8 templates × 2 languages) |
| **Old version** | preserved, not deleted — see §17 |

---

## 1. Executive summary

The old local page (`fandaqah-landing.OLD.html`) was a single marketing file whose
headline figures did not appear anywhere on fandaqah.com: 2,400 properties, 12
countries, offices in Riyadh, Dubai and Cairo, and $39–239 pricing. Publishing any
of it would have been a factual claim the company could not stand behind. Every
number on the new site traces to a page on the live site or to the live checkout
(§16).

What changed:

- **One source of content, sixteen generated pages.** Content lives in
  `build/content.mjs`; `build/build.mjs` wraps it in layout, head tags and
  structured data. Head tags, hreflang pairs and footers cannot drift apart
  because nothing is hand-edited per page.
- **A palette that survives contact with accessibility.** The five brand colours
  cannot be used naively — beige on pure coral measures 3.05:1 and fails AA body
  text. The system derives shades from mixes of two palette colours rather than
  importing a sixth hue. 1,282 rendered text runs measured, zero failing pairs.
- **A scroll story that carries the product.** Six pinned steps follow one booking
  from channel to night audit, each with a small operational readout: channel
  sync, document scan, compliance chips, a housekeeping board, a ZATCA invoice,
  occupancy bars. All built from markup and CSS, no images.
- **Real interaction, not mockups.** A working cost calculator, a validating lead
  form with busy and result states, a native-`<details>` FAQ, a keyboard-operable
  story rail, an Escape-closable mobile drawer.
- **Performance.** The largest-contentful image went from a 1.82 MB PNG to a 42 kB
  WebP. Home-page image payload fell from ~328 kB to 135 kB.

---

## 2. Existing website audit

### The old local page

| Problem | Evidence |
|---|---|
| Invented statistics | 2,400 properties / 12 countries / three offices. None on fandaqah.com |
| Invented pricing | $39–239 tiers; the real checkout sells SAR 1,200–3,000 annual plans |
| Single language | No Arabic, for a company whose market and product are Arabic-first |
| One file | 169 KB of hand-maintained HTML with no content/layout separation |

### The live site, fandaqah.com

Audited for content, not for styling: page set, real figures, real plan data
(rendered from the client-side checkout, since the plans are not in the served
HTML), contact details, feature descriptions, and the 370 existing blog URLs.

### Competitive scan

Cloudbeds, ntouch, roomMaster and Mews (measurements captured in `prompt.txt` and
`design.md`) ship substantially the same page: logo wall, three-column values,
feature grid, footer, and a *photograph* of a dashboard inside marketing chrome.
None asks the visitor to follow anything. That gap is the reason this build
carries a pinned narrative (§6) rather than another feature grid.

---

## 3. New design strategy

**Editorial luxury meets an operations console.** Large Arabic-first display type,
a warm beige ground rather than white, navy grounds for the passages that carry
the argument, and coral used as a structural accent rather than a wash.

Three decisions shaped the rest:

1. **The ground is darker than the cards.** Page ground `#EDEAE3`, cards
   `#F6F3EE`. That inversion lets surfaces separate without a sixth colour and
   without relying on heavy shadows.
2. **Arabic is not Latin re-set.** Different weights, different leading, tracking
   reset to zero (§4).
3. **The product appears as interface, not photography.** Competitors show
   screenshots; this build draws small live readouts in markup, so they stay
   sharp, translatable, weightless and themable.

---

## 4. Brand system

### Colour

The five brand colours, used exactly:

| Token | Hex | Role |
|---|---|---|
| Coral Red | `#e95a54` | Fills, icons, rules, large display type, active states |
| Dark Navy | `#2a273c` | Primary ink, dark grounds, footer, table heads |
| Soft Beige | `#f2f0eb` | Card surfaces, light ink on dark |
| Muted Green | `#8f9793` | Muted labels, decorative marks |
| Light Peach | `#fbcdab` | Figures on dark, warm washes, secondary emphasis |

**There is no white, no black and no imported grey in the stylesheet.** Every
other value is a mix of two palette colours, and each is annotated in
`assets/css/fandaqah.css` with the mix that produced it and its measured ratio.

#### The contrast problem the palette creates

Measured in sRGB:

| Pair | Ratio | Verdict |
|---|---|---|
| Beige on pure coral | 3.05:1 | fails AA body (needs 4.5) |
| Navy on pure coral | 4.15:1 | fails AA body |
| Muted green on beige | 2.63:1 | fails AA body |
| Pure coral on beige | 2.89:1 | fails even AA large (needs 3) |

Shipping beige-on-coral buttons would have failed accessibility on every page.

#### The fix: shades, not new hues

| Token | Hex | Derivation | Measured |
|---|---|---|---|
| `--brand-strong` | `#A8433F` | coral → navy ~70% | 4.96:1 with beige ink — buttons |
| `--brand-text` | `#D75552` | coral → navy ~90% | 3.26:1 on beige — large headings |
| `--ink-soft` | `#585A63` | green → navy ~45/55 | 6.0:1 on beige — secondary body |
| `--on-dark-soft` | `#C6C9C4` | green → beige 56% | 8.74:1 on navy — body on dark |
| `--on-dark-dim` | `#ADB2AD` | green → beige 30% | 6.72:1 on navy — labels on dark |
| `--notice-bg` / `--notice-ink` | `#F5E3D3` / `#6B2B26` | peach → beige 62% / coral → navy | 8.4:1 — review banners |

Pure `#e95a54` is retained wherever 3:1 suffices: icon fills, borders, the active
step dot, the progress thread, large display type.

#### Where the palette does not reach

The five-colour rule governs the **design system**: every surface, rule, border,
shadow, text colour and drawn graphic on the site. It does not repaint Fandaqah's
own photography and illustrations. The hero photograph and the product-card
illustrations are real assets from fandaqah.com and carry their own colours,
including the blues and greens inside the screenshot in the hero image. Recolouring
a brand's existing artwork to force palette compliance would be a worse outcome
than admitting the boundary. If those assets are ever reshot or redrawn, the
palette is the brief for them.

### Imagery

The home page carries five editorial photographs, sourced from **Pexels** under
a licence that permits commercial use without attribution. Provenance, the
rejected candidates and the replacement procedure are recorded in
`assets/site/photos/CREDITS.md`.

**They are not Fandaqah photography.** They are generic illustration of property
types and of the Saudi market, and nothing in the copy or the alt text implies
they show Fandaqah customers, properties or staff.

| Photograph | Where | Why this one |
|---|---|---|
| Modern hotel lobby, staffed reception | "Hotels & Resorts" card | The front desk is literally what the PMS runs |
| Corridor of units | "Serviced Apartments" card | Reads as unit inventory rather than a single room |
| Chalet pool terrace | "Chalets & Tourist Units" card | Leisure and seasonality, the tier's actual driver |
| Kingdom Centre, Riyadh | The editorial band | An unambiguous Saudi anchor for the market claim |
| Gulf resort pool | The closing band | Warmth under the final call to action |

Two candidates were rejected on purpose: an apartment tower (cold cast, poor
crop) and a close portrait of hospitality staff (an identifiable individual with
no connection to Fandaqah, which would read as an implied endorsement).

Images from a general web image search were **not** used. Almost all of them are
someone else's copyrighted work, and `prompt.txt` §4 forbids presenting
copyrighted assets as Fandaqah's own.

#### How a photograph is pulled into the palette

Two layers, both `aria-hidden` decoration:

1. **A colour treatment** — palette navy at low opacity with
   `mix-blend-mode: multiply`, so the photographs read as one family rather than
   five unrelated stock shots.
2. **A scrim where the text sits**, never a sheet across the whole frame. The
   editorial band puts its scrim on the text block and fades it across that
   block's top padding, so there is no horizontal seam. The closing band uses a
   radial scrim centred on the copy, so the photograph keeps its corners.

Crops are decided at build time, not by the browser. `build/photos.mjs` carries a
per-photograph `focus` value because a centred crop threw away the subject in two
of them: the Kingdom Centre's arch sits high in a portrait frame, and the
resort's waterline sits below the middle.

### Typography

| Role | Family | Size | Weight |
|---|---|---|---|
| Display | DM Sans | `clamp(34px, 5.6vw, 60px)` | 300 Latin / 500 Arabic |
| Section head | DM Sans | `clamp(30px, 4.4vw, 43px)` | 700 |
| Body | DM Sans | 16px / 24px | 400 |
| Arabic | IBM Plex Sans Arabic | same scale | 400–700 |

Arabic takes its own weights (Latin 300 reads anaemic in a connected script), its
own line height (1.24 against 1.06 — Arabic needs leading for ascenders and
diacritics), and letter-spacing reset to `0`, because tracking is meaningless
where letters join. Weight 300 is therefore **not requested** for the Arabic face.

### Spacing, shape, depth

- Spacing tokens `--s1` … `--s7`, not arbitrary steps.
- Radii 5 / 6 / 12 / 32 px, from the measured reference in `design.md`.
- Three surface levels: ground → card → floating chip, separated by tone first and
  layered, colour-tinted shadow second. No flat drop shadows.
- Motion: `transform` and `opacity` only. No `transition: all` anywhere.

---

## 5. Information architecture

```
/                       Arabic (root)        /en/                  English
  index.html      Home                         index.html
  features.html   Product & compliance         features.html
  pricing.html    Packages & real cost         pricing.html
  about.html      Company                      about.html
  blog.html       Insights index               blog.html
  contact.html    Contact & demo request       contact.html
  privacy.html    Privacy (draft)              privacy.html
  terms.html      Terms (draft)                terms.html
```

**Why eight templates and not thirty.** The source prompt lists candidate pages
for every product module, segment and resource type. The live site does not have
the content to fill them, and the integrity rule in §30 of that prompt forbids
inventing it. Thirty thin pages would compete with each other in search and give
a visitor less, not more. The modules, segments and integrations are therefore
sections within `features.html` and the home page, each with its own heading and
anchor, and the structure is ready to promote any of them to a page once real
content exists. What is deliberately **not** built is listed in §17.

Navigation: Features · Pricing · About · Blog · Contact, plus a persistent
language switch and a primary "start free trial" action. The footer repeats the
set in three labelled columns.

---

## 6. Page-by-page specification

### Home (`/`, `/en/`)

- **Purpose** — establish what Fandaqah is, that it is Saudi-compliant, and move
  the visitor to a trial or a demo.
- **Target user** — an owner or general manager of a hotel, serviced-apartment
  block or resort in Saudi Arabia, evaluating a replacement for spreadsheets or a
  non-compliant system.
- **Sections** — hero with overlapping stat chip → compliance and integration →
  platform modules → **the Riyadh band** → the Fandaqah edge plus verified
  figures → segments (photographic) → **the scroll story** → channel manager →
  FAQ → photographic CTA band → footer.
- **Rhythm** — the band exists to break the longest run of card grids. The page
  now alternates photograph, cards, cards, photograph, dark cards, photographic
  cards, story, dark, FAQ, photographic close, rather than running six card
  sections together.
- **CTA** — primary "start free trial" (the live app), secondary "request a demo"
  (contact).
- **SEO** — targets *نظام إدارة فنادق*, *PMS سعودي*, *ربط شموس*, *فوترة زاتكا*.
  Carries `Organization`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`.
- **UX behaviour** — reveals on scroll, a pinned six-step story, a mobile drawer.
  All of it degrades (§11).

#### Hero depth

The hero is composed in four planes: a warm wash furthest back, a peach halo
behind the photograph, the photograph, and the figure chip nearest the viewer.
The JavaScript publishes **one** number as `--hp` (0 at the top of the page, 1
once the hero has scrolled past) and the stylesheet derives each plane's travel
from it, so a scroll frame writes a single custom property rather than styling
four elements. Movement is `transform` only. Measured separation over a 420 px
scroll: halo −27.9 px, photograph −11.4 px, chip −39.3 px. On a phone the chip
sits in normal flow beneath the photograph and nothing parallaxes, because
detaching it there would only separate it from its own caption. Under
`prefers-reduced-motion`, and with no JavaScript at all, `--hp` stays 0 and the
composition is the static one.

#### The scroll story

A pinned stage spanning six viewport heights. Scroll drives one booking through
**lands → guest arrives → data filed → operations run → invoice issues → day
closes**. A step rail on one side, a readout panel on the other, a coral thread
tracking progress.

Mechanics:

- Progress is published as a CSS custom property `--p` on the section; the thread
  height is `calc(var(--p) * …)`, so CSS draws it with no per-frame JS style
  writes.
- Panel swaps are `opacity` and `transform` only.
- The scroll handler is rAF-throttled and `passive: true`.
- Steps are `role="button"`, `tabindex="0"`, answer Enter and Space, and scroll to
  their slice of the span.
- Each panel carries a readout drawn in markup and CSS. They are `aria-hidden`
  decoration; the adjacent copy carries the meaning, so nothing is communicated by
  the graphic alone.
- Under `prefers-reduced-motion` the JS never runs and the stylesheet stacks all
  six panels as static readable blocks. Without JS, the same.

### Features

Rebuilt from a wall of twelve identical icon cards into a page with hierarchy.
**1,579 words, up from 1,079.**

- **Three lead modules** — PMS, Channel Manager, Website & Booking Engine —
  each an alternating block with its own capability list and an **interface
  readout drawn in markup and CSS**: a front-desk board with unit statuses and
  occupancy, a channel sync panel with rates, and a direct-booking widget.
  The published module artwork is *illustration*, not a product capture, and it
  read as clip-art when scaled into a feature block; the readouts use the same
  visual language as the home page story, cost no requests and cannot shift
  layout. They are `aria-hidden`; the copy beside them carries the meaning.
- **A short editorial band** on the reception photograph.
- **Six capability groups** carrying the complete published list, not a curated
  extract: automation, property management, operations, communication and
  support, reports and analytics, integrations.
- **Four deep features** on the navy ground, each with the full published
  description: the instant document scanner, the fast check-in reader, tablet
  e-signature, and guest reviews.
- **The reports list**, named rather than summarised, because a hotel finance
  team recognises "الإفصاح الشهري لمنصة بلدي" and "حركة الصندوق" by name.
- Compliance block, six FAQs, CTA. `FAQPage` + `BreadcrumbList`.

### Pricing

Four real plans, a **21-row comparison matrix**, and a **working cost
calculator** — the store publishes an ex-VAT figure, which is not what anyone
pays, so the page computes base + SAR 300 setup + 15% VAT. Verified totals:
Starter 345.00, Core 1,725.00, Connect 2,622.00, Pro 3,795.00. `Product` with four
`Offer` entries and `UnitPriceSpecification` (`valueAddedTaxIncluded: false`).

| Package | Annual, ex-VAT | Units | Government integrations |
|---|---|---|---|
| ستارتر / Starter | Free | up to 10 | – |
| كور / Core | SAR 1,200 | 100 | – |
| كونكت / Connect | SAR 1,980 | flexible | Shomoos 1yr, Tourism 1yr, 500 SMS |
| برو / Pro | SAR 3,000 | flexible | + ZATCA Phase 2 1yr, website, 1,000 SMS |

### About

Rebuilt from a 649-word stub into the company's actual story. **1,097 words.**

- **Who we are**, with the team photograph and a fact list: founded 2019,
  head office Al Khobar, registered as Fandaqah Information Technology Company.
- **Vision and mission**, given equal weight as two cards rather than one being
  a footnote. Both are the company's own published statements.
- **"Why that matters"** — a pull statement on the Diyafa partnership, which is
  the real differentiator: the team writing the system sees the result of its
  decisions inside a property that is actually running.
- **The Jeddah Al-Balad band** — "سوق واحد نعرفه جيدًا" / "One market, known
  properly".
- **Five values** with their published descriptions, in a five-column row so the
  set does not leave an orphan pair.
- The verified figures.
- **Ten customer testimonials** (see below).
- The company's closing statement, six FAQs, CTA.
  `ProfessionalService` with address and opening hours.

#### Testimonials

The build previously shipped no testimonials because none could be verified.
They exist: fandaqah.com publishes ten, with names and job titles, inside a
JavaScript carousel that the served HTML does not contain. They were recovered
by rendering the page and reading each slide container as a unit, so every
quotation stays attached to the person who gave it. Parsing the static HTML
would have paired them wrongly, which is worse than omitting them.

The Arabic is reproduced verbatim, punctuation included. The English is a
translation of that Arabic, marked as such in `build/content-extra.mjs`. No
company or property name is attached to any of them on the source site, so none
is added here.

### Blog

Rebuilt as a **working archive tool**, not a feed. **2,972 words, 184 cards.**

Fandaqah publishes **370 posts, 185 Arabic and 185 English**, as bilingual pairs.
They live on fandaqah.com (`/blogs/` for Arabic, `/en/blogs/` for English) and are
not being moved, so this page indexes them rather than copying them. The previous
version showed nine hand-picked posts and a "see all" button, which left 361
articles unreachable from the site.

#### Competitor scan

| Pattern | Mews | SiteMinder | Cloudbeds | Taken |
|---|---|---|---|---|
| Search | yes | no | yes | **yes** |
| Topic filter rail | yes (content type + tags) | no | no | **yes, as chips with counts** |
| Topic-clustered hubs | no | **yes** ("Read more on ai", "…on hotel distribution") | no | folded into the chips |
| Featured lead article | yes, 2-up | yes, "latest" | — | **yes, one** |
| Read time on cards | yes | no | — | **no** (see integrity below) |

Cloudbeds returned a 403 to a headless browser and renders its index client-side,
so only its search could be confirmed. SiteMinder's topic hubs were the most
useful idea in the set: an archive this size needs to be entered by subject, not
scrolled. Mews's persistent filter rail solves the same problem more directly, so
the build uses chips carrying live counts rather than a static hub per topic.

#### How it works

- **The entire archive for the current language is rendered server side.** With
  scripts off, all 184 cards are present, linked and crawlable, and the search and
  pager simply hide themselves. Nothing is gated behind JavaScript.
- With scripts on, the same markup is filtered by topic and by a text search, and
  paged 24 at a time. Filtering toggles the `hidden` attribute; it never
  re-renders, so no link is ever destroyed and no layout is rebuilt.
- The Arabic search **folds orthographic variants** (diacritics, tatweel,
  alef/yaa/taa-marbuta spellings), so "زاتكا" matches regardless of how a title
  happens to be written.
- The lead article is chosen by rule, not by hand: a title that announces a
  complete guide, in compliance or technology, longest as the tie-break. Picking
  purely by length surfaced a landing-page slogan, so the guide marker was added.

#### Content integrity on this page

The page states in its own body that **topics are inferred from titles rather
than hand-curated**, because they are: `build/blog-index.json` is produced by
keyword rules over the real slugs, not by editorial metadata. Nine topics, no
orphan category.

There are **no dates and no read times** on the cards. Both would have looked
better and neither can be known from a published URL, so neither is asserted.
There are also **no per-post thumbnails**: 370 unrelated stock images would be
dishonest padding and would ruin the page weight. Photography appears where it
carries meaning, on the lead article and the band.

### Contact

The lead form (§15), direct channels, address and hours.
`ProfessionalService` + `FAQPage`.

### Privacy and Terms

Structural drafts carrying a visible review banner. They describe actual platform
practice but are not a substitute for counsel (§17).

---

## 7. Component system

| Component | Where | Notes |
|---|---|---|
| Sticky glass header, RTL-aware nav | all | logical properties throughout |
| Mobile drawer | all | Escape-closable, returns focus to the trigger |
| Hero + overlapping stat chip | home | responsive `<picture>`, preloaded |
| Product / compliance / segment cards | home, features | one `picture()` helper |
| Forest section (navy ground) | home, features, pricing, about | |
| **Scroll story** + six readouts | home | `data-story`, CSS-driven |
| Plan cards, comparison matrix, calculator | pricing | real published figures |
| FAQ accordion | 5 pages | native `<details>`, works with JS off |
| Lead form | contact | validation, busy, success, failure, spam trap |
| Breadcrumbs, CTA band, 4-column footer | all | |

Every raster image goes through one `picture()` helper in `build/build.mjs`: it
emits `<picture>` with a WebP source and the original as fallback, and returns a
plain `<img>` unchanged if the WebP is not on disk. No page hand-writes an image
tag.

---

## 8. SEO strategy

- **Titles** — `<primary term> | <qualifier>`, unique per page per language, all
  length-checked to render fully in SERPs (verified ≤ 62 characters).
- **Metadata** — unique description (70–165 characters, enforced by
  `build/verify.mjs`), canonical, Open Graph with `og:locale:alternate`, Twitter
  summary card, `geo.region SA-04`.
- **Bilingual** — a separate crawlable URL per language, with `hreflang` ar / en /
  x-default on all 16 pages.
- **Structure** — exactly one `<h1>` per page, no skipped heading levels
  (verified), breadcrumbs on every page, alt text on every image.
- **Sitemap** — `sitemap.xml` carries **386 URLs**: the 16 core pages plus the 370
  existing blog posts. A 16-URL sitemap would have dropped every post.
- **Icons** — `favicon.ico`, 180/192/512 px PNGs and `site.webmanifest`.
- **Schema** — `Organization`, `SoftwareApplication`, `ProfessionalService`,
  `Product` + `Offer` + `UnitPriceSpecification`, `FAQPage`, `Blog`,
  `BlogPosting`, `BreadcrumbList`. Nothing is asserted that the page does not
  show.

---

## 9. AEO strategy

- **18 FAQs** across five pages, each answering in its first sentence, then
  elaborating. That first sentence is written to survive extraction on its own.
- Question-shaped headings where the section genuinely answers a question.
- Explicit definitions rather than allusions: "فندقة هو نظام سحابي سعودي…" names
  the category, the market and the compliance surface in one sentence.
- Every FAQ emits `FAQPage` structured data with matching visible text.
- Facts are given as text, never baked into an image.

---

## 10. GEO strategy

- `llms.txt` — a clean, citable summary for AI answer engines: company facts,
  verified scale, compliance differentiators, products, pricing, page list.
- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot
  and Google-Extended.
- **Entity clarity.** ZATCA, Shomoos, Ministry of Tourism, Balady, Mada and
  ClickPay are named in prose, with the relationship stated ("integrated with",
  not "partnered with"), so a model can resolve both the entity and the claim.
- Geography appears where it is true: Al Khobar address, Eastern Province,
  Saudi-wide product. Cities the company has no presence in are not seeded.

---

## 11. Accessibility

Target: WCAG 2.2 AA where practical.

| Decision | Detail |
|---|---|
| Contrast | 1,282 rendered runs measured against *effective* backgrounds; 0 failures |
| Focus | Keyboard focus keeps a real `outline`, not only a box-shadow — a shadow-only ring vanishes in forced-colors mode. A `forced-colors` block falls back to `Highlight` |
| Targets | All interactive targets ≥ 24 px on a 390 px viewport (WCAG 2.5.8). Footer links measured 21 px and were padded |
| Headings | No skipped levels on any of the 16 pages. The pricing plan group carries a screen-reader-only `<h2>` so the plan `<h3>`s do not jump from the `<h1>` |
| Landmarks | One `<main>`, plus header, nav and footer, on every page |
| Labels | Every control has an accessible name; every link and button has discernible text |
| Motion | `prefers-reduced-motion` disables the story driver and the scan animation, and stacks the panels |
| Skip link | First focusable element, reveals on focus |
| Anchors | `scroll-padding-top: 92px` so a deep link does not land under the sticky header |
| Decoration | The six readouts and every photographic tint and scrim are `aria-hidden`; meaning is always in adjacent text |
| Text on photographs | Graded against the **composited pixels**, not a declared background. `build/photocontrast.mjs` renders each photographic section with the glyphs made transparent, samples the real backdrop under every text run and grades the worst sample. 40 runs, 0 failures |
| RTL | Logical properties throughout. The one deliberate exception is the FAQ chevron, drawn with physical borders so it points **down** in both scripts — logical properties mirrored it sideways under `dir="rtl"` |

---

## 12. Performance

| Measure | Before | After |
|---|---|---|
| LCP image | `about-photo.png`, **1.82 MB** | `about-photo-960.webp`, **42 kB** |
| Home image payload | ~328 kB | **135 kB** |
| Home total (en) | ~476 kB | **284 kB** |
| og:image | the same 1.82 MB PNG | purpose-built 1200×630 card, 99 kB |
| Header logo | 47.9 kB PNG, wrong declared aspect | 7.6 kB WebP, true intrinsic size |
| Home first load (ar / en) | — | **551 kB / 294 kB** |
| Home full scroll (ar / en) | — | **794 kB / 538 kB** |
| Features first load / full scroll | — | **467 kB / 703 kB** |
| About first load / full scroll | — | **661 kB / 780 kB** |
| Blog first load / full scroll | — | **653 kB / 939 kB** |

**The blog page ships its whole archive as HTML, and that needs compression on.**
184 cards of repetitive markup measure 168 kB raw and **19 kB gzipped, 14 kB with
brotli**: about nine to one. Measured, not assumed. That trade buys a fully
crawlable archive and instant client-side search with no API and no backend, but
it depends on the server compressing HTML. If compression is off, the page costs
168 kB instead of 14. See §15.

The wide band photographs are encoded at lower WebP quality than the card art,
because they sit under a heavy scrim and detail beneath the copy is never read
at full fidelity. `build/photos.mjs` carries the quality per photograph; the
change took about 90 kB off the two heaviest pages with no visible difference.

The five editorial photographs add roughly **243 kB**, all of it deferred: every
one is below the fold and lazy, so first load, and therefore LCP, is essentially
unchanged by adding them. `build/perf.mjs` reports both figures rather than the
flattering one.

Decisions:

- Responsive `<picture>` with a 640/960/1280/1536 WebP set and a JPEG fallback;
  the hero is preloaded with `imagesrcset` so the preload matches what the
  `<picture>` actually selects.
- Explicit `width`/`height` on every image, so nothing shifts. The logo's declared
  size was corrected to its intrinsic 350×150.
- `loading="lazy"` plus `decoding="async"` below the fold; `fetchpriority="high"`
  on the hero only.
- Fonts: `preconnect`, `display=swap`, and only the weights actually used. The
  English pages never download the Arabic face — the `unicode-range` split handles
  it (61 kB against 313 kB).
- CSS and JS are hand-written and small: 43 kB of CSS, 10 kB of JS, no framework,
  no build step for the runtime.
- The six story readouts are markup and CSS, so the page's most detailed visuals
  cost zero requests and cannot shift layout.

Remaining known weight: the Arabic web font, 313 kB across four weights.
Self-hosting a subset would cut it; it is listed in §17.

---

## 13. Responsive design

Mobile-first, with layout changing at 780 / 920 / 1100 / 1440 px.

- **Desktop** — split hero, four-column grids, the story as rail plus panel side by
  side, four-column footer.
- **Laptop (1100–1439)** — the story keeps rail plus panel, with the readout and
  copy side by side at a narrower ratio.
- **Tablet (920–1099)** — the story readout stacks above its copy; grids drop to
  two columns.
- **Mobile (< 920)** — the story un-pins entirely and reads as six stacked blocks
  with their readouts, rather than a shrunken pinned stage. The hero reorders to
  headline → actions → badges → image. Nav becomes a drawer.

Verified: no horizontal overflow at 390 × 844 on the home pages or contact, in
either language.

---

## 14. Technical architecture

```
build/
  content.mjs      all content, bilingual          <- edit here
  build.mjs        generator: layout, head, schema, sitemap, robots, llms.txt
  pricing.mjs      the pricing page body
  images.mjs       derives every WebP/JPEG/social card from the originals
  photos.mjs       crops and derives the editorial photography sets
  content-extra.mjs  Features/About content, with provenance for every string
  features-body.mjs  the Features page body and its three interface readouts
  about-body.mjs     the About page body
  blog-body.mjs      the Blog archive, its taxonomy and the lead-article rule
  blog-index.json    370 real posts parsed from the published URLs, with topics
  verify.mjs       render, console, 404s, SEO head, h1, hreflang, overflow
  contrast.mjs     every text run against its effective background
  a11y.mjs         heading order, labels, landmarks, duplicate ids, focus, targets
  functional.mjs   calculator, FAQ, nav, keyboard, skip link
  form.mjs         lead form validation, spam trap, busy and result states
  degraded.mjs     JS-disabled, reduced-motion, chevron orientation
  story.mjs        pinning and step advance at seven scroll positions
  hero.mjs         hero plane separation, and stillness under reduced motion
  blog.mjs         the blog archive: filter, search, pager, no-JS fallback
  photocontrast.mjs  contrast of text on photographs, measured on real pixels
  perf.mjs         payload by type and LCP element
  scrape-*.mjs     how the live plan data was recovered (kept for provenance)

assets/
  css/fandaqah.css        tokens, layout, components
  css/fandaqah-parts.css  pricing + scroll story + readouts
  css/fandaqah-pages.css  Features + About components (loaded only by those two)
  js/fandaqah.js          nav, reveals, story driver, calculator, lead form
  site/                   brand assets from fandaqah.com plus derived WebP/JPEG
  site/photos/            editorial photography + CREDITS.md (licence, provenance)

index.html … terms.html   8 Arabic pages (generated)
en/                       8 English pages (generated)
favicon.ico  site.webmanifest  sitemap.xml  robots.txt  llms.txt
```

Editing any page by hand is a mistake: `node build/build.mjs` overwrites all 16.

---

## 15. Backend integration points

| # | Point | Current state | What is needed |
|---|---|---|---|
| 1 | **Lead form** | Posts `FormData` to `https://fandaqah.com/store/contact_us` via `fetch`. Fields: `name`, `email`, `phone`, `property_type`, `units`, `message`, `company_url` (spam trap) | Confirm the endpoint accepts these names **and answers CORS for the site origin**, or point `data-endpoint` at your handler. Until then the failure branch tells the visitor to call 920066456 or use WhatsApp, so no enquiry is silently lost |
| 2 | **Spam trap** | `company_url` is rendered, hidden and never focusable | The server must **reject any submission where `company_url` is non-empty**. This is deliberately not enforced client-side |
| 3 | **Trial / login** | Link out to `app.fandaqah.com` | None, unless the paths change |
| 4 | **Pricing** | Hard-coded from the live checkout at build time | If plans change, update `PLANS` in `build/content.mjs` and rebuild. A future option is to read the store API at build time |
| 5 | **Blog** | Index links to the 370 live posts | If posts move in-house, `BlogPosting` schema and the card component are already in place |
| 6 | **Analytics** | **Not installed.** No tag, no consent banner | Decide on a provider; a consent gate is required before any non-essential cookie |
| 7 | **HTTP compression** | Assumed, not configured here | Enable gzip or brotli for `text/html`. The blog archive is 168 kB raw and 14 kB brotli; every other page benefits too. This is the single cheapest performance action left |
| 8 | **Blog taxonomy** | Nine topics inferred by keyword rules over post titles | If the CMS can expose a real category per post, replace `build/blog-index.json` with that export and the page needs no other change. The heuristic is honest but it is still a heuristic |

No API key, token or credential appears anywhere in the frontend.

---

## 16. Testing and validation

All harnesses run against `http://localhost:4700` in headless Chrome.

| Harness | Checks | Result |
|---|---|---|
| `verify.mjs` | 16 pages: render, console errors, 404s, `lang`/`dir`, title and description length, canonical, hreflang, OG, JSON-LD parse, one h1, image alt, horizontal overflow; mobile pass at 390×844 | **all pages clean** |
| `contrast.mjs` | every visible text run against its *effective* background, graded on real font size and weight. Photographic sections are excluded and covered by `photocontrast.mjs` | **1,442 runs, 0 failing pairs** |
| `a11y.mjs` | heading order, duplicate ids, control labels, link/button names, landmarks, keyboard focus ring, 24 px targets | **clean** |
| `functional.mjs` | calculator across four plans, FAQ open/close, skip link, focus order, story keyboard operation, RTL mobile drawer and Escape | **all pass** |
| `form.mjs` | required-field errors, invalid email, live error clearing, spam trap invisible and untabbable, success branch, failure branch, reset and re-enable — in both languages | **all pass** |
| `degraded.mjs` | JS disabled and reduced motion: all six panels and readouts render, nothing stuck at `opacity: 0`, stage un-pins, FAQ still works; chevron rotation in both scripts | **all pass** |
| `story.mjs` | pinning and step advance at 7 scroll positions | stage holds `top: 0`, steps and panels move 0→5 in lockstep, exactly one panel visible |
| `hero.mjs` | the four hero planes travel by different amounts, and none moves when motion is reduced | glow −27.9 px, photograph −11.4 px, figure chip −39.3 px over a 420 px scroll; all static under `prefers-reduced-motion` |
| `blog.mjs` | archive filter, search, pager, empty state, every card linking to a real post, and the no-JS fallback, in both languages | **all pass** |
| `photocontrast.mjs` | text over photography on home, Features and About, graded on composited pixels at 1440 px and 390 px in both languages | **72 runs, 0 failing** |
| `perf.mjs` | payload by resource type, LCP element and time | LCP element is the 42 kB WebP |

### Defects this found and fixed

1. **The FAQ chevron pointed sideways in Arabic.** It was drawn with
   `border-inline-end`, which mirrors under `dir="rtl"`, so the disclosure
   indicator never indicated open or closed. Now drawn with physical borders and
   asserted at 45° closed and −135° open in both scripts.
2. **The occupancy bar chart rendered empty.** Percentage heights on flex children
   do not resolve against a parent that only has `min-height`. The bars now sit in
   a track with a definite height.
3. **No focus outline on form controls.** `:focus` set `outline: none` and relied
   on a box-shadow, which forced-colors mode strips. A real outline is back on
   `:focus-visible`, with a `forced-colors` fallback.
4. **Footer links were 21 px tall**, under the WCAG 2.2 AA 24 px minimum.
5. **Heading levels skipped on all 16 pages** (footer `h2 → h4`; pricing
   `h1 → h3`).
6. **Off-palette colour had crept in**: seven `#fff`, seven `#B9CBC8`, and
   `#FFFBEB` / `#FDE68A` / `#78350F` — the last three being default Tailwind
   amber, which the project rules ban outright. All replaced with documented mixes
   of two palette colours.
7. **A 1.82 MB PNG was both the LCP image and the og:image.**
8. **The logo declared a 150×34 box for a 350×150 file**, an aspect-ratio hint that
   did not match the asset.
9. **A deep link to any section landed under the sticky header.**
10. **Thirteen em dashes** were visible in Arabic and English copy, including in
    two `<title>` tags.
11. **The segment cards shipped clip-art.** Three generic SVG illustrations were
    letterboxed on a white panel to represent hotels, serviced apartments and
    chalets. They are now photographs of the actual property types.
12. **Text over photography was never being graded.** `contrast.mjs` climbs the
    DOM for an opaque background colour, which a photographic section does not
    have, so it silently passed everything. The new `photocontrast.mjs` found
    **11 real AA failures** on the first run and they are fixed.
13. **The mock booking button was navy on pure coral**, 4.16:1, under the AA
    body threshold. It now uses the same coral/navy token the real buttons use.
14. **The testimonial role line used the palette green on a light card**, 2.7:1.
15. **`contrast.mjs` was reporting three false failures** on photographic
    sections, grading text against the page default because a photograph has no
    declared background. It now skips those and `photocontrast.mjs` owns them,
    which is the correct division rather than a suppression: the pixel harness
    was extended to cover Features and About at the same time.
16. **A channel row highlighted the wrong channel.** `nth-of-type(3)` counted
    the title bar and header row as siblings, so the "direct booking" accent
    landed on Booking.com. Replaced with an explicit class.
17. **The closing band used a full-frame dark sheet** to buy contrast, which the
    project's own design rules forbid. It is now a radial scrim centred on the
    copy, so the photograph keeps its corners.

### What a green run does **not** cover

- **A real device.** Headless Chrome cannot reproduce iOS scrolling, Safari font
  rendering, Low Power Mode, or a real touch target under a thumb.
- **Field performance.** Every figure in §12 is localhost on a desktop. They are
  valid as a before/after comparison, not as field data.
- **The live form endpoint.** The success and failure branches are tested against a
  stubbed route; the real endpoint has not been posted to.
- **Search behaviour.** Schema validity is checked by parsing; it has not been run
  through Google's Rich Results Test or submitted to Search Console.
- **Legal review** of the privacy and terms drafts.

---

## 17. Remaining work

Things that need a decision, a credential, or a fact that is not publicly
available.

1. **Public email address.** `build/content.mjs` carries
   `[CONFIRM: info@fandaqah.com]`. The contact page redacts it rather than publish
   an address that may bounce. Supply the real one.
2. **Privacy and Terms** are structural drafts with a visible review banner. They
   reflect platform practice but need counsel before the banner comes off.
3. **Form endpoint and CORS** — see §15 items 1 and 2. This is the single
   highest-value item: until it is confirmed, demo requests depend on the
   phone/WhatsApp fallback.
4. **Analytics and consent.** Nothing is installed, deliberately.
5. **Add-on names.** The SAR 350–1,800 price range is confirmed from the store, but
   individual add-on names render only after a plan is selected in the checkout.
   The page states the range and links out.
6. **Case studies.** The ten published testimonials are now on the About page
   (§6). What is still missing is a full case study: a named property, a
   before-and-after, and a figure the operator agrees to publish. The
   testimonials carry no company names on the source site, so none are shown.
7. **A self-hosted Arabic font subset** would remove most of the remaining 313 kB.
8. **Replace the stock photography with real Fandaqah photography.** This is the
   single biggest remaining upgrade to how the page feels. Photographs of actual
   Saudi properties running Fandaqah would outperform any stock library, and the
   pipeline is already built for it: drop new originals into `lab/photo/` using
   the same file stems and run `node build/photos.mjs && node build/build.mjs`.
   The markup references stems, not files, so nothing else changes. Rewrite the
   alt text to describe the real property when you do.
9. **Blog post dates.** The published URLs carry no date, so the archive sorts by
   post id and shows no date. If the CMS can export published dates, the cards can
   carry them and the archive can offer newest-first, which is the one control a
   reader of 185 articles will expect next.
10. **Pages deliberately not built** (§5): per-module product pages, per-segment
   pages, Careers, Partners, Case Studies, Cookie Policy. Each needs real content
   first. The sections and anchors that would seed them already exist.
11. **Illustrative values are labelled as such.** Two readouts show specimen numbers
   rather than company data: the invoice slip (1,200 + 180 + 15% VAT = 1,587) and
   the occupancy bars. The arithmetic is internally correct and the VAT rate is the
   real Saudi rate, but these are **interface specimens, not Fandaqah performance
   figures**, and they are commented as such in `build/build.mjs`. Every other
   number on the site is sourced below.

### Content provenance

| Claim | Source |
|---|---|
| 800+ properties · 250,000+ bookings · 15 integrations · 92% satisfaction | `/store/about_us` |
| 99.9% efficiency · 24/7 support | homepage |
| Al Khobar address, 920066456, +966555947522, Sun–Thu 9–5 | `/store/contact_us` |
| Plan names, prices, feature lists | the rendered `/store` checkout |
| Feature descriptions | `/store/features` |
| 15% VAT, SAR 300 setup | the checkout |

No statistic was invented. Where a fact was unavailable it is a visible
placeholder, or the section is not rendered.

### Preserved, not deleted

- `fandaqah-landing.OLD.html` — the original local page
- `assets/css/fandaqah.prev.css` — the pre-palette stylesheet
- `experience.html` — the "Day Dial" scroll prototype
- every original PNG in `assets/site/`, which remains the `<picture>` fallback
