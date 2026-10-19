# Build: Recipe Secrets Restaurant website

## Goal
A polished, mobile-first, 5-page static website for "Recipe Secrets Restaurant" that makes people want to book a table.

## Tech constraints
- Plain HTML5 + CSS3 + vanilla JavaScript only (no frameworks, no build step).
- Must deploy as-is to free static hosting (Netlify / GitHub Pages / Vercel).
- One shared stylesheet (`css/style.css`) and one script (`js/main.js`).
- Shared header/nav and footer must look identical on every page.

## Pages
1. **index.html (Home)**: full-screen hero image with tagline and "Reserve a Table" CTA; short intro; 3 to 4 signature dish cards; testimonials strip; opening hours.
2. **about.html (About)**: our story, chef profile, the "secret recipes" philosophy, gallery of 6 images.
3. **specials.html (Specials)**: weekly specials as image cards (name, description, price); tabs or filters for Starters / Mains / Desserts / Drinks.
4. **reservation.html (Reservation)**: form with name, phone, email, date, time, number of guests, special requests. Client-side validation (no past dates, guests 1–20).
5. **contact.html (Contact)**: address, phone, email, WhatsApp link, opening hours, embedded Google Map iframe, simple contact form.

## Forms (static hosting)
- Use **Formspree** for both forms (`action="https://formspree.io/f/YOUR_FORM_ID"`), with a clear placeholder comment.
- Show a styled success / error message instead of redirecting.

## Design
- Mood: warm, upscale but welcoming. Deep charcoal + warm gold/terracotta accents, cream backgrounds.
- Fonts (Google Fonts): elegant serif for headings (e.g. Playfair Display), clean sans for body (e.g. Inter).
- Large, high-quality food and interior photography throughout.
- Sticky nav with a hamburger menu on mobile; active page highlighted.
- Subtle animations: fade-in on scroll, hover zoom on image cards. Nothing distracting.

## Images
- Use free Unsplash images via direct `images.unsplash.com` URLs relevant to each section (food, chef, dining room).
- Add descriptive `alt` text, `loading="lazy"` below the fold, and fixed aspect ratios to avoid layout shift.
- Keep a list of every image URL in `IMAGES.md` so I can swap in real photos later.

## Content
- Write realistic placeholder copy (not lorem ipsum).
- Put all business details in clearly marked placeholders: [ADDRESS], [PHONE], [EMAIL], [HOURS], [WHATSAPP].

## Quality bar
- Responsive at 375px, 768px and 1280px.
- Semantic HTML, accessible contrast, keyboard-usable nav and forms.
- Basic SEO: unique `<title>` and meta description per page, Open Graph tags, favicon.
- Lighthouse target: 90+ on Performance, Accessibility, SEO.

## Deliverables
- Folder: `index.html, about.html, specials.html, reservation.html, contact.html, css/, js/, IMAGES.md, README.md`
- README with 3-step deploy instructions for Netlify (drag and drop) and how to set up Formspree.

Build all pages, then review each one at mobile width and fix any layout issues before finishing.