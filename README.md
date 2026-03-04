# Vinetla — Virtual School Tours & Digital Yearbooks

A password-protected platform for immersive 360° school tours and digital yearbook experiences. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Pannellum.

---

## Quick start

```bash
# 1. Clone & install
git clone <your-repo-url>
cd vinetla
npm install

# 2. Set environment variables
cp .env.local.example .env.local
# Then edit .env.local with your values (see below)

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to the login page.

**Default password:** `demo2026` (set via `TOUR_PASSWORD` env var).

---

## Environment variables

| Variable             | Required | Description                                          |
| -------------------- | -------- | ---------------------------------------------------- |
| `TOUR_PASSWORD`      | Yes      | Shared password to access the site                   |
| `TOUR_COOKIE_SECRET` | Yes      | Random string used to sign auth cookies (min 32 chars recommended) |

Create a `.env.local` file in the project root:

```
TOUR_PASSWORD=your-secure-password
TOUR_COOKIE_SECRET=a-random-secret-string-at-least-32-characters
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (font, global CSS)
│   ├── page.tsx                # Root redirect → demo class
│   ├── globals.css             # Tailwind + design tokens + animations
│   ├── login/
│   │   ├── page.tsx            # Login form (client component)
│   │   └── actions.ts          # Server action: password verification
│   └── s/[schoolSlug]/c/[classSlug]/
│       ├── page.tsx            # Class landing page
│       └── tour/page.tsx       # Virtual tour (map + panoramas)
├── components/
│   ├── LayoutShell.tsx         # Shared header/footer shell
│   ├── MapWithPins.tsx         # 2D map with interactive pins
│   ├── PanoramaModal.tsx       # 360° panorama modal (Pannellum)
│   └── TourClient.tsx          # Client wrapper for tour interactivity
├── data/
│   └── schools.ts              # School/class config (replaces DB for MVP)
├── lib/
│   └── auth.ts                 # Cookie signing/verification, password helpers
└── middleware.ts               # Auth gate: redirects unauthenticated users to /login
```

---

## Adding your school / class

Edit `src/data/schools.ts` to add entries. Each class needs:

```ts
{
  schoolSlug: "your-school",
  classSlug: "2026-11a",
  schoolName: "Your School",
  className: "Class of 2026 · 11A",
  mapImage: "/maps/your-school.svg",       // floor plan
  accent: "#2563eb",                        // optional accent colour
  scenes: [
    {
      id: "entrance",
      title: "Main Entrance",
      mapX: 50,                             // % from left
      mapY: 90,                             // % from top
      panorama: "/panos/your-school/entrance.jpg",
    },
    // ... more scenes
  ],
}
```

### Where to put assets

| Asset type       | Location                          | Format                  |
| ---------------- | --------------------------------- | ----------------------- |
| Floor plan maps  | `public/maps/`                    | SVG or PNG              |
| Panorama images  | `public/panos/<school>/`          | JPG (equirectangular)   |
| Hero images      | `public/images/`                  | JPG / PNG / SVG         |

**Panorama images** must be equirectangular (2:1 aspect ratio). You can capture these with a 360° camera or stitch them from photos using tools like Google Street View Studio, PTGui, or Insta360 Studio.

---

## Routing

```
/                                       → redirects to demo class
/login                                  → password entry
/s/{schoolSlug}/c/{classSlug}           → class landing page
/s/{schoolSlug}/c/{classSlug}/tour      → virtual tour (map + 360° viewer)
```

All routes except `/login` and static assets require authentication.

---

## Deploy to Vercel

1. Push this repo to GitHub / GitLab / Bitbucket.

2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.

3. In the Vercel project settings, add these environment variables:
   - `TOUR_PASSWORD` — the password users will enter
   - `TOUR_COOKIE_SECRET` — a long random string (e.g., `openssl rand -hex 32`)

4. Deploy. That's it — works on the free tier.

### Custom domain support

The routing is architected so custom domains can be mapped per school or class in the future:

- Point a custom domain (e.g., `11a2026.school.kz`) to your Vercel project.
- Add domain mapping logic in `next.config.ts` or middleware to resolve the domain → `schoolSlug` + `classSlug`.
- The underlying page components already receive their config via slugs, so no page changes are needed.

This is a future enhancement — for now, all schools/classes are accessed via the `/s/{slug}/c/{slug}` path pattern.

---

## Tech stack

- **Framework:** Next.js 16 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **360° Viewer:** Pannellum (loaded via CDN, lazy)
- **Font:** DM Sans (via `next/font`)
- **Auth:** HMAC-signed HttpOnly cookies (no DB needed)
- **Hosting:** Vercel (free tier compatible)

---

## Development

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## License

Private — all rights reserved.
