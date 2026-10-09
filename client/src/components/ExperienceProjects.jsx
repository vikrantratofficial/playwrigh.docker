import { useMemo, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import {
  FaBuilding,
  FaCalendarAlt,
  FaUserTie,
  FaChevronDown,
  FaBriefcase,
  FaClock,
  FaLayerGroup,
} from 'react-icons/fa';
import CountUp from './CountUp';

const EXPERIENCE_PROJECTS = [
  {
    id: 'nhai-data-lake-3',
    title: 'NHAI Data Lake 3.0',
    client: 'NHAI, MoRTH, NHAI-DCL',
    organization: 'CMS Computers Pvt. Ltd.',
    duration: 'Jan 2025 – Present',
    start: '2025-01',
    end: null,
    description:
      'A government digital platform for managing national highway projects, contracts, inspections, ' +
      'maintenance activities, GIS-based project monitoring, dashboards, and stakeholder workflows, with ' +
      'role-based access control and mobile integration for field inspections.',
    tags: ['Functional Testing', 'API Testing', 'SQL Validation', 'Mobile Testing', 'JMeter', 'GIS Testing', 'Agile Scrum'],
    responsibilities: [
      'Designed and executed detailed Test Scenarios, Test Cases, and Test Data based on BRD, FRS, and business requirements.',
      'Performed Functional, Regression, Smoke, Sanity, Integration, End-to-End (E2E), and UAT Testing for web and mobile applications.',
      'Conducted API Testing using Postman, validating REST APIs, request/response payloads, authentication, status codes, and error handling.',
      'Executed Database Validation using SQL to verify backend data integrity and business transactions.',
      'Performed Mobile Application Testing on Android and iOS devices, validating field inspection workflows and GIS-based features.',
      'Executed Performance Testing using JMeter to validate application performance and response time.',
      'Verified GIS location-based functionalities, map visualization, project tracking, and inspection modules.',
      'Logged, tracked, and validated defects using Jira, collaborating with development teams for timely resolution.',
      'Participated in Sprint Planning, Daily Stand-ups, Sprint Reviews, Retrospectives, and Release Validation following Agile Scrum methodology.',
      'Supported Production Deployment, UAT, and Post-Release Smoke Testing.',
    ],
  },
  {
    id: 'omnifin-los-lms',
    title: 'Omnifin — Loan Origination & Loan Management System',
    client: 'Aditya Birla Finance, Aavas Finance',
    organization: 'AurionPro Solutions Pvt. Ltd.',
    duration: 'May 2022 – Dec 2024',
    start: '2022-05',
    end: '2024-12',
    description:
      'An enterprise Loan Origination and Loan Management platform used by NBFCs to automate the complete ' +
      'loan lifecycle from lead generation to loan closure — covering credit verification, approval workflows, ' +
      'EMI calculation, repayment management, foreclosure, and customer servicing.',
    tags: ['Selenium WebDriver', 'Java', 'TestNG', 'Postman', 'SQL', 'JMeter', 'RTM', 'Jenkins'],
    responsibilities: [
      'Prepared comprehensive Test Plans, Test Cases, Test Scenarios, and Requirement Traceability Matrix (RTM) based on business requirements.',
      'Performed Functional, Regression, Smoke, Sanity, Integration, System, End-to-End (E2E), and User Acceptance Testing (UAT).',
      'Conducted API Testing using Postman by validating request/response payloads, authentication, status codes, and business validations.',
      'Executed Database Testing using SQL to verify loan records, EMI calculations, repayment schedules, customer details, and transaction history.',
      'Performed Cross-Browser Testing to ensure application compatibility across Chrome, Firefox, and Edge browsers.',
      'Executed Performance Testing using JMeter to validate system stability and response time under concurrent user load.',
      'Validated complete loan workflows: Lead Creation, Deal Creation, Customer Onboarding, Credit Verification, RCU Verification, Loan Approval, Loan Sanction, Repayment Processing, Foreclosure, and Loan Closure.',
      'Identified, logged, tracked, and retested defects using Jira throughout the defect lifecycle.',
      'Integrated automated test suites with Maven, TestNG, and Jenkins for continuous integration and scheduled executions.',
      'Participated in Sprint Planning, Daily Stand-ups, Sprint Reviews, and Retrospectives within Agile Scrum teams.',
    ],
  },
];


// Whole months between 'YYYY-MM' start and end (null end = today), inclusive of both months.
function monthsBetween(start, end) {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
}

function formatSpan(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
}

function ExperienceCard({ project, open, onToggle }) {
  const months = monthsBetween(project.start, project.end);
  const ongoing = !project.end;
  const panelId = `resp-${project.id}`;

  return (
    <article className="experience-card">
      <div className="experience-card-head">
        <h3 className="experience-card-title">{project.title}</h3>
        <span className={`experience-status ${ongoing ? 'is-live' : ''}`}>
          {ongoing && <span className="experience-status-dot" aria-hidden="true" />}
          {ongoing ? 'Ongoing' : 'Completed'}
        </span>
      </div>

      <div className="experience-meta">
        <span><FaBuilding /> {project.organization}</span>
        <span><FaUserTie /> {project.client}</span>
        <span><FaCalendarAlt /> {project.duration}</span>
        <span><FaClock /> {formatSpan(months)}</span>
      </div>

      <p className="experience-desc">{project.description}</p>

      <div className="experience-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-badge badge">{tag}</span>
        ))}
      </div>

      <button
        type="button"
        className="experience-toggle"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {open ? 'Hide' : 'View'} Responsibilities ({project.responsibilities.length})
        <FaChevronDown className={`ms-2 experience-toggle-icon ${open ? 'open' : ''}`} />
      </button>

      <Collapse in={open}>
        <div id={panelId}>
          <ol className="experience-list">
            {project.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </div>
      </Collapse>
    </article>
  );
}

