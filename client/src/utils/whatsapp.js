// WhatsApp link used by the Contact page and the floating button.
//
// Preferred: VITE_WHATSAPP_LINK = a WhatsApp Business short link (https://wa.me/message/XXXXXXXX).
// It contains a code instead of the phone number, so the number is not exposed in the page,
// the JS bundle or the browser's address bar when the chat opens.
// Fallback: VITE_WHATSAPP_NUMBER (international format, digits only) builds a normal wa.me link.

const LINK = import.meta.env.VITE_WHATSAPP_LINK;
const NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const DEFAULT_MESSAGE = "Hi! I'd like to talk about a QA/testing project.";

export const whatsappHref = LINK
  ? LINK
  : NUMBER
    ? `https://wa.me/${NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`
    : null;
