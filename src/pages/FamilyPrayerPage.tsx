import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Clock,
  ConciergeBell,
  ExternalLink,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  User,
} from 'lucide-react'
import CountdownTimer from '../components/CountdownTimer'
import CrossEventNotice from '../components/CrossEventNotice'
import FamilyAboutSection from '../components/FamilyAboutSection'
import Footer from '../components/Footer'
import PosterViewer from '../components/PosterViewer'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import SiteNav from '../components/SiteNav'
import { familyPrayerEvent } from '../config/events'
import { ministryConfig } from '../config/ministry'

const SLOW_LOAD_MS = 12000

export default function FamilyPrayerPage() {
  const event = familyPrayerEvent
  const [formLoaded, setFormLoaded] = useState(false)
  const [slowLoad, setSlowLoad] = useState(false)

  useEffect(() => {
    document.title = event.seo.title
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [event.seo.title])

  useEffect(() => {
    if (formLoaded) return
    const t = window.setTimeout(() => setSlowLoad(true), SLOW_LOAD_MS)
    return () => window.clearTimeout(t)
  }, [formLoaded])

  return (
    <>
      <a
        href="#register"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-bold focus:text-midnight-900"
      >
        பதிவுக்குச் செல் | Skip to registration
      </a>

      <SiteNav
        registerHref="#register"
        registerLabelTa="பதிவு (அக் 19)"
        registerLabelEn="Register (19 Oct)"
      />

      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          aria-labelledby="hero-title"
          className="relative isolate overflow-hidden bg-midnight-900 pb-20 pt-28 sm:pb-28 sm:pt-36"
        >
          {/* Subtle warm glow background */}
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute right-[10%] top-[20%] h-96 w-96 rounded-full bg-ribbon/30 blur-[100px] animate-glow" />
            <div className="absolute left-[10%] bottom-[20%] h-80 w-80 rounded-full bg-gold-400/20 blur-[100px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight-900/90 via-midnight-900 to-midnight-950" />
          </div>

          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                <p className="font-display text-base font-bold text-white sm:text-lg">
                  {ministryConfig.name.ta}{' '}
                  <span className="text-gold-300 font-medium">நடத்தும்</span>
                </p>

                <div className="mt-4">
                  <span className="inline-block rounded-full bg-ribbon px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(142,27,31,.7)]">
                    குடும்ப ஆசீர்வாதக் கூட்டம் · 19 OCT 2026
                  </span>
                  <h1
                    id="hero-title"
                    className="mt-4 font-display text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
                    style={{ textWrap: 'balance' }}
                  >
                    {event.titleTa}
                  </h1>
                  <p className="mt-3 font-display text-xl font-bold text-gold-300 sm:text-2xl">
                    {event.titleEn}
                  </p>
                </div>

                <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-white">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="shrink-0 text-gold-400" size={24} aria-hidden="true" />
                    <div>
                      <dt className="sr-only">Date</dt>
                      <dd className="font-display text-lg font-bold">
                        {event.displayDateEn}
                        <span className="block text-sm font-normal text-white/70">
                          {event.displayDateTa}
                        </span>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="shrink-0 text-gold-400" size={24} aria-hidden="true" />
                    <div>
                      <dt className="sr-only">Time</dt>
                      <dd className="font-display text-lg font-bold">
                        {event.displayTimeEn}
                        <span className="block text-sm font-normal text-white/70">
                          {event.displayTimeTa}
                        </span>
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#register" className="btn btn-gold">
                    பதிவு செய்யுங்கள் | Register Now
                  </a>
                  <a href="#location" className="btn btn-outline">
                    <MapPin size={20} aria-hidden="true" />
                    இடம் | View Location
                  </a>
                </div>

                {/* Countdown */}
                <div className="mt-8 max-w-md">
                  <CountdownTimer targetIso={event.startIso} accent="family" />
                </div>
              </div>

              {/* Poster frame with interactive lightbox */}
              <div className="justify-self-center lg:justify-self-end w-full max-w-sm lg:max-w-md">
                <PosterViewer
                  poster={event.poster}
                  badgeText="அதிகாரப்பூர்வ சுவரொட்டி | Official Poster (19 Oct 2026)"
                  accent="family"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cross Event Notification */}
        <CrossEventNotice currentEvent="family-prayer" />

        {/* ABOUT SECTION (Matches Youth Meeting workflow) */}
        <FamilyAboutSection />

        {/* EVENT DETAILS SECTION */}
        <Section
          id="details"
          tone="navy"
          labelledBy="family-details-title"
          brushTop="text-cream"
          seed={15}
        >
          <SectionHeading
            id="family-details-title"
            ta="நிகழ்வு விவரங்கள்"
            en="Event Details"
            tone="navy"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="tile flex items-center gap-5">
              <CalendarDays size={40} className="shrink-0 text-gold-400" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg text-white/85">அக்டோபர்</h3>
                <p className="font-display text-6xl font-extrabold leading-none gold-text">19</p>
                <p className="mt-1 font-display text-lg font-bold tracking-wide text-white">
                  2026 திங்கள் | Monday
                </p>
              </div>
            </article>

            <article className="tile">
              <Clock size={32} className="text-gold-400" aria-hidden="true" />
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-white">
                {event.displayTimeTa}
              </h3>
              <p className="mt-2 text-white/75">{event.displayTimeEn}</p>
            </article>

            <article className="tile sm:col-span-2 lg:col-span-1">
              <MapPin size={32} className="text-gold-400" aria-hidden="true" />
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-white">
                {event.venue.nameTa}
              </h3>
              <p className="mt-2 text-white/75">{event.venue.nameEn}</p>
              <p className="mt-3 text-sm text-white/60">
                <a
                  href="#location"
                  className="underline decoration-gold-500 underline-offset-4 hover:text-gold-300"
                >
                  இடத்தைப் பார் | See location
                </a>
              </p>
            </article>
          </div>

          {/* Featured Speakers with studio portraits */}
          <div className="mt-12">
            <h3 className="mb-6 text-center font-display text-2xl font-bold text-gold-300">
              சிறப்புச் செய்தி & போதகர் | Speakers & Ministry
            </h3>
            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              {event.speakers.map((s) => (
                <article
                  key={s.nameEn}
                  className="tile flex items-center gap-5 border border-gold-500/30 bg-midnight-800/90 p-5 transition-colors hover:border-gold-400"
                >
                  {s.avatar ? (
                    <img
                      src={s.avatar}
                      alt={s.nameEn}
                      width={112}
                      height={112}
                      className="h-24 w-24 shrink-0 rounded-2xl border-2 border-gold-400 object-cover shadow-lg sm:h-28 sm:w-28"
                    />
                  ) : (
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gold-400/15 text-gold-300 border border-gold-400/30">
                      <User size={32} aria-hidden="true" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="inline-block rounded bg-ribbon px-2.5 py-0.5 font-display text-xs font-bold text-white shadow-sm">
                      {s.roleTa} <span className="text-white/75">· {s.roleEn}</span>
                    </span>
                    <h4 className="mt-2 font-display text-xl font-bold text-white">
                      {s.nameTa}
                    </h4>
                    <p className="text-sm font-semibold text-gold-300">
                      {s.nameEn}
                    </p>
                    {s.placeTa && (
                      <p className="mt-1 text-xs text-white/70">
                        {s.placeTa} · {s.placeEn}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Lunch ribbon */}
          <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-4 rounded-full border-2 border-gold-500/70 bg-cream px-6 py-3.5 text-midnight-800 shadow-gold">
            <ConciergeBell size={32} className="shrink-0 text-ribbon" aria-hidden="true" />
            <p className="text-center leading-tight">
              <span className="block font-display text-xl font-extrabold text-ribbon">
                {event.notices[0].ta}
              </span>
              <span className="block text-sm text-midnight-800/75">
                {event.notices[0].en}
              </span>
            </p>
          </div>

          <div className="mt-10 text-center">
            <a href="#register" className="btn btn-gold">
              பதிவு செய்யுங்கள் | Register Now
            </a>
          </div>
        </Section>

        {/* REGISTRATION SECTION (With Embedded Google Form — Matches Youth Meeting Workflow) */}
        <Section
          id="register"
          tone="cream"
          labelledBy="family-register-title"
          brushTop="text-midnight-800"
          seed={19}
        >
          <SectionHeading
            id="family-register-title"
            ta="பதிவு செய்யுங்கள்"
            en="Register for Family Prayer Meeting"
            tone="cream"
          />
          <p className="-mt-6 mb-8 max-w-2xl text-lg text-midnight-800/90 sm:-mt-8">
            கீழே உள்ள அதிகாரப்பூர்வ கூகுள் படிவத்தை நிரப்பி உங்கள் பதிவை உறுதிப்படுத்துங்கள்.
            <span className="mt-1 block text-midnight-800/75">
              Please complete the official registration form below to confirm your seat for the Family Prayer Meeting (19 October 2026).
            </span>
          </p>

          <div className="rounded-2xl bg-gradient-to-b from-ribbon via-gold-500 to-ribbon p-[3px] shadow-deep">
            <div className="relative overflow-hidden rounded-[0.85rem] bg-white">
              {!formLoaded && (
                <div
                  className="absolute inset-0 z-10 grid place-items-center bg-white text-midnight-800"
                  role="status"
                >
                  <p className="flex items-center gap-3 font-display text-lg font-bold">
                    <Loader2 className="animate-spin text-ribbon" size={24} aria-hidden="true" />
                    படிவம் ஏற்றப்படுகிறது… | Loading form…
                  </p>
                </div>
              )}
              {event.registration.embedUrl && (
                <iframe
                  title="குடும்ப ஆசீர்வாதக் கூட்டம் 2026 பதிவு படிவம் — Family Prayer Meeting 2026 registration form (Google Forms)"
                  src={event.registration.embedUrl}
                  onLoad={() => setFormLoaded(true)}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="block h-[1750px] w-full max-w-full border-0 sm:h-[1500px] lg:h-[1450px]"
                >
                  படிவம் ஏற்றப்படவில்லை. Loading…
                </iframe>
              )}
            </div>
          </div>

          {slowLoad && !formLoaded && (
            <p
              className="mt-5 rounded-xl border border-ribbon/40 bg-ribbon/10 p-4 text-midnight-800"
              role="alert"
            >
              படிவம் இங்கே காட்டப்படவில்லை என்றால் கீழுள்ள பொத்தானைப் பயன்படுத்தி தனி தாவலில் திறக்கவும்.
              <span className="block text-midnight-800/75">
                If the form does not appear here, use the button below to open it directly in a new tab.
              </span>
            </p>
          )}

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={event.registration.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-gradient-to-b from-ribbon to-[#A52025] text-white shadow-lg hover:brightness-110"
            >
              <ExternalLink size={20} aria-hidden="true" />
              படிவத்தைத் தனி தாவலில் திற | Open Registration Form
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={event.poster.src}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-midnight-900/20 bg-white/80 text-midnight-900 shadow-sm hover:bg-white"
            >
              சுவரொட்டியைக் காண்க | View Poster
            </a>
          </div>
        </Section>

        {/* LOCATION SECTION */}
        <Section
          id="location"
          tone="navy"
          labelledBy="family-location-title"
          brushTop="text-cream"
          seed={23}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
            <div>
              <SectionHeading
                id="family-location-title"
                ta="நிகழ்வு நடைபெறும் இடம்"
                en="Location & Directions"
                tone="navy"
              />

              <div className="flex items-start gap-4">
                <MapPin size={30} className="mt-1 shrink-0 text-gold-400" aria-hidden="true" />
                <div>
                  <p className="font-display text-2xl font-bold leading-snug text-white">
                    {event.venue.nameTa}
                  </p>
                  <p className="text-white/75">{event.venue.nameEn}</p>
                  <p className="mt-3 text-white/70">
                    சரியான இடத்தை வரைபடத்தில் காணலாம்.
                    <span className="block text-sm text-white/55">
                      The exact location is shown on Google Maps below.
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={event.venue.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
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
                  title="குடும்ப ஆசீர்வாதக் கூட்டம் இடம் — Event location on Google Maps"
                  src={event.venue.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block aspect-[4/3] min-h-[18rem] w-full border-0 sm:aspect-[16/10]"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section
          id="contact"
          tone="cream"
          labelledBy="family-contact-title"
          brushTop="text-midnight-800"
          seed={27}
        >
          <SectionHeading
            id="family-contact-title"
            ta="தொடர்புக்கு"
            en="Contact the organizers"
            tone="cream"
          />

          <ul className="grid gap-5 md:grid-cols-2">
            {event.contacts.map((p) => (
              <li
                key={p.tel}
                className="rounded-2xl border border-midnight-800/15 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(11,27,51,.45)] sm:p-8"
              >
                <p className="font-display text-2xl font-extrabold text-midnight-800">
                  {p.nameTa}
                </p>
                <p className="text-midnight-800/70">{p.nameEn}</p>
                <a
                  href={`tel:${p.tel}`}
                  className="mt-5 flex min-h-[3.5rem] items-center gap-3 rounded-xl bg-midnight-800 px-5 py-3 text-gold-300 transition hover:bg-midnight-700"
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

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-400/30 bg-midnight-950/95 p-3 backdrop-blur-md sm:hidden">
        <a
          href="#register"
          className="btn bg-gradient-to-b from-ribbon to-[#A52025] text-white shadow-lg w-full !min-h-[3rem] !text-base font-bold"
        >
          <span>பதிவு — குடும்ப ஆசீர்வாதம் (அக் 19)</span>
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </>
  )
}
