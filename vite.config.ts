import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function perRouteHtmlPlugin(): Plugin {
  return {
    name: 'per-route-html-plugin',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexHtmlPath = path.join(distDir, 'index.html')
      if (!fs.existsSync(indexHtmlPath)) return

      const template = fs.readFileSync(indexHtmlPath, 'utf8')
      const siteUrl = 'https://jtlmofficial.vercel.app'

      const routes = [
        {
          dir: 'family-prayer',
          title: 'குடும்ப ஆசீர்வாதக் கூட்டம் | Family Prayer Meeting – 2026',
          description:
            'இயேசுவே மெய்யான ஒளி ஊழியங்கள் நடத்தும் குடும்ப ஆசீர்வாதக் கூட்டம் — அக்டோபர் 19, 2026 திங்கள், காலை 9:30 மணி முதல் மதியம் 1 மணி வரை. Family Prayer Meeting 2026 by Jesus the True Light Ministries.',
          canonical: `${siteUrl}/family-prayer`,
          ogImage: `${siteUrl}/images/poster-family-v1.jpg`,
          ogImageWidth: '682',
          ogImageHeight: '1024',
          ogImageAlt: 'குடும்ப ஆசீர்வாதக் கூட்டம் அதிகாரப்பூர்வ சுவரொட்டி — அக்டோபர் 19, 2026',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'குடும்ப ஆசீர்வாதக் கூட்டம் | Family Prayer Meeting',
            startDate: '2026-10-19T09:30:00+05:30',
            endDate: '2026-10-19T13:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: 'இயேசுவே மெய்யான ஒளி ஊழியங்கள்',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 11.361147,
                longitude: 77.703681,
              },
            },
            image: [`${siteUrl}/images/poster-family-v1.jpg`],
            description: 'Family Prayer Meeting 2026 by Jesus the True Light Ministries',
            organizer: {
              '@type': 'Organization',
              name: 'Jesus the True Light Ministries',
              url: siteUrl,
            },
          },
        },
        {
          dir: 'youth-meeting',
          title: 'வாலிபர் கூடுகை | Youth Meeting – 2026',
          description:
            'வாலிபனே எழும்பிப் பிரகாசி! இயேசுவே மெய்யான ஒளி ஊழியங்கள் நடத்தும் வாலிபர் கூடுகை — 20 அக்டோபர் 2026, காலை 10 மணி முதல் மதியம் 1 மணி வரை. Youth Meeting 2026 by Jesus the True Light Ministries.',
          canonical: `${siteUrl}/youth-meeting`,
          ogImage: `${siteUrl}/images/poster-small-v3.webp`,
          ogImageWidth: '682',
          ogImageHeight: '1024',
          ogImageAlt: 'வாலிபர் கூடுகை Youth Meeting 2026 அதிகாரப்பூர்வ சுவரொட்டி — 20 அக்டோபர் 2026',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'வாலிபர் கூடுகை | Youth Meeting – 2026',
            startDate: '2026-10-20T10:00:00+05:30',
            endDate: '2026-10-20T13:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: 'இயேசுவே மெய்யான ஒளி ஊழியங்கள்',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 11.361147,
                longitude: 77.703681,
              },
            },
            image: [`${siteUrl}/images/poster-small-v3.webp`],
            description: 'Youth Meeting 2026 by Jesus the True Light Ministries',
            organizer: {
              '@type': 'Organization',
              name: 'Jesus the True Light Ministries',
              url: siteUrl,
            },
          },
        },
      ]

      for (const route of routes) {
        let html = template
        html = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`)
        html = html.replace(
          /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/s,
          `<meta name="description" content="${route.description}" />`,
        )
        html = html.replace(
          /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/s,
          `<link rel="canonical" href="${route.canonical}" />`,
        )
        html = html.replace(
          /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/s,
          `<meta property="og:url" content="${route.canonical}" />`,
        )
        html = html.replace(
          /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/s,
          `<meta property="og:title" content="${route.title}" />`,
        )
        html = html.replace(
          /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/s,
          `<meta property="og:description" content="${route.description}" />`,
        )
        html = html.replace(
          /<meta\s+property=["']og:image["']\s+content=["'].*?["']\s*\/?>/s,
          `<meta property="og:image" content="${route.ogImage}" />`,
        )
        html = html.replace(
          /<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/s,
          `<meta name="twitter:title" content="${route.title}" />`,
        )
        html = html.replace(
          /<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/s,
          `<meta name="twitter:description" content="${route.description}" />`,
        )
        html = html.replace(
          /<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/s,
          `<meta name="twitter:image" content="${route.ogImage}" />`,
        )

        const scriptTag = `\n    <script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>\n  </head>`
        html = html.replace('</head>', scriptTag)

        const routeDir = path.join(distDir, route.dir)
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true })
        }
        fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8')
      }

      fs.writeFileSync(path.join(distDir, '404.html'), template, 'utf8')
      console.log('✓ Per-route HTML generated for /family-prayer, /youth-meeting, and 404.html')
    },
  }
}

export default defineConfig({
  plugins: [react(), perRouteHtmlPlugin()],
  // Env-driven base path: '/' on Vercel root, or '/Youth_Meeting_2026/' on GitHub Pages
  base: process.env.VITE_BASE ?? '/',
})
