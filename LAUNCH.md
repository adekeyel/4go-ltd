# 4GO Technology LTD website: launch checklist

## Replace placeholders
- [ ] Email, location, Leaf description: edit in src/content/defaults.js (or the dashboard later)
- [ ] Domain `https://www.4go.com.ng`: search the project for it (index.html, src/components/Seo.jsx, public/robots.txt, public/sitemap.xml)
- [ ] Email `4gotechnologies@gmail.com` (src/components/Footer.jsx, src/pages/Contact.jsx)
- [ ] Location "Lagos, Nigeria" (same two files)
- [ ] Leaf description (src/components/Portfolio.jsx)
- [ ] Logo mark (src/components/Logo.jsx, public/favicon.svg) and public/og-image.png if the brand changes
- [ ] Privacy Policy and Terms of Use text (editable in the dashboard once step 3 is built; until then edit src/content/defaults.js)
- [ ] Review About, vision, and "Working with us" copy

## Contact form
- [ ] Set VITE_API_URL in Vercel (Settings > Environment Variables) to your backend's /api URL, then redeploy
- [ ] Install the site-cms module on the backend first (see site-cms-backend/README.md)
- [ ] Send a real test message and confirm it arrives

## Before announcing
- [ ] npm install && npm run build locally, fix any warnings
- [ ] Lighthouse (mobile) on Home and Contact: performance, accessibility, SEO
- [ ] Keyboard-only pass: Tab through nav, mobile menu, form; skip link works
- [ ] Turn on "reduce motion" in your OS and confirm animations stop
- [ ] Check on a real phone and a wide monitor
- [ ] Share a page link in WhatsApp/LinkedIn/X to confirm the preview image
- [ ] Submit https://www.4go.com.ng/sitemap.xml in Google Search Console
- [ ] Add official social links to the footer once the accounts exist

## Admin dashboard
- [ ] Backend: copy offpay-backend-site-cms into the OffPay repo and follow its APPLY.md (2 lines in app.js, add the website domain to the END of FRONTEND_URL)
- [ ] Open https://YOUR-WEBSITE/admin, sign in with a full "admin" role account (email, password, emailed code)
- [ ] Overview > "Load original content" once, so every block and list becomes editable
- [ ] Edit Privacy Policy and Terms under "Legal pages"
- [ ] Send a test message from the contact form and confirm it shows under Messages
