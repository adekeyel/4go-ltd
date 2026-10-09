import { glyphNames } from '../components/Glyphs.jsx'

const f = (name, label, type = 'text', extra = {}) => ({ name, label, type, ...extra })
const PARAS = 'Separate paragraphs with a blank line.'

// Single content blocks, keyed exactly as in src/content/defaults.js
export const sectionsSchema = {
  hero: { label: 'Hero', fields: [f('headline', 'Headline'), f('text', 'Supporting text', 'textarea'), f('primary_cta', 'Main button text'), f('secondary_cta', 'Second button text')] },
  intro: { label: 'Introduction', fields: [f('heading', 'Heading'), f('text', 'Text', 'textarea'), f('button', 'Button text')] },
  build: { label: 'What We Build: heading', note: 'Also shown on the What We Do page.', fields: [f('heading', 'Heading'), f('text', 'Text', 'textarea')] },
  philosophy: { label: 'Philosophy: heading', note: 'Also shown on the Company page.', fields: [f('heading', 'Heading')] },
  approach: { label: 'Approach: heading', note: 'Also shown on About and What We Do.', fields: [f('heading', 'Heading')] },
  tech: { label: 'Technology capabilities: heading', note: 'Also shown on the Technology page.', fields: [f('heading', 'Heading'), f('text', 'Text', 'textarea')] },
  future: { label: 'Future section', note: 'Also shown on the Technology page.', fields: [f('heading', 'Heading'), f('text', 'Text', 'textarea')] },
  values: { label: 'Values: heading', note: 'Also shown on About.', fields: [f('heading', 'Heading')] },
  portfolio: { label: 'Built by 4GO: heading', note: 'Also shown on the Company page.', fields: [f('heading', 'Heading'), f('text', 'Text', 'textarea'), f('more', 'Closing line under the list')] },
  why: { label: 'Why build with 4GO: heading', note: 'Also shown on the Company page.', fields: [f('heading', 'Heading')] },
  cta: { label: 'Closing call to action', note: 'Appears at the bottom of most pages.', fields: [f('heading', 'Heading'), f('text', 'Text', 'textarea'), f('button', 'Button text')] },

  about_hero: { label: 'Page header', fields: [f('title', 'Title'), f('intro', 'Introduction', 'textarea')] },
  about_what: { label: 'What we do', fields: [f('title', 'Heading'), f('body', 'Text', 'textarea', { rows: 8, hint: PARAS })] },
  about_why: { label: 'Why we exist', fields: [f('title', 'Heading'), f('body', 'Text', 'textarea', { rows: 8, hint: PARAS })] },
  about_vision: { label: 'Our vision', fields: [f('title', 'Heading'), f('body', 'Text', 'textarea', { rows: 6, hint: PARAS })] },
  about_direction: { label: 'Where we are heading', fields: [f('title', 'Heading'), f('body', 'Text', 'textarea', { rows: 6, hint: PARAS })] },

  whatwedo_hero: { label: 'Page header', fields: [f('title', 'Title'), f('intro', 'Introduction', 'textarea')] },
  whatwedo_work: { label: 'Working with us: heading', fields: [f('title', 'Heading'), f('intro', 'Opening line', 'textarea')] },

  technology_hero: { label: 'Page header', fields: [f('title', 'Title'), f('intro', 'Introduction', 'textarea')] },
  tech_reliable: { label: 'Built to be relied on', fields: [f('title', 'Heading'), f('body', 'Text', 'textarea', { rows: 8, hint: PARAS })] },

  company_hero: { label: 'Page header', fields: [f('title', 'Title'), f('intro', 'Introduction', 'textarea')] },

  careers_hero: { label: 'Page header', fields: [f('title', 'Title'), f('intro', 'Introduction', 'textarea')] },
  careers_empty: { label: 'Message when there are no open positions', fields: [f('text', 'Message', 'textarea', { rows: 3 })] },

  contact: { label: 'Contact page and company details', note: 'The email and location also appear in the footer.', fields: [f('heading', 'Page title'), f('text', 'Introduction', 'textarea'), f('email', 'Email address', 'email'), f('location', 'Location')] },
  footer: { label: 'Footer description', fields: [f('description', 'Short company description', 'textarea')] },

  privacy: { label: 'Privacy Policy', fields: [f('title', 'Title'), f('body', 'Text', 'textarea', { rows: 16, hint: PARAS + ' Start a line with ## to make a heading.' })] },
  terms: { label: 'Terms of Use', fields: [f('title', 'Title'), f('body', 'Text', 'textarea', { rows: 16, hint: PARAS + ' Start a line with ## to make a heading.' })] },
}

const seo = (label) => ({ label, fields: [f('title', 'Page title', 'text', { hint: 'Shown in the browser tab and search results.' }), f('description', 'Search description', 'textarea', { rows: 3, hint: 'About 150 characters works best.' })] })
Object.assign(sectionsSchema, {
  seo_home: seo('Home'),
  seo_about: seo('About'),
  seo_whatwedo: seo('What We Do'),
  seo_technology: seo('Technology'),
  seo_company: seo('Company'),
  seo_careers: seo('Careers'),
  seo_contact: seo('Contact'),
})

