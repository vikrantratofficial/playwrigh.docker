import { Button } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL;

export default function BookCallButton({ variant = 'accent', size, className = '', children }) {
  const openCalendly = () => {
    if (window.Calendly && CALENDLY_URL) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else if (CALENDLY_URL) {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  };

  if (!CALENDLY_URL) return null;

  return (
    <Button
      variant={variant}
      size={size}
      className={`d-inline-flex align-items-center ${className}`}
      onClick={openCalendly}
    >
      <FaCalendarAlt className="me-2" /> {children || 'Book a Call'}
    </Button>
  );
}
