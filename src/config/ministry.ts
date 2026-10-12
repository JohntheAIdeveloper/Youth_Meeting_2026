import { assetUrl } from '../lib/assetUrl'

/**
 * Production canonical site URL for social share / Open Graph previews.
 */
export const SITE_URL = 'https://jtlmofficial.vercel.app'

export interface Contact {
  nameTa?: string
  nameEn: string
  display: string
  tel: string
}

export interface Venue {
  nameTa: string
  nameEn: string
  address?: string
  lat: number
  lng: number
  directionsUrl: string
  embedUrl: string
}

export const ministryConfig = {
  name: {
    ta: 'இயேசுவே மெய்யான ஒளி ஊழியங்கள்',
    en: 'Jesus the True Light Ministries',
    presents: 'நடத்தும்',
  },
  logos: {
    logo: assetUrl('images/logo.png'),
    logoTight: assetUrl('images/logo-tight.png'),
    logoWebp: assetUrl('images/logo.webp'),
  },
} as const

export const sharedVenue: Venue = {
  nameTa: 'இயேசுவே மெய்யான ஒளி ஊழியங்கள்',
  nameEn: 'Jesus the True Light Ministries',
  address: '',
  lat: 11.361147,
  lng: 77.703681,
  directionsUrl: 'https://maps.app.goo.gl/8YqJ9DueV8WkDSeJ8',
  embedUrl: 'https://www.google.com/maps?q=11.361147,77.703681&z=16&hl=en&output=embed',
}

export const sharedContacts: Contact[] = [
  {
    nameTa: 'Pr. அந்தோணி டேவிட்',
    nameEn: 'Pr. Anthony David',
    display: '63804 15393',
    tel: '+916380415393',
  },
  {
    nameTa: 'Bro. ஜான் டேவிட்',
    nameEn: 'Bro. John David',
    display: '80565 55393',
    tel: '+918056555393',
  },
]
