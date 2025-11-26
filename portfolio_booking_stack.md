# Tech Stack Recommendations for SSR Multimedia Portfolio and Booking Platform

## Overview
Portfolio and booking platform built with SSR using Next.js. Features include:

- Multimedia portfolio (music/audio streaming, photography galleries, embedded video)
- Booking platform with Google Calendar sync
- Service sales with Stripe via Clerk
- Admin dashboard to manage bookings, packages, and portfolio assets
- Open-source and low-code preferred

---

## 1. Frontend

### Framework
- **Next.js 13+** (with App Router) for SSR and dynamic routing

### UI Component Libraries
- **Chakra UI** (recommended): Accessible, themeable, SSR-ready
- Alternatives: Mantine, Material UI, shadcn/UI (Tailwind + Radix)

---

## 2. Backend / CMS

### Recommended: **Strapi**
- Open-source Node.js headless CMS
- REST/GraphQL API, role-based access, media library
- Extensible, plugin support, admin panel included

### Alternatives
- **Directus**: SQL-first headless CMS with admin UI
- **Supabase**: BaaS with Postgres + Auth + Storage (less CMS-focused)
- **Payload CMS**: Code-first, TypeScript, customizable but not low-code

---

## 3. Media Hosting

### Images / Photos
- **Cloudinary** (free tier): Transformation, CDN delivery, SSR-compatible
- Alternative: S3 + Thumbor (open-source, higher setup)

### Audio
- Store in CMS or S3/Supabase and use HTML5 `<audio>` tag
- Optional: SoundCloud or other embeds

### Video
- **YouTube or Vimeo embeds** (fastest option)
- **Cloudinary** (free plan includes video streaming)
- Optional: **PeerTube** (self-hosted, open-source, advanced)

---

## 4. Booking & Calendar Integration

### Recommended: **Cal.com**
- Open-source Calendly alternative
- Google Calendar integration
- Self-hosted or hosted free tier
- Embeddable booking flows

### Alternative
- Easy!Appointments (PHP, simpler, older UI)
- Custom Google Calendar API integration (high dev effort)

---

## 5. E-commerce & Payments

### Recommended: **Stripe via Clerk Billing**
- Clerk manages user authentication and billing UI
- Stripe handles payments (Checkout, subscriptions)
- Minimal integration, low-code, prebuilt pricing tables

### Alternatives
- MedusaJS (Node.js headless commerce)
- Saleor (Python, heavy, for complex shops)
- Snipcart (embed-based checkout)

---

## 6. Admin Dashboard

### Default: Use CMS admin panel (Strapi or Directus)
- Manage content, portfolio, and packages directly

### Optional Unified Dashboard
- **Appsmith** or **Budibase** (open-source internal tool builders)
- Drag-and-drop dashboards for bookings, analytics, CMS control

---

## Summary Table

| Area                     | Tech/Tool           | Notes                                                                 |
|--------------------------|---------------------|-----------------------------------------------------------------------|
| **Frontend Framework**   | Next.js 13+         | SSR support, App Router, React-based                                 |
| **UI Library**           | Chakra UI           | Accessible, SSR-friendly, easy styling                               |
| **CMS / Backend**        | Strapi              | Open-source, low-code, admin panel                                   |
| **Media Hosting**        | Cloudinary          | Free tier, image/video CDN + optimization                            |
| **Audio Streaming**      | HTML5 Audio         | Embed audio player, self-host or Cloudinary                          |
| **Video Embeds**         | YouTube/Vimeo       | Embed players, no hosting costs                                      |
| **Booking System**       | Cal.com             | Open-source, Google Calendar integration, embeddable                 |
| **E-commerce**           | Stripe via Clerk    | Secure payments, user-linked billing, prebuilt UI                    |
| **Authentication**       | Clerk               | OAuth, social logins, billing integration                            |
| **Admin Dashboard**      | Strapi Admin / Appsmith | CMS admin + low-code internal dashboard if needed                |