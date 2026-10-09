import { Accordion } from 'react-bootstrap';
import { FaFileExcel } from 'react-icons/fa';

export const FAQ_ITEMS = [
  {
    question: 'How do you price a project?',
    answer:
      "Fixed-scope work (Test Automation Setup, CI/CD Integration, Performance Testing, Test Documentation, Security-Aware QA) is quoted as a flat rate after a quick discovery call, so you know the total cost upfront — no surprise hours. Ongoing Manual QA is billed hourly. The prices on the Services page are starting points; the final quote depends on application size, number of flows and environments.",
  },
  {
    question: 'Do you offer cybersecurity-aware QA testing?',
    answer:
      'Yes, in two levels. Every automation and manual QA engagement includes basic security-aware checks (auth/session handling, input validation, obvious OWASP Top 10 issues) alongside functional testing. A deeper, dedicated pass is available as the separate Security-Aware QA Testing service. This is QA-level testing, not a full penetration test — if you need a formal pentest or compliance audit, I will say so and recommend a specialist.',
    plainAnswer:
      'Yes, in two levels. Every automation and manual QA engagement includes basic security-aware checks (auth/session handling, input validation, obvious OWASP Top 10 issues) alongside functional testing. A deeper, dedicated pass is available as the separate Security-Aware QA Testing service. This is QA-level testing, not a full penetration test — if you need a formal pentest or compliance audit, I will say so and recommend a specialist.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Yes. I sign an NDA before any code, credentials, or client data is shared — this is standard for every engagement, not an extra request. Happy to sign yours or use a template of mine.',
  },
  {
    question: "What's the typical turnaround time?",
    answer:
      'A starter automation suite (20-30 tests) usually takes 1-2 weeks. CI/CD pipeline integration takes 3-5 days. Performance/load testing with a bottleneck report takes 3-7 days, and test documentation/reporting setups take 3-7 days, depending on scope. Manual QA is ongoing, scoped per sprint. Timelines assume timely access to a stable test environment — delays there are the most common cause of slippage. Exact timelines are confirmed after the discovery call.',
  },
  {
    question: 'Do you work with international / remote clients?',
    answer:
      "Yes — all engagements are fully remote. I keep flexible hours to overlap with US, UK and EU business hours, and communicate async via email/Slack/WhatsApp so time zones don't slow things down.",
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      'A staging/test environment (not production), test accounts with the relevant roles, and whatever documentation exists — BRD/requirements, API docs or a Postman collection, and access to your Jira board or bug tracker. If documentation is thin, the discovery call is used to map the critical user flows together, so a missing spec does not block the start.',
  },
  {
    question: 'Which tools and tech stack do you work with?',
    answer:
      'Playwright and Selenium (Java/TestNG) for UI automation, Postman for API testing, JMeter for performance testing, SQL for database validation, Jira for defect tracking, and Jenkins, GitHub Actions or GitLab CI for pipelines. If your team already uses a different tool, I adapt to it rather than forcing a switch.',
  },
  {
    question: 'What happens after delivery — who maintains the tests?',
    answer:
      'Every project ends with documentation and a knowledge-transfer session so your team can run and extend the suite on its own, plus 2 weeks of post-delivery support for fixes. UI automation does need upkeep as the product changes, so ongoing maintenance can be added as a monthly or hourly arrangement if you prefer not to own it.',
  },
  {
    question: 'Can you guarantee a bug-free release?',
    answer:
      'No honest tester can. Testing reduces risk; it cannot prove the absence of defects. What you get is documented coverage of the critical flows, clearly reproducible bug reports, and regression automation so previously fixed issues do not return unnoticed.',
  },
  {
    question: 'Can I see a sample of your reporting before hiring?',
    answer: (
      <>
        Absolutely — here's an anonymized sample QA status report (the same format I deliver to clients weekly):{' '}
        <a
          href="/sample-qa-report.xlsx"
          download="Sample-QA-Report.xlsx"
          className="text-accent fw-semibold d-inline-flex align-items-center"
        >
          <FaFileExcel className="me-1" /> Download Sample Excel Report
        </a>
      </>
    ),
    plainAnswer:
      "Absolutely — an anonymized sample QA status report (the same format delivered to clients weekly) is available to download directly from the FAQ and Services pages.",
  },
];

export default function Faq() {
  return (
    <section className="faq-section">
      <div className="section-heading">
        <h2>Frequently Asked Questions</h2>
        <p className="text-muted">Common questions before we get started — if yours isn't here, just ask.</p>
      </div>
      <Accordion className="custom-accordion">
        {FAQ_ITEMS.map((item, idx) => (
          <Accordion.Item eventKey={String(idx)} key={item.question}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}
