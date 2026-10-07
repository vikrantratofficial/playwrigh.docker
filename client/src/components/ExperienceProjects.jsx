import { useState } from 'react';
import { Row, Col, Card, Badge, Collapse } from 'react-bootstrap';
import { FaBuilding, FaCalendarAlt, FaUserTie, FaChevronDown } from 'react-icons/fa';

const EXPERIENCE_PROJECTS = [
  {
    id: 'ecommerce-brand-growth',
    title: 'E-Commerce Brand Growth Program',
    client: 'D2C Apparel & Lifestyle Brands',
    organization: 'GrowthEdge Digital',
    duration: 'Jan 2024 – Present',
    description:
      'An ongoing growth marketing program for e-commerce and D2C brands, covering full-funnel strategy from ' +
      'paid acquisition and SEO through email retention — built to turn ad spend into predictable, measurable ' +
      'revenue rather than vanity traffic.',
    tags: ['Google Ads', 'Meta Ads', 'SEO', 'GA4', 'Email Automation', 'CRO'],
    responsibilities: [
      'Designed and executed full-funnel paid media strategy across Google Ads and Meta Ads for multiple D2C brands.',
      'Ran technical and on-page SEO audits, keyword research, and content plans to grow organic traffic sustainably.',
      'Built GA4 and Google Tag Manager tracking setups to measure conversions and attribution accurately.',
      'Developed Klaviyo/Mailchimp email flows for abandoned cart, post-purchase, and win-back segments.',
      'Ran structured A/B tests on landing pages and ad creative to improve conversion rate and ROAS.',
      'Delivered weekly performance reports translating campaign data into clear, stakeholder-readable insights.',
      'Collaborated with design and content teams to produce ad creative and landing pages aligned with campaign goals.',
      'Managed monthly ad budgets, reallocating spend toward top-performing channels and audiences.',
    ],
  },
  {
    id: 'saas-lead-generation',
    title: 'SaaS Lead Generation Campaign',
    client: 'B2B SaaS Startups',
    organization: 'BrightPath Marketing',
    duration: 'Jun 2021 – Dec 2023',
    description:
      'A lead generation engagement for early-stage B2B SaaS companies, combining LinkedIn Ads, content ' +
      'marketing, and email nurture sequences to build a qualified pipeline for sales teams.',
    tags: ['LinkedIn Ads', 'Content Marketing', 'HubSpot', 'Lead Nurturing', 'Analytics'],
    responsibilities: [
      'Planned and managed LinkedIn Ads campaigns targeting decision-makers across target industries.',
      'Wrote and published long-form content (blog posts, whitepapers, landing pages) to support inbound lead generation.',
      'Built HubSpot lead-scoring and nurture sequences to move MQLs toward sales-qualified status.',
      'Set up conversion tracking and attribution dashboards to tie marketing spend to pipeline revenue.',
      'Ran quarterly content audits and SEO refreshes to keep organic lead flow consistent.',
      'Partnered with sales teams to align messaging and hand-off criteria between marketing and sales.',
      'Reported monthly on CAC, pipeline value, and channel performance to leadership.',
    ],
  },
];

function ExperienceCard({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <Col md={6}>
      <Card className="experience-card h-100">
        <Card.Body className="d-flex flex-column">
          <h3 className="experience-card-title">{project.title}</h3>

          <div className="experience-meta">
            <span>
              <FaBuilding className="me-2" />
              {project.organization}
            </span>
            <span>
              <FaUserTie className="me-2" />
              {project.client}
            </span>
            <span>
              <FaCalendarAlt className="me-2" />
              {project.duration}
            </span>
          </div>

          <p className="text-muted experience-desc">{project.description}</p>

          <div className="d-flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <Badge key={tag} bg="" className="tag-badge">{tag}</Badge>
            ))}
          </div>

          <button
            type="button"
            className="experience-toggle mt-auto"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
          >
            {open ? 'Hide Responsibilities' : 'View Responsibilities'}
            <FaChevronDown className={`ms-2 experience-toggle-icon ${open ? 'open' : ''}`} />
          </button>

          <Collapse in={open}>
            <div>
              <ul className="detail-list experience-list mt-3">
                {project.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default function ExperienceProjects() {
  return (
    <section className="experience-projects-section">
      <div className="section-heading">
        <h2>Professional Experience Projects</h2>
        <p className="text-muted">
          Growth marketing engagements from my full-time roles — client brands I've grown end to end.
        </p>
      </div>
      <Row className="g-4 align-items-start">
        {EXPERIENCE_PROJECTS.map((project) => (
          <ExperienceCard key={project.id} project={project} />
        ))}
      </Row>
    </section>
  );
}
