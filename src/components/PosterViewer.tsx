import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Maximize2, X } from 'lucide-react'
import { Poster } from '../config/events'

interface Props {
  poster: Poster
  badgeText?: string
  accent?: 'family' | 'youth'
}

export default function PosterViewer({ poster, badgeText, accent = 'family' }: Props) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const ringGradient =
    accent === 'family'
      ? 'from-ribbon via-gold-500 to-ribbon'
      : 'from-gold-300 via-gold-500 to-gold-700'

  return (
    <>
      <figure className="mx-auto w-full max-w-sm lg:max-w-md">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full text-left focus:outline-none"
          aria-haspopup="dialog"
          aria-label="சுவரொட்டியை பெரிதாக்க அழுத்தவும் | Click to enlarge poster"
        >
          <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${ringGradient} p-[3px] shadow-deep transition-all duration-300 group-hover:scale-[1.015]`}
          >
            <div className="relative overflow-hidden rounded-[0.85rem] bg-midnight-950">
              <img
                src={poster.src}
                alt={poster.altTa}
                width={poster.width}
                height={poster.height}
                loading="lazy"
                className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ aspectRatio: `${poster.width}/${poster.height}` }}
              />
              <div className="absolute inset-0 grid place-items-center bg-midnight-950/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-xl bg-midnight-900/90 px-4 py-2 font-display text-sm font-bold text-gold-300 shadow-deep">
                  <Maximize2 size={18} aria-hidden="true" />
                  பெரிதாக்கு | Enlarge Poster
                </span>
              </div>
            </div>
          </div>
        </button>

        <figcaption className="mt-3 flex items-center justify-between text-xs text-white/60">
          <span>{badgeText || 'அதிகாரப்பூர்வ சுவரொட்டி | Official Poster'}</span>
          <a
            href={poster.src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gold-300 underline hover:text-white"
          >
            தனி தாவலில் திற | Open <ExternalLink size={12} aria-hidden="true" />
          </a>
        </figcaption>
      </figure>

      {/* Lightbox Dialog */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="முழு சுவரொட்டி | Full Event Poster"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight-950/90 p-3 sm:p-6 backdrop-blur-md"
          onClick={() => {
            setOpen(false)
            triggerRef.current?.focus()
          }}
        >
          <div
            className="relative flex max-h-[96vh] max-w-4xl flex-col items-center overflow-auto rounded-2xl bg-midnight-900 p-2 sm:p-4 border border-gold-400/30 shadow-deep"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between border-b border-white/10 pb-3 mb-3">
              <p className="font-display text-sm font-bold text-gold-300 sm:text-base">
                {poster.altTa}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={poster.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 p-2 text-white hover:bg-white/10"
                  title="Open original image in new tab"
                >
                  <ExternalLink size={18} aria-hidden="true" />
                </a>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    triggerRef.current?.focus()
                  }}
                  className="rounded-lg border border-white/20 p-2 text-white hover:bg-white/10"
                  aria-label="மூடு | Close poster dialog"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="max-h-[82vh] overflow-auto">
              <img
                src={poster.src}
                alt={poster.altTa}
                width={poster.width}
                height={poster.height}
                className="max-h-[80vh] w-auto rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
