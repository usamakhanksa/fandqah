# BRIEF — Fandaqah / فندقة

**Status: authored under explicit creative delegation.**
The user answered the structural questions directly (see §0) and delegated the
rest with "review and observe and show me something unique". Decisions below
marked *authored* are mine under that delegation, not user quotations.

---

## 0. User answers (verbatim)

- Reference: *"all designs review and observe and show me some thing unique and
  using content my current website: fandaqah.com i need upgrade design"*
- Deliverable: *Local site + Design artifact*
- Language / motion: *Bilingual EN/AR + full scroll-craft*
- Assets supplied: dark logo, light logo, and the current
  `fandaqah-landing.html` as the brand guideline.

## 1. The eight topics

**1. Vibe (authored).** Operated, exact, calm under load. Not "hospitality
warmth" — that is what every competitor sells. The feeling of a well-run front
desk at 3am when everything is already handled. References outside the web:
an airport ops board, a Braun travel clock, the quiet of a hotel lobby after
the last arrival.

**2. Scroll journey (authored).** One working day inside a property, 06:40
through to the 03:00 night audit. The visitor does not read about the product,
they watch a day run through it.

**3. Energy curve (authored).** Quiet open, rising pressure to the 14:00 rush,
release on the turn, steady through substance and range, then a deliberate
drop into near-silence for the night audit, which is the loudest moment
emotionally and the quietest visually.

**4. Feeling curve, stage by stage.**

| Act | Feeling | What on screen causes it |
|---|---|---|
| 1 · 06:40 Wake | Familiar calm | The board is already live. Nothing is being sold. Last night's audit sits closed at the top. |
| 2 · 14:00 Rush | Pressure | The event log fills faster than it can be read. Three channels fire at once. A walk-in with no room. |
| 3 · Turn | Relief | One rate edited once. Forty channels acknowledge in sequence, visibly. |
| 4 · Consoles | Confidence | Lateral travel across four real operator surfaces. Breadth, not argument. |
| 5 · Range | Recognition of self | The same board re-skins itself for hotel, apartments, chalet. They see their own. |
| 6 · 03:00 Night audit | **Awe, quiet** | **PEAK.** Everything stops. The day closes itself: folios total, the ledger balances, the board empties to tomorrow. |
| 7 · First run | Readiness | An actual empty field with a cursor in it. Their property name. |

**The peak.** Act 6. The sentence a visitor would say to a friend:
*"You scroll to 3am and the hotel closes its own books in front of you."*

**5. One thing no site does (authored).** None of the eight competitors let you
operate anything. Every one shows a photograph of a dashboard inside marketing
chrome. Fandaqah's page will *be* the dashboard, and scroll will be the clock
driving it.

**6. Distance from premium-minimal (authored).** Dense, not minimal. This is an
information product for operators; small type, high count, tabular numerals and
real state are the aesthetic. Premium-minimal here would be a lie about what the
job is.

**7. One world or distinct scenes.** One world: a single property's operating
surface, held for the whole page. Not worldflight (no camera travel) — one
continuous *surface*, with time as the axis instead of space.

**8. Assets.** Both logos supplied and downloaded. Full copy inventory lifted
from `fandaqah-landing.html`. No generated imagery, no KIE spend: the surface
is the imagery.

---

## 2. Grammar: Live surface (§2.3)

**Why the other seven lost.**

- *Filmic one-shot* — carries a burden of proof and fails it here. Fandaqah's
  honest pitch is "watch what it does", not "feel carried".
- *Chaptered editorial* — the product is not a thesis. No long-form to carry.
- *Continuous world* — requires real geography. A PMS has no place to fly through.
- *Typographic poster* — would throw away the one asset that is actually
  persuasive: live operational state.
- *Gallery / catalog* — there is one product, not a range. Property types are a
  configuration, not a collection.
- *Split stage* — tempting (before/after the PMS) but the comparison is against
  spreadsheets, which gives one column nothing real to hold for 14 viewports.
- *Rhythmic cutlist* — bans pin and dwell, and an operator surface needs to hold
  still while state advances. Wrong energy entirely for "calm under load".

**Bans accepted:** no `scrub`, no `kinetic`, no `spotlight`, no marketing chrome,
no full-bleed photography, no hero claim over footage, no 6rem display headings.
Copy lives in the surface's idiom: labels, status lines, log entries, empty
states.

**The honesty rule.** Every panel is real markup computing its state from data
arrays in the page. Nothing is a picture of a dashboard. The page states on its
face that the scenario is sample data.

---

## 3. Signature move: The Day Dial

A fixed rail along the bottom edge carrying the property's 21-hour operating
day, 06:00 to 03:00. Scroll position is the playhead.

What makes it bespoke rather than a kit parameter:

1. **One variable drives the entire page.** `state.hour` is the only input.
   Occupancy, arrivals, departures, in-house count, the housekeeping queue, the
   folio ledger, the channel event log and the page's own ground colour are all
   derived from it every frame. Nothing is hardcoded to a section.
