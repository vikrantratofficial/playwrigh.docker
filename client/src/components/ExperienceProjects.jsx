import { useState } from 'react';
import { Row, Col, Card, Badge, Collapse } from 'react-bootstrap';
import { FaBuilding, FaCalendarAlt, FaUserTie, FaChevronDown } from 'react-icons/fa';

const EXPERIENCE_PROJECTS = [
  {
    id: 'nhai-data-lake-3',
    title: 'NHAI Data Lake 3.0',
    client: 'NHAI, MoRTH, NHAI-DCL',
    organization: 'CMS Computers Pvt. Ltd.',
    duration: 'Jan 2025 – Present',
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
          Enterprise QA engagements from my full-time roles — client-facing platforms I've tested end to end.
        </p>
      </div>
      <Row className="g-4">
        {EXPERIENCE_PROJECTS.map((project) => (
          <ExperienceCard key={project.id} project={project} />
        ))}
      </Row>
    </section>
  );
}
