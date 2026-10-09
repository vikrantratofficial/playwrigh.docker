import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

import { whatsappHref } from '../utils/whatsapp';

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  // Contact page already has its own WhatsApp button; hide the floating one there.
  if (!whatsappHref || pathname === '/contact') return null;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
