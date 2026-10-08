import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  // The Contact page already has its own explicit "Chat on WhatsApp" button —
  // showing the floating one too just overlaps it on small screens.
  if (!WHATSAPP_NUMBER || pathname === '/contact') return null;

  const message = encodeURIComponent("Hi! I'd like to talk about a digital marketing project.");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
