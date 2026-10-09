import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  // Contact page already has its own WhatsApp button; hide the floating one there.
  if (!WHATSAPP_NUMBER || pathname === '/contact') return null;

  const message = encodeURIComponent("Hi! I'd like to talk about a QA/testing project.");
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