// Lists of entries
export const collectionsSchema = {
  capabilities: {
    label: 'Capabilities', noun: 'capability', note: 'Also shown on the What We Do page.',
    fields: [f('title', 'Title'), f('text', 'Description', 'textarea'), f('icon', 'Icon', 'select', { options: glyphNames })],
    title: (d) => d.title,
  },
  philosophy_lines: { label: 'Philosophy lines', noun: 'line', note: 'Also shown on the Company page.', fields: [f('text', 'Line')], title: (d) => d.text },
  approach_steps: { label: 'Approach steps', noun: 'step', note: 'Numbered 01, 02, 03 automatically, in this order.', fields: [f('title', 'Title'), f('text', 'Description', 'textarea')], title: (d) => d.title },
  tech_areas: { label: 'Technology areas', noun: 'area', fields: [f('name', 'Name'), f('text', 'Description', 'textarea')], title: (d) => d.name },
  values: { label: 'Values', noun: 'value', fields: [f('name', 'Name'), f('text', 'Description', 'textarea')], title: (d) => d.name },
  portfolio: {
    label: 'Built by 4GO entries', noun: 'entry', note: 'Also shown on the Company page. A link is optional and must start with https://',
    fields: [f('name', 'Name'), f('area', 'Category'), f('text', 'Short description', 'textarea'), f('url', 'Link (optional)', 'url')],
    title: (d) => d.name,
  },
  positions: {
    label: 'Open positions', noun: 'position',
    note: 'Positions shown on the Careers page. Use Hide to close a position without deleting it: it disappears from the site and can no longer be applied for. Applications already received are kept.',
    fields: [
      f('title', 'Job title'),
      f('department', 'Department', 'text', { hint: 'For example: Engineering' }),
      f('location', 'Location', 'text', { hint: 'For example: Lagos, or Remote' }),
      f('type', 'Employment type', 'select', { options: ['Full-time', 'Part-time', 'Contract', 'Internship'], blank: 'Not specified' }),
      f('summary', 'Short description', 'textarea', { rows: 4 }),
      f('responsibilities', 'What you will do', 'textarea', { rows: 6, hint: 'One point per line.' }),
      f('requirements', 'What we are looking for', 'textarea', { rows: 6, hint: 'One point per line.' }),
      f('closes', 'Apply by (optional)', 'text', { hint: 'For example: 30 November 2026' }),
    ],
    title: (d) => d.title,
  },
  why_points: { label: 'Why 4GO points', noun: 'point', note: 'Also shown on the Company page.', fields: [f('text', 'Point')], title: (d) => d.text },
  work_ways: { label: 'Ways to work with us', noun: 'item', fields: [f('title', 'Lead-in (bold)'), f('text', 'Description', 'textarea')], title: (d) => d.title },
}

const S = (key) => ({ type: 'section', key })
const L = (key) => ({ type: 'list', key })

// Dashboard pages, in the sidebar order. Blocks appear top to bottom as they do on the site.
export const pages = [
  { id: 'home', label: 'Home page', blocks: [S('hero'), S('intro'), S('build'), L('capabilities'), S('philosophy'), L('philosophy_lines'), S('approach'), L('approach_steps'), S('tech'), L('tech_areas'), S('future'), S('values'), L('values'), S('portfolio'), L('portfolio'), S('why'), L('why_points'), S('cta')] },
  { id: 'about', label: 'About', blocks: [S('about_hero'), S('about_what'), S('about_why'), S('about_vision'), S('about_direction')], hint: 'The approach and values on this page are edited under Home page.' },
  { id: 'whatwedo', label: 'What We Do', blocks: [S('whatwedo_hero'), S('whatwedo_work'), L('work_ways')], hint: 'The capabilities and approach on this page are edited under Home page.' },
  { id: 'technology', label: 'Technology', blocks: [S('technology_hero'), S('tech_reliable')], hint: 'The technology areas and future section on this page are edited under Home page.' },
  { id: 'company', label: 'Company', blocks: [S('company_hero')], hint: 'The philosophy, why 4GO, and portfolio on this page are edited under Home page.' },
  { id: 'careers', label: 'Careers', blocks: [S('careers_hero'), L('positions'), S('careers_empty')], defaultOpen: 1, hint: 'Add and manage open positions here. Applications from visitors arrive under Applications in the menu.' },
  { id: 'contact', label: 'Contact and footer', blocks: [S('contact'), S('footer')] },
  { id: 'legal', label: 'Legal pages', blocks: [S('privacy'), S('terms')] },
  { id: 'seo', label: 'Search appearance', blocks: [S('seo_home'), S('seo_about'), S('seo_whatwedo'), S('seo_technology'), S('seo_company'), S('seo_careers'), S('seo_contact')], hint: 'How each page looks in browser tabs, Google results and link previews.' },
]
