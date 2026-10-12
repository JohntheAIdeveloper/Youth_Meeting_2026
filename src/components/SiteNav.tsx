import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { ROUTES } from '../config/events'
import { ministryConfig } from '../config/ministry'
import { useScrolled } from '../hooks/useScrolled'
import { Link, usePath } from '../lib/router'

interface Props {
  registerHref?: string
  registerLabelTa?: string
  registerLabelEn?: string
}

export default function SiteNav({
  registerHref,
  registerLabelTa,
  registerLabelEn,
}: Props) {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const currentPath = usePath()
  const menuButton = useRef<HTMLButtonElement>(null)

  const isFamily = currentPath === ROUTES.FAMILY_PRAYER
  const isYouth = currentPath === ROUTES.YOUTH_MEETING
  const isEventPage = isFamily || isYouth

  // Close mobile drawer on Escape; lock body scroll when open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Section links for single event pages
  const sectionLinks = [
    { id: 'home', ta: 'முகப்பு', en: 'Home' },
    { id: 'about', ta: 'கூடுகை', en: 'About' },
    { id: 'details', ta: 'விவரங்கள்', en: 'Details' },
    { id: 'register', ta: 'பதிவு', en: 'Registration' },
    { id: 'location', ta: 'இடம்', en: 'Location' },
    { id: 'contact', ta: 'தொடர்பு', en: 'Contact' },
  ]

  // Central hub links
  const hubLinks = [
    { path: ROUTES.HOME, ta: 'முகப்பு', en: 'All Events' },
    { path: ROUTES.FAMILY_PRAYER, ta: 'குடும்ப ஆசீர்வாதம் (19 அக்)', en: 'Family Prayer' },
    { path: ROUTES.YOUTH_MEETING, ta: 'வாலிபர் கூடுகை (20 அக்)', en: 'Youth Meeting' },
    { hash: '#location', ta: 'இடம்', en: 'Venue' },
    { hash: '#contact', ta: 'தொடர்பு', en: 'Contact' },
  ]

  // CTA button labels and href
  const ctaHref = registerHref || (isEventPage ? '#register' : '#events')
  const ctaTa =
    registerLabelTa ||
    (isFamily ? 'பதிவு (அக் 19)' : isYouth ? 'பதிவு (அக் 20)' : 'பதிவு')
  const ctaEn =
    registerLabelEn ||
    (isFamily ? 'Register (19 Oct)' : isYouth ? 'Register (20 Oct)' : 'Register')

  // Cross event switch target
  const otherEventRoute = isFamily ? ROUTES.YOUTH_MEETING : ROUTES.FAMILY_PRAYER
  const otherEventLabelTa = isFamily ? 'வாலிபர் கூடுகை (20 அக்)' : 'குடும்ப ஆசீர்வாதம் (19 அக்)'
  const otherEventLabelEn = isFamily ? 'Youth Meeting' : 'Family Prayer'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'bg-midnight-900/95 shadow-deep backdrop-blur-md'
          : 'bg-gradient-to-b from-midnight-900/85 to-transparent'
      }`}
    >
      <nav
        aria-label="முதன்மை வழிசெலுத்தல் | Main navigation"
        className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          to={ROUTES.HOME}
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
          title="நிகழ்வுகள் முகப்பு | Events Hub"
        >
          <img
            src={ministryConfig.logos.logoTight}
            alt={ministryConfig.name.en}
            className="h-11 w-auto max-w-[48px] object-contain drop-shadow"
            width={48}
            height={46}
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[0.95rem] font-bold text-white sm:text-base">
              {ministryConfig.name.ta}
            </span>
            <span className="hidden truncate text-xs text-white/65 sm:block">
              {isFamily
                ? 'குடும்ப ஆசீர்வாதக் கூட்டம் (19 Oct)'
                : isYouth
                  ? 'வாலிபர் கூடுகை (20 Oct)'
                  : ministryConfig.name.en}
            </span>
          </span>
        </Link>

        {/* Desktop Section Links (When on event page) */}
        {isEventPage ? (
          <div className="hidden items-center gap-1 xl:gap-2 lg:flex">
            <ul className="flex items-center gap-1">
              {sectionLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="block rounded-lg px-2.5 py-1 text-center leading-tight text-white/85 transition-colors hover:text-gold-300"
                  >
                    <span className="block font-display text-[0.92rem] font-bold">
                      {l.ta}
                    </span>
                    <span className="block text-[0.68rem] text-white/55">{l.en}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Cross Event Switcher Badge */}
            <Link
              to={otherEventRoute}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-midnight-800/80 px-3 py-1 text-xs font-bold text-gold-300 transition hover:bg-gold-400/20 hover:text-white"
            >
              <span>{otherEventLabelTa}</span>
              <span className="hidden 2xl:inline text-[0.65rem] text-gold-300/70">({otherEventLabelEn})</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          /* Desktop Hub Links (When on central /) */
          <ul className="hidden items-center gap-2 lg:flex">
            {hubLinks.map((l) => {
              if (l.path) {
                const isActive = currentPath === l.path
                return (
                  <li key={l.path}>
                    <Link
                      to={l.path}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block rounded-lg px-3 py-1.5 text-center leading-tight transition-colors hover:text-gold-300 ${
                        isActive ? 'text-gold-300 bg-white/5' : 'text-white/85'
                      }`}
                    >
                      <span className="block font-display text-[0.95rem] font-bold">
                        {l.ta}
                      </span>
                      <span className="block text-[0.7rem] text-white/60">{l.en}</span>
                    </Link>
                  </li>
                )
              }
              return (
                <li key={l.hash}>
                  <a
                    href={l.hash}
                    className="block rounded-lg px-3 py-1.5 text-center leading-tight text-white/85 transition-colors hover:text-gold-300"
                  >
                    <span className="block font-display text-[0.95rem] font-bold">
                      {l.ta}
                    </span>
                    <span className="block text-[0.7rem] text-white/60">{l.en}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}

        {/* CTA and mobile toggle */}
        <div className="flex items-center gap-2">
          {ctaHref.startsWith('#') ? (
            <a
              href={ctaHref}
              className="btn btn-gold !min-h-[2.75rem] whitespace-nowrap !px-4 !text-[0.95rem]"
            >
              <span>{ctaTa}</span>
              <span className="hidden xl:inline text-xs text-midnight-900/80">| {ctaEn}</span>
            </a>
          ) : (
            <Link
              to={ctaHref}
              className="btn btn-gold !min-h-[2.75rem] whitespace-nowrap !px-4 !text-[0.95rem]"
            >
              <span>{ctaTa}</span>
              <span className="hidden xl:inline text-xs text-midnight-900/80">| {ctaEn}</span>
            </Link>
          )}

          <button
            ref={menuButton}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'மெனுவை மூடு | Close menu' : 'மெனுவைத் திற | Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-midnight-900/98 px-5 pb-6 pt-3 sm:px-8 lg:hidden"
        >
          {isEventPage ? (
            <div className="space-y-4">
              {/* Event Section Links */}
              <ul className="space-y-1">
                {sectionLinks.map((l) => (
                  <li key={l.id} className="border-b border-white/10 last:border-0">
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-3 text-white hover:text-gold-300"
                    >
                      <span className="font-display text-lg font-bold">{l.ta}</span>
                      <span className="text-sm text-white/60">{l.en}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Navigation to other meetings */}
              <div className="rounded-xl border border-gold-400/30 bg-midnight-800/90 p-4">
                <p className="font-display text-xs font-bold uppercase tracking-wider text-gold-300">
                  பிற நிகழ்வுகள் | Other Events
                </p>
                <div className="mt-2 space-y-2">
                  <Link
                    to={otherEventRoute}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between text-sm font-semibold text-white hover:text-gold-300"
                  >
                    <span>{otherEventLabelTa}</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to={ROUTES.HOME}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between text-sm text-white/70 hover:text-white"
                  >
                    <span>அனைத்து நிகழ்வுகள் முகப்பு | Events Hub</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Hub Mobile Links */
            <ul className="mx-auto max-w-6xl space-y-1">
              {hubLinks.map((l) => (
                <li key={l.ta} className="border-b border-white/10 last:border-0">
                  {l.path ? (
                    <Link
                      to={l.path}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-3.5 text-white hover:text-gold-300"
                    >
                      <span className="font-display text-lg font-bold">{l.ta}</span>
                      <span className="text-sm text-white/60">{l.en}</span>
                    </Link>
                  ) : (
                    <a
                      href={l.hash}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-3.5 text-white hover:text-gold-300"
                    >
                      <span className="font-display text-lg font-bold">{l.ta}</span>
                      <span className="text-sm text-white/60">{l.en}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  )
}
