# JTLM Events Site — Family Prayer Meeting 2026 Extension
**Handoff for Google Antigravity** · Prepared 12 Oct 2026 · Target: ship before **Mon 19 Oct 2026** (7 days)

> Rule for the implementing agent: **read the real files first**. Sections marked ⚠️ UNVERIFIED are things I could not read and must be confirmed in the repo. Do not mark any test "passed" unless you actually ran it.

---

## 0. Inspection limits (what I did and did not see)

| Source | Status |
|---|---|
| Repo root listing, `README.md`, `vercel.json`, `vite.config.ts` (github.com blob pages) | ✅ Read |
| Live site `<head>` (jtlmyouthmeeting2026.vercel.app) | ✅ Read (body is client-rendered, empty in static fetch) |
| Project Report PDF (architecture, component tree, URLs, config excerpt) | ✅ Read |
| Family Prayer poster (image) | ✅ Viewed; dimensions measured **853 × 1280 px** |
| `src/**` (App.tsx, main.tsx, components, `src/config/event.ts`), `index.html`, `package.json`, `tailwind.config.js`, `.github/workflows/*`, `ANTIGRAVITY_HANDOFF.md` | ⚠️ **Not readable** — GitHub blocked folder/raw access to my fetcher. Everything below about these files comes from the PDF report and README only. |
| Whether `forms.gle/KD67MRaaUvF91KKA7` opens, and its embed ID | ⚠️ **Not verified** |
| Venue street address / map pin accuracy | ⚠️ **Not verified** (README itself says no street address was supplied and the pin needs owner confirmation) |

My earlier message was cut off at "Migrate the existing Youth Meeting…". I've interpreted it as "…config into the new multi-event config." If there was more to that instruction, send it.

---

## 1. Current architecture (as documented)

- **SPA**: React 19 + TS + Vite 8 + Tailwind 3.4, Lucide icons, self-hosted Fontsource fonts (Anek Tamil headings, Mukta Malar body). No backend, no router.
- **Single page, section-scroll** structure: `App.tsx → Navbar, HeroSection, CountdownTimer, AboutSection, EventDetails, PosterSection, LocationSection, RegistrationModal, Footer`.
- **Config**: `src/config/event.ts` exports `GOOGLE_FORM_URL`, `GOOGLE_FORM_EMBED_URL`, `GOOGLE_MAPS_URL`, `GOOGLE_MAPS_EMBED_URL` and `eventConfig` (ministry, title, theme, date, time, food, contacts, image paths). README says these can be overridden by `VITE_*` env vars (see `.env.example`).
- **Verified from repo**
  - `vite.config.ts`: `plugins: [react()]`, **`base: './'`**.
  - `vercel.json`: `framework: vite`, `installCommand: npm install --include=optional`, `outputDirectory: dist`, **`cleanUrls: true`**, **catch-all rewrite `/(.*) → /index.html`**.
- **Live `<head>`**: `og:image` is `./images/poster-small-v3.webp` and `og:logo` is `./images/logo.png` — **relative URLs**.
- **Youth values (from report, confirm in `event.ts`)**: date 2026-10-20, 10:00 AM–1:00 PM; form `https://forms.gle/69quUsz8yt7kqCgj8`; maps `https://maps.app.goo.gl/8YqJ9DueV8WkDSeJ8`; coordinates `11.361147, 77.703681`; poster `poster-v3.webp`; contacts 63804 15393 (Pr. Anthony David) and 80565 55393 (Bro. John David).

### Inconsistencies found in the existing docs (don't copy them forward)
1. README says "no ministry logo supplied / no speakers or schedule listed"; the report says logo and speakers are integrated. **README is stale.** Trust the code.
2. Report says "six-milestone roadmap" but lists five; "100% test coverage" is unsupported (no test suite is mentioned anywhere). Don't repeat these claims.
3. Report's runbook deploys the Pages mirror with `npx gh-pages -d dist`, while the repo has `.github/workflows/`. ⚠️ Read the workflow to learn which actually runs, so you don't double-deploy or clobber the mirror.