export default function ExperienceProjects() {
  const [activeTag, setActiveTag] = useState('All');
  const [openIds, setOpenIds] = useState([]);

  const tagCounts = useMemo(() => {
    const counts = {};
    EXPERIENCE_PROJECTS.forEach((p) => p.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const totalMonths = useMemo(
    () => EXPERIENCE_PROJECTS.reduce((sum, p) => sum + monthsBetween(p.start, p.end), 0),
    []
  );

  const visible = EXPERIENCE_PROJECTS.filter((p) => activeTag === 'All' || p.tags.includes(activeTag));
  const allOpen = visible.length > 0 && visible.every((p) => openIds.includes(p.id));

  const toggle = (id) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleAll = () =>
    setOpenIds((prev) =>
      allOpen ? prev.filter((id) => !visible.some((p) => p.id === id)) : [...new Set([...prev, ...visible.map((p) => p.id)])]
    );

  return (
    <section className="experience-projects-section">
      <div className="section-heading">
        <h2>Professional Experience Projects</h2>
        <p className="text-muted">
          Enterprise QA engagements from my full-time roles — client-facing platforms I've tested end to end.
        </p>
      </div>

      <div className="experience-stats">
        <div className="experience-stat">
          <FaBriefcase />
          <strong><CountUp end={EXPERIENCE_PROJECTS.length} /></strong>
          <span>Enterprise Projects</span>
        </div>
        <div className="experience-stat">
          <FaClock />
          <strong><CountUp end={Math.round(totalMonths / 12)} suffix="+" /></strong>
          <span>Years Delivered</span>
        </div>
        <div className="experience-stat">
          <FaLayerGroup />
          <strong><CountUp end={tagCounts.length} /></strong>
          <span>Tools &amp; Test Types</span>
        </div>
      </div>

      <div className="experience-toolbar">
        <div className="experience-filters" role="group" aria-label="Filter by skill">
          <button
            type="button"
            className={`filter-chip ${activeTag === 'All' ? 'active' : ''}`}
            onClick={() => setActiveTag('All')}
          >
            All
          </button>
          {tagCounts.map(([tag, count]) => (
            <button
              type="button"
              key={tag}
              className={`filter-chip ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}{count > 1 ? ` · ${count}` : ''}
            </button>
          ))}
        </div>
        <button type="button" className="experience-expand-all" onClick={toggleAll}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="text-muted text-center py-4">No experience projects match this filter.</p>
      ) : (
        <div className="experience-timeline">
          {visible.map((project) => (
            <div className="experience-timeline-item" key={project.id}>
              <span className="experience-timeline-dot" aria-hidden="true" />
              <ExperienceCard
                project={project}
                open={openIds.includes(project.id)}
                onToggle={() => toggle(project.id)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
