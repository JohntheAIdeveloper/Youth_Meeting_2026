import { useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import CrossEventNotice from '../components/CrossEventNotice'
import EventDetails from '../components/EventDetails'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import LocationSection from '../components/LocationSection'
import RegistrationSection from '../components/RegistrationSection'
import SiteNav from '../components/SiteNav'

export default function YouthPage() {
  useEffect(() => {
    document.title = 'வாலிபர் கூடுகை | Youth Meeting – 2026'
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <>
      <a
        href="#register"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-bold focus:text-midnight-900"
      >
        பதிவுக்குச் செல் | Skip to registration
      </a>

      <SiteNav
        registerHref="#register"
        registerLabelTa="பதிவு (அக் 20)"
        registerLabelEn="Register (20 Oct)"
      />

      <main>
        <HeroSection />
        <CrossEventNotice currentEvent="youth-meeting" />
        <AboutSection />
        <EventDetails />
        <RegistrationSection />
        <LocationSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-400/30 bg-midnight-950/95 p-3 backdrop-blur-md sm:hidden">
        <a
          href="#register"
          className="btn btn-gold w-full !min-h-[3rem] !text-base font-bold shadow-lg"
        >
          <span>பதிவு — வாலிபர் கூடுகை (அக் 20)</span>
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </>
  )
}
