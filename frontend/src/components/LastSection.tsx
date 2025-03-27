import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from '@/styles/LastSection.module.css';
import Link from "next/link";
import { Container } from 'react-bootstrap';

const LastSection = () => {
  const animationRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: true
  });

  return (
    <footer 
      ref={animationRef}
      className={`${styles.lastSection} fade-in-section`}
      style={{ marginTop: 'auto' }}
    >
      <Container>
        <div className={`${styles.content} py-4`}>
          <div className={styles.footertext}>
            <div className={styles.footerleft}>
              <p className="mb-2">© 2025 Elego Prime. All rights reserved.</p>
              <p className="mb-2">Documentation</p>
              <p className="mb-2"> <Link href="/index">About</Link></p>
              <p className="mb-2"> <Link href="/index">Home</Link></p>
              <p className="mb-2"> <Link href="/contactUs">Contact Us</Link></p>
              <p className="mb-2">Reserve</p>
              <p className="mb-2"> <Link href="/services">Services</Link></p>
              <p className="mb-2">Get an estimate</p>
              <p className="mb-0">Website by <a href="https://pymesoft.com" target="_blank" rel="noopener noreferrer">PyMESoft</a></p>
            </div>
            <div className={`${styles.footermid} text-muted`}>
              <h6 className="mb-2">LOCATIONS</h6>
              <p className="mb-2">Denver</p>
              <p className="mb-2">Aurora</p>
              <p className="mb-2">Castle Rock</p>
              <p className="mb-2">Parker</p>
              <p className="mb-2">Lone Tree</p>
              <p className="mb-2">Castle Pines</p>
              <p className="mb-2">Littleton</p>
              <p className="mb-2">DTC</p>
              <p className="mb-2">Castle Rock</p>
              <p className="mb-2">Highlands Ranch</p>
              <p className="mb-2">Centennial</p>
              <p className="mb-2">Englewood</p>
            </div>
            <div className={`${styles.footerright} text-muted`}>
              <h6 className="mb-2">SOCIAL</h6>
              <p className="mb-2">Email: booking@elegoprime.com</p>
              <p className="mb-2">Phone: (720) 123-4567</p>
              <p className="mb-2">Text: (720) 123-4567</p>
            </div>
          </div>
        </div>
        <div className={`${styles.termscontent} py-4 text-muted`}>
          <p className="mb-2 border-end "> <Link href="/privacy">Privacy Policy</Link></p>
          <p className={`${styles.terms} mb-2 border-end`}> <Link href="/terms">Terms & Conditions</Link></p>
          <p className="mb-2 border-end">Accessibility Tools</p>
          <p className="mb-2">Do Not Sell or Share My Personal Information</p>
        </div>
      </Container>
    </footer>
  );
};

export default LastSection;