// /components/Services.tsx
import Category from '@/pages/category';
import LastSection from '@/components/LastSection';
import styles from '@/styles/services.module.css';
import { useState, useEffect } from "react";

const reviews = [
  <div key={1} className={styles.reviewItem}>
    <span className={styles.customerContainer}>
      <img src="/emily.webp" alt="" className={styles.customerImage} />
      Emily R.
    </span>
    "Exceptional service from start to finish! I had several small repairs around my house that I kept postponing,
    but they handled everything quickly and professionally. The team was punctual, courteous, and explained every step of the process.
    My home looks fantastic now, and I wouldn&apos;t hesitate to hire them again!""
  </div>,

  <div key={2} className={styles.reviewItem}>
    <span className={styles.customerContainer}>
      <img src="/mark.webp" alt="" className={styles.customerImage} />
      Mark T.
    </span>  
    They went above and beyond to ensure everything was perfect! I needed some drywall repairs and painting done,
    and I was amazed by their attention to detail. The work was completed on time, within budget, and with outstanding quality.
    It&apos;s refreshing to work with a company that truly cares about its customers!
  </div>,
  
  <div key={3} className={styles.reviewItem}>
    <span className={styles.customerContainer}>
      <img src="/sarah.webp" alt="" className={styles.customerImage} />
      Sarah L.
    </span>
    Fast, affordable, and top-quality work! I had an emergency repair in my kitchen, and they responded immediately.
    Not only did they fix the issue quickly, but they also provided helpful maintenance tips to prevent future problems. 
    heir expertise and professionalism are unmatched!"
  </div>
];
const Services: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.servicesPage}>
      <Category />

      <section className={styles.reviewSection}>
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

      <LastSection />
    </div>
  );
};

export default Services;