# Tradex

React + TypeScript + Tailwind CSS + React Router, built with Vite. Four pages are prerendered into meaningful HTML. No database, authentication, or dashboard.

## Development

Use Node 24 and npm. From this checkout:

```sh
npm ci --cache /tmp/tradex-npm-cache
npm run dev
```

The development server uses port 3000 and serves the email endpoint alongside Vite. Copy `.env.example` to `.env` if needed; never commit `.env`. Run `npm test` for the contact tests. Run `npm run build` for type checking, production assets, HTML, robots.txt and sitemap.xml; `npm start` serves that output and the API on `PORT` (default 3000).

## Content and production checklist

- Edit `src/config/company.ts` and `src/config/services.ts`. The current prose is provisional starter copy, not verified company information. Supply approved services and company details before launch.
- Set `VITE_SITE_URL` to the final HTTPS origin before building. This public value generates canonical URLs, Open Graph metadata, and sitemap entries. Without it the draft intentionally uses noindex and robots Disallow. Rebuild when the domain changes.
- Configure server-only `SITE_URL` with that same origin. For local email testing use the actual local origin.
- Configure `RESEND_API_KEY`, `CONTACT_FROM` (a Resend verified sender), and `CONTACT_TO` using hosting secrets. These names must never use a VITE_ prefix. No email values or credentials are bundled in the browser. The form remains disabled when configuration is incomplete. Provider acceptance is reported as acceptance for delivery, not proof of inbox delivery.
- The server validates input, checks the browser origin, limits request size, applies a process-wide limit of ten validated submissions per minute, and handles provider errors/timeouts. For multiple server instances use the host's shared rate limiting/WAF. No message bodies or credentials are logged.
- Test a real delivery to the intended mailbox after configuring Resend. Automated tests mock provider calls and do not prove actual delivery.
- Replace `public/social.svg` with an approved social image; for broad social-platform support export a 1200×630 PNG and update the image URL in `scripts/prerender.mjs`.

## Hosting and custom domain

Sites tools and runtime documentation are unavailable in the current environment, so Sites deployment is **not verified**. Build output is `dist/`. If Sites supports a persistent Node service, run `npm start` after the build and route all paths, including `/api/*`, to it. If Sites supports only static hosting, deploy `dist/` and adapt `server/contact.mjs` to a supported server function at `/api/contact` plus `/api/contact/status`; do not configure SPA fallbacks to return HTML for API routes. Until that supported integration is connected, contact stays unavailable. Serve unknown paths with the prerendered `404/index.html` and a 404 status.

Connect the custom domain through Sites domain settings using the DNS records the platform supplies; enable HTTPS, choose a primary hostname, redirect other hostnames to it, and rebuild with the primary origin. No domain or DNS records are invented in this repository.

All canonical routes (`/`, `/services`, `/about`, `/contact`) have unique titles and descriptions in their initial HTML. The app hydrates for client navigation. Navigation, responsive menu, skip link, route focus management, form labels and status announcements are included. No third-party fonts or image requests are required.
