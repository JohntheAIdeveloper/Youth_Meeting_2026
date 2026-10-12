import { useEffect } from 'react'
import { Calendar, Info, MapPin, Navigation, Phone } from 'lucide-react'
import EventCard from '../components/EventCard'
import Footer from '../components/Footer'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import SiteNav from '../components/SiteNav'
import { EVENTS } from '../config/events'
import { ministryConfig, sharedContacts, sharedVenue } from '../config/ministry'

export default function EventsHome() {
  useEffect(() => {
    document.title =
      'இயேசுவே மெய்யான ஒளி ஊழியங்கள் | JTLM Special Meetings — October 2026'
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <>
      <a
        href="#events"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-bold focus:text-midnight-900"
      >
        கூட்டங்களின் விவரங்களுக்குச் செல் | Skip to events
      </a>

      <SiteNav
        registerHref="#events"
        registerLabelTa="கூட்டங்கள் | Events"
        registerLabelEn="Events"
      />

      <main>
        {/* HERO HUB */}
        <section
          id="home"
          aria-labelledby="hub-title"
          className="relative isolate overflow-hidden bg-midnight-900 pb-20 pt-28 sm:pb-28 sm:pt-36 text-center"
        >
          {/* Ambient Lighting */}
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-96 w-96 sm:w-[600px] rounded-full bg-gold-400/15 blur-[120px] animate-glow" />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight-900/90 via-midnight-900 to-midnight-950" />
          </div>

          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 font-display text-sm font-bold text-gold-300">
              <Calendar size={16} aria-hidden="true" />
              <span>19 & 20 அக்டோபர் 2026 · October 2026</span>
            </div>

            <p className="font-display text-lg font-bold text-white sm:text-xl">
              {ministryConfig.name.ta}
              <span className="block text-sm font-normal text-white/70">
                {ministryConfig.name.en}
              </span>
            </p>

            <h1
              id="hub-title"
              className="mt-5 font-display text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
              style={{ textWrap: 'balance' }}
            >
              இரண்டு ஆசீர்வாதக் கூட்டங்கள்
              <span className="gold-text block text-2xl sm:text-4xl lg:text-5xl mt-2 font-extrabold">
                Two Special Meetings
              </span>
            </h1>

            <p className="mt-4 text-base text-white/80 sm:text-lg max-w-2xl mx-auto" lang="ta">
              இயேசுவே மெய்யான ஒளி ஊழியங்கள் நடத்தும் குடும்ப ஆசீர்வாதக் கூட்டம் மற்றும் வாலிபர் கூடுகை. அனைவரும் அன்புடன் அழைக்கப்படுகிறீர்கள்!
            </p>

            {/* Crucial Multi-event notice to prevent wrong-form registration */}
            <div
              className="mt-8 flex items-center gap-3 rounded-2xl border border-gold-400/50 bg-midnight-800/90 p-4 text-left shadow-deep sm:p-5"
              role="note"
            >
              <Info size={24} className="shrink-0 text-gold-400" aria-hidden="true" />
              <div className="text-xs sm:text-sm">
                <p className="font-display font-bold text-white">
                  இரண்டு தனித்தனி கூட்டங்கள் — ஒவ்வொன்றிற்கும் தனித்தனியாக பதிவு செய்யவும்.
                </p>
                <p className="text-white/75">
                  Two separate meetings — please register for each event individually.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS SECTION: TWO EQUAL-WEIGHT CARDS */}
        <Section
          id="events"
          tone="navy"
          labelledBy="events-grid-title"
          brushTop="text-midnight-900"
          seed={31}
        >
          <SectionHeading
            id="events-grid-title"
            ta="கூட்டங்களின் விவரங்கள்"
            en="Event Cards & Registration"
            tone="navy"
            align="center"
          />

          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {EVENTS.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </Section>

        {/* SHARED VENUE & MAP SECTION */}
        <Section
          id="location"
          tone="cream"
          labelledBy="hub-location-title"
          brushTop="text-midnight-800"
          seed={35}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
            <div>
              <SectionHeading
                id="hub-location-title"
                ta="நிகழ்வு நடைபெறும் இடம்"
                en="Venue & Location"
                tone="cream"
              />

              <div className="flex items-start gap-4">
                <MapPin size={30} className="mt-1 shrink-0 text-ribbon" aria-hidden="true" />
                <div>
                  <p className="font-display text-2xl font-bold leading-snug text-midnight-900">
                    {sharedVenue.nameTa}
                  </p>
                  <p className="text-midnight-800/80">{sharedVenue.nameEn}</p>
                  <p className="mt-3 text-sm text-midnight-800/70">
                    இரு கூட்டங்களும் ஒரே இடத்தில் நடைபெறுகின்றன. வரைபடத்தில் சரியான இடத்தைக் காணலாம்.
                    <span className="block mt-0.5 text-xs text-midnight-800/60">
                      Both meetings will be held at this same venue.
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={sharedVenue.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-navy"
                >
                  <Navigation size={20} aria-hidden="true" />
                  வழிகாட்டு | Get Directions
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 p-[3px] shadow-deep">
              <div className="overflow-hidden rounded-[0.85rem] bg-midnight-700">
                <iframe
                  title="இரு கூட்டங்கள் நடைபெறும் இடம் — Venue location on Google Maps"
                  src={sharedVenue.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block aspect-[4/3] min-h-[18rem] w-full border-0 sm:aspect-[16/10]"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* SHARED CONTACTS SECTION */}
        <Section
          id="contact"
          tone="navy"
          labelledBy="hub-contact-title"
          brushTop="text-cream"
          seed={39}
        >
          <SectionHeading
            id="hub-contact-title"
            ta="தொடர்புக்கு"
            en="Contact the Organizers"
            tone="navy"
            align="center"
          />

          <ul className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
            {sharedContacts.map((p) => (
              <li
                key={p.tel}
                className="tile flex flex-col justify-between"
              >
                <div>
                  <p className="font-display text-2xl font-extrabold text-white">
                    {p.nameTa}
                  </p>
                  <p className="text-white/70">{p.nameEn}</p>
                </div>
                <a
                  href={`tel:${p.tel}`}
                  className="mt-5 flex min-h-[3.5rem] items-center gap-3 rounded-xl bg-midnight-700 px-5 py-3 text-gold-300 transition hover:bg-midnight-600"
                  aria-label={`Call ${p.nameEn} at ${p.display}`}
                >
                  <Phone size={24} aria-hidden="true" />
                  <span className="font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">
                    {p.display}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <Footer />
    </>
  )
}