2. **The ground is the time of day.** The page's canvas interpolates dawn →
   daylight → dusk → night from the same hour value. The night audit is dark
   because it is 3am, not because act six is a dark section.
3. **The visitor can take the controls.** Grab the handle and the dial detaches
   from scroll; they scrub the property's day by hand, and every panel follows.
   Release and it re-attaches to scroll position. A marketing page that hands
   over the clock is the move.
4. **It doubles as navigation.** Passing a shift stamps a marker that stays.
   Markers are clickable and jump to that hour's act.

Engine untouched. Driven by page-local JS off `--sc-p` and a `data-day-*`
attribute set of my own naming.

---

## 4. Score table

| # | Beat | Device | Span | Why this one |
|---|---|---|---|---|
| 1 | Wake 06:40 | `pin` | 2.4 | The surface must hold still while state advances. Greet cue: the board is already live on landing. |
| 2 | Rush 14:00 | `flow` + `in` | ~1.4 | Pressure comes from the log filling in reading order, not from the frame holding. |
| 3 | Turn | `reveal` | ~1.4 | A wipe *is* a change of state, which is literally this beat: one edit propagating. |
| 4 | Consoles | `pan` | 4.2 | Lateral reads as breadth. Four consoles + lead + closing note = enough rail to actually travel. |
| 5 | Range | `flow` + `in` | ~1.5 | Quiet by design. The act before the peak is the quietest on the page. |
| 6 | **Night audit 03:00** | `pin` | **4.4** | **PEAK.** Largest span by a clear margin. The frame holds, the day closes itself inside it. |
| 7 | First run | `flow` | ~1.5 | The close is an actual input, not a magnetic button. Live surface forbids the button island. |

Five device families (pin, flow, reveal, pan, pointer). No family twice in a
row. Zero `scrub` acts.

**Measured, not estimated:** 13.6vh desktop / 14.9vh mobile, three *engine*
acts (pin > pan > pin) carrying seven beats; the four flow beats are ordinary
document sections. My pre-build estimate of 16.8vh was wrong and is corrected
here rather than in the plan. That lands inside the 13.6–13.8 band prior
builds fingerprinted, which costs nothing because the registry is empty (§5),
but it is noted so the next build treats the band as taken.

**Authored silence.** Act 5 is intentionally low-event: it is the breath before
the peak. A verification pass reporting "low change" there is correct, not dead
scroll.

---

## 5. Fingerprint gate

`FINGERPRINTS.md` is newly seeded and **empty**. No existing rows, so the gate
passes with nothing to clear. Row appended after shipping.

---

## 6. Numbers policy

The taste floor forbids invented statistics.

- **Sample-scenario numbers** (occupancy, arrivals, folio lines, room board) are
  labelled on the page as demo data and are computed, not asserted.
- **Claims carried over from the user's existing site** (2,400+ properties,
  40+ channels, 12 countries, 99% uptime SLA, 18% RevPAR lift) are *their*
  published claims, reused verbatim. Flagged to the user for verification —
  I did not originate them and cannot confirm them.
- No new statistic invented anywhere on the page.

## 7. Feel check (scrolled cold, then diffed against §1)

| Act | Intended | Felt | Verdict |
|---|---|---|---|
| 1 | Familiar calm | Calm, slightly long | Held. Trimmed span 2.4 → 1.9. |
| 2 | Pressure | Pressure | Held. |
| 3 | Relief | Satisfaction, not relief | Close enough; the rate field earns it by being operable. |
| 4 | Confidence | Breadth | Held. |
| 5 | Recognition | Quiet | Held, and the quiet is the authored silence. |
| 6 | **Awe, quiet** | **Resolution** | **Held — this is the peak.** |
| 7 | Readiness | Readiness | Held. |

Three defects the feel check and the contact sheets caught that the harness
passed clean, each fixed and re-verified:

1. **The ground dipped to 2.08:1 at dusk.** Interpolating a canvas from light
   to dark passes through a mid-tone where neither ink clears 4.5:1. Split
   into two families with a hard cut at 21:00.
2. **The peak never fired.** The clock was mapped linearly to raw page
   scroll, which put the night-audit act at hour ~20, so the ledger sat empty
   through all eight of its frames and 03:00 arrived during the signup form.
   The clock is now anchored to act positions.
3. **The peak's panel was empty on entry.** A pinned stage is visible a full
   viewport before its progress starts, so a scroll-populated panel has an
   empty window. The ledger now accrues live all day and posts at the audit,
   so it is never blank.

Two further fixes from measurement rather than feel: the ledger's final beats
landed after the act's visible travel (compressed into the pinned window), and
`getBoundingClientRect` was the wrong measuring tool for act anchors because
the engine transforms stages (`offsetTop` instead).

## 8. The tell-someone sentence

*"It's the site where you scroll through one day at a hotel and watch it close
its own books at 3am."*
