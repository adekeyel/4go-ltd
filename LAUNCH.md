# 4GO Technology LTD website: launch checklist

## Replace placeholders
- [ ] Domain `https://4go.tech`: search the project for it (index.html, src/components/Seo.jsx, public/robots.txt, public/sitemap.xml)
- [ ] Email `hello@your-domain.com` (src/components/Footer.jsx, src/pages/Contact.jsx)
- [ ] Location "Lagos, Nigeria" (same two files)
- [ ] Leaf description (src/components/Portfolio.jsx)
- [ ] Logo mark (src/components/Logo.jsx, public/favicon.svg) and public/og-image.png if the brand changes
- [ ] Privacy Policy and Terms of Use text (currently placeholder routes in src/App.jsx)
- [ ] Review About, vision, and "Working with us" copy

## Contact form
- [ ] Set VITE_CONTACT_ENDPOINT in Vercel project settings (Settings > Environment Variables), then redeploy
- [ ] Send a real test message and confirm it arrives

## Before announcing
- [ ] npm install && npm run build locally, fix any warnings
- [ ] Lighthouse (mobile) on Home and Contact: performance, accessibility, SEO
- [ ] Keyboard-only pass: Tab through nav, mobile menu, form; skip link works
- [ ] Turn on "reduce motion" in your OS and confirm animations stop
- [ ] Check on a real phone and a wide monitor
- [ ] Share a page link in WhatsApp/LinkedIn/X to confirm the preview image
- [ ] Submit https://your-domain/sitemap.xml in Google Search Console
- [ ] Add official social links to the footer once the accounts exist
