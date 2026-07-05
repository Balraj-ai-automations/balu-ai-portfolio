import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { contactData } from '../../data/portfolio-data';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [headerTyped, setHeaderTyped] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHeaderTyped(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSubmitted(false);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        console.warn("Web3Forms Access Key is missing. Falling back to mailto.");
        const subject = encodeURIComponent(`Message from ${formData.name} via BALU.AI`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        window.open(`mailto:balrajsrinivas03@gmail.com?subject=${subject}&body=${body}`);
        setSubmitted(true);
        setLoading(false);
        setTimeout(() => setSubmitted(false), 5000);
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-section section" id="contact" ref={sectionRef}>
        <div className="contact-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">{'// COMMS TERMINAL'}</div>
            <h2 className="section-title">TRANSMIT MESSAGE</h2>
          </motion.div>

          <div className="contact-grid">
            {/* Left: Contact Form */}
            <motion.div
              className="comms-terminal"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              data-hover
            >
              <div className="comms-header">
                <div>
                  <span className="prompt">&gt;</span> COMMUNICATION CHANNEL OPEN
                </div>
                {headerTyped && (
                  <div>
                    <span className="prompt">&gt;</span> Ready to collaborate.
                    Transmit your message.
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    [NAME]
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-hover
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    [EMAIL]
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email..."
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-hover
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    [MESSAGE]
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    data-hover
                  />
                </div>

                <button type="submit" className="transmit-btn" disabled={loading} data-hover>
                  {loading ? 'TRANSMITTING...' : 'TRANSMIT'} <span className="icon">📡</span>
                </button>
              </form>

              {error && (
                <motion.div
                  className="transmit-error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#ef4444', marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                >
                  <div>&gt; ERR_TRANSMISSION_FAILED: Connection lost.</div>
                  <div>&gt; Please check terminal settings or try again.</div>
                </motion.div>
              )}

              {submitted && (
                <motion.div
                  className="transmit-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div>&gt; Message transmitted successfully.</div>
                  <div>&gt; BALU.AI will respond within 24 hours.</div>
                </motion.div>
              )}
            </motion.div>

            {/* Right: External Ports */}
            <motion.div
              className="ports-section"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="ports-title">EXTERNAL PORTS</div>

              {contactData.ports.map((port, index) => (
                <motion.a
                  key={port.id}
                  className="port-item"
                  href={port.url}
                  target={port.isDownload ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  download={port.isDownload ? true : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  data-hover
                >
                  <span className="port-id">[{port.id}]</span>
                  <span className="port-label">{port.label}</span>
                  <span className="port-handle">{port.handle}</span>
                  <span className="port-arrow">→</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-text">
          <div>
            &gt; Thank you for accessing the system.
          </div>
          <div>
            &gt; Session ending...
          </div>
          <div style={{ marginTop: '16px' }}>
            © 2026 <span className="violet">BALU.AI</span> — Designed & Built by{' '}
            <span className="violet">Balraj S</span>
          </div>
        </div>
      </footer>
    </>
  );
}
