import { FaCertificate, FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa';

/**
 * PLACEHOLDER DATA — replace with your real certifications before going live.
 *
 * Each entry needs: name, platform, year, and EITHER:
 *   - verifyUrl: an official verification link (Credly badge, LinkedIn cert URL, etc.)
 *   - pdf: a path to a PDF copy placed in client/public/certificates/
 */
const CERTIFICATIONS = [
  {
    name: 'Your Certification Name',
    platform: 'ISTQB',
    year: '20XX',
    verifyUrl: 'https://www.credly.com/badges/replace-with-real-badge-id',
  },
  {
    name: 'Your Certification Name',
    platform: 'Udemy',
    year: '20XX',
    pdf: '/certificates/certificate-1.pdf',
  },
  {
    name: 'Your Certification Name',
    platform: 'LinkedIn Learning',
    year: '20XX',
    pdf: '/certificates/certificate-2.pdf',
  },
];

export default function Certifications() {
  return (
    <section className="mb-5">
      <h2 className="mb-4">Certifications</h2>
      <div className="cert-grid">
        {CERTIFICATIONS.map((cert) => (
          <div className="cert-card" key={cert.name + cert.platform}>
            <div className="cert-icon">
              <FaCertificate />
            </div>
            <div className="cert-info">
              <h6 className="cert-name">{cert.name}</h6>
              <p className="cert-meta">
                {cert.platform} · {cert.year}
              </p>
            </div>
            {cert.verifyUrl ? (
              <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="cert-link">
                Verify <FaExternalLinkAlt className="ms-1" size={11} />
              </a>
            ) : (
              <a href={cert.pdf} target="_blank" rel="noreferrer" className="cert-link">
                <FaFilePdf className="me-1" /> View Certificate (PDF)
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
