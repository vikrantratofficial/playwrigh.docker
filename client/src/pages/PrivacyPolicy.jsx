import { Container } from 'react-bootstrap';
import Seo from '../components/Seo';

export default function PrivacyPolicy() {
  return (
    <Container className="page-section" style={{ maxWidth: '820px' }}>
      <Seo
        title="Privacy Policy"
        description="How this site collects and uses visit data, cookies, and local storage — for user experience improvement and root-cause analysis only."
        path="/privacy"
      />
      <h1 className="mb-3">Privacy Policy</h1>
      <p className="text-muted small">Last updated: September 2026</p>

      <p className="text-muted">
        This site collects a limited amount of visit data. The purpose is narrow and stated upfront: improving
        the user experience and website stability, and diagnosing bugs/crashes (root-cause analysis, RCA) when
        something goes wrong. This data is never sold, never shared with advertisers, and never used for
        targeted advertising.
      </p>

      <h2 className="detail-heading">What we collect</h2>
      <ul className="detail-list">
        <li><strong>Approximate location from IP address</strong> — country/city-level only, derived from an offline lookup (no data is sent to a third-party geolocation service). Your exact street address is never known or stored.</li>
        <li><strong>Pages visited and referrer</strong> — which pages you viewed and where you came from, to understand what's useful and what isn't.</li>
        <li><strong>Browser/device information</strong> — user agent string (browser + OS), to reproduce and fix bugs that only happen on specific devices.</li>
        <li><strong>Errors and crashes</strong> — if something breaks while you're using the site, the error message and technical stack trace are logged so it can be fixed.</li>
        <li><strong>A random session ID</strong> — stored in your browser's <code>sessionStorage</code> (cleared when you close the tab), used only to group your own page views together, not to identify you personally.</li>
      </ul>

      <h2 className="detail-heading">What we do NOT do</h2>
      <ul className="detail-list">
        <li>No advertising cookies or ad-network trackers.</li>
        <li>No selling or sharing data with third parties.</li>
        <li>No cross-site tracking.</li>
        <li>No precise GPS location — only coarse, IP-based location.</li>
      </ul>

      <h2 className="detail-heading">Cookies &amp; local storage</h2>
      <p className="text-muted">
        We use <code>localStorage</code> to remember your cookie consent choice, and <code>sessionStorage</code>{' '}
        for a temporary session identifier. Neither is used for advertising. You can clear these at any time via
        your browser settings, and you can decline tracking entirely using the cookie banner shown on your first
        visit.
      </p>

      <h2 className="detail-heading">Data retention</h2>
      <p className="text-muted">
        Visit and error logs are automatically capped and the oldest entries are discarded once the log grows
        past a fixed size — data is not retained indefinitely.
      </p>

      <h2 className="detail-heading">Your rights</h2>
      <p className="text-muted">
        If you'd like to know what data has been logged about your visits, or want it deleted, email{' '}
        <a href="mailto:vikrant.rathore.career@gmail.com" className="text-accent">vikrant.rathore.career@gmail.com</a>{' '}
        and it will be handled promptly. This applies to visitors anywhere, including under GDPR (EU/UK) and
        similar regional privacy laws.
      </p>

      <h2 className="detail-heading">Contact</h2>
      <p className="text-muted">
        Questions about this policy: <a href="mailto:vikrant.rathore.career@gmail.com" className="text-accent">vikrant.rathore.career@gmail.com</a>
      </p>
    </Container>
  );
}
