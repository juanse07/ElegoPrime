import React from 'react';
import styles from '../styles/residential.module.css';
import LastSection from '@/components/LastSection';
import HomeService from '@/components/HomeService';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';

const Residential = () => {
const residentialSectionRef = useScrollAnimation();
  const contactButtons = [
    {
      body: "Get an estimate",
      iconType: "gauge" as const,
      label: ""
    },
    {
      body: "elegoprime@gmail.com",
      iconType: "mail" as const,
      label: ""
    },
    {
      body: "(786) 490-3942 / (303) 596-2833",
      iconType: "phone" as const,
      label: "phone"
    },
    {
      body: "(786) 490-3942 / (303) 596-2833",
      iconType: "messageCircle" as const,
      label: "text"
    }
  ];
  return (
  <div>
    <section ref={residentialSectionRef} className={`${styles.box} fade-in-section`}>
      <div className={styles.containerOne}>
        <h2>Residential Cleaning</h2>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h4>
                        Tailored Cleaning Services for a Higher Standard of Living
                    </h4>
                        <p>
                            Providing a clean, organized, and healthy home environment is our priority.
                            Our residential cleaning service is designed for those who value their time and want to keep their home in top condition without the stress.
                            <span className={styles.highlight}>We take care of every detail </span> and adapt to the unique needs of each household.
                        </p>
                        <p>
                            Hiring us not only improves the appearance of your home but also contributes to your overall well-being and peace of mind.
                            It&apos;s an investment in health, comfort, and quality of life.
                        </p>
                </div>
                <div className={styles.card}>
                    <h4>
                        Expert Cleaning Services Backed by Reliability, Care, and Attention to Detail
                    </h4>
                    <p>
                        You deserve more than just surface-level cleaning, we treat your space with care, precision, and respect. That&apos;s exactly what we deliver.
                    </p>
                    <p>
                        We specialize in professional house cleaning, with a team that is trained, trustworthy, and committed to creating clean, healthy, and welcoming environments for every household we serve.
                        We know that your home is your most personal space, and we treat it as such—cleaning thoroughly, working efficiently, and <span className={styles.highlight}>always putting your comfort first</span>.
                    </p>
                    <Link href="/booking" className={styles.bookNowButton}>
                    Book Now <span className={styles.arrow}>→</span>
                    </Link>
                </div>
            </div>
      </div>
      
      <div className={styles.containerTwo}>
        <img src="/residentialimage.webp" alt="" />
      </div>
    </section>
    <HomeService />
    <Features />
    <Testimonials/>
      <ContactSection contactButtons={contactButtons} onEstimateClick={() => setShowServiceModal(true)} />
    <LastSection />
  </div>
);

};

export default Residential;
