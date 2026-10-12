import { Calendar, Clock, ExternalLink, ArrowRight, Utensils, User } from 'lucide-react'
import { EventConfig } from '../config/events'
import { Link } from '../lib/router'

interface Props {
  event: EventConfig
}

export default function EventCard({ event }: Props) {
  const isFamily = event.accent === 'family'

  const chipColor = isFamily
    ? 'bg-ribbon text-white shadow-[0_4px_12px_rgba(142,27,31,.6)]'
    : 'bg-gold-400 text-midnight-950 font-extrabold shadow-gold'

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b p-[2px] shadow-deep transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-15px_rgba(242,169,27,.3)]"
      style={{
        backgroundImage: isFamily
          ? 'linear-gradient(180deg, #8E1B1F 0%, #D68A0C 50%, #8E1B1F 100%)'
          : 'linear-gradient(180deg, #1B3A66 0%, #F2A91B 50%, #0B1B33 100%)',
      }}
    >
      <div className="flex flex-1 flex-col rounded-[1.4rem] bg-midnight-900/95 p-6 sm:p-8">
        {/* Top date badge */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-display text-xs font-bold uppercase tracking-wider ${chipColor}`}>
            <Calendar size={14} aria-hidden="true" />
            <span>{event.weekdayEn}, {event.displayDateEn}</span>
          </span>
          <span className="font-display text-xs font-bold text-gold-300">
            {event.displayDateTa}
          </span>
        </div>

        {/* Poster thumbnail & Titles */}
        <div className="mt-6 grid gap-6 sm:grid-cols-[130px_1fr] items-center">
          <div className="relative mx-auto w-32 shrink-0 overflow-hidden rounded-xl border-2 border-gold-400/40 bg-midnight-950 shadow-md">
            <img
              src={event.poster.src}
              alt={event.poster.altTa}
              width={event.poster.width}
              height={event.poster.height}
              loading="lazy"
              className="block h-auto w-full object-contain"
              style={{ aspectRatio: `${event.poster.width}/${event.poster.height}` }}
            />
          </div>

          <div>
            <h3 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">
              {event.titleTa}
            </h3>
            <p className="mt-1 font-display text-lg font-bold text-gold-300">
              {event.titleEn}
            </p>

            {event.themeTa && (
              <p className="mt-2 text-sm font-semibold text-white/90">
                "{event.themeTa}"
                <span className="block text-xs font-normal text-white/60">
                  {event.themeEn}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Event Key facts */}
        <div className="mt-6 space-y-3 rounded-2xl bg-midnight-800/80 p-4 border border-white/5 text-sm">
          <div className="flex items-center gap-3 text-white">
            <Clock size={18} className="shrink-0 text-gold-400" aria-hidden="true" />
            <div>
              <span className="font-display font-bold">{event.displayTimeEn}</span>
              <span className="block text-xs text-white/70">{event.displayTimeTa}</span>
            </div>
          </div>

          {/* Speakers */}
          <div className="flex items-start gap-3 text-white border-t border-white/5 pt-2.5">
            <User size={18} className="shrink-0 text-gold-400 mt-0.5" aria-hidden="true" />
            <div className="text-xs">
              {event.speakers.map((s, idx) => (
                <div key={s.nameEn} className={idx > 0 ? 'mt-1' : ''}>
                  <span className="text-gold-300 font-bold">{s.roleTa}: </span>
                  <span className="text-white font-semibold">{s.nameTa}</span>
                  {s.placeTa && <span className="text-white/60"> ({s.placeTa})</span>}
                  <span className="block text-white/60">
                    {s.roleEn}: {s.nameEn} {s.placeEn ? `(${s.placeEn})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lunch notice */}
          {event.notices.length > 0 && (
            <div className="flex items-center gap-2 border-t border-white/5 pt-2.5 text-xs text-white/90">
              <Utensils size={16} className="text-ribbon" aria-hidden="true" />
              <span className="font-display font-bold text-cream">
                {event.notices[0].ta} · {event.notices[0].en}
              </span>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Link
            to={event.path}
            className="btn btn-outline flex-1 !min-h-[3rem] !text-sm"
          >
            <span>முழு விவரங்கள் | View Details</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <a
            href={event.registration.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${isFamily ? 'bg-gradient-to-b from-ribbon via-[#A52025] to-ribbon text-white hover:brightness-110 shadow-lg' : 'btn-gold'} flex-1 !min-h-[3rem] !text-sm`}
          >
            <span>பதிவு செய்க | Register</span>
            <ExternalLink size={16} aria-hidden="true" />
            <span className="sr-only">(opens Google Form in new tab)</span>
          </a>
        </div>
      </div>
    </article>
  )
}
