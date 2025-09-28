# epeople FC Season 2 — Responsive Landing Page

A single‑page, fully responsive landing site for the epeople FC FIFA tournament with a black and gold theme. It includes mobile‑friendly navigation, a hero section with CTA, About, Highlights gallery (grid on desktop, carousel on mobile), a Registration form with validation, Prizes & Schedule, Contact, and a back‑to‑top button.

## Highlights
- Mobile‑first, no horizontal scrolling on small screens (320px and up)
- Black and gold branding throughout
- Accessible mobile navigation (hamburger with overlay, ESC/outside click to close)
- Desktop gallery grid; mobile carousel with autoplay, arrows, indicators, and swipe
- Registration form with inline validation and success message
- Prizes (3‑column desktop → 1‑column mobile) and schedule (mobile‑optimized vertical list)
- Smooth scrolling, keyboard support, and performance-conscious UI

## Tech stack
- HTML5, CSS3, JavaScript (no framework)
- Google Fonts (Poppins)

## Project structure
- index.html — page markup and content
- style.css — theme, layout, responsive styles, utilities
- script.js — navigation, carousel, form validation, interactions
- logo/ — tournament logo assets
- participant/ — participant images used in gallery/carousel

## Getting started
1) Open index.html in a modern browser (Chrome, Edge, Firefox, Safari).
2) Use browser dev tools to test responsive breakpoints (320, 480, 768, 1024).
3) Optional: serve via a static server (helps with some browser autoplay/security policies).
   - Example (Node): npx serve .

## Content and configuration
- Branding
  - Logo: replace logo/IMG-20250118-WA0045.jpg with your file and update the path in index.html if needed.
  - Colors: edit gold accents (#ffd700, #ffb84d) and backgrounds (#000000) in style.css.

- Text and dates
  - Start Date (About): currently “November 15, 2025”.
  - Schedule (Prizes & Schedule): dates updated to 2025. Adjust in index.html as needed.
  - Contact info: update WhatsApp link and email in the Contact section.

- Currency
  - Amounts are shown in naira (NGN):
    - Prize Pool: ₦250,000
    - Registration: ₦3,500 per player
    - Champion: ₦100,000
    - Runner‑up: ₦50,000
    - Third place: ₦20,000

- Highlights gallery
  - Desktop grid items live under the .gallery-grid container in index.html.
  - Mobile carousel items live under the .carousel-track container.
  - To add an image, add a new block to BOTH the grid (.gallery-item) and the carousel (.carousel-item) for consistency.
  - Recommended: use sufficiently large images; they are cropped with object-fit: cover. Desktop grid height ≈ 250px; carousel ≈ 300px.

## Responsive behavior
- Navbar collapses to a hamburger on ≤768px; it slides in from the right with an overlay. Body scroll is locked when open.
- Hero CTA becomes full‑width on mobile.
- About and Contact sections stack into a single column on small screens.
- Highlights: grid (desktop) → carousel (mobile) with autoplay and swipe.
- Registration: fields and button are full width; inline validation feedback.
- Prizes grid: 3 columns (desktop) → 1 column (mobile).
- Schedule: vertically stacked list on mobile (no horizontal scroll).
- Global text wrapping rules avoid overflow on small screens.

## Accessibility
- Hamburger button uses aria-controls and aria-expanded.
- Menu closes with ESC, overlay click, outside click, and on resize.
- Carousel supports keyboard arrows (left/right) and touch swipes.
- Color contrast is tuned for a dark background with gold accents.

## Performance notes
- Minimal external dependencies (Google Fonts with preconnect).
- Consider compressing images in participant/ to improve load times.
- Avoid excessively large background images; current backgrounds are lightweight.

## Testing checklist
- No horizontal scroll at 320px, 375px, 480px, 768px.
- Navbar opens/closes correctly; background page does not scroll while open.
- Carousel auto‑plays and supports swipes and arrows on mobile.
- Registration form validates and shows a success message; inputs retain accessibility.
- Lighthouse (Chrome DevTools → Lighthouse → Mobile): check Performance, Accessibility, Best Practices, SEO.

## Maintenance tips
- Keep image filenames simple (avoid special characters) to reduce path issues.
- When adding content to lists (schedule, benefits, etc.), ensure items stack cleanly on mobile.
- If the menu grows, it remains scrollable within the viewport height.

## License
All rights reserved. Content and assets are the property of epeople FC (or the project owner). Contact the owner for reuse permissions.

## Contact
- Email: info@epeoplefc.com
- WhatsApp: https://wa.me/1234567890

