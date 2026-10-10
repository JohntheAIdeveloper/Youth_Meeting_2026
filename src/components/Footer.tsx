import { SECTION_IDS, eventConfig as c } from '../config/event'

const quick = [
  { id: SECTION_IDS.register, ta: 'பதிவு', en: 'Registration' },
  { id: SECTION_IDS.details, ta: 'நிகழ்வு விவரங்கள்', en: 'Event details' },
  { id: SECTION_IDS.location, ta: 'இடம்', en: 'Location' },
] as const

export default function Footer() {
  return (
    <footer className="bg-midnight-900 text-white/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={c.images.logoTight}
              alt={c.ministry.en}
              className="h-12 w-auto max-w-[52px] object-contain drop-shadow"
              width={52}
              height={50}
            />
            <div>
              <p className="font-display text-lg font-bold text-white">{c.ministry.ta}</p>
              <p className="text-sm text-white/65">{c.ministry.en}</p>
            </div>
          </div>
          <p className="mt-5 font-display text-gold-300">
            {c.title.ta} | {c.title.en}
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="font-display text-base font-bold text-white">விரைவு இணைப்புகள் | Quick links</h2>
          <ul className="mt-3 space-y-1">
            {quick.map((q) => (
              <li key={q.id}>
                <a href={`#${q.id}`} className="inline-block py-1.5 hover:text-gold-300">
                  {q.ta} <span className="text-white/55">| {q.en}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-bold text-white">தொடர்புக்கு | Contact</h2>
          <ul className="mt-3 space-y-2">
            {c.contacts.map((p) => (
              <li key={p.tel}>
                <span className="block text-sm text-white/65">{p.nameTa}</span>
                <a href={`tel:${p.tel}`} className="font-display text-lg font-bold text-white hover:text-gold-300">
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/55">
        © {c.date.year} {c.ministry.en} · {c.ministry.ta}
      </div>
    </footer>
  )
}
