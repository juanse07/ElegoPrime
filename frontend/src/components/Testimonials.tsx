import React, { useEffect, useState } from 'react';
import styles from '../styles/testimonials.module.css';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const reviewSectionRef = useScrollAnimation();
  

  const reviews = [
    <div key={1} className={styles.reviewItem}>
      <p>
        &quot;Exceptional service from start to finish! I had several small repairs around my house that I kept postponing,
        but they handled everything quickly and professionally.&quot;
      </p>
      <div className={styles.customerContainer}>
        <Image src="/emily.webp" alt="Emily R." width={50} height={50} className={styles.customerImage} />
        <span>Emily R.</span>  
      </div>
    </div>,
    <div key={2} className={styles.reviewItem}>
      <p>
        &quot;They went above and beyond to ensure everything was perfect! I needed some drywall repairs and painting done,
        and I was amazed by their attention to detail.&quot;
      </p>
      <div className={styles.customerContainer}>
        <Image src="/mark.webp" alt="Mark T." width={50} height={50} className={styles.customerImage} />
        <span>Mark T.</span>  
      </div>
    </div>,
    <div key={3} className={styles.reviewItem}>
      <p>
        &quot;Fast, affordable, and top-quality work! I had an emergency repair in my kitchen, and they responded immediately.&quot;
      </p>
      <div className={styles.customerContainer}>
        <Image src="/sarah.webp" alt="Sarah L." width={50} height={50} className={styles.customerImage} />
        <span>Sarah L.</span>  
      </div>
    </div>
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 10000); // cada 10 segundos

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className={styles.servicesPage}>
      <section ref={reviewSectionRef} className={`${styles.reviewSection} fade-in-section`}>
        <div className={styles.reviewTitle}>
          <h2>Customer Testimonials</h2>
          <p>Customer reviews</p>
        </div>

        <div className={styles.carouselContainer}>
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`${styles.reviewText} ${i === index ? styles.active : ""}`}
            >
              {review}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
