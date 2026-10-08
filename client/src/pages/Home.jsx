import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  FaArrowRight,
  FaCheckCircle,
  FaFolderOpen,
  FaChartLine,
  FaTools,
  FaUsers,
  FaGoogle,
  FaFacebook,
  FaSearchDollar,
  FaMailBulk,
  FaHashtag,
  FaChartBar,
  FaSearch,
  FaBullhorn,
  FaPenNib,
  FaEnvelopeOpenText,
  FaQuoteLeft,
  FaStar,
  FaUserCheck,
  FaFileInvoiceDollar,
  FaKey,
  FaClock,
  FaDatabase,
  FaTimesCircle,
} from 'react-icons/fa';
import TerminalPreview from '../components/TerminalPreview';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import BookCallButton from '../components/BookCallButton';
import Seo, { SITE_URL } from '../components/Seo';

const ResultsCharts = lazy(() => import('../components/ResultsCharts'));
import { useLanguage } from '../context/LanguageContext';
import { FEATURED_PROJECTS } from '../data/featuredProjects';

const MARKETING_TOOLS = [
  { icon: <FaGoogle />, name: 'Google Ads' },
  { icon: <FaFacebook />, name: 'Meta Ads Manager' },
  { icon: <FaSearchDollar />, name: 'SEMrush & Ahrefs' },
  { icon: <FaChartBar />, name: 'Google Analytics 4' },
  { icon: <FaMailBulk />, name: 'Klaviyo / Mailchimp' },
  { icon: <FaHashtag />, name: 'Meta Business Suite' },
];

const CORE_SERVICES = [
  { icon: <FaSearch />, title: 'SEO Optimization', scope: 'Technical audits, on-page fixes, and keyword strategy that grow organic traffic.' },
  { icon: <FaBullhorn />, title: 'Paid Ads Management', scope: 'Google & Meta Ads campaigns built and optimized for ROAS, not just clicks.' },
  { icon: <FaPenNib />, title: 'Content Marketing', scope: 'SEO-driven blog and landing page content that turns readers into leads.' },
  { icon: <FaEnvelopeOpenText />, title: 'Email Automation', scope: 'Klaviyo/Mailchimp flows that keep selling after the campaign ends.' },
];

const DIFFERENTIATORS = [
  { icon: <FaUserCheck />, title: 'Direct Access, No Middlemen', desc: "You work with me directly — not an account manager who hands your campaign to a junior." },
  { icon: <FaDatabase />, title: 'Data-First Decisions', desc: 'Every recommendation is tied to a number from GA4, ad platforms or your CRM — not a hunch.' },
  { icon: <FaFileInvoiceDollar />, title: 'Fixed-Scope Pricing', desc: 'You know the total cost before work starts. No surprise hours, no scope creep invoices.' },
  { icon: <FaKey />, title: 'You Own Everything', desc: 'Every ad account, GA4 property and asset stays in your name — portable if we ever part ways.' },
  { icon: <FaClock />, title: 'Fast, Async Communication', desc: "Replies within 24 hours across US/UK/EU time zones — no week-long agency silence." },
  { icon: <FaChartBar />, title: 'Weekly, Not Monthly, Reporting', desc: "You see what's working in real time, not in a vague recap three weeks after the fact." },
];

const GOOD_FIT = [
  "You have a live website/product and a monthly budget for ads, content, or both.",
  "You want a specialist who tests and iterates on real data, not a generic retainer.",
  "You value weekly visibility into what's working over a black-box agency relationship.",
];

const NOT_A_FIT = [
  "You need a full in-house team replacement across many channels starting tomorrow.",
  "You're looking for guaranteed rankings or overnight results.",
  "You don't have a live website, product or offer to market yet.",
];

