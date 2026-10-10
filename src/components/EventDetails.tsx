import { CalendarDays, Clock, ConciergeBell, MapPin } from 'lucide-react'
import { SECTION_IDS, eventConfig as c } from '../config/event'
import Section from './Section'
import SectionHeading from './SectionHeading'

export default function EventDetails() {
  return (
    <Section id={SECTION_IDS.details} tone="navy" labelledBy="details-title" brushTop="text-cream" seed={5}>
      <SectionHeading id="details-title" ta="நிகழ்வு விவரங்கள்" en="Event details" tone="navy" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1.15fr_1.15fr]">
        <article className="tile flex items-center gap-5">
          <CalendarDays size={40} className="shrink-0 text-gold-400" aria-hidden="true" />
          <div>
            <h3 className="font-display text-lg text-white/85">{c.date.monthTa}</h3>
            <p className="font-display text-6xl font-extrabold leading-none gold-text">{c.date.dayNumber}</p>
            <p className="mt-1 font-display text-lg font-bold tracking-wide text-white">
              <time dateTime={c.date.iso}>{c.date.year}</time>
            </p>
            <p className="sr-only">{c.date.en}</p>
          </div>
        </article>

        <article className="tile">
          <Clock size={32} className="text-gold-400" aria-hidden="true" />
          <h3 className="mt-3 font-display text-xl font-bold leading-snug text-white">{c.time.ta}</h3>
          <p className="mt-2 text-white/75">{c.time.en}</p>
        </article>

        <article className="tile sm:col-span-2 lg:col-span-1">
          <MapPin size={32} className="text-gold-400" aria-hidden="true" />
          <h3 className="mt-3 font-display text-xl font-bold leading-snug text-white">{c.venue.nameTa}</h3>
          <p className="mt-2 text-white/75">{c.venue.nameEn}</p>
          <p className="mt-3 text-sm text-white/60">
            <a href={`#${SECTION_IDS.location}`} className="underline decoration-gold-500 underline-offset-4 hover:text-gold-300">
              இடத்தைப் பார் | See location
            </a>
          </p>
        </article>
      </div>

      {/* Lunch ribbon, as on the poster */}
      <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-4 rounded-full border-2 border-gold-500/70 bg-cream px-6 py-3.5 text-midnight-800 shadow-gold">
        <ConciergeBell size={32} className="shrink-0 text-ribbon" aria-hidden="true" />
        <p className="text-center leading-tight">
          <span className="block font-display text-xl font-extrabold text-ribbon">{c.food.ta}</span>
          <span className="block text-sm text-midnight-800/75">{c.food.en}</span>
        </p>
      </div>

      <div className="mt-10 text-center">
        <a href={`#${SECTION_IDS.register}`} className="btn btn-gold">
          பதிவு செய்யுங்கள் | Register Now
        </a>
      </div>
    </Section>
  )
}
