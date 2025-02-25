import Image from 'next/image';
import React from 'react';
import styles from '../styles/handyService.module.css';

interface Subservice {
  label: string;
  description: string;
  image: string;
}

interface CompactCategoryContentProps {
  subservices: Subservice[];
}

const CompactCategoryContent: React.FC<CompactCategoryContentProps> = ({ subservices }) => {
  return (
    <div className={styles.compactSubservicesContainer}>
      {subservices.map((subservice, index) => (
        <div key={index} className={styles.compactSubserviceItem}>
          {subservice.image && (
            <Image 
              src={subservice.image} 
              alt={subservice.label} 
              width={280}
              height={160}
              className={styles.compactSubserviceImage}
              priority={index === 0}
            />
          )}
          <h4 className={styles.compactSubserviceLabel}>{subservice.label}</h4>
          <p className={styles.compactSubserviceDescription}>{subservice.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CompactCategoryContent; 