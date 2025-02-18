import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from '@/styles/LastSection.module.css';

const LastSection = () => {
  const animationRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: false
  });

  return (
    <div 
      ref={animationRef}
      className={`${styles.lastSection} fade-in-section`}
    >
      <div className={styles.content}>
        <div className={styles.footertext}>
          <p>© 2025 Elego Prime. All rights reserved.</p>
          <p>Privacy Policy | Terms of Service</p>
          <p>Email: booking@elegoprime.com</p>
          <p>Website by <a href="https://pymesoft.com" target="_blank" rel="noopener noreferrer">PyMESoft</a></p>
        </div>
      </div>
    </div>
  );
};

export default LastSection;