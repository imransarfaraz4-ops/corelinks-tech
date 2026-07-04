# Corelinks — corelinks.tech (Mentor-style website)

A modern one-page IT-institute website (Mentor template style) + blog.
Static HTML/CSS/JS + Supabase (enquiry form). No build step.

## Pages / sections
- `index.html` — one-page: hero, counts, about, why-us, courses, trainers,
  enrollment, FAQ, testimonials, blog teaser, contact (form + map)
- `blog.html` / `article.html` — blog listing + articles

## Edit
- `config.js` — name, contact, WhatsApp, email (info@corelinks.tech), Supabase keys, site url
- `courses-data.js` — course catalog · `blog-data.js` — articles
- Trainers list is the `TRAINERS` array in `app.js`
- `styles.css` — brand colour is `--primary`

## Setup (enquiry form)
Run `../corelinks-website/supabase/website_setup.sql` (or the same file) in the
Supabase project so the contact form saves to the `enquiries` table.

## Deploy (free)
Cloudflare Pages / Netlify — connect the repo or drag-drop the folder.
Point the domain **corelinks.tech** at it.
