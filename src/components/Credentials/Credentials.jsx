import { useEffect, useRef, useState, useCallback } from 'react';
import { credentialsData } from '../../data/portfolio-data';
import './Credentials.css';

function CredentialEntry({ children, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const entryRef = useRef(null);

  useEffect(() => {
    const el = entryRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={entryRef}
      className={`credentials__entry ${
        isVisible ? 'credentials__entry--visible' : ''
      }`}
    >
      {children}
    </div>
  );
}

export default function Credentials() {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = useCallback((image, title) => {
    setModalImage(image);
    setModalTitle(title);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalImage(null);
    setModalTitle('');
    document.body.style.overflow = '';
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeModal();
    }
    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [modalImage, closeModal]);

  let entryIndex = 0;

  return (
    <section id="credentials" className="credentials section">
      <div className="container">
        <header className="credentials__header">
          <p className="section-label">{'// SYSTEM CREDENTIALS'}</p>
          <h2 className="section-title">CREDENTIALS VERIFIED</h2>
        </header>

        <div className="credentials__content">
          {/* Education */}
          <div>
            <p className="credentials__sub-label">— EDUCATION —</p>
            {credentialsData.education.map((edu) => {
              const idx = entryIndex++;
              return (
                <CredentialEntry key={edu.degree} index={idx}>
                  <div className="credentials__entry-title">
                    <span className="credentials__entry-icon">🎓</span>
                    <span className="credentials__entry-name">{edu.degree}</span>
                  </div>
                  <div className="credentials__entry-detail">
                    {edu.institution} | {edu.year}
                  </div>
                  <div className="credentials__entry-detail">
                    <span className="credentials__entry-detail-label">
                      University:{' '}
                    </span>
                    {edu.university}
                  </div>
                  <div className="credentials__auth">
                    AUTHENTICATION: VALID
                    <span className="credentials__auth-check"> ✓</span>
                  </div>
                </CredentialEntry>
              );
            })}
          </div>

          {/* Certifications */}
          <div>
            <p className="credentials__sub-label">— CERTIFICATIONS —</p>
            {credentialsData.certifications.map((cert) => {
              const idx = entryIndex++;
              return (
                <CredentialEntry key={cert.name} index={idx}>
                  <div className="credentials__entry-title">
                    <span className="credentials__entry-icon">📜</span>
                    <span className="credentials__entry-name">{cert.name}</span>
                  </div>
                  <div className="credentials__entry-detail">
                    {cert.issuer} | {cert.year}
                  </div>
                  {cert.image && (
                    <button
                      className="credentials__view-btn"
                      onClick={() => openModal(cert.image, cert.name)}
                    >
                      VIEW CREDENTIAL →
                    </button>
                  )}
                  <div className="credentials__auth">
                    AUTHENTICATION: VALID
                    <span className="credentials__auth-check"> ✓</span>
                  </div>
                </CredentialEntry>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <div
        className={`credentials__modal-overlay ${
          modalImage ? 'credentials__modal-overlay--open' : ''
        }`}
        onClick={closeModal}
      >
        <div
          className="credentials__modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="credentials__modal-close"
            onClick={closeModal}
            aria-label="Close modal"
          >
            ✕
          </button>
          {modalImage && (
            <>
              {modalImage.endsWith('.pdf') ? (
                <object
                  data={modalImage}
                  type="application/pdf"
                  className="credentials__modal-image"
                  style={{ minHeight: '60vh', width: '100%', background: '#fff' }}
                >
                  <p>Your browser does not support PDFs. <a href={modalImage}>Download the PDF</a>.</p>
                </object>
              ) : (
                <img
                  src={modalImage}
                  alt={modalTitle}
                  className="credentials__modal-image"
                  loading="lazy"
                />
              )}
              <p className="credentials__modal-title">{modalTitle}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
