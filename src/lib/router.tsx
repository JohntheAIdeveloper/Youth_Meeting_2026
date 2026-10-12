import React, { useEffect, useState } from 'react'

export function getBase(): string {
  const b =
    (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) ||
    (typeof process !== 'undefined' && process.env?.VITE_BASE) ||
    '/'
  return b.replace(/\/$/, '')
}

export function stripBase(pathname: string): string {
  const base = getBase()
  const p = (pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname).replace(/\/$/, '') || '/'
  return p
}

export function toHref(path: string): string {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path
  }
  const base = getBase()
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${base}${clean}`
}

export function navigate(to: string, replace = false) {
  const full = toHref(to)
  if (replace) {
    window.history.replaceState({}, '', full)
  } else {
    window.history.pushState({}, '', full)
  }
  window.dispatchEvent(new PopStateEvent('popstate'))
  if (!to.includes('#')) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }
}

const YOUTH_SECTION_HASHES: Record<string, string> = {
  '#home': '#home',
  '#about': '#about',
  '#details': '#details',
  '#event': '#details',
  '#register': '#register',
  '#registration': '#register',
  '#location': '#location',
  '#contact': '#contact',
  '#poster': '#home',
}

export function checkLegacyHashShim(): boolean {
  if (typeof window === 'undefined') return false
  const currentPath = stripBase(window.location.pathname)
  const hash = window.location.hash.toLowerCase()
  if ((currentPath === '/' || currentPath === '') && hash && YOUTH_SECTION_HASHES[hash]) {
    const targetHash = YOUTH_SECTION_HASHES[hash]
    const base = getBase()
    const target = `${base}/youth-meeting${targetHash}`
    window.history.replaceState({}, '', target)
    window.dispatchEvent(new PopStateEvent('popstate'))
    return true
  }
  return false
}

export function usePath(): string {
  const [path, setPath] = useState(() => {
    checkLegacyHashShim()
    return stripBase(window.location.pathname)
  })

  useEffect(() => {
    const onPop = () => {
      setPath(stripBase(window.location.pathname))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return path
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  replace?: boolean
  children: React.ReactNode
}

export function Link({ to, replace = false, onClick, children, ...props }: LinkProps) {
  const href = toHref(to)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    // Intercept standard left-clicks with no modifier keys
    if (e.button === 0 && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && !props.target) {
      e.preventDefault()
      navigate(to, replace)
    }
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
