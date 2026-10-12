import { assetUrl } from '../lib/assetUrl'
import {
  GOOGLE_FORM_EMBED_URL,
  GOOGLE_FORM_URL,
  eventConfig as youthEventConfig,
} from './event'
import {
  Contact,
  SITE_URL,
  Venue,
  sharedContacts,
  sharedVenue,
} from './ministry'

export type EventId = 'family-prayer' | 'youth-meeting'

export interface Poster {
  src: string
  smallSrc?: string
  altTa: string
  altEn: string
  width: number
  height: number
}

export interface Speaker {
  roleTa: string
  roleEn: string
  nameTa: string
  nameEn: string
  qualification?: string
  placeTa?: string
  placeEn?: string
  avatar?: string
  card?: string
}

export interface Notice {
  ta: string
  en: string
}

export interface EventConfig {
  id: EventId
  slug: string
  path: string
  titleTa: string
  titleEn: string
  themeTa?: string
  themeEn?: string
  themeLine1Ta?: string
  themeLine2Ta?: string
  descriptionTa: string
  descriptionEn: string
  startIso: string
  endIso: string
  displayDateTa: string
  displayDateEn: string
  displayTimeTa: string
  displayTimeEn: string
  weekdayEn: string
  poster: Poster
  registration: {
    shareUrl: string
    embedUrl?: string
  }
  venue: Venue
  contacts: Contact[]
  speakers: Speaker[]
  notices: Notice[]
  seo: {
    title: string
    description: string
    ogImage: string
  }
  accent: 'family' | 'youth'
}

export const ROUTES = {
  HOME: '/',
  FAMILY_PRAYER: '/family-prayer',
  YOUTH_MEETING: '/youth-meeting',
} as const

export const familyPrayerEvent: EventConfig = {
  id: 'family-prayer',
  slug: 'family-prayer',
  path: ROUTES.FAMILY_PRAYER,
  titleTa: 'குடும்ப ஆசீர்வாதக் கூட்டம்',
  titleEn: 'Family Prayer Meeting',
  descriptionTa:
    'இயேசுவே மெய்யான ஒளி ஊழியங்கள் நடத்தும் குடும்ப ஆசீர்வாதக் கூட்டம் — அக்டோபர் 19, 2026 திங்கள், காலை 9:30 மணி முதல் மதியம் 1 மணி வரை.',
  descriptionEn:
    'Family Prayer Meeting organized by Jesus the True Light Ministries on Monday, 19 October 2026, 9:30 AM to 1:00 PM.',
  startIso: '2026-10-19T09:30:00+05:30',
  endIso: '2026-10-19T13:00:00+05:30',
  displayDateEn: '19 October 2026',
  weekdayEn: 'Monday',
  displayTimeEn: '9:30 AM – 1:00 PM',
  displayTimeTa: 'காலை 9:30 மணி முதல் மதியம் 1 மணி வரை',
  displayDateTa: 'அக்டோபர் 19, 2026 திங்கள்',
  poster: {
    src: assetUrl('images/poster-family-v1.webp'),
    smallSrc: undefined,
    width: 853,
    height: 1280,
    altTa: 'குடும்ப ஆசீர்வாதக் கூட்டம் அதிகாரப்பூர்வ சுவரொட்டி — அக்டோபர் 19, 2026',
    altEn:
      'Official poster: Family Prayer Meeting, Monday 19 October 2026, 9:30 AM to 1:00 PM, Jesus the True Light Ministries',
  },
  registration: {
    shareUrl: 'https://forms.gle/KD67MRaaUvF91KKA7',
    embedUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSdJj0AT5BQ978MCK-W0taUzpWEzxRY1QgK5TJxqsl_EFXSbvw/viewform?embedded=true',
  },
  venue: sharedVenue,
  contacts: sharedContacts,
  speakers: [
    {
      roleTa: 'தேவ செய்தி',
      roleEn: "God's Message",
      nameTa: 'Pr. S. ஜான்',
      nameEn: 'Pr. S. John',
      placeTa: 'AG சபை, ஆந்தியூர்',
      placeEn: 'AG Church, Anthiyur',
      avatar: assetUrl('images/speaker-john-face.webp'),
      card: assetUrl('images/speaker-john-full.webp'),
    },
    {
      roleTa: 'சபை போதகர்',
      roleEn: 'Church Pastor',
      nameTa: 'Pr. அந்தோணி டேவிட்',
      nameEn: 'Pr. Anthony David',
      avatar: assetUrl('images/speaker-anthony-face.webp'),
      card: assetUrl('images/speaker-anthony-full.webp'),
    },
  ],
  notices: [
    {
      ta: 'மதிய உணவு வழங்கப்படும்',
      en: 'Lunch will be provided.',
    },
  ],
  seo: {
    title: 'குடும்ப ஆசீர்வாதக் கூட்டம் | Family Prayer Meeting – 2026',
    description:
      'இயேசுவே மெய்யான ஒளி ஊழியங்கள் நடத்தும் குடும்ப ஆசீர்வாதக் கூட்டம் — அக்டோபர் 19, 2026 திங்கள், காலை 9:30 மணி முதல் மதியம் 1 மணி வரை. Family Prayer Meeting 2026 by Jesus the True Light Ministries.',
    ogImage: `${SITE_URL}/images/poster-family-v1.jpg`,
  },
  accent: 'family',
}

