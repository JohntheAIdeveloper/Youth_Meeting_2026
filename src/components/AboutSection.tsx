import { SECTION_IDS, eventConfig as c } from '../config/event'
import Section from './Section'
import SectionHeading from './SectionHeading'

const pillars = [
  { ta: 'ஆராதனை', en: 'Worship' },
  { ta: 'ஜெபம்', en: 'Prayer' },
  { ta: 'வேத போதனை', en: 'Bible teaching' },
  { ta: 'ஐக்கியம்', en: 'Fellowship' },
  { ta: 'உற்சாகம்', en: 'Encouragement' },
] as const

export default function AboutSection() {
  return (
    <Section id={SECTION_IDS.about} tone="cream" labelledBy="about-title" innerClassName="pb-24 pt-10 sm:pb-28 lg:pb-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading id="about-title" ta="ஒன்றாக எழும்புவோம்" en="Rise together" tone="cream" />
          <p className="max-w-xl text-lg text-midnight-800/90" lang="ta">
            {c.ministry.ta} நடத்தும் இந்த வாலிபர் கூடுகையில் வாலிபர்கள் ஒன்றுகூடி ஆராதிக்கவும், ஜெபிக்கவும், தேவனுடைய வசனத்தைக் கேட்கவும், ஒருவரையொருவர் உற்சாகப்படுத்தவும் அன்புடன் அழைக்கப்படுகிறார்கள்.
          </p>
          <p className="mt-4 max-w-xl text-lg text-midnight-800/80">
            Young people are warmly invited to gather to worship, pray, hear God’s Word and encourage one another at this Youth Meeting by {c.ministry.en}.
          </p>

          <ul className="mt-9 max-w-md divide-y divide-midnight-800/15 border-y border-midnight-800/15">
            {pillars.map((p) => (
              <li key={p.en} className="flex items-baseline justify-between gap-4 py-3.5">
                <span className="flex items-center gap-3 font-display text-xl font-bold text-midnight-800">
                  <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-gold-500" />
                  {p.ta}
                </span>
                <span className="text-midnight-800/70">{p.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Photographs taken from the official poster, cut on the poster's diagonal */}
        <div className="relative mx-auto grid w-full max-w-lg grid-cols-5 gap-3 sm:gap-4 lg:max-w-none">
          <div className="relative col-span-5 overflow-hidden rounded-xl shadow-deep">
            <img src={c.images.worship} alt="வாலிபர்கள் கைகளை உயர்த்தி ஆராதிக்கின்றனர் — Young people worshipping with raised hands before a lit cross" loading="lazy" width={880} height={460} className="cut-diag block h-full w-full object-cover" />
          </div>
          <div className="col-span-3 -mt-12 ml-3 overflow-hidden rounded-xl border-4 border-cream shadow-deep sm:-mt-16">
            <img src={c.images.prayer} alt="இளைஞர்கள் ஒன்றாக ஜெபிக்கின்றனர் — Young men praying together in a hall" loading="lazy" width={660} height={630} className="block h-full w-full object-cover" />
          </div>
          <div className="col-span-2 self-end rounded-xl bg-midnight-800 p-4 text-white shadow-deep sm:p-5">
            <p className="font-display text-lg font-extrabold leading-snug gold-text">{c.theme.ta}</p>
            <p className="mt-1 text-sm text-white/75">{c.theme.en}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
