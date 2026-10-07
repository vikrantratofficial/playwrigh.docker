import { Accordion } from 'react-bootstrap';
import { FaFileExcel } from 'react-icons/fa';

export const FAQ_ITEMS = [
  {
    question: 'How do you price a project?',
    answer:
      "Fixed-scope work (like SEO Optimization or Paid Ads Management) is quoted as a flat rate after a quick discovery call, so you know the total cost upfront — no surprise hours. Ongoing Content Marketing is billed hourly. See the Services page for starting prices on each engagement type.",
  },
  {
    question: 'Do you guarantee rankings or results?',
    answer:
      "No ethical marketer can guarantee specific rankings or results — search engines and ad platforms don't work that way. What I guarantee is a documented, data-driven strategy, transparent reporting, and ongoing optimization based on what's actually working.",
    plainAnswer:
      "No ethical marketer can guarantee specific rankings or results — search engines and ad platforms don't work that way. What I guarantee is a documented, data-driven strategy, transparent reporting, and ongoing optimization based on what's actually working.",
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Yes. I sign an NDA before any account access, credentials, or client data is shared — this is standard for every engagement, not an extra request. Happy to sign yours or use a template of mine.',
  },
  {
    question: "What's the typical turnaround time?",
    answer:
      'A starter SEO audit usually takes 3-5 days. Paid ads campaign setup takes 1-2 weeks. Content marketing/email automation setups take 3-7 days depending on scope. Ongoing management is continuous, scoped per sprint. Exact timelines are confirmed after the discovery call.',
  },
  {
    question: 'Do you work with international / remote clients?',
    answer:
      "Yes — all engagements are fully remote. I keep flexible hours to overlap with US, UK and EU business hours, and communicate async via email/Slack/WhatsApp so time zones don't slow things down.",
  },
  {
    question: 'Can I see a sample of your reporting before hiring?',
    answer: (
      <>
        Absolutely — here's an anonymized sample marketing report (the same format I deliver to clients weekly):{' '}
        <a
          href="/sample-marketing-report.xlsx"
          download="Sample-Marketing-Report.xlsx"
          className="text-accent fw-semibold d-inline-flex align-items-center"
        >
          <FaFileExcel className="me-1" /> Download Sample Excel Report
        </a>
      </>
    ),
    plainAnswer:
      "Absolutely — an anonymized sample marketing report (the same format delivered to clients weekly) is available to download directly from the FAQ and Services pages.",
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
