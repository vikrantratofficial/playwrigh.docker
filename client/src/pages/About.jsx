import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaCheckCircle, FaDownload } from 'react-icons/fa';
import Certifications from '../components/Certifications';
import Seo, { SITE_URL } from '../components/Seo';

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vikrant Rathore',
  jobTitle: 'Digital Marketing Strategist',
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/profile.jpg`,
  sameAs: ['https://www.linkedin.com/in/vikrantrathore/'],
  knowsAbout: ['SEO', 'Google Ads', 'Meta Ads', 'Email Marketing', 'Content Marketing', 'Conversion Rate Optimization'],
};

const SKILLS = {
  'SEO & Content': ['Technical SEO', 'On-Page SEO', 'Keyword Research', 'Content Strategy', 'Copywriting', 'Link Building'],
  'Paid Media': ['Google Ads (Search/Display/Shopping)', 'Meta Ads Manager', 'LinkedIn Ads', 'Retargeting', 'Conversion Tracking'],
  'Email & Automation': ['Mailchimp', 'Klaviyo', 'HubSpot', 'Drip Campaigns', 'Segmentation'],
  'Analytics & CRO': ['Google Analytics 4', 'Google Tag Manager', 'Hotjar', 'A/B Testing', 'Funnel Optimization'],
  'Tools': ['SEMrush', 'Ahrefs', 'Google Search Console', 'Looker Studio', 'Canva', 'Excel/Sheets Dashboards'],
  'Methodologies': ['Growth Marketing', 'Agile Sprints', 'Campaign Lifecycle Management'],
};

const CAMPAIGN_STATUS_CONVENTION = [
  { status: 'Green', meaning: 'Hitting or exceeding KPI targets, ready to scale spend' },
  { status: 'Amber', meaning: 'Below target, optimization in progress' },
  { status: 'Red', meaning: 'Underperforming, campaign paused for restructuring' },
];

export default function About() {
  return (
    <Container className="page-section">
      <Seo
        title="About Vikrant Rathore — Digital Marketing Strategist"
        description="Digital Marketing Strategist with expertise in SEO, Google & Meta Ads, email automation, and conversion rate optimization. Trusted by clients worldwide."
        path="/about"
        jsonLd={PERSON_JSON_LD}
      />
      <Row className="align-items-center gy-5 mb-5">
        <Col lg={4} className="text-center">
          <img
            src="/images/profile.jpg?v=2"
            alt="Vikrant Rathore — Digital Marketing Strategist"
            className="about-photo"
          />
        </Col>
        <Col lg={8}>
          <h1 className="mb-3">About Me</h1>
          <p className="text-muted">
            I'm a Digital Marketing Strategist with a focus on building growth systems that actually move the
            needle — not vanity metrics that look good in a deck. Over the past several years I've worked with
            e-commerce, SaaS and D2C brands to run SEO campaigns, paid ad strategies, and content systems that
            turn traffic into revenue.
          </p>
          <p className="text-muted">
            I care about ROI over impressions: a campaign is only valuable if it moves real business metrics.
            That means investing in proper tracking, audience research, and reporting that's readable by both
            marketers and stakeholders.
          </p>
          <Button
            variant="accent"
            size="lg"
            href="/resume.pdf"
            download="Vikrant-Rathore-Resume.pdf"
            className="d-inline-flex align-items-center mt-2"
          >
            <FaDownload className="me-2" /> Download Resume
          </Button>
        </Col>
      </Row>

      <section className="mb-5">
        <h2 className="mb-4">Skills</h2>
        <Row className="g-4">
          {Object.entries(SKILLS).map(([category, items]) => (
            <Col md={6} lg={4} key={category}>
              <div className="sidebar-box h-100">
                <h5 className="sidebar-heading">{category}</h5>
                <div className="d-flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} bg="" className="tag-badge">{skill}</Badge>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <Certifications />

      <section>
        <h2 className="mb-4">Campaign Health Convention</h2>
        <p className="text-muted">
          A quick look at the performance convention I use to communicate campaign status to stakeholders:
        </p>
        <div className="sidebar-box">
          {CAMPAIGN_STATUS_CONVENTION.map((item) => (
            <div key={item.status} className="d-flex align-items-start gap-3 mb-3">
              <span className={`status-dot status-${item.status.toLowerCase()}`} />
              <div>
                <strong>{item.status}</strong>
                <p className="text-muted mb-0 small">{item.meaning}</p>
              </div>
            </div>
          ))}
          <div className="d-flex align-items-center gap-2 mt-2">
            <FaCheckCircle className="text-accent" />
            <span className="text-muted small">Applied consistently across every campaign I manage.</span>
          </div>
        </div>
      </section>
    </Container>
  );
}