const TESTIMONIALS = [
  {
    quote: "Our organic traffic finally started compounding instead of flatlining. The technical fixes alone paid for the engagement in the first month.",
    name: 'Marketing Lead',
    company: 'E-Commerce Retailer (NDA)',
  },
  {
    quote: "Cost per lead dropped by more than half within two months, and we finally had a dashboard the whole team actually trusted.",
    name: 'Founder',
    company: 'B2B SaaS Startup (NDA)',
  },
  {
    quote: "Posting finally felt intentional instead of reactive. Engagement tripled and it started showing up in real sales conversations.",
    name: 'Brand Manager',
    company: 'D2C Lifestyle Brand (NDA)',
  },
];

const INDUSTRIES = [
  'E-Commerce & Retail',
  'B2B SaaS',
  'D2C & Lifestyle Brands',
  'Subscription & Retention',
  'Local Service Businesses',
  'Online Marketplaces',
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Growth.pro',
      url: SITE_URL,
    },
    {
      '@type': 'ProfessionalService',
      name: 'Growth.pro — Vikrant Rathore, Digital Marketing Strategist',
      description:
        'Freelance SEO, Google & Meta Ads, content marketing and conversion rate optimization services for clients worldwide (US, UK, EU, UAE, Asia, and beyond).',
      url: SITE_URL,
      email: 'vikrant.rathore.career@gmail.com',
      areaServed: 'Worldwide',
      priceRange: '$$',
      sameAs: ['https://www.linkedin.com/in/vikrantrathore/'],
    },
  ],
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title="Freelance Digital Marketing Strategist — SEO, Google & Meta Ads, Content Marketing"
        description="Hire a freelance digital marketing strategist for SEO, Google & Meta Ads management, content marketing, and conversion rate optimization — serving clients across the US, UK, EU, UAE, and Asia. Book a free call today."
        path="/"
        jsonLd={JSON_LD}
      />
      <section className="hero-section">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div className="hero-eyebrow">
                <FaCheckCircle className="me-2" /> Available for freelance projects
              </div>
              <h1 className="hero-title">{t('hero_title')}</h1>
              <p className="hero-subtitle">{t('hero_subtitle')}</p>
              <div className="hero-cta-group">
                <Button as={Link} to="/projects" variant="accent" size="lg" className="d-inline-flex align-items-center justify-content-center">
                  {t('hero_cta_primary')} <FaArrowRight className="ms-2" />
                </Button>
                <Button as={Link} to="/contact" variant="outline-light" size="lg">
                  {t('hero_cta_secondary')}
                </Button>
                <BookCallButton variant="outline-light" size="lg" />
              </div>
            </Col>
            <Col lg={6}>
              <TerminalPreview />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="stats-section">
        <Container>
          <Row className="g-4">
            <Col sm={6} lg={3}>
              <StatCard icon={<FaFolderOpen />} value={30} suffix="+" label="Projects Delivered" />
            </Col>
            <Col sm={6} lg={3}>
              <StatCard icon={<FaChartLine />} value={1200} suffix="+" label="Leads Generated" />
            </Col>
            <Col sm={6} lg={3}>
              <StatCard icon={<FaTools />} value={15} suffix="+" label="Marketing Tools Mastered" />
            </Col>
            <Col sm={6} lg={3}>
              <StatCard icon={<FaUsers />} value={10} suffix="+" label="Clients & Teams" />
            </Col>
          </Row>
        </Container>
      </section>

      <Suspense fallback={<div className="chart-section-fallback" />}>
        <ResultsCharts />
      </Suspense>

      <section className="section approach-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <div className="section-heading text-center">
                <h2>A Different Kind of Marketing Partner</h2>
              </div>
              <p className="approach-paragraph">
                Most marketing engagements start with a deck full of promises and end with a spreadsheet nobody
                reads. I work differently — every campaign starts with a clear baseline, a documented hypothesis,
                and one number we're trying to move, whether that's cost per lead, email-attributed revenue, or
                organic sessions from a specific buyer segment.
              </p>
              <p className="approach-paragraph">
                Whether you're a founder running your first paid campaign or a marketing lead tired of agencies
                that disappear after the kickoff call, the work here is built to stay transparent: you'll always
                know what's being tested, what it's costing, and what it's actually returning.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section industries-marquee-section">
        <Container>
          <p className="industries-label">Trusted across industries</p>
        </Container>
        <div className="marquee">
          <div className="marquee-track">
            {[...INDUSTRIES, ...INDUSTRIES].map((industry, idx) => (
              <span className="marquee-item" key={`${industry}-${idx}`}>{industry}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <h2>Featured Projects</h2>
            <p className="text-muted">A snapshot of recent growth marketing engagements.</p>
          </div>
          <Row className="g-4">
            {FEATURED_PROJECTS.map((project) => (
              <Col md={6} lg={4} key={project.id}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <Button as={Link} to="/projects" variant="outline-light">
              View All Projects <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <h2>What I Can Do for You</h2>
            <p className="text-muted">Core services, scoped clearly so you know exactly what you're getting.</p>
          </div>
          <Row className="g-4">
            {CORE_SERVICES.map((service) => (
              <Col sm={6} lg={3} key={service.title}>
                <div className="service-card h-100">
                  <div className="service-icon">{service.icon}</div>
                  <h5>{service.title}</h5>
                  <p className="text-muted small mb-0">{service.scope}</p>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <Button as={Link} to="/services" variant="outline-light">
              See All Services & Pricing <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <h2>Why Work With Me</h2>
            <p className="text-muted">What makes a freelance specialist a better bet than another faceless retainer.</p>
          </div>
          <Row className="g-4">
            {DIFFERENTIATORS.map((item) => (
              <Col sm={6} lg={4} key={item.title}>
                <div className="differentiator-item">
                  <div className="service-icon">{item.icon}</div>
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <h2>Tools & Platforms I Work In</h2>
            <p className="text-muted">The same stack real marketing teams use to plan, run, and report on campaigns.</p>
          </div>
          <Row className="g-4">
            {MARKETING_TOOLS.map((tool) => (
              <Col xs={6} md={4} lg={2} key={tool.name}>
                <div className="tool-chip h-100">
                  <div className="service-icon mb-2">{tool.icon}</div>
                  <div className="tool-chip-name">{tool.name}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <h2>Is This the Right Fit?</h2>
            <p className="text-muted">A quick, honest check before you reach out — saves both of us time.</p>
          </div>
          <Row className="g-4">
            <Col md={6}>
              <div className="fit-card fit-card-good">
                <h5>Good fit if...</h5>
                <ul className="fit-list">
                  {GOOD_FIT.map((item) => (
                    <li key={item}><FaCheckCircle className="fit-icon fit-icon-good" />{item}</li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="fit-card fit-card-bad">
                <h5>Probably not a fit if...</h5>
                <ul className="fit-list">
                  {NOT_A_FIT.map((item) => (
                    <li key={item}><FaTimesCircle className="fit-icon fit-icon-bad" />{item}</li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <h2>What Clients Say</h2>
            <p className="text-muted">Feedback from recent engagements — names withheld per NDA, impact isn't.</p>
          </div>
          <Row className="g-4">
            {TESTIMONIALS.map((t) => (
              <Col md={6} lg={4} key={t.name + t.company}>
                <div className="testimonial-card h-100">
                  <FaQuoteLeft className="testimonial-quote-icon" />
                  <div className="testimonial-stars mb-2">
                    {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} />)}
                  </div>
                  <p className="testimonial-text">{t.quote}</p>
                  <div className="testimonial-author">
                    <strong>{t.name}</strong>
                    <span className="text-muted d-block small">{t.company}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="cta-banner">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={8}>
              <h3 className="mb-2">Have a growth target that needs a plan?</h3>
              <p className="text-muted mb-0">
                Let's talk about your marketing gaps and how a focused strategy can close them fast.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button as={Link} to="/contact" variant="accent" size="lg">
                {t('hero_cta_secondary')} <FaArrowRight className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
