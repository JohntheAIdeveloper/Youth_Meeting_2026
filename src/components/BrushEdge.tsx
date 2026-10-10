import { useMemo } from 'react'

type Props = {
  /** Which edge of the parent the ragged brush stroke sits on. */
  edge: 'top' | 'bottom'
  /** Tailwind text-color class — the stroke is filled with currentColor. */
  colorClass: string
  seed?: number
}

/** Deterministic pseudo-random so the stroke is identical on every render/build. */
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

/**
 * Ragged "dry brush" divider echoing the navy brush strokes on the poster.
 * Pure SVG path — no filters, so it is cheap to paint on phones.
 */
export default function BrushEdge({ edge, colorClass, seed = 7 }: Props) {
  const d = useMemo(() => {
    const r = rng(seed * 997 + 13)
    const pts: string[] = []
    const steps = 46
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 1200
      const base = 34 + Math.sin(i / 5.5) * 10
      const jag = (r() - 0.5) * (i % 3 === 0 ? 34 : 14)
      pts.push(`${x.toFixed(1)},${Math.max(4, base + jag).toFixed(1)}`)
    }
    return `M0,0 L${pts.join(' L')} L1200,0 Z`
  }, [seed])

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 70"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 z-10 h-8 w-full sm:h-12 lg:h-16 ${colorClass} ${
        edge === 'top' ? 'top-0' : 'bottom-0 rotate-180'
      }`}
    >
      <path d={d} fill="currentColor" />
    </svg>
  )
}