---

## 2. Risks that shape the design (read before coding)

### R1 — `base: './'` breaks nested routes (highest risk)
On `/family-prayer`, relative URLs like `./assets/index-xxx.js` and `./images/…` resolve against `/` or `/family-prayer/` depending on trailing slash, and the Vercel catch-all rewrite then answers those asset requests with `index.html` → **blank page / broken images**. Direct visits and refreshes are exactly where this bites.
**Decision:** switch to an absolute base chosen per host (see §5.2), and route every image through an `assetUrl()` helper.

### R2 — Social previews need build-time metadata
WhatsApp/Facebook/Telegram crawlers don't run JavaScript. If the title/OG tags are set client-side, a shared Family link will preview as the Youth Meeting (the current `index.html`). Churches share by WhatsApp, so this matters.
**Decision:** emit a real HTML file per route at build time with its own `<title>`, description, canonical and **absolute** OG URLs.

### R3 — GitHub Pages has no rewrites
Deep links 404 on Pages. Prerendered per-route `index.html` files fix this for the known routes; also copy `index.html → 404.html` as a fallback for anything else.

### R4 — Existing shared links
Old links to `/` currently land on the Youth page; some may carry hashes (`/#registration`, `/#location`…). See §3 decision.

### R5 — Registering for the wrong event
Two near-identical events one day apart, each with its own form. Mitigations in §7.

