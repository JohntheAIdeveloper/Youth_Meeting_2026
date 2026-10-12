import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { SECTION_IDS, eventConfig as c } from '../config/event'
import BrushEdge from './BrushEdge'
import CountdownTimer from './CountdownTimer'
import PosterViewer from './PosterViewer'

export default function HeroSection() {
  return (
    <section id={SECTION_IDS.home} aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-midnight-900">
      {/* Cinematic backdrop: the sunrise / cross scene from the official poster */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={c.images.heroBackdrop}
          alt=""
          className="absolute right-0 top-0 h-full w-full object-cover object-[62%_30%] opacity-95 lg:object-[70%_30%]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-900 via-midnight-900/80 to-transparent lg:via-midnight-900/55 lg:to-midnight-900/0" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-transparent to-midnight-900/55" />
        <div className="absolute right-[14%] top-[34%] h-72 w-72 rounded-full bg-gold-400/30 blur-3xl animate-glow" />
      </div>
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-28 pt-28 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-10 lg:pb-32">
        <div className="hero-rise">
          <p className="font-display text-lg font-bold text-white sm:text-xl">
            {c.ministry.ta} <span className="font-medium text-gold-300">{c.ministry.presents}</span>
          </p>

          <h1 id="hero-title" className="mt-4">
            <span className="block font-display text-[2.1rem] font-extrabold leading-tight text-white sm:text-5xl">{c.title.ta}</span>
            <span className="mt-3 inline-block rounded-sm bg-ribbon px-5 py-1.5 font-display text-lg font-bold text-white shadow-[0_6px_18px_-6px_rgba(142,27,31,.9)] sm:text-xl">
              {c.title.en}
            </span>
          </h1>

          <p className="mt-7 font-display font-extrabold leading-[1.25]" lang="ta">
            <span className="gold-text-sheen block animate-sheen text-[3.1rem] sm:text-7xl lg:text-[5.5rem]">{c.theme.taLine1}</span>
            <span className="block text-[2.3rem] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,.55)] sm:text-6xl lg:text-[4.1rem]" style={{ textWrap: 'balance' }}>
              {c.theme.taLine2}
            </span>
          </p>
          <p className="mt-2 font-display text-lg font-medium italic text-white/80 sm:text-xl">{c.theme.en}</p>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-white">
            <div className="flex items-center gap-3">
              <CalendarDays className="shrink-0 text-gold-400" size={24} aria-hidden="true" />
              <div>
                <dt className="sr-only">Date</dt>
                <dd className="font-display text-lg font-bold">
                  <time dateTime={c.date.iso}>{c.date.en}</time>
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="shrink-0 text-gold-400" size={24} aria-hidden="true" />
              <div>
                <dt className="sr-only">Time</dt>
                <dd className="font-display text-lg font-bold">
                  {c.time.en} <span className="block text-base font-medium text-white/75 sm:inline sm:before:content-['·_']">{c.time.ta}</span>
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={`#${SECTION_IDS.register}`} className="btn btn-gold">
              பதிவு செய்யுங்கள் | Register Now
            </a>
            <a href={`#${SECTION_IDS.location}`} className="btn btn-outline">
              <MapPin size={20} aria-hidden="true" />
              இடம் | View Location
            </a>
          </div>

          {/* Countdown Timer */}
          <div className="mt-8 max-w-md">
            <CountdownTimer targetIso="2026-10-20T10:00:00+05:30" accent="youth" />
          </div>
        </div>

        {/* The actual poster, framed with interactive lightbox */}
        <div className="justify-self-center lg:justify-self-end w-full max-w-sm lg:max-w-md">
          <PosterViewer
            poster={{
              src: c.images.poster,
              smallSrc: c.images.posterSmall,
              width: 682,
              height: 1024,
              altTa: 'வாலிபர் கூடுகை Youth Meeting 2026 அதிகாரப்பூர்வ சுவரொட்டி',
              altEn: 'Official event poster: Youth Meeting 2026 with integrated QR code, 20 October 2026',
            }}
            badgeText="அதிகாரப்பூர்வ சுவரொட்டி | Official Poster (QR Code)"
            accent="youth"
          />
        </div>
      </div>
      <BrushEdge edge="bottom" colorClass="text-cream" seed={3} />
    </section>
  )
}
