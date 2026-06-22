---
name: project-bakery-platform
description: Full technical context for The Bakery Co. Platform — five connected surfaces on one Supabase backend, built by CH Studios LLC
metadata:
  type: project
---

# The Bakery Co. Platform

A full business operating system for small businesses. Five connected surfaces on one Supabase (Postgres) backend. Multi-tenant — every table has `tenant_id`, every API route scopes to the current tenant. The Salon Co. and Sports Bar Co. are next.

**Why:** Built as a multi-tenant platform so onboarding a new client is one database row and a frontend deploy.

## Five Surfaces

1. **Customer website** — HTML/CSS/JS, Node.js/Express, deployed on Render
2. **Admin dashboard** — 18 sections, JWT + email-verified auth
3. **KnotEmployee** — iOS employee scheduling app (SwiftUI, @Observable, Supabase Realtime, APNs via Deno Edge Function)
4. **iOS POS** — SwiftUI, Stripe Terminal for in-person card payments
5. **iOS customer app** — SwiftUI, Supabase iOS SDK

The backend is a plain REST API. All three iOS apps and the website are HTTP clients against the same endpoints.

## Admin Dashboard — 18 Sections

Dashboard, Orders (search/filter/fulfill/80mm thermal receipt/CSV), Revenue (today/all-time/AOV/tips/refunds/7-day chart + insights: best day of week, MoM growth, coupon impact, top sellers + margin table, tax report CSV), Menu CMS (add/edit/delete, image upload, sale pricing, cost/margin, allergens/badges), Inventory (stock qty, auto-reduces on order, sold-out toggle), Coupons (% or flat-rate, expiry, usage tracking), Hero editor, Hours (open/close per day, reflects on website and iOS instantly), Banner (text/color/link/show-hide), Store settings (tax rate, low stock threshold), Gift Cards (issued cards, remaining balance, active vs used), Subscriptions (create/edit/delete plans, linked menu items, weekly or monthly, MRR estimate, cancel individual), Customers (all accounts, loyalty points, manual adjustment), Messages (contact form inbox, unread badge), Event Inquiries (dessert table/milkshake party/wedding/corporate, unread badge), Applications (job apps with position/availability/message, owner sets open roles), Prep List (auto-aggregates pending order items into one production list by date), Staff & POS PINs (name/role/permission, 4-digit PINs, deactivate).

## Key Technical Features

- **Two Stripe payment flows:** Stripe Elements (confirmCardPayment client-side, order saved only after webhook confirms) + Stripe Checkout Sessions (for MCP/Claude orders — returns hosted URL). Single webhook endpoint handles both via `metadata.source`.
- **MCP server:** Built with `@modelcontextprotocol/sdk` — three tools: `get_menu`, `get_hours`, `place_order` (validates stock, builds Stripe line items, returns checkout URL).
- **WebMCP:** Shipped the week Google announced it at I/O 2026. Registers menu search, hours, and checkout as browser-native AI tools via W3C WebMCP standard (Chrome 146+).
- **Collaborative filtering upsell:** Fallback chain: real co-purchase frequency from `item_pairs` table → manually curated `paired_items` → time-aware cross-sell → best sellers.
- **Crumb Rewards loyalty:** `Math.floor(total)` points per order, Supabase RPC `increment_points` to prevent race conditions, 100 points = $1 off.
- **Gift cards:** Stripe webhook generates unique 16-char hex code, emails recipient via Resend, supports partial/full coverage.
- **Subscription billing:** Stripe Checkout in subscription mode, `invoice.payment_succeeded` webhook auto-generates recurring orders.
- **Coupon system:** Validates active flag, expiry, max uses, one_per_customer, first_time_only. Birthday cron generates `BDAY-XXXXXXXX` nightly (15% off, expires midnight), records `birthday_coupon_year` to prevent duplicates.
- **Inventory auto-management:** Stock decrements per order, `available` flips to false at 0, low-stock email below 5 units.
- **Transactional email:** Resend. **SMS:** Twilio.
- **4 cron jobs (node-cron):** Daily summary 8pm, weekly report Sunday 8pm, unfulfilled order reminder every 2hrs, birthday coupons 8am.
- **Rate limiting** on checkout endpoint (Stripe fraud risk).
- **JWT** verified server-side on every admin API route.
- **Dynamic OG tags** on product pages (Express injects meta tags server-side).
- **Fuse.js** fuzzy search with keyboard nav, cart persisted to localStorage.
- **Lighthouse:** 100 accessibility, 100 SEO, 100 best practices.
- Google Tag Manager + GA4. 20 pages. 70ms interaction response time.

## KnotEmployee (iOS Employee App)

Multi-tenant iOS scheduling app. In TestFlight, targeting App Store.

**Manager features:** Drag-and-drop weekly schedule builder (7-column grid), template system, labor cost report with CSV export, approve/deny time off with conflict detection, approve/deny shift swaps and open shift pickups, team directory with live clock-in status, broadcast messaging, real-time alerts.

**Staff features:** Clock in/out with break tracking, weekly schedule view, time off requests (PTO/sick/personal) with balance tracking, shift swap requests, open shift pickup, direct messaging, earnings estimate.

**Tech stack:**
- SwiftUI + @Observable
- Supabase Realtime websockets
- APNs via Deno Edge Function triggered by `kn_notifications` INSERT
- MetricKit only (no third-party analytics)
- Custom KnotTheme design system with BakeryCoTheme (warm cream/espresso/rose/gold, Cormorant Garamond)
- Full dark mode via adaptive `Color(UIColor { traits in … })` pairs
- Background lock via `scenePhase`
- 3-page onboarding via `@AppStorage`

**Legal pages (hosted on chstudiosdetroit.com):**
- Privacy Policy: `chstudiosdetroit.com/knotemployee/privacy.html`
- Terms of Service: `chstudiosdetroit.com/knotemployee/terms.html`
