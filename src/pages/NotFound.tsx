import { useEffect } from 'react'
import { Home, Compass } from 'lucide-react'
import { Link } from '../lib/router'
import { ministryConfig } from '../config/ministry'

export default function NotFound() {
  useEffect(() => {
    document.title = 'பக்கம் கிடைக்கவில்லை | Page Not Found — JTLM Events'
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-midnight-900 text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={ministryConfig.logos.logoTight}
              alt={ministryConfig.name.en}
              className="h-10 w-auto object-contain"
              width={40}
              height={38}
            />
            <span className="font-display font-bold text-white sm:text-lg">
              {ministryConfig.name.ta}
            </span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-20 text-center">
        <div className="max-w-md">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl border border-gold-400/30 bg-gold-400/10 text-gold-300 shadow-deep">
            <Compass size={40} aria-hidden="true" />
          </div>

          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            404
          </h1>
          <h2 className="mt-2 font-display text-2xl font-bold text-gold-300">
            பக்கம் கிடைக்கவில்லை
          </h2>
          <p className="mt-1 font-display text-base text-white/70">
            Page Not Found
          </p>

          <p className="mt-6 text-white/80" lang="ta">
            நீங்கள் தேடும் பக்கம் கிடைக்கவில்லை அல்லது மாற்றப்பட்டுள்ளது. தயவுசெய்து முகப்புப் பக்கத்திற்குச் செல்லவும்.
          </p>
          <p className="mt-2 text-sm text-white/60">
            The page you requested could not be found. Please return to the events hub.
          </p>

          <div className="mt-8 flex justify-center">
            <Link to="/" className="btn btn-gold">
              <Home size={20} aria-hidden="true" />
              நிகழ்வுகள் முகப்பு | Events Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-white/50">
        © 2026 {ministryConfig.name.en} · {ministryConfig.name.ta}
      </footer>
    </div>
  )
}
