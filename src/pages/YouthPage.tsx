import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import EventDetails from '../components/EventDetails'
import RegistrationSection from '../components/RegistrationSection'
import LocationSection from '../components/LocationSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import CrossEventNotice from '../components/CrossEventNotice'

export default function YouthPage() {
  useEffect(() => {
    document.title = 'வாலிபர் கூடுகை | Youth Meeting – 2026'
    // If a hash exists in URL, scroll to it
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
      <Navbar />
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
    </>
  )
}
