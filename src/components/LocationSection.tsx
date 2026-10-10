import { MapPin, Navigation } from 'lucide-react'
import { GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL, SECTION_IDS, eventConfig as c } from '../config/event'
import Section from './Section'
import SectionHeading from './SectionHeading'

export default function LocationSection() {
  const hasEmbed = GOOGLE_MAPS_EMBED_URL.trim().length > 0
  return (
    <Section id={SECTION_IDS.location} tone="navy" labelledBy="location-title" brushTop="text-cream" seed={11}>
      <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeading id="location-title" ta="நிகழ்வு நடைபெறும் இடம்" en="Location" tone="navy" />

          <div className="flex items-start gap-4">
            <MapPin size={30} className="mt-1 shrink-0 text-gold-400" aria-hidden="true" />
            <div>
              <p className="font-display text-2xl font-bold leading-snug text-white">{c.venue.nameTa}</p>
              <p className="text-white/75">{c.venue.nameEn}</p>
              {c.venue.address ? (
                <div className="mt-3">
                  <address className="not-italic text-white/90">{c.venue.address}</address>
                  <p className="mt-1.5 text-xs text-gold-300/80">
                    * துல்லியமான அமைவிடத்தை வரைபடத்தில் காணவும் | Pin represents destination coordinates (11.361147, 77.703681)
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-white/70">
                  சரியான இடத்தை வரைபடத்தில் காணலாம்.
                  <span className="block text-sm text-white/55">The exact location is shown on the map.</span>
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <Navigation size={20} aria-hidden="true" />
              வழிகாட்டு | Get Directions
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 p-[3px] shadow-deep">
          <div className="overflow-hidden rounded-[0.85rem] bg-midnight-700">
            {hasEmbed ? (
              <iframe
                title="நிகழ்வு இடம் — Event location on Google Maps"
                src={GOOGLE_MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block aspect-[4/3] min-h-[18rem] w-full border-0 sm:aspect-[16/10]"
              />
            ) : (
              <div className="grid aspect-[4/3] min-h-[18rem] place-items-center p-8 text-center sm:aspect-[16/10]">
                <div>
                  <MapPin size={44} className="mx-auto text-gold-400" aria-hidden="true" />
                  <p className="mt-3 font-display text-xl font-bold">வரைபடம் விரைவில்</p>
                  <p className="text-white/70">Map preview unavailable. Use Get Directions to open the venue in Google Maps.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
