import type { ReactNode } from 'react'
import BrushEdge from './BrushEdge'

type Props = {
  id: string
  tone: 'navy' | 'cream'
  labelledBy: string
  /** Text-color class of the previous section; draws a ragged brush edge in that color at the top. */
  brushTop?: string
  seed?: number
  className?: string
  innerClassName?: string
  children: ReactNode
}

/** Consistent section shell: tone, vertical rhythm, centered max-width container. */
export default function Section({ id, tone, labelledBy, brushTop, seed, className = '', innerClassName = 'py-24 sm:py-28 lg:py-32', children }: Props) {
  const toneClass = tone === 'navy' ? 'bg-midnight-800 text-white' : 'bg-cream text-midnight-800'
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative overflow-hidden ${toneClass} ${className}`}>
      {brushTop && <BrushEdge edge="top" colorClass={brushTop} seed={seed} />}
      <div className={`relative z-20 mx-auto w-full max-w-6xl px-5 sm:px-8 ${innerClassName}`}>{children}</div>
    </section>
  )
}
