// /components/Services.tsx
import Category from '@/pages/category';
import InfiniteSlider from "@/components/slider";

import LastSection from '@/components/LastSection';
import ReserveVideo from '@/components/ReserveVideo';

import styles from '@/styles/services.module.css';
import { useState, useEffect } from "react";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const reviews = [
  <div key={1} className={styles.reviewItem}>
      <p>
        "Exceptional service from start to finish! I had several small repairs around my house that I kept postponing,
        but they handled everything quickly and professionally."
      </p>
    <div className={styles.customerContainer}>
      <img src="/emily.webp" alt="Emily R." className={styles.customerImage} />
      <span>Emily R.</span>  
    </div>
  </div>,
  <div key={2} className={styles.reviewItem}>
      <p>
        "They went above and beyond to ensure everything was perfect! I needed some drywall repairs and painting done,
        and I was amazed by their attention to detail."
      </p>
    <div className={styles.customerContainer}>
      <img src="/mark.webp" alt="Mark T." className={styles.customerImage} />
      <span>Mark T.</span>  
    </div>
  </div>,
  <div key={3} className={styles.reviewItem}>
      <p>
        "Fast, affordable, and top-quality work! I had an emergency repair in my kitchen, and they responded immediately."
      </p>
    <div className={styles.customerContainer}>
      <img src="/sarah.webp" alt="Sarah L." className={styles.customerImage} />
      <span>Sarah L.</span>  
    </div>
  </div>
];
const Services: React.FC = () => {
  const [index, setIndex] = useState(0);
  const reviewSectionRef = useScrollAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.servicesPage}>
      <Category />
      <ReserveVideo/>
      <section ref={reviewSectionRef} className={`${styles.reviewSection} ${`fade-in-section`}`}>
        <div className={styles.reviewTitle}>
          <h2>Customer Testimonials</h2>
          <p>Opiniones de nuestros clientes</p>
        </div>

        <div className={styles.carouselContainer}>
          {reviews.map((review, i) => (
            <p
              key={i}
              className={`${styles.reviewText} ${
                i === index ? styles.active : ""
              }`}
            >
              {review}
            </p>
          ))}
        </div>
      </section>
      <InfiniteSlider />
      <LastSection />
    </div>
  );
};

export default Services;