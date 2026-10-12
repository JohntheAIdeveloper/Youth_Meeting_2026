#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

async function runChecks() {
  console.log('🔎 Running JTLM Event Configuration Integrity Guard...\n')
  const errors = []

  // Spin up lightweight Vite server to load TypeScript configs directly
  const server = await createServer({
    root: rootDir,
    server: { middlewareMode: true },
    logLevel: 'error',
  })

  try {
    const { EVENTS, getEvent } = await server.ssrLoadModule('./src/config/events.ts')
    const { GOOGLE_FORM_URL: youthFormUrl } = await server.ssrLoadModule('./src/config/event.ts')

    if (!Array.isArray(EVENTS) || EVENTS.length < 2) {
      errors.push('EVENTS array must contain at least 2 events.')
    }

    const family = getEvent('family-prayer')
    const youth = getEvent('youth-meeting')

    if (!family) errors.push("Missing 'family-prayer' event in EVENTS.")
    if (!youth) errors.push("Missing 'youth-meeting' event in EVENTS.")

    if (family && youth) {
      // 1. Form URL Separation & Safety
      const familyUrl = family.registration?.shareUrl || ''
      const youthUrl = youth.registration?.shareUrl || ''

      console.log(`✓ Family Registration URL: ${familyUrl}`)
      console.log(`✓ Youth Registration URL:  ${youthUrl}`)

      if (!familyUrl.startsWith('https://')) {
        errors.push(`Family registration shareUrl must be a secure HTTPS link: ${familyUrl}`)
      }
      if (!youthUrl.startsWith('https://')) {
        errors.push(`Youth registration shareUrl must be a secure HTTPS link: ${youthUrl}`)
      }
      if (familyUrl === youthUrl) {
        errors.push(`CRITICAL: Family and Youth share the exact same registration URL! (${familyUrl})`)
      }

      // Check form IDs cross-contamination
      const familyFormId = 'KD67MRaaUvF91KKA7'
      const youthFormId = '69quUsz8yt7kqCgj8'

      if (!familyUrl.includes(familyFormId)) {
        errors.push(`Family registration URL must contain expected form ID ${familyFormId}: ${familyUrl}`)
      }
      if (familyUrl.includes(youthFormId)) {
        errors.push(`CRITICAL: Family registration URL contains Youth form ID ${youthFormId}!`)
      }
      if (!youthUrl.includes(youthFormId)) {
        errors.push(`Youth registration URL must contain expected form ID ${youthFormId}: ${youthUrl}`)
      }
      if (youthUrl.includes(familyFormId)) {
        errors.push(`CRITICAL: Youth registration URL contains Family form ID ${familyFormId}!`)
      }

      // 2. Dates and ISO timestamps
      for (const event of [family, youth]) {
        const start = new Date(event.startIso)
        const end = new Date(event.endIso)

        if (Number.isNaN(start.getTime())) {
          errors.push(`Invalid startIso '${event.startIso}' on event '${event.id}'.`)
        }
        if (Number.isNaN(end.getTime())) {
          errors.push(`Invalid endIso '${event.endIso}' on event '${event.id}'.`)
        }
        if (start >= end) {
          errors.push(`startIso must be strictly before endIso on event '${event.id}'.`)
        }

        // Check SEO
        if (!event.seo?.title || !event.seo?.description) {
          errors.push(`Missing SEO title or description on event '${event.id}'.`)
        }
        if (!event.seo?.ogImage || !/^https?:\/\//.test(event.seo.ogImage)) {
          errors.push(`SEO ogImage must be an absolute URL on event '${event.id}': ${event.seo?.ogImage}`)
        }

        // Check Poster metadata
        if (!event.poster?.src || event.poster.width <= 0 || event.poster.height <= 0) {
          errors.push(`Invalid poster dimensions or src on event '${event.id}'.`)
        }
        if (!event.poster?.altTa || !event.poster?.altEn) {
          errors.push(`Missing poster alt text (altTa or altEn) on event '${event.id}'.`)
        }

        // Check contacts
        if (!event.contacts || event.contacts.length === 0) {
          errors.push(`No contacts defined on event '${event.id}'.`)
        } else {
          for (const c of event.contacts) {
            if (!c.nameEn || !c.display || !c.tel) {
              errors.push(`Incomplete contact object on event '${event.id}': ${JSON.stringify(c)}`)
            }
            if (!/^\+91\d{10}$/.test(c.tel)) {
              errors.push(`Contact tel '${c.tel}' on event '${event.id}' must be in E.164 +91 format.`)
            }
          }
        }

        // Check venue
        if (!event.venue?.nameTa || !event.venue?.nameEn || !event.venue?.directionsUrl) {
          errors.push(`Incomplete venue details on event '${event.id}'.`)
        }
      }

      // Check physical assets on disk
      const checkFiles = [
        'public/images/poster-family-v1.webp',
        'public/images/poster-family-v1.jpg',
        'public/images/poster-v3.webp',
        'public/images/logo.png',
      ]
      for (const rel of checkFiles) {
        const full = path.join(rootDir, rel)
        if (!fs.existsSync(full)) {
          errors.push(`Required static file not found: ${rel}`)
        }
      }
    }
  } finally {
    await server.close()
  }

  if (errors.length > 0) {
    console.error('\n❌ CONFIG INTEGRITY CHECKS FAILED:')
    for (const err of errors) {
      console.error(`  - ${err}`)
    }
    process.exit(1)
  }

  console.log('\n✅ All event configuration integrity checks PASSED successfully!\n')
}

runChecks().catch((err) => {
  console.error('Fatal error during config check:', err)
  process.exit(1)
})
