import React from 'react';
import styles from '../styles/features.module.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Features = () => {
const featuresSectionRef = useScrollAnimation();
  return (
    <section ref={featuresSectionRef} className={`fade-in-section`}>
    <div className={styles.fullPageContainer}>
      <div className={styles.backgroundImage}></div>

      <div className={styles.overlayContent}>
        <h2>Fundamental qualities</h2>
        <p>When it comes to residential cleaning, certain qualities are essential to ensure a safe, thorough, and satisfying experience for homeowners.
            Here are the define by professional and reliable cleaning service:
        </p>
        <ul className={styles.featuresList}>
            <li>Attention to Detail</li>
            <li>Consistency</li>
            <li>Reliability and Punctuality</li>
            <li>Use of Safe and Effective Products</li>
            <li>Respect for the Home</li>
            <li>Strong Work Ethic</li>
            <li>Clear Communication</li>
        </ul>

      </div>
    </div>
    </section>
  );
};

export default Features;

