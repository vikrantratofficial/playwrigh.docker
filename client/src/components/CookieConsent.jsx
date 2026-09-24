import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getConsent, setConsent } from '../utils/consent';
import { trackPageview } from '../utils/tracker';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    setVisible(false);
    trackPageview(window.location.pathname);
  };

  const handleDecline = () => {
    setConsent('declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-text">
        We use local storage and basic, anonymized visit data (approximate location from IP, pages viewed,
        and any errors that occur) purely to improve site stability and fix bugs faster (root-cause
        analysis) — never for ads or selling data. See our{' '}
        <Link to="/privacy" className="text-accent">Privacy Policy</Link> for details.
      </div>
      <div className="cookie-banner-actions">
        <Button size="sm" variant="outline-light" onClick={handleDecline}>Decline</Button>
        <Button size="sm" variant="accent" onClick={handleAccept}>Accept</Button>
      </div>
    </div>
  );
}
