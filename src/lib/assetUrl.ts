/**
 * Resolves a public asset path against Vite's BASE_URL.
 * Ensures relative and leading-slash paths work seamlessly whether hosted at root
 * (e.g. Vercel '/') or under a sub-path (e.g. GitHub Pages '/Youth_Meeting_2026/').
 */
export function assetUrl(path: string): string {
  if (!path) return ''
  // If already absolute with protocol or data:, return as is
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path
  }
  const clean = path.replace(/^\.?\//, '')
  const base = import.meta.env.BASE_URL || '/'
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`
}
