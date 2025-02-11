import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from "next/image";
import styles from '../styles/heroSection.module.css';

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
}

export default function HeroSection({ image, title, subtitle }: HeroSectionProps) {
  const animationRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: true
  });

  return (
    <div 
      ref={animationRef}
      className={`${styles.heroSection} fade-in-section`}
    >
      <div className={styles.parallaxOverlay}>
        <Image 
          src={image}
          alt="Luxury Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
} 