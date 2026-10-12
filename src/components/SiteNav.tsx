import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, usePath } from '../lib/router'
import { ROUTES } from '../config/events'
import { ministryConfig } from '../config/ministry'
import { useScrolled } from '../hooks/useScrolled'

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

  const navLinks = [
    { path: ROUTES.HOME, ta: 'நிகழ்வுகள் முகப்பு', en: 'All Events' },
    { path: ROUTES.FAMILY_PRAYER, ta: 'குடும்ப ஆசீர்வாதம்', en: 'Family Prayer (19 Oct)' },
    { path: ROUTES.YOUTH_MEETING, ta: 'வாலிபர் கூடுகை', en: 'Youth Meeting (20 Oct)' },
  ]

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

  // Default register destination
  const defaultRegister =
    currentPath === ROUTES.FAMILY_PRAYER
      ? '#register'
      : currentPath === ROUTES.YOUTH_MEETING
        ? '#register'
        : '#events'

  const ctaHref = registerHref || defaultRegister
  const ctaTa =
    registerLabelTa ||
    (currentPath === ROUTES.FAMILY_PRAYER
      ? 'பதிவு (அக் 19)'
      : currentPath === ROUTES.YOUTH_MEETING
        ? 'பதிவு (அக் 20)'
        : 'பதிவு')
  const ctaEn =
    registerLabelEn ||
    (currentPath === ROUTES.FAMILY_PRAYER
      ? 'Register (19 Oct)'
      : currentPath === ROUTES.YOUTH_MEETING
        ? 'Register (20 Oct)'
        : 'Register')

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
              {ministryConfig.name.en}
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((l) => {
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
          })}
        </ul>

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

      {/* Mobile Menu */}
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-midnight-900/98 px-5 pb-6 pt-3 sm:px-8 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl space-y-1">
            {navLinks.map((l) => {
              const isActive = currentPath === l.path
              return (
                <li key={l.path} className="border-b border-white/10 last:border-0">
                  <Link
                    to={l.path}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-baseline justify-between gap-3 py-3.5 ${
                      isActive ? 'text-gold-300' : 'text-white'
                    }`}
                  >
                    <span className="font-display text-lg font-bold">{l.ta}</span>
                    <span className="text-sm text-white/60">{l.en}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
