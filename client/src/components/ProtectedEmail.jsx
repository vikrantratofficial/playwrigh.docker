// Email address that is visible to people but not present as text in the page.
//
// The address is kept in two separate pieces (user / domain) and drawn by CSS pseudo-elements, so
// scrapers that read the HTML text, the DOM text or look for "mailto:" links find no address.
// The mailto link only exists after a click. Bots that run a full browser and read the rendered
// pixels/CSS can still see it — this stops the common harvesters, not every determined one.

const USER = 'vikrant.rathore.career';
const DOMAIN = 'gmail.com';

export const openMail = () => {
  window.location.href = `mailto:${USER}@${DOMAIN}`;
};

// With no children: renders the address itself. With children (e.g. an icon): renders them instead.
export default function ProtectedEmail({ className = '', icon, children }) {
  const showAddress = !children;

  // With an icon (e.g. the external-link arrow) the whole row is clickable. The icon sits outside the
  // button because the address is drawn by the button's own ::before/::after.
  if (icon) {
    return (
      <span className={`protected-email-wrap ${className}`} onClick={openMail}>
        <button type="button" className="protected-email protected-email-text" data-u={USER} data-d={DOMAIN} aria-label="Send me an email" />
        {icon}
      </span>
    );
  }
  return (
    <button
      type="button"
      className={`protected-email ${showAddress ? 'protected-email-text' : ''} ${className}`}
      data-u={showAddress ? USER : undefined}
      data-d={showAddress ? DOMAIN : undefined}
      onClick={openMail}
      aria-label="Send me an email"
    >
      {children}
    </button>
  );
}
