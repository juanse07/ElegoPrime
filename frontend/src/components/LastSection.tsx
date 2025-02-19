import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from '@/styles/LastSection.module.css';
import { Container } from 'react-bootstrap';

const LastSection = () => {
  const animationRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: false
  });

  return (
    <footer 
      ref={animationRef}
      className={`${styles.lastSection} fade-in-section`}
      style={{ marginTop: 'auto' }}
    >
      <Container>
        <div className={`${styles.content} py-4`}>
          <div className={`${styles.footertext} text-center`}>
            <p className="mb-2">© 2025 Elego Prime. All rights reserved.</p>
            <p className="mb-2">Privacy Policy | Terms of Service</p>
            <p className="mb-2">Email: booking@elegoprime.com</p>
            <p className="mb-0">Website by <a href="https://pymesoft.com" target="_blank" rel="noopener noreferrer">PyMESoft</a></p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default LastSection;