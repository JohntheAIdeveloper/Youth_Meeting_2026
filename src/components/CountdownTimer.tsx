import { useEffect, useState } from 'react'

interface Props {
  targetIso: string
  eventTitleTa?: string
  eventTitleEn?: string
  accent?: 'family' | 'youth'
}

interface TimeRemaining {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTime(target: string): TimeRemaining {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownTimer({ targetIso, accent = 'family' }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTime(targetIso))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime(targetIso))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetIso])

  const accentBorder = accent === 'family' ? 'border-ribbon/50' : 'border-gold-400/30'
  const accentBg = accent === 'family' ? 'bg-ribbon/10' : 'bg-midnight-800/80'

  if (timeLeft.total <= 0) {
    return (
      <div
        className={`rounded-2xl border ${accentBorder} ${accentBg} p-4 text-center text-gold-300 shadow-deep`}
        role="timer"
        aria-live="polite"
      >
        <p className="font-display text-lg font-bold">
          கூட்டம் நடைபெறுகிறது அல்லது முடிவடைந்தது
        </p>
        <p className="text-xs text-white/70">Meeting in progress or concluded</p>
      </div>
    )
  }

  const units = [
    { value: timeLeft.days, ta: 'நாட்கள்', en: 'Days' },
    { value: timeLeft.hours, ta: 'மணி', en: 'Hours' },
    { value: timeLeft.minutes, ta: 'நிமிடங்கள்', en: 'Minutes' },
    { value: timeLeft.seconds, ta: 'வினாடிகள்', en: 'Seconds' },
  ]

  return (
    <div
      className={`rounded-2xl border ${accentBorder} ${accentBg} p-4 shadow-deep backdrop-blur sm:p-5`}
      role="timer"
      aria-label="நிகழ்வு தொடங்கும் நேரம் | Countdown to event"
    >
      <p className="mb-3 text-center font-display text-xs font-bold uppercase tracking-wider text-gold-300">
        கூட்டம் தொடங்குவதற்கு இன்னும் | Countdown to Meeting
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.en}
            className="flex flex-col items-center justify-center rounded-xl bg-midnight-900/80 p-2 text-center border border-white/10"
          >
            <span className="font-display text-2xl font-black text-white sm:text-3xl lg:text-4xl tabular-nums">
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="mt-0.5 font-display text-[0.75rem] font-bold text-gold-300 sm:text-xs">
              {u.ta}
            </span>
            <span className="text-[0.65rem] text-white/50">{u.en}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
