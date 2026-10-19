# Recipe Secrets Restaurant — Website

A 5-page, mobile-first static site: plain HTML5/CSS3/vanilla JS, no build step.

## Structure
```
index.html        Home
about.html         About / chef / gallery
specials.html      Weekly specials with category tabs
reservation.html   Reservation form
contact.html       Contact details, map, contact form
css/style.css      Shared stylesheet
js/main.js         Shared nav, scroll animation, tabs, form validation
IMAGES.md          Every image URL used, for later swap-in
```

## Deploy to Netlify (drag & drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `recipe_website` folder onto the page.
3. Netlify gives you a live URL in seconds — done. (Add a custom domain later under **Site settings → Domain management**.)

## Set up Formspree (for both forms)
1. Create a free account at [formspree.io](https://formspree.io) and click **New Form**.
2. Copy the form endpoint it gives you, e.g. `https://formspree.io/f/abcd1234`.
3. In **reservation.html** and **contact.html**, replace `YOUR_FORM_ID` in the `<form action="...">` line with your real ID (you can use the same form for both, or create two separate forms/IDs if you want them to land in separate inboxes).

Both forms submit via JavaScript (`fetch`) so visitors see an inline "Thank you" or error message instead of being redirected to Formspree.

## Before going live
Search both the HTML files and this README for placeholders and replace them:
- `[ADDRESS]`, `[PHONE]`, `[EMAIL]`, `[HOURS]`, `[WHATSAPP]` (WhatsApp number, digits only, e.g. `6591234567`)
- `YOUR_FORM_ID` in both forms (see above)
- Swap Unsplash placeholder photos for real photography — see `IMAGES.md`

## Local preview
No build step needed — open `index.html` directly in a browser, or serve the folder with any static server (e.g. VS Code "Live Server", or `npx serve`).
