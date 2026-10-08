// Static featured-project snapshot shown on the home page.
// Keeping this local (instead of calling the backend API) means the
// home page never breaks if the API/database is unavailable.
export const FEATURED_PROJECTS = [
  {
    id: 'google-meta-ads-saas',
    title: 'Google & Meta Ads Management for SaaS Startup',
    summary: 'Full-funnel paid acquisition strategy balancing Google Search, Display, and Meta retargeting for a B2B SaaS product.',
    category: 'Paid Ads',
    tags: ['Google Ads', 'Meta Ads', 'CRO'],
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 'ecommerce-seo-growth',
    title: 'E-Commerce SEO & Organic Growth Campaign',
    summary: "Technical SEO overhaul and content strategy that grew organic traffic for a multi-category online retailer.",
    category: 'SEO',
    tags: ['SEO', 'Content Strategy', 'Analytics'],
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'social-media-d2c-growth',
    title: 'Social Media Growth Strategy for D2C Brand',
    summary: "Organic content strategy and community management program that grew a direct-to-consumer brand's social following and engagement.",
    category: 'Social Media',
    tags: ['Social Media', 'Content Strategy', 'Community Management'],
    cover: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80',
  },
];
