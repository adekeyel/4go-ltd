// Built-in website content. The site shows this whenever the content API has nothing newer,
// and the dashboard's "Load default content" button copies it into the database.

const withIds = (arr) => arr.map((d, i) => ({ ...d, id: `d${i}` }))

const sections = {
  hero: {
    headline: 'Building Technology for What’s Next.',
    text: '4GO Technology LTD is a Nigerian technology company building digital products, platforms, software, and technology solutions designed to solve real-world problems and create new possibilities.',
    primary_cta: 'Explore What We Do',
    secondary_cta: 'Talk to Us',
  },
  intro: {
    heading: 'Technology built around real problems.',
    text: 'At 4GO Technology LTD, we believe technology is most valuable when it solves meaningful problems. We design and develop digital solutions that help people, businesses, and organizations operate more efficiently, connect with their customers, and participate in an increasingly digital world.',
    button: 'Learn More',
  },
  build: {
    heading: 'What We Build',
    text: 'Seven areas of work, one standard: technology that is dependable, practical, and built to grow.',
  },
  philosophy: { heading: 'Technology should do more than work.' },
  approach: { heading: 'How we approach every project.' },
  tech: {
    heading: 'We understand the technology behind what we build.',
    text: 'From the screen a person taps to the systems that respond, our engineering covers the full stack.',
  },
  future: {
    heading: 'The future is built, not predicted.',
    text: 'Technology continues to reshape how people live, work, communicate, and do business. 4GO Technology LTD is committed to building solutions that participate in that transformation.',
  },
  values: { heading: 'What we hold ourselves to.' },
  portfolio: {
    heading: 'Built by 4GO',
    text: 'A selection of the digital products our team has built across different categories of technology.',
    more: 'More in development.',
  },
  why: { heading: 'Why build with 4GO?' },
  cta: {
    heading: 'Let’s build what comes next.',
    text: 'Have an idea, business challenge, or technology opportunity? We’d like to hear about it.',
    button: 'Contact 4GO',
  },
  contact: {
    heading: 'Let’s build what comes next.',
    text: 'Have an idea, business challenge, or technology opportunity? We’d like to hear about it.',
    email: 'hello@your-domain.com',
    location: 'Lagos, Nigeria',
  },
  footer: {
    description: '4GO Technology LTD is a Nigerian technology company building digital products, software and platforms.',
  },
  about_hero: {
    title: 'We are 4GO Technology LTD.',
    intro: '4GO Technology LTD is a Nigerian technology company focused on developing digital products, software, platforms, and technology solutions.',
  },
  about_what: {
    title: 'What we do',
    body: 'We build digital products and the technology behind them. Our work spans web and mobile applications, the backend systems and infrastructure that power them, and the integrations that connect them to the wider digital economy.\n\nWe are a technology company, not a single-product business. Each thing we build adds to a growing body of engineering knowledge that we carry into the next.',
  },
  about_why: {
    title: 'Why we exist',
    body: 'Technology is most useful when people can rely on it. We exist to build technology that is practical: dependable in daily use, simple to understand, and designed for the conditions people and businesses actually work in, including those of African markets.\n\nWe start with the problem, then choose the tools. Never the other way around.',
  },
  about_vision: {
    title: 'Our vision',
    body: 'To be a technology company that people and organizations trust to build well: products and platforms that grow with the people who use them, and that hold up as the world around them changes.',
  },
  about_direction: {
    title: 'Where we are heading',
    body: 'We are building for the long term. That means widening the range of products and platforms we develop, deepening the infrastructure underneath them, and growing a company whose engineering and standards scale with its ambitions.',
  },
  whatwedo_hero: {
    title: 'What we do.',
    intro: 'We design, build, and evolve digital products, software, platforms, and the technology infrastructure behind them.',
  },
  whatwedo_work: {
    title: 'Working with us',
    intro: 'There are three common ways organizations and individuals work with 4GO.',
  },
  technology_hero: {
    title: 'The engineering behind what we build.',
    intro: 'Good products rest on good foundations. This is how we think about the technology underneath.',
  },
  tech_reliable: {
    title: 'Built to be relied on',
    body: 'We build for dependability first. That means clear architecture, secure authentication and data handling, monitoring in production, and designs that can scale as usage grows.\n\nWe use modern development practices and keep systems maintainable, so a product can keep improving long after its first release.',
  },
  company_hero: {
    title: 'The company behind the technology.',
    intro: 'How we think, why people build with us, and the products we have built along the way.',
  },
  privacy: { title: 'Privacy Policy', body: 'Our privacy policy is being prepared.' },
  terms: { title: 'Terms of Use', body: 'Our terms of use are being prepared.' },
  seo_home: {
    title: '4GO Technology LTD | Nigerian Technology Company',
    description: '4GO Technology LTD is a Nigerian technology company building digital products, platforms, software and technology solutions for real-world problems.',
  },
  seo_about: {
    title: 'About',
    description: '4GO Technology LTD is a Nigerian technology company developing digital products, software, platforms, and technology solutions built for real-world use.',
  },
  seo_whatwedo: {
    title: 'What We Do',
    description: 'Software development, digital platforms, technology infrastructure and business technology solutions from 4GO Technology LTD, a technology company in Nigeria.',
  },
  seo_technology: {
    title: 'Technology',
    description: 'The engineering behind 4GO Technology LTD: web, mobile, backend, cloud, integrations and data, built for reliability and scale.',
  },
  seo_company: {
    title: 'Company',
    description: 'How 4GO Technology LTD thinks about technology, why organizations build with us, and the products we have built.',
  },
  seo_contact: {
    title: 'Contact',
    description: 'Contact 4GO Technology LTD about a product idea, business challenge or technology opportunity.',
  },
}