export const youthMeetingEvent: EventConfig = {
  id: 'youth-meeting',
  slug: 'youth-meeting',
  path: ROUTES.YOUTH_MEETING,
  titleTa: youthEventConfig.title.ta,
  titleEn: youthEventConfig.title.en,
  themeTa: youthEventConfig.theme.ta,
  themeEn: youthEventConfig.theme.en,
  themeLine1Ta: youthEventConfig.theme.taLine1,
  themeLine2Ta: youthEventConfig.theme.taLine2,
  descriptionTa:
    'வாலிபனே எழும்பிப் பிரகாசி! இயேசுவே மெய்யான ஒளி ஊழியங்கள் நடத்தும் வாலிபர் கூடுகை — 20 அக்டோபர் 2026, காலை 10 மணி முதல் மதியம் 1 மணி வரை.',
  descriptionEn:
    'Young Man, Arise and Shine! Youth Meeting organized by Jesus the True Light Ministries on Tuesday, 20 October 2026, 10:00 AM to 1:00 PM.',
  startIso: '2026-10-20T10:00:00+05:30',
  endIso: '2026-10-20T13:00:00+05:30',
  displayDateEn: youthEventConfig.date.en,
  weekdayEn: 'Tuesday',
  displayTimeEn: youthEventConfig.time.en,
  displayTimeTa: youthEventConfig.time.ta,
  displayDateTa: `${youthEventConfig.date.monthTa} ${youthEventConfig.date.dayNumber}, ${youthEventConfig.date.year} செவ்வாய்`,
  poster: {
    src: youthEventConfig.images.poster,
    smallSrc: youthEventConfig.images.posterSmall,
    width: 682,
    height: 1024,
    altTa: 'வாலிபர் கூடுகை Youth Meeting 2026 அதிகாரப்பூர்வ சுவரொட்டி — 20 அக்டோபர் 2026',
    altEn:
      'Official event poster: Youth Meeting 2026 with integrated QR code, 20 October 2026',
  },
  registration: {
    shareUrl: GOOGLE_FORM_URL,
    embedUrl: GOOGLE_FORM_EMBED_URL,
  },
  venue: sharedVenue,
  contacts: sharedContacts,
  speakers: youthEventConfig.speakers.map((s) => ({
    roleTa: s.roleTa,
    roleEn: s.roleEn,
    nameTa: s.nameTa,
    nameEn: s.nameEn,
    qualification: 'qualification' in s ? (s as any).qualification : undefined,
    avatar: s.avatar,
    card: s.card,
  })),
  notices: [
    {
      ta: youthEventConfig.food.ta,
      en: youthEventConfig.food.en,
    },
  ],
  seo: {
    title: 'வாலிபர் கூடுகை | Youth Meeting – 2026',
    description:
      'வாலிபனே எழும்பிப் பிரகாசி! இயேசுவே மெய்யான ஒளி ஊழியங்கள் நடத்தும் வாலிபர் கூடுகை — 20 அக்டோபர் 2026, காலை 10 மணி முதல் மதியம் 1 மணி வரை. Youth Meeting 2026 by Jesus the True Light Ministries.',
    ogImage: `${SITE_URL}/images/poster-small-v3.webp`,
  },
  accent: 'youth',
}

export const EVENTS: EventConfig[] = [familyPrayerEvent, youthMeetingEvent]

export function getEvent(id: EventId | string): EventConfig | undefined {
  return EVENTS.find((e) => e.id === id || e.slug === id || e.path === id)
}
