# Handoff to Google Antigravity — Youth Meeting 2026

Continue from this project; do not redesign it. The visual identity is taken from the official poster
(navy, gold, cream, white, with the poster's crimson ribbon as a small accent).

## Architecture
Static single-page app. No server, database or secrets. Registration is handled entirely by the existing
Google Form (embedded iframe plus new-tab fallback). The map is a key-less Google Maps iframe plus a directions link.

## Stack
React 19, TypeScript (strict), Tailwind CSS 3.4, Vite, `lucide-react` icons, and self-hosted fonts via `@fontsource`
(Anek Tamil for headings, Mukta Malar for body, both with Tamil glyphs).

## Files
```
index.html                      meta, title, favicon, lang="ta"
tailwind.config.js              colour tokens, fonts, keyframes
src/config/event.ts             ALL event content, integration URLs and section ids (single source of truth)
src/App.tsx                     page composition + skip link
src/index.css                   font imports, base styles, .btn variants, .gold-text, hero entrance animation
src/components/
  Navbar.tsx                    sticky nav, mobile menu (aria-expanded), active-section highlight, Register button
  HeroSection.tsx               title, theme, date/time, CTAs, framed poster image, sunrise backdrop
  AboutSection.tsx              welcome copy, five themes, photo crops
  EventDetails.tsx              date / time / venue cards, lunch banner
  RegistrationSection.tsx       Google Form iframe, loading + slow-load notice, new-tab button
  LocationSection.tsx           venue text, Get Directions, map iframe or placeholder
  ContactSection.tsx            two organiser cards with tel: links
  Footer.tsx                    ministry name, quick links, phone numbers, © 2026
  Section.tsx, SectionHeading.tsx, BrushEdge.tsx   shared layout pieces
src/hooks/                      useActiveSection, useScrolled
public/images/                  poster (full and small), hero backdrop, worship and prayer crops (all from the poster)
```

## Design tokens
| Token | Hex | Use |
| --- | --- | --- |
| `midnight-900 / 800 / 700 / 600` | #06101F / #0B1B33 / #12294A / #1B3A66 | backgrounds, navy cards |
| `gold-300 / 400 / 500 / 600 / 700` | #FFD66B / #FBBF3A / #F2A91B / #D68A0C / #A8650A | headings, buttons, frames |
| `cream` (50 / 100 / 200) | #FCF8EF / #F7EEDC / #EEDFC2 | light sections |
| `ribbon` | #8E1B1F | "Youth Meeting – 2026" ribbon |

Fonts: `font-display` is Anek Tamil, `font-body` is Mukta Malar. Keep Tamil line-height at 1.3 or more so vowel signs are not clipped.
Motion: one hero entrance sequence and one gold sheen on the theme word, both disabled under `prefers-reduced-motion`.

## Integrations
- **Google Form:** `GOOGLE_FORM_URL` (share link, new tab) and `GOOGLE_FORM_EMBED_URL` (long `viewform?embedded=true`, iframe).
  Do not add website-side form fields, a success message, or any storage of registrations.
- **Google Maps:** `GOOGLE_MAPS_URL` (directions) and `GOOGLE_MAPS_EMBED_URL` (`output=embed`, no API key).
  An empty embed string shows the placeholder card. Never replace the coordinates with guessed ones.
- Per-environment overrides: `VITE_GOOGLE_FORM_URL`, `VITE_GOOGLE_FORM_EMBED_URL`, `VITE_GOOGLE_MAPS_URL`, `VITE_GOOGLE_MAPS_EMBED_URL`.

## Commands
`npm install` · `npm run dev` · `npm run build` (type-check + build) · `npm run preview`

## Testing checklist (re-run in a real browser)
1. Both iframes render on desktop and on a phone; the form can be filled and submitted.
2. Nav links, mobile menu, Register Now and View Location scroll to the right section.
3. Get Directions opens the Maps link; Open Registration Form opens the form in a new tab.
4. Both phone links open the dialer on a phone.
5. Tamil text renders correctly at 375, 430, 768 and 1440 px, with no horizontal scroll.
6. Keyboard: tab order, visible focus, menu toggle; reduced motion is honoured.
7. The console has no errors.

Already checked in headless Chromium: item 2 (links and menu), the overflow part of 5, and 7. See README "Verified".

## Remaining production tasks
- Confirm both iframes in a real browser (they were blocked in the build sandbox).
- Get the street address from the organisers and set `eventConfig.venue.address`; confirm the map pin.
- Get organiser approval of the About copy; add a real logo if one exists.
- Deploy to a static host; set `og:image` to an absolute URL once the final domain is known (it is relative now).
- Add a short privacy note if required: the Google Form collects names, ages, addresses and guardian phone numbers.
- Run Lighthouse and screen-reader checks; test on iOS Safari and Android Chrome.
