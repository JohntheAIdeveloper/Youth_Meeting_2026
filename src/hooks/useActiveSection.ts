import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the upper third of the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!('IntersectionObserver' in window) || els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
