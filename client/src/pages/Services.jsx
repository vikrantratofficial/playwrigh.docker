import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaSearch, FaBullhorn, FaHashtag, FaPenNib, FaChartLine, FaEnvelopeOpenText } from 'react-icons/fa';
import BookCallButton from '../components/BookCallButton';
import Faq, { FAQ_ITEMS } from '../components/Faq';
import Seo from '../components/Seo';

const SERVICES = [
  {
    icon: <FaSearch />,
    title: 'SEO Optimization',
    scope: 'Technical SEO audits, on-page optimization, and keyword strategy to grow organic traffic and rankings sustainably.',
    price: 'Starting at $400',
  },
  {
    icon: <FaBullhorn />,
    title: 'Paid Ads Management',
    scope: 'Google Ads & Meta Ads campaign setup, optimization, and ROAS tracking — a starter campaign structure covering your top funnel stages.',
    price: 'Starting at $800',
  },
  {
    icon: <FaHashtag />,
    title: 'Social Media Marketing',
    scope: 'Content calendars, organic growth strategy, and community management across Instagram, LinkedIn and Facebook.',
    price: 'Starting at $500',
  },
  {
    icon: <FaPenNib />,
    title: 'Content Marketing',
    scope: 'Blog and landing page copywriting, content strategy, and editorial calendars tailored to your audience.',
    price: 'Starting at $30/hr',
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: 'Email Marketing Automation',
    scope: 'Mailchimp/Klaviyo flow setup, segmentation, and campaign templates tailored to your funnel.',
    price: 'Starting at $350',
  },
  {
    icon: <FaChartLine />,
    title: 'Analytics & CRO',
    scope: 'GA4 setup, conversion tracking, funnel analysis and A/B testing layered into your marketing process.',
    price: 'Starting at $450',
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery Call', desc: 'A 30-minute call to understand your brand, current marketing gaps, and goals.' },
  { step: '02', title: 'Proposal & Scope', desc: 'A written scope with timeline, deliverables, and fixed or hourly pricing.' },
  { step: '03', title: 'Launch & Optimize', desc: 'Weekly check-ins with live campaign data — you see progress, not just a final report.' },
  { step: '04', title: 'Handover & Support', desc: 'Documentation, knowledge transfer, and 2 weeks of post-delivery support.' },
];

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.plainAnswer || item.answer,
    },
  })),
};

export default function Services() {
  return (
    <Container className="page-section">
      <Seo
        title="Digital Marketing Services & Pricing — SEO, Paid Ads, Content & Email Marketing"
        description="Fixed-price and hourly marketing services: SEO, Google & Meta Ads management, social media, content marketing, email automation, and CRO. NDA-friendly, remote, worldwide."
        path="/services"
        jsonLd={FAQ_JSON_LD}
      />
      <div className="section-heading">
        <h1>Services</h1>
        <p className="text-muted">Focused marketing engagements, scoped clearly so you know exactly what you're getting.</p>
      </div>

      <Row className="g-4 mb-5">
        {SERVICES.map((service) => (
          <Col md={6} key={service.title}>
            <div className="service-card h-100">
              <div className="service-icon">{service.icon}</div>
              <h4>{service.title}</h4>
              <p className="text-muted">{service.scope}</p>
              <div className="service-price">{service.price}</div>
            </div>
          </Col>
        ))}
      </Row>

      <section className="mb-5">
        <h2 className="text-center mb-5">How an Engagement Runs</h2>
        <Row className="g-4">
          {PROCESS_STEPS.map((item) => (
            <Col md={6} lg={3} key={item.step}>
              <div className="process-step">
                <div className="process-number">{item.step}</div>
                <h5>{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <Faq />

      <div className="cta-banner-inline text-center">
        <h3 className="mb-3">Ready to grow with confidence?</h3>
        <p className="text-muted mb-4">Get a free scope estimate — tell me about your brand and let's figure out the right plan together.</p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Button as={Link} to="/contact" variant="accent" size="lg">
            Get My Free Quote
          </Button>
          <BookCallButton variant="outline-light" size="lg" />
        </div>
      </div>
    </Container>
  );
}
