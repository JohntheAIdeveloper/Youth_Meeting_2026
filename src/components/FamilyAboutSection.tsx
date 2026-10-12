import Section from './Section'
import SectionHeading from './SectionHeading'
import { ministryConfig } from '../config/ministry'

const familyPillars = [
  { ta: 'குடும்ப ஜெபம்', en: 'Family Prayer' },
  { ta: 'தேவ ஆசீர்வாதம்', en: "God's Blessing" },
  { ta: 'குடும்ப சமாதானம்', en: 'Divine Peace' },
  { ta: 'வேத போதனை', en: 'Bible Teaching' },
  { ta: 'அன்பு & ஐக்கியம்', en: 'Love & Fellowship' },
] as const

export default function FamilyAboutSection() {
  return (
    <Section
      id="about"
      tone="cream"
      labelledBy="family-about-title"
      innerClassName="pb-24 pt-10 sm:pb-28 lg:pb-32"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="family-about-title"
            ta="குடும்ப ஆசீர்வாதம்"
            en="Family Blessing & Restoration"
            tone="cream"
          />
          <p className="max-w-xl text-lg text-midnight-800/90" lang="ta">
            {ministryConfig.name.ta} நடத்தும் இந்த குடும்ப ஆசீர்வாதக் கூட்டத்தில் குடும்பங்கள் ஒன்றுகூடி கர்த்தரை ஆராதிக்கவும், தேவனுடைய ஜீவனுள்ள வார்த்தையைக் கேட்கவும், குடும்பங்களில் தெய்வீக சமாதானமும் விடுதலையும் பெற்றுக்கொள்ளவும் அன்புடன் அழைக்கப்படுகிறீர்கள்.
          </p>
          <p className="mt-4 max-w-xl text-lg text-midnight-800/80">
            Families are warmly invited to unite in worship, hear God’s life-giving Word, and experience divine peace, restoration, and abundant blessing at this special Family Prayer Meeting.
          </p>

          <ul className="mt-9 max-w-md divide-y divide-midnight-800/15 border-y border-midnight-800/15">
            {familyPillars.map((p) => (
              <li key={p.en} className="flex items-baseline justify-between gap-4 py-3.5">
                <span className="flex items-center gap-3 font-display text-xl font-bold text-midnight-800">
                  <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-ribbon" />
                  {p.ta}
                </span>
                <span className="text-midnight-800/70">{p.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Scripture Card */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="rounded-3xl bg-gradient-to-b from-ribbon via-gold-500 to-ribbon p-[3px] shadow-deep">
            <div className="rounded-[1.4rem] bg-midnight-900 p-8 sm:p-10 text-white">
              <span className="inline-block rounded-full bg-ribbon/30 px-4 py-1 font-display text-xs font-bold text-gold-300 border border-gold-400/30">
                யோசுவா 24:15 · Joshua 24:15
              </span>

              <blockquote className="mt-6 border-l-4 border-gold-400 pl-5">
                <p className="font-display text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                  "நானும் என் வீட்டாருமோவென்றால், கர்த்தரையே சேவிப்போம்."
                </p>
                <footer className="mt-3 text-base text-gold-300 font-display font-medium">
                  "As for me and my house, we will serve the Lord."
                </footer>
              </blockquote>

              <div className="mt-8 rounded-2xl bg-midnight-800/90 p-5 border border-white/10">
                <p className="font-display text-base font-bold text-white">
                  குடும்பத்தின் மேன்மை | The Power of Family Prayer
                </p>
                <p className="mt-1 text-sm text-white/70 leading-relaxed">
                  குடும்பமாக ஒன்றுகூடி தேவ சமூகத்தில் காத்திருக்கும்போது, குடும்பத்தின் தடைகள் உடைந்து தெய்வீக சமாதானமும் வெற்றியும் உண்டாகும்.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
