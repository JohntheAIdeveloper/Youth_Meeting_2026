import { useEffect, useState } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'
import { GOOGLE_FORM_EMBED_URL, GOOGLE_FORM_URL, SECTION_IDS, eventConfig as c } from '../config/event'
import Section from './Section'
import SectionHeading from './SectionHeading'

/** How long to wait for the iframe before we show the "open in a new tab" help text. */
const SLOW_LOAD_MS = 12000

export default function RegistrationSection() {
  const [loaded, setLoaded] = useState(false)
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    if (loaded) return
    const t = window.setTimeout(() => setSlow(true), SLOW_LOAD_MS)
    return () => window.clearTimeout(t)
  }, [loaded])

  return (
    <Section id={SECTION_IDS.register} tone="cream" labelledBy="register-title" brushTop="text-midnight-800" seed={9}>
      <SectionHeading id="register-title" ta="பதிவு செய்யுங்கள்" en="Register Now" tone="cream" />
      <p className="-mt-6 mb-8 max-w-2xl text-lg text-midnight-800/90 sm:-mt-8">
        கீழே உள்ள படிவத்தை நிரப்பி உங்கள் பதிவை உறுதிப்படுத்துங்கள்.
        <span className="mt-1 block text-midnight-800/75">Please complete the form below to confirm your registration. It is handled by Google Forms.</span>
      </p>

      <div className="rounded-2xl bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 p-[3px] shadow-deep">
        <div className="relative overflow-hidden rounded-[0.85rem] bg-white">
          {!loaded && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-white text-midnight-800" role="status">
              <p className="flex items-center gap-3 font-display text-lg font-bold">
                <Loader2 className="animate-spin" size={22} aria-hidden="true" />
                படிவம் ஏற்றப்படுகிறது… | Loading form…
              </p>
            </div>
          )}
          <iframe
            title="வாலிபர் கூடுகை 2026 பதிவு படிவம் — Youth Meeting 2026 registration form (Google Forms)"
            src={GOOGLE_FORM_EMBED_URL}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="block h-[1750px] w-full max-w-full border-0 sm:h-[1500px] lg:h-[1450px]"
          >
            படிவம் ஏற்றப்படவில்லை. Loading…
          </iframe>
        </div>
      </div>

      {slow && !loaded && (
        <p className="mt-5 rounded-xl border border-ribbon/40 bg-ribbon/10 p-4 text-midnight-800" role="alert">
          படிவம் இங்கே காட்டப்படவில்லை என்றால் கீழுள்ள பொத்தானைப் பயன்படுத்துங்கள்.
          <span className="block text-midnight-800/75">If the form does not appear here, use the button below to open it in a new tab.</span>
        </p>
      )}

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-navy">
          <ExternalLink size={20} aria-hidden="true" />
          படிவத்தைத் தனி தாவலில் திற | Open Registration Form
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a
          href={c.images.poster}
          target="_blank"
          rel="noopener noreferrer"
          className="btn border border-midnight-900/20 bg-white/80 text-midnight-900 shadow-sm hover:bg-white"
        >
          சுவரொட்டி & QR குறியீடு | View Poster & QR
        </a>
      </div>
    </Section>
  )
}
