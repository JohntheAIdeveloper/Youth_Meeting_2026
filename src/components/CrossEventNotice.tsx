import { CalendarDays, ArrowRight } from 'lucide-react'
import { Link } from '../lib/router'
import { ROUTES } from '../config/events'

interface Props {
  currentEvent: 'family-prayer' | 'youth-meeting'
}

export default function CrossEventNotice({ currentEvent }: Props) {
  const isYouth = currentEvent === 'youth-meeting'
  const targetRoute = isYouth ? ROUTES.FAMILY_PRAYER : ROUTES.YOUTH_MEETING
  const targetTitleTa = isYouth ? 'குடும்ப ஆசீர்வாதக் கூட்டம்' : 'வாலிபர் கூடுகை'
  const targetTitleEn = isYouth ? 'Family Prayer Meeting' : 'Youth Meeting 2026'
  const targetDateTa = isYouth ? 'அக்டோபர் 19, 2026 திங்கள்' : 'அக்டோபர் 20, 2026 செவ்வாய்'
  const targetDateEn = isYouth ? 'Mon, 19 Oct 2026' : 'Tue, 20 Oct 2026'

  return (
    <aside
      aria-label="பிற நிகழ்வு தகவல் | Other event notification"
      className="relative z-20 mx-auto max-w-5xl px-4 py-4 sm:px-6"
    >
      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-gold-400/40 bg-midnight-800/95 p-4 shadow-deep backdrop-blur sm:flex-row sm:px-6">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
            <CalendarDays size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-white sm:text-base">
              {isYouth ? 'குடும்ப ஆசீர்வாதக் கூட்டம்' : 'வாலிபர் கூடுகை'} ({targetDateTa})
            </p>
            <p className="text-xs text-white/70">
              Looking for {targetTitleEn} ({targetDateEn})?
            </p>
          </div>
        </div>

        <Link
          to={targetRoute}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gold-400/60 bg-gold-400/10 px-4 py-2 font-display text-sm font-bold text-gold-300 transition-all hover:bg-gold-400/20 hover:text-white"
        >
          <span>{targetTitleTa} விவரங்கள்</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}