const collections = {
  capabilities: withIds([
    { icon: 'software', title: 'Software Development', text: 'Designing and developing modern web, mobile, and enterprise software applications.' },
    { icon: 'platforms', title: 'Digital Platforms', text: 'Building scalable platforms that connect users, businesses, services, and digital experiences.' },
    { icon: 'infrastructure', title: 'Technology Infrastructure', text: 'Developing the technical systems, APIs, architecture, and infrastructure that power digital products.' },
    { icon: 'business', title: 'Business Technology Solutions', text: 'Creating technology that improves business processes, productivity, operations, and customer experiences.' },
    { icon: 'fintech', title: 'Fintech Technology', text: 'Developing technology for digital financial services, payment systems, financial platforms, and related infrastructure.' },
    { icon: 'mobile', title: 'Mobile Technology', text: 'Building mobile-first experiences and applications for modern users.' },
    { icon: 'consulting', title: 'Technology Consulting', text: 'Helping organizations identify technology opportunities, design solutions, and turn ideas into working digital products.' },
  ]),
  philosophy_lines: withIds([
    { text: 'It should solve problems.' },
    { text: 'It should remove friction.' },
    { text: 'It should create opportunities.' },
    { text: 'It should connect people.' },
    { text: 'It should help businesses grow.' },
    { text: 'And it should be built to evolve.' },
  ]),
  approach_steps: withIds([
    { title: 'Understand', text: 'We identify the problem, users, business objectives, and technical requirements.' },
    { title: 'Design', text: 'We turn ideas and requirements into intuitive digital experiences and scalable system architecture.' },
    { title: 'Build', text: 'We develop reliable software using modern technologies and engineering practices.' },
    { title: 'Improve', text: 'We monitor, refine, and evolve products as users, businesses, and technology change.' },
  ]),
  tech_areas: withIds([
    { name: 'Web', text: 'Modern web applications and platforms.' },
    { name: 'Mobile', text: 'Android and mobile-first experiences.' },
    { name: 'Backend', text: 'APIs, databases, authentication, business logic, and scalable services.' },
    { name: 'Cloud', text: 'Cloud infrastructure, deployment, hosting, monitoring, and scalability.' },
    { name: 'Integrations', text: 'Third-party APIs, payment systems, communication services, and business integrations.' },
    { name: 'Data', text: 'Data management, analytics, reporting, and intelligent systems.' },
  ]),
  values: withIds([
    { name: 'Innovation', text: 'We continuously explore better ways to solve problems.' },
    { name: 'Simplicity', text: 'Complex technology should create simple experiences.' },
    { name: 'Reliability', text: 'The systems we build should be dependable and resilient.' },
    { name: 'Impact', text: 'We focus on technology that creates meaningful value.' },
    { name: 'Continuous Improvement', text: 'We build, learn, measure, and improve.' },
    { name: 'Responsibility', text: 'We take security, privacy, trust, and responsible technology seriously.' },
  ]),
  portfolio: withIds([
    { name: 'OffPay', area: 'Fintech', text: 'Digital payments and wallet technology.', url: '' },
    { name: '4GO Chatting App', area: 'Communication', text: 'A messaging application for everyday conversation.', url: '' },
    { name: 'NexusDesk', area: 'Business software', text: 'Helpdesk and customer support technology.', url: '' },
    { name: 'Leaf', area: 'Digital product', text: 'A product from the 4GO portfolio.', url: '' },
  ]),
  why_points: withIds([
    { text: 'Technology built for real-world use' },
    { text: 'Product-focused engineering' },
    { text: 'Scalable architecture' },
    { text: 'Modern development practices' },
    { text: 'User-centered design' },
    { text: 'Strong understanding of African markets' },
    { text: 'Long-term technology thinking' },
  ]),
  work_ways: withIds([
    { title: 'Build something new.', text: 'Bring an idea and we help turn it into a working digital product.' },
    { title: 'Strengthen what exists.', text: 'We extend, modernize, and integrate existing platforms and systems.' },
    { title: 'Get clear direction.', text: 'We advise on technology opportunities and help shape the right solution before building begins.' },
  ]),
}

export const defaults = { sections, collections }
