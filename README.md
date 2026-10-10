# வாலிபர் கூடுகை | Youth Meeting – 2026

Single-page, bilingual (Tamil / English) event site for the Youth Meeting organised by
**இயேசுவே மெய்யான ஒளி ஊழியங்கள் (Jesus the True Light Ministries)**.
React + TypeScript + Tailwind CSS (v3) + Vite. No backend, no database, no API keys.

## Run it

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then writes ./dist
npm run preview    # serves ./dist on http://localhost:4173
```

`dist/` uses a relative base (`./`), so it can be uploaded to any static host or sub-path.

## Where things live

| Need to change | Edit |
| --- | --- |
| Any event text, date, time, contacts, image paths | `src/config/event.ts` |
| Google Form URLs | `src/config/event.ts` → `GOOGLE_FORM_URL`, `GOOGLE_FORM_EMBED_URL` |
| Google Maps URLs | `src/config/event.ts` → `GOOGLE_MAPS_URL`, `GOOGLE_MAPS_EMBED_URL` |
| Colours, fonts | `tailwind.config.js` |
| Poster / photos | `public/images/` |

All integration URLs can also be overridden per deployment with `VITE_*` variables (see `.env.example`).

## Update the Google Form

The site embeds your **existing** form; it never collects registrations itself.

- `GOOGLE_FORM_URL` is the share link (`https://forms.gle/...`), used by the "Open Registration Form" button.
- `GOOGLE_FORM_EMBED_URL` is the iframe address: the long `docs.google.com/forms/d/e/<ID>/viewform?embedded=true` URL.
  In Google Forms, Send → the `<>` tab shows it (copy the `src` value).

If you ever replace the form, update **both** values.

## Update the map

- `GOOGLE_MAPS_URL` is the link behind every "Get Directions" button (currently your `maps.app.goo.gl` link).
- `GOOGLE_MAPS_EMBED_URL` is the iframe address, no API key needed. In Google Maps: Share → Embed a map → copy the `src`
  value, or use `https://www.google.com/maps?q=<lat>,<lng>&z=16&output=embed`.
  Set it to `''` to hide the map and show a placeholder card with the Get Directions button.
- `eventConfig.venue.address` takes the street address once it is confirmed; the section shows it automatically.

## Verified

Checked in headless Chromium against the production build (`npm run build` + `npm run preview`):

- Build and type-check pass.
- No horizontal scrolling at 1440, 768, 430 and 375 px wide.
- No console errors or page errors at those four sizes.
- All six in-page links point at existing sections; Register Now scrolls to the registration section.
- Mobile menu opens (`aria-expanded` toggles) and closes after a link is chosen, landing on the right section.
- Both phone numbers render as `tel:+91…` links; the form and Maps buttons open in a new tab with `rel="noopener noreferrer"`.
- `forms.gle/69quUsz8yt7kqCgj8` resolves to the form ID used in `GOOGLE_FORM_EMBED_URL`, and
  `maps.app.goo.gl/8YqJ9DueV8WkDSeJ8` resolves to the coordinates used in `GOOGLE_MAPS_EMBED_URL`.

## Not verified / unresolved

1. **The Google Form and Google Map iframes were not seen rendering.** The test sandbox cannot reach Google, so both
   frames stayed blank. Run `npm run dev` on a normal connection and confirm both appear. If the form does not embed,
   check that it is accepting responses and is not restricted to signed-in users.
2. **Street address.** None was supplied; the Location section says the exact location is on the map. The venue name
   shown is the one printed on the poster and form (the ministry name), which is not a verified street address.
3. **Map pin.** The embed uses the coordinates your short link redirects to. Please confirm the pin is the correct entrance.
4. **Copy approval.** The About text and its five themes (worship, prayer, Bible teaching, fellowship, encouragement)
   are generic wording written from the brief, not from an official programme. No speakers or schedule are listed.
5. **Logo.** No ministry logo was supplied; the navbar uses a simple placeholder cross mark.
6. Not done: Lighthouse/performance audit, screen-reader testing, real-device testing (iOS Safari, Android Chrome), deployment.
7. The `+91` prefix on phone links is assumed from the Indian numbers; the visible text is exactly as on the poster.
