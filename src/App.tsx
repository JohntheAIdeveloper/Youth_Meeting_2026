import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import EventDetails from './components/EventDetails'
import RegistrationSection from './components/RegistrationSection'
import LocationSection from './components/LocationSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
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
