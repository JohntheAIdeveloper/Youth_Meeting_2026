import { Phone } from 'lucide-react'
import { SECTION_IDS, eventConfig as c } from '../config/event'
import Section from './Section'
import SectionHeading from './SectionHeading'

export default function ContactSection() {
  return (
    <Section id={SECTION_IDS.contact} tone="cream" labelledBy="contact-title" brushTop="text-midnight-800" seed={13}>
      <SectionHeading id="contact-title" ta="தொடர்புக்கு" en="Contact the organizers" tone="cream" />

      <ul className="grid gap-5 md:grid-cols-2">
        {c.contacts.map((p) => (
          <li key={p.tel} className="rounded-2xl border border-midnight-800/15 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(11,27,51,.45)] sm:p-8">
            <p className="font-display text-2xl font-extrabold text-midnight-800">{p.nameTa}</p>
            <p className="text-midnight-800/70">{p.nameEn}</p>
            <a
              href={`tel:${p.tel}`}
              className="mt-5 flex min-h-[3.5rem] items-center gap-3 rounded-xl bg-midnight-800 px-5 py-3 text-gold-300 transition hover:bg-midnight-700"
              aria-label={`Call ${p.nameEn} at ${p.display}`}
            >
              <Phone size={24} aria-hidden="true" />
              <span className="font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">{p.display}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