### R6 — Poster contains an empty "QR CODE SPACE" box
The supplied poster still shows a dashed placeholder where the QR should be. I will not fake one. **Ask the owner for the final poster with the real QR**, or accept showing it as-is with a prominent Register button beside it (the website's button is the working path). Architecture below supports swapping the poster file without code changes.

---

## 3. Routing decision

**Recommendation: make `/` the events landing page, move the Youth page to `/youth-meeting`, keep old links alive with a compatibility shim.**

Why not leave `/` as Youth: the user's stated target has a shared hub, and a visitor arriving from a ministry-wide link should see both dates. Why it's safe: the Youth content is moved, not rewritten.

Compatibility measures (all required):
1. Youth page content/components stay **byte-identical**; only its mount point changes (`/youth-meeting`).
2. **Legacy hash shim** in the router: if the path is `/` and `location.hash` matches a known Youth section (`#about`, `#event`, `#details`, `#poster`, `#location`, `#register`, `#registration` — ⚠️ confirm real ids in `Navbar.tsx`), `replace` to `/youth-meeting#<id>`.
3. The landing page's Youth card is a full-size, equal-weight card, and the landing page shows a one-line notice: *"Two separate meetings — register for each separately."*
4. **Fallback if the owner prefers zero change to `/`:** keep `/` = Youth, add a top banner "Family Prayer Meeting – 19 Oct →" and put the hub at `/events`. Same code otherwise; only one constant changes (`ROOT_ROUTE`). **Owner to confirm; default = landing at `/`.**

Router: **no new dependency.** Three static routes don't justify React Router. Use a ~40-line History-API router (§5.3). If routes later exceed ~5 or need nested layouts, revisit.

| Path | Page | Notes |
|---|---|---|
| `/` | `EventsHome` | two cards |
| `/family-prayer` | `FamilyPrayerPage` | new |
| `/youth-meeting` | existing `App` content | moved, unchanged |
| anything else | `NotFound` (links back to `/`) | |

---

## 4. Central configuration

### 4.1 Files
```
src/config/ministry.ts   # name, logo, shared contacts, venue (shared), SITE_URL
src/config/events.ts     # EventConfig[] + helpers (getEvent, ROUTES)
src/config/event.ts      # LEFT IN PLACE (see 4.3)
```

### 4.2 Data model
```ts
// src/config/events.ts
export type EventId = 'family-prayer' | 'youth-meeting';

export interface Contact { nameTa?: string; nameEn: string; display: string; tel: string; }
export interface Venue {
  nameTa: string; nameEn: string;
  address?: string;                       // leave undefined until the owner supplies it
  lat: number; lng: number;
  directionsUrl: string;                  // maps.app.goo.gl link
  embedUrl: string;                       // maps embed, '' hides map
}
export interface Poster {
  src: string; smallSrc?: string;         // paths relative to /public
  altTa: string; altEn: string;
  width: number; height: number;          // intrinsic, prevents layout shift
}
export interface EventConfig {
  id: EventId; slug: string; path: string;            // '/family-prayer'
  titleTa: string; titleEn: string;
  themeTa?: string; themeEn?: string;
  descriptionTa: string; descriptionEn: string;
  startIso: string; endIso: string;                    // with +05:30 offset
  displayDateTa: string; displayDateEn: string;
  displayTimeTa: string; displayTimeEn: string;
  weekdayEn: string;
  poster: Poster;
  registration: { shareUrl: string; embedUrl?: string; };
  venue: Venue;                                        // may reference the shared ministry venue
  contacts: Contact[];
  notices: { ta: string; en: string }[];               // e.g. lunch
  seo: { title: string; description: string; ogImage: string /* ABSOLUTE */; };
  accent: 'family' | 'youth';                          // drives the visual distinction
}
```

### 4.3 Migration strategy for Youth: **wrap, don't rewrite**
Do **not** retype Youth values. In `events.ts` build the Youth entry by importing from the existing `event.ts` (`GOOGLE_FORM_URL`, `GOOGLE_FORM_EMBED_URL`, `GOOGLE_MAPS_URL`, `GOOGLE_MAPS_EMBED_URL`, `eventConfig`). Existing components keep importing `event.ts` unchanged. Result: zero drift risk and a trivially small diff. Optionally invert later (make `event.ts` re-export from `events.ts`) once the site is stable.

Add a unit-style guard script (no framework needed) `scripts/check-config.mjs` that fails the build if the Youth and Family `registration.shareUrl` are equal, or if either contains the other's form ID.

### 4.4 Family Prayer entry (values supplied by the owner)
```ts
{
  id: 'family-prayer', slug: 'family-prayer', path: '/family-prayer',
  titleTa: 'குடும்ப ஆசீர்வாதக் கூட்டம்', titleEn: 'Family Prayer Meeting',
  startIso: '2026-10-19T09:30:00+05:30', endIso: '2026-10-19T13:00:00+05:30',
  displayDateEn: '19 October 2026', weekdayEn: 'Monday',
  displayTimeEn: '9:30 AM – 1:00 PM',
  displayTimeTa: 'காலை 9:30 மணி முதல் மதியம் 1 மணி வரை',   // matches poster wording
  displayDateTa: 'அக்டோபர் 19, 2026 திங்கள்',               // matches poster
  poster: { src: 'images/poster-family-v1.webp', smallSrc: undefined,
            width: 853, height: 1280,
            altTa: 'குடும்ப ஆசீர்வாதக் கூட்டம் அதிகாரப்பூர்வ சுவரொட்டி — அக்டோபர் 19, 2026',
            altEn: 'Official poster: Family Prayer Meeting, Monday 19 October 2026, 9:30 AM to 1:00 PM, Jesus the True Light Ministries' },
  registration: { shareUrl: 'https://forms.gle/KD67MRaaUvF91KKA7' /* embedUrl: add ONLY after retrieving the real viewform?embedded=true URL */ },
  venue: /* same object/reference as Youth venue — owner confirmed */,
  contacts: [ /* Pr. Anthony David 63804 15393 ; Bro. John David 80565 55393 — reuse Youth contact objects */ ],
  notices: [{ ta: 'மதிய உணவு வழங்கப்படும்', en: 'Lunch will be provided.' }],
  accent: 'family',
}
```
**Poster text to display as event details** (read from the supplied poster, exactly):
- தேவசெய்தி: **Pr. S. ஜான்**, AG சபை, ஆந்தியூர்
- சபை போதகர்: **Pr. அந்தோணி டேவிட்**
- Footer line: இயேசுவே மெய்யான ஒளி ஊழியங்கள் · மதிய உணவு வழங்கப்படும்

⚠️ **Content flags for the owner (don't silently "fix"):**
- On this poster Pr. Anthony David is labelled **சபை போதகர்** (church pastor) and Pr. S. John is the message speaker; on the Youth site Pr. Anthony David is labelled *தேவசெய்தி / Senior Pastor & Founder*. Do **not** reuse the Youth speaker block (it also lists Dr. A. Vanaja, who is not on this poster). Use the poster's roles.
- English transliteration of "ஆந்தியூர்" (e.g. Anthiyur/Andiyur) is unconfirmed — display the Tamil as printed and ask the owner for the English spelling.
- The Youth poster file/names are `poster-v3.webp`/`poster-small-v3.webp`; keep them untouched.

---

## 5. Implementation design

### 5.1 File changes
| File | Change |
|---|---|
| `src/config/ministry.ts` | **new** — `SITE_URL = 'https://jtlmofficial.vercel.app'`, shared logo/contacts/venue |
| `src/config/events.ts` | **new** — model + two entries + helpers |
| `src/lib/assetUrl.ts` | **new** — `assetUrl(p) => import.meta.env.BASE_URL + p.replace(/^\.?\//,'')` |
| `src/lib/router.tsx` | **new** — `usePath`, `navigate`, `<Link>`, legacy-hash shim |
| `src/pages/EventsHome.tsx` | **new** |
| `src/pages/FamilyPrayerPage.tsx` | **new** |
| `src/pages/YouthPage.tsx` | **new thin wrapper**: renders the *existing* section stack exactly as `App.tsx` does today |
| `src/App.tsx` | becomes route switch only (move old body into `YouthPage`) |
| `src/components/EventCard.tsx`, `PosterViewer.tsx`, `EventDetailsList.tsx`, `RegistrationCard.tsx`, `SiteNav.tsx`, `CrossEventNotice.tsx` | **new**, small; **reuse** existing `Footer`, `LocationSection`, `CountdownTimer` (give them an optional `event` prop defaulting to Youth), and `RegistrationModal` pattern |
| `vite.config.ts` | env-driven `base`, per-route HTML plugin (§5.4) |
| `index.html` | keep as the template; add `<!--ROUTE_META-->` markers only if the plugin needs them |
| `public/images/poster-family-v1.webp` + `.jpg` | **new** — supplied files (converted only, no resize/edit); `.jpg` for OG |
| `scripts/check-config.mjs` | **new** guard |
| `vercel.json` | **no change expected** (see 5.5) |
| `.github/workflows/*`, git remotes, `package.json` deps | **do not modify** (the workflow may need `VITE_BASE` env — see 5.2; read first) |

**Asset step:** grep the repo for `./images`, `images/`, `url(` in CSS and any hard-coded paths in components/`event.ts`. Every runtime image path must go through `assetUrl()`; Youth values then keep working on nested routes without changing the files themselves.

### 5.2 Base path per host
```ts
// vite.config.ts
base: process.env.VITE_BASE ?? '/',
```
- Vercel: nothing to set → `/`.
- GitHub Pages mirror (`/Youth_Meeting_2026/`): build with `VITE_BASE=/Youth_Meeting_2026/` (`vite build` in the workflow/runbook). ⚠️ Confirm how the mirror is built before changing it, and keep the old deploy working if the workflow can't be edited (fallback: Pages continues to serve the old single-page build until the workflow is updated — the mirror is secondary).

### 5.3 Router sketch (no dependency)
```tsx
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const strip = (p: string) => (p.startsWith(base) ? p.slice(base.length) || '/' : p).replace(/\/$/, '') || '/';
export const usePath = () => {
  const [p, set] = useState(strip(location.pathname));
  useEffect(() => { const f = () => set(strip(location.pathname)); addEventListener('popstate', f); return () => removeEventListener('popstate', f); }, []);
  return p;
};
export function navigate(to: string) { history.pushState({}, '', base + to); dispatchEvent(new PopStateEvent('popstate')); }
// <Link>: render <a href={base+to}>, intercept only plain left-clicks (no meta/ctrl/shift/target).
// On route change: set document.title from config, scrollTo(0,0), move focus to <h1 tabIndex={-1}>.
```

### 5.4 Per-route HTML at build time (no dependency)
`vite.config.ts` can import `src/config/events.ts` directly (config files are bundled by esbuild). Add an inline plugin:
- `closeBundle()` reads the built `dist/index.html`, and for each of `/`, `/family-prayer`, `/youth-meeting` writes `dist/<route>/index.html` with replaced `<title>`, `meta[name=description]`, `<link rel=canonical>`, `og:*`, `twitter:*` and `og:url`; also writes `dist/404.html` (copy of index).
- All OG image URLs are **absolute**: `${SITE_URL}/images/poster-family-v1.jpg` (JPG/PNG for crawler compatibility), with `og:image:width/height` = 853/1280, `og:image:alt`, `og:locale=ta_IN`, `og:type=website`.
- ⚠️ `events.ts` must not use `import.meta.env` at module top level (undefined inside the Vite config process). Put env-overridable values in `event.ts` only, or guard with optional chaining.
- The root `/` and Youth routes also get correct absolute OG URLs. This fixes the existing relative `og:image`, which is likely a broken preview today (verify with a share debugger).
- Optional JSON-LD `Event` per page (`startDate 2026-10-19T09:30:00+05:30`, `endDate …T13:00…`, `eventStatus`, `organizer`). Include `location` as `Place` with `name` + `geo` only; **omit `address` until verified**.

### 5.5 Vercel
Existing `vercel.json` should stay as is: static files in `dist/<route>/index.html` are served first (filesystem beats rewrites), `cleanUrls` serves them at `/family-prayer`, and the catch-all still returns `index.html` for unknown paths (the SPA then shows `NotFound`). ⚠️ Confirm on a **Vercel Preview deployment**, not on production, that (a) `/family-prayer` loads directly, (b) refresh works, (c) assets load. Don't touch `installCommand` (`--include=optional` is a deliberate EBADPLATFORM fix).

---

## 6. UI prototype (wireframes)

Visual identity: reuse the existing navy theme (`#0B1B33`), gold dual-ring accents, Anek Tamil/Mukta Malar, current button/card styles, logo in navbar/footer. Each event gets one **accent chip** so they never look identical: Family = warm maroon/gold (taken from the poster), Youth = existing navy/blue. Reuse existing Tailwind tokens; add colours to `tailwind.config.js` only if the existing palette lacks them.

### 6.1 `/` — Events landing
```
┌────────────────────────────────────────────┐
│ [logo] இயேசுவே மெய்யான ஒளி ஊழியங்கள்   Events│  skip-link first in DOM
├────────────────────────────────────────────┤
│  Jesus the True Light Ministries            │
│  இரண்டு கூட்டங்கள் · Two Meetings           │
│  ⓘ Each meeting has its own registration.   │
├──────────────────────┬─────────────────────┤  (stacked on mobile, 2-col ≥768px)
│ ▌FAMILY (maroon)     │ ▌YOUTH (navy)       │
│ [poster thumb 2:3]   │ [poster thumb]      │
│ குடும்ப ஆசீர்வாதக்   │ வாலிபர் கூடுகை      │
│ கூட்டம்              │ Youth Meeting 2026  │
│ Family Prayer Meeting│                     │
│ 📅 Mon, 19 Oct 2026  │ 📅 Tue, 20 Oct 2026 │
│ 🕘 9:30 AM–1:00 PM   │ 🕙 10:00 AM–1:00 PM │
│ 🍽 Lunch provided    │ 🍽 Lunch provided   │
│ [View details]       │ [View details]      │
│ [Register – Family]  │ [Register – Youth]  │  labels name the event
├──────────────────────┴─────────────────────┤
│ Venue + map link · contacts (tel links)     │
│ Footer (existing)                           │
└────────────────────────────────────────────┘
```
Youth card: confirm with the owner whether the Youth meeting is also lunch-provided before showing the line (the report says yes).

### 6.2 `/family-prayer`
```
SiteNav  (Events · Family · Youth)   [Register – Family Prayer]
HERO   chip "FAMILY PRAYER MEETING · 19 OCT"   H1 குடும்ப ஆசீர்வாதக் கூட்டம்
       Family Prayer Meeting · Monday, 19 October 2026 · 9:30 AM–1:00 PM
       [Register for Family Prayer Meeting]  [Get directions]
       Countdown (target 2026-10-19T09:30+05:30)
CrossEventNotice: "Looking for the Youth Meeting (20 Oct)? → Go to Youth Meeting"
POSTER  img 853×1280 (aspect-[853/1280], object-contain, never cropped), click/Enter → lightbox
DETAILS (ta + en pairs)  date · time · place · speakers (from poster) · 🍽 lunch
REGISTRATION CARD  "Register for Family Prayer Meeting — 19 Oct 2026"
       Button → https://forms.gle/KD67MRaaUvF91KKA7 (new tab, rel=noopener noreferrer)
       Embed only if a real embed URL is supplied; otherwise button only
VENUE  map embed + [Get directions]  (existing LocationSection)
CONTACT  Pr. Anthony David 63804 15393 · Bro. John David 80565 55393  (tel: links)
Footer
```
Mobile: poster full-width under the hero, sticky bottom bar **"Register — Family Prayer (19 Oct)"** (reuse the existing sticky-bar pattern, but with event-specific label and accent), ≥48px tap targets. Tablet: poster and details side-by-side from `md`. Desktop: poster left (max-w ~420px), details right.

### 6.3 Wrong-form prevention (R5)
- Every Register button label includes the **event name and date**.
- The registration card header repeats title/date and uses the event accent colour.
- `CrossEventNotice` on both event pages and the sticky bar never shows the other event's form.
- Youth page gets the notice too (small, below hero) — a minimal additive change; if the owner wants Youth literally untouched, skip it and rely on the landing page + nav.
- Build-time guard (4.3) prevents identical/swapped form URLs.

### 6.4 Accessibility requirements
Skip link; one `<h1>` per route; landmarks (`header/nav/main/footer`); visible `:focus-visible` rings on every interactive element (≥3:1 contrast against both light and dark backgrounds); lightbox = `role="dialog" aria-modal`, focus trap, Esc to close, focus returns to trigger, scroll lock; poster `alt` (Tamil + English, §4.4); `lang="ta"` on Tamil spans and `lang="en"` on English; `aria-current="page"` in nav; decorative icons `aria-hidden`; external links announce "opens in new tab"; route change moves focus to `<h1>`; respect `prefers-reduced-motion` for countdown/animations; iframes have `title`.

---

## 7. Implementation workflow (small, reviewable steps)

Work on a branch `feat/family-prayer`; one commit per step; **do not push to `origin`/`jtlm` main until step 9 passes.**
1. Read all ⚠️ files; write a short audit note (real component props, section ids, `event.ts` shape, workflow content). Capture a **baseline**: `npm ci && npx tsc --noEmit && npm run build`, and save the baseline `dist/` Youth page screenshots at 375/768/1440.
2. Add `assetUrl`, switch base to env-driven, route existing image paths through it. Verify the Youth page is visually unchanged at `/`.
3. Add `ministry.ts`/`events.ts` (Youth wraps `event.ts`) + `check-config.mjs`.
4. Add router + `NotFound`; move current App body into `YouthPage` at `/youth-meeting`; add legacy hash shim.
5. Add poster assets and `FamilyPrayerPage`.
6. Add `EventsHome`.
7. Add per-route HTML plugin, SEO, absolute OG, `404.html`.
8. Accessibility pass (§6.4).
9. Full test run (§8), Vercel **preview** deploy, owner review, then merge/push.

## 8. Test plan — every item is **NOT YET RUN**

| # | Test | How | Result |
|---|---|---|---|
| 1 | Type check | `npx tsc --noEmit` | ☐ not run |
| 2 | Production build | `npm run build` (note output size vs 79.0 kB gz JS baseline) | ☐ not run |
| 3 | Config guard | `node scripts/check-config.mjs` | ☐ not run |
| 4 | Route files exist | `ls dist/family-prayer/index.html dist/youth-meeting/index.html dist/404.html` | ☐ not run |
| 5 | Meta per route | `grep -E "<title>|og:image|canonical" dist/*/index.html` — titles differ, OG URLs absolute | ☐ not run |
| 6 | Direct load + refresh on `/family-prayer`, `/youth-meeting`, `/` | `npm run preview`, then Vercel preview | ☐ not run |
| 7 | Assets load on nested routes (no 404 in network tab) | browser devtools | ☐ not run |
| 8 | Legacy links: `/#registration` etc → `/youth-meeting#…` | manual | ☐ not run |
| 9 | Family Register button opens exactly `https://forms.gle/KD67MRaaUvF91KKA7`; Youth opens `…69quUsz8yt7kqCgj8` | click-through; confirm each form's title matches its event | ☐ not run |
| 10 | Maps button + embed (same venue both events) | click-through | ☐ not run |
| 11 | `tel:` links: `+916380415393`, `+918056555393` | on a phone | ☐ not run |
| 12 | Poster: aspect ratio preserved, lightbox keyboard-operable | visual + keyboard | ☐ not run |
| 13 | Layout: no horizontal scroll at 360/375/430/768/1024/1440; Tamil glyphs render, no fallback fonts | manual / headless browser | ☐ not run |
| 14 | A11y: Tab order, focus rings, axe/Lighthouse | axe DevTools / Lighthouse | ☐ not run |
| 15 | Social preview: paste each URL into Facebook Sharing Debugger / WhatsApp | after deploy | ☐ not run |
| 16 | GitHub Pages mirror build with `VITE_BASE=/Youth_Meeting_2026/` serves `/`, `/family-prayer` | local `vite preview --base` or after deploy | ☐ not run |

Note: external Google services may be unreachable from a sandbox (README documents this); report that honestly rather than marking embeds as passed.

## 9. Deployment and rollback
- Merge to `main` → push to the remotes **using the existing workflow only** (`origin` → GitHub Pages source repo; `jtlm` → Vercel repo, per the report). Don't add or change remotes.
- Verify the Vercel Preview first; promote only after tests 6–10 pass.
- If anything breaks in production: **Vercel → Deployments → previous deployment → Promote to Production** (instant rollback), and `git revert` the merge commit.
- Pages mirror: update last, after Vercel is confirmed.

## 10. Open questions for the owner (blockers marked ★)
1. ★ Confirm `/` becomes the events landing page (default) vs staying Youth (fallback in §3).
2. ★ Final poster **with the real QR code**, or approval to show the current one with the QR placeholder.
3. Embed URL for the Family form (`docs.google.com/forms/d/e/<id>/viewform?embedded=true`); otherwise button-only.
4. English spelling for "ஆந்தியூர்" and English name format for Pr. S. John.
5. Venue street address (none supplied anywhere so far) and confirmation that the pin is the right entrance.
6. Is the Youth meeting lunch-provided? (Report says yes — card will say so.)
7. Should a post-event state replace the Register button after 19/20 Oct?

## 11. Known limitations (as of this document)
- No source under `src/` was read; component prop names, section ids and `event.ts` shape must be confirmed.
- No build, test, link or layout check has been run by me. Everything in §8 is pending.
- Youth page gets at most an additive notice; its form, content and styling are not changed.
