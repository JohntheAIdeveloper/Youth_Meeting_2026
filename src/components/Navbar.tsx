import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { SECTION_IDS, eventConfig } from '../config/event'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'

const links = [
  { id: SECTION_IDS.home, ta: 'முகப்பு', en: 'Home' },
  { id: SECTION_IDS.about, ta: 'கூடுகை', en: 'About' },
  { id: SECTION_IDS.details, ta: 'விவரங்கள்', en: 'Event Details' },
  { id: SECTION_IDS.register, ta: 'பதிவு', en: 'Registration' },
  { id: SECTION_IDS.location, ta: 'இடம்', en: 'Location' },
  { id: SECTION_IDS.contact, ta: 'தொடர்பு', en: 'Contact' },
] as const

const ids = links.map((l) => l.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(ids)
  const menuButton = useRef<HTMLButtonElement>(null)

  // Close on Escape and return focus to the toggle; lock body scroll while open.
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

  // Close the menu if the viewport grows to the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-midnight-900/92 shadow-deep backdrop-blur-md' : 'bg-gradient-to-b from-midnight-900/80 to-transparent'
      }`}
    >
      <nav aria-label="முதன்மை வழிசெலுத்தல் | Main navigation" className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href={`#${SECTION_IDS.home}`} className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={eventConfig.images.logoTight}
            alt={eventConfig.ministry.en}
            className="h-11 w-auto max-w-[48px] object-contain drop-shadow"
            width={48}
            height={46}
          />
          <span className="min-w-0 leading-tight lg:hidden 2xl:block">
            <span className="block truncate font-display text-[0.95rem] font-bold text-white sm:text-base">{eventConfig.ministry.ta}</span>
            <span className="hidden truncate text-xs text-white/65 sm:block">{eventConfig.ministry.en}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`block rounded-lg px-2.5 py-1.5 text-center leading-tight transition-colors hover:text-gold-300 ${
                  active === l.id ? 'text-gold-300' : 'text-white/85'
                }`}
              >
                <span className="block font-display text-[0.95rem] font-bold">{l.ta}</span>
                <span className="block text-[0.7rem] text-white/60">{l.en}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={`#${SECTION_IDS.register}`} className="btn btn-gold !min-h-[2.75rem] whitespace-nowrap !px-4 !text-[0.95rem]">
            <span className="xl:hidden">பதிவு | Register</span>
            <span className="hidden xl:inline">பதிவு செய்யுங்கள் | Register Now</span>
          </a>
          <button
            ref={menuButton}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu | மெனுவை மூடு' : 'Open menu | மெனுவைத் திற'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 pb-6 pt-2 sm:px-8">
            {links.map((l) => (
              <li key={l.id} className="border-b border-white/10 last:border-0">
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`flex items-baseline justify-between gap-3 py-4 ${active === l.id ? 'text-gold-300' : 'text-white'}`}
                >
                  <span className="font-display text-xl font-bold">{l.ta}</span>
                  <span className="text-sm text-white/60">{l.en}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
