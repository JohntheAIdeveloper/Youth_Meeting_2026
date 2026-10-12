import { useEffect } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import { Link } from '../lib/router'
import { ROUTES } from '../config/events'
import { ministryConfig } from '../config/ministry'
import { assetUrl } from '../lib/assetUrl'

export default function EventsHome() {
  useEffect(() => {
    document.title =
      'இயேசுவே மெய்யான ஒளி ஊழியங்கள் | JTLM Special Meetings — October 2026'
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-midnight-950 text-white selection:bg-gold-400 selection:text-midnight-900">
      {/* Clean Top Header */}
      <header className="border-b border-white/10 bg-midnight-900/90 py-4 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src={ministryConfig.logos.logoTight}
              alt={ministryConfig.name.en}
              className="h-11 w-auto max-w-[48px] object-contain drop-shadow"
              width={48}
              height={46}
            />
            <div>
              <p className="font-display text-base font-bold text-white sm:text-lg">
                {ministryConfig.name.ta}
              </p>
              <p className="text-xs text-white/60 hidden sm:block">
                {ministryConfig.name.en}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3.5 py-1 font-display text-xs font-bold text-gold-300">
            <Calendar size={14} aria-hidden="true" />
            <span>19 & 20 அக்டோபர் 2026</span>
          </div>
        </div>
      </header>

      {/* Main Showcase Section */}
      <main className="flex-1 px-5 py-8 sm:py-12 sm:px-8 flex flex-col justify-center">
        <div className="mx-auto max-w-5xl w-full text-center">
          <h1 className="font-display text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            இரண்டு ஆசீர்வாதக் கூட்டங்கள்
            <span className="gold-text block text-2xl sm:text-3xl lg:text-4xl mt-1 font-extrabold">
              Two Special Meetings — October 2026
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
            சுவரொட்டியைத் தேர்வு செய்து உள்ளே செல்லவும்
            <span className="block text-xs sm:text-sm text-gold-300/80 mt-0.5">
              Click a poster to enter the event
            </span>
          </p>

          {/* The Two Posters Grid */}
          <div className="mt-8 sm:mt-10 grid gap-8 sm:gap-10 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
            {/* 1. FAMILY PRAYER POSTER CARD */}
            <Link
              to={ROUTES.FAMILY_PRAYER}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-ribbon via-gold-500 to-ribbon p-[3px] shadow-deep transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(142,27,31,0.6)] focus:outline-none focus:ring-4 focus:ring-gold-400"
              aria-label="குடும்ப ஆசீர்வாதக் கூட்டம் பக்கத்திற்குச் செல்லவும் | Go to Family Prayer Meeting page"
            >
              <div className="flex flex-1 flex-col rounded-[1.35rem] bg-midnight-900 p-4 sm:p-5 text-center">
                {/* Date Badge */}
                <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full bg-ribbon px-4 py-1 text-xs font-bold font-display uppercase tracking-wider text-white shadow-md mx-auto">
                  <Calendar size={14} aria-hidden="true" />
                  <span>19 OCT 2026 · திங்கள் (Monday)</span>
                </div>

                {/* Poster Image */}
                <div className="relative overflow-hidden rounded-2xl bg-midnight-950 shadow-inner flex-1 flex items-center justify-center">
                  <img
                    src={assetUrl('images/poster-family-v1.webp')}
                    alt="குடும்ப ஆசீர்வாதக் கூட்டம் அதிகாரப்பூர்வ சுவரொட்டி — 19 அக்டோபர் 2026"
                    width={682}
                    height={1024}
                    loading="eager"
                    className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ aspectRatio: '682/1024' }}
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-6">
                    <span className="flex items-center gap-2 rounded-xl bg-ribbon px-5 py-2.5 font-display text-sm font-bold text-white shadow-deep">
                      உள்ளே செல்க | Enter Event <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                {/* Title & Button */}
                <div className="mt-4">
                  <h2 className="font-display text-xl sm:text-2xl font-black text-white group-hover:text-gold-300 transition-colors">
                    குடும்ப ஆசீர்வாதக் கூட்டம்
                  </h2>
                  <p className="font-display text-sm font-bold text-gold-400/90 mt-0.5">
                    Family Prayer Meeting
                  </p>

                  <div className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-ribbon to-[#A52025] px-6 py-2.5 font-display text-sm font-bold text-white shadow-md transition group-hover:brightness-110 w-full">
                    <span>உள்ளே செல்க | Enter</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 2. YOUTH MEETING POSTER CARD */}
            <Link
              to={ROUTES.YOUTH_MEETING}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-[#1B3A66] via-gold-400 to-[#0B1B33] p-[3px] shadow-deep transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(242,169,27,0.5)] focus:outline-none focus:ring-4 focus:ring-gold-400"
              aria-label="வாலிபர் கூடுகை பக்கத்திற்குச் செல்லவும் | Go to Youth Meeting page"
            >
              <div className="flex flex-1 flex-col rounded-[1.35rem] bg-midnight-900 p-4 sm:p-5 text-center">
                {/* Date Badge */}
                <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-4 py-1 text-xs font-bold font-display uppercase tracking-wider text-midnight-950 shadow-md mx-auto">
                  <Calendar size={14} aria-hidden="true" />
                  <span>20 OCT 2026 · செவ்வாய் (Tuesday)</span>
                </div>

                {/* Poster Image */}
                <div className="relative overflow-hidden rounded-2xl bg-midnight-950 shadow-inner flex-1 flex items-center justify-center">
                  <img
                    src={assetUrl('images/poster-v3.webp')}
                    alt="வாலிபர் கூடுகை Youth Meeting 2026 அதிகாரப்பூர்வ சுவரொட்டி — 20 அக்டோபர் 2026"
                    width={682}
                    height={1024}
                    loading="eager"
                    className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ aspectRatio: '682/1024' }}
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-6">
                    <span className="flex items-center gap-2 rounded-xl bg-gold-400 px-5 py-2.5 font-display text-sm font-bold text-midnight-950 shadow-deep">
                      உள்ளே செல்க | Enter Event <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                {/* Title & Button */}
                <div className="mt-4">
                  <h2 className="font-display text-xl sm:text-2xl font-black text-white group-hover:text-gold-300 transition-colors">
                    வாலிபர் கூடுகை
                  </h2>
                  <p className="font-display text-sm font-bold text-gold-400/90 mt-0.5">
                    Youth Meeting – 2026
                  </p>

                  <div className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-2.5 font-display text-sm font-bold text-midnight-950 shadow-md transition group-hover:brightness-110 w-full">
                    <span>உள்ளே செல்க | Enter</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-white/10 bg-midnight-950 py-5 text-center text-xs text-white/50">
        <p>© 2026 {ministryConfig.name.en} · {ministryConfig.name.ta}</p>
      </footer>
    </div>
  )
}
