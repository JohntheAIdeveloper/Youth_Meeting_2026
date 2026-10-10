/**
 * CENTRAL CONFIGURATION — edit values here, nowhere else.
 *
 * Every event fact, integration URL and asset path used by the site lives in
 * this file. Components only read from `eventConfig`.
 *
 * Integration URLs can also be overridden per-deployment with Vite env vars
 * (see .env.example) without touching the code.
 */

const env = import.meta.env

/* ------------------------------------------------------------------ */
/* 1. GOOGLE FORM (registration)                                       */
/* ------------------------------------------------------------------ */

/** Public share link of the EXISTING Google Form. Used by the "open in new tab" buttons. */
export const GOOGLE_FORM_URL: string =
  env.VITE_GOOGLE_FORM_URL || 'https://forms.gle/69quUsz8yt7kqCgj8'

/**
 * URL used inside the iframe.
 *
 * Google only guarantees embedding for the long `docs.google.com/forms/d/e/<ID>/viewform`
 * address with `?embedded=true`. The forms.gle short link resolves to this address:
 * (resolved on 2026-10-10 — re-check if the form is ever replaced).
 */
export const GOOGLE_FORM_EMBED_URL: string =
  env.VITE_GOOGLE_FORM_EMBED_URL ||
  'https://docs.google.com/forms/d/e/1FAIpQLSf708g66SUD35WiFxqYqiII2YWpP4u1V7deH16zcMecf9kA9g/viewform?embedded=true'

/* ------------------------------------------------------------------ */
/* 2. GOOGLE MAPS (location)                                           */
/* ------------------------------------------------------------------ */

/** Official directions link supplied by the organizers. Used by every "Get Directions" button. */
export const GOOGLE_MAPS_URL: string =
  env.VITE_GOOGLE_MAPS_URL || 'https://maps.app.goo.gl/8YqJ9DueV8WkDSeJ8'

/**
 * Embeddable map. No API key required (classic `output=embed` format).
 *
 * The coordinates below were NOT guessed: the official short link above redirects to
 * google.com/maps/search/11.361147,+77.703681 (resolved 2026-10-10). The organizers
 * must still confirm the pin is the exact venue entrance — see README "Unresolved items".
 *
 * Set to an empty string ('') to hide the iframe and show the placeholder card instead.
 */
export const GOOGLE_MAPS_EMBED_URL: string =
  env.VITE_GOOGLE_MAPS_EMBED_URL ??
  'https://www.google.com/maps?q=11.361147,77.703681&z=16&hl=en&output=embed'

/* ------------------------------------------------------------------ */
/* 3. EVENT CONTENT (confirmed from the official poster)               */
/* ------------------------------------------------------------------ */

export const eventConfig = {
  ministry: {
    ta: 'இயேசுவே மெய்யான ஒளி ஊழியங்கள்',
    en: 'Jesus the True Light Ministries',
    presents: 'நடத்தும்',
  },
  title: {
    ta: 'வாலிபர் கூடுகை',
    en: 'Youth Meeting – 2026',
  },
  theme: {
    ta: 'வாலிபனே எழும்பிப் பிரகாசி!',
    // Tamil split for the two-tone headline used on the poster. Joined they equal `ta`.
    taLine1: 'வாலிபனே',
    taLine2: 'எழும்பிப் பிரகாசி!',
    en: 'Young Man, Arise and Shine!',
  },
  date: {
    dayNumber: '20',
    monthTa: 'அக்டோபர்',
    year: '2026',
    en: '20 October 2026',
    /** ISO date for machine-readable markup */
    iso: '2026-10-20',
  },
  time: {
    ta: 'காலை 10 மணி முதல் மதியம் 1 மணி வரை',
    en: '10:00 AM – 1:00 PM',
  },
  food: {
    ta: 'மதிய உணவு வழங்கப்படும்',
    en: 'Lunch will be provided.',
  },
  /** Venue name as printed on the poster and the registration form. */
  venue: {
    nameTa: 'இயேசுவே மெய்யான ஒளி ஊழியங்கள்',
    nameEn: 'Jesus the True Light Ministries',
    /**
     * Street address is to be confirmed. Leave empty so the Location section
     * directs visitors to the embedded map and Get Directions link.
     */
    address: '',
  },
  contacts: [
    { nameTa: 'Pr. அந்தோணி டேவிட்', nameEn: 'Pr. Anthony David', display: '63804 15393', tel: '+916380415393' },
    { nameTa: 'Bro. ஜான் டேவிட்', nameEn: 'Bro. John David', display: '80565 55393', tel: '+918056555393' },
  ],
  images: {
    logo: './images/logo.png',
    logoTight: './images/logo-tight.png',
    logoWebp: './images/logo.webp',
    poster: './images/poster.webp',
    posterSmall: './images/poster-small.webp',
    heroBackdrop: './images/hero-cross.webp',
    worship: './images/worship.webp',
    prayer: './images/prayer.webp',
  },
} as const

export type EventConfig = typeof eventConfig

/** Section ids — used by the navbar, buttons and footer so links can never drift apart. */
export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  details: 'details',
  register: 'register',
  location: 'location',
  contact: 'contact',
} as const
