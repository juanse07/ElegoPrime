import Image from "next/image";
import React from "react";
import styles from "../styles/video.module.css";
import Link from 'next/link';

interface ReserveVideoProps {
  className?: string;
}

const ReserveVideo: React.FC<ReserveVideoProps> = ({ className }) => {
  return ( 
    <div className={className}>
      <video
        className={styles.reserveVideo} 
        src="/videos/0322.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={styles.section}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Simple & Fast </span>
            Booking
          </h2>
          <p className={styles.description}>
            Booking our services is quick and 
            <span className={styles.highlight}> hassle-free! </span> 
            Simply choose the service you need, select a date and time that works for you, 
            and confirm your reservation in just a few clicks. 
            Our seamless process ensures a smooth experience from start to finish.
          </p>
          <p>Need assistance? Our team is always ready to help!</p>
          <Link href="/booking" className={styles.bookNowButton}>
  Book Now <span className={styles.arrow}>→</span>
</Link>
        </div>

        <div className={styles.phoneContainer}>
          <div className={styles.phoneFrame}>
            <Image
              src="/phone.webp"
              alt="Phone Frame"
              width={350}
              height={600}
              className={styles.phoneImage}
            />
            <video className={styles.video} autoPlay loop muted playsInline>
              <source src="/0322.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveVideo;
