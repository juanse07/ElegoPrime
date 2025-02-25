// /components/CategoryContent.tsx
import React from 'react';
import styles from '../styles/categories.module.css';
import Image from 'next/image';

interface Subservice {
  label: string;
  description: string;
  image: string;
}

interface CategoryContentProps {
  subservices: Subservice[];
}
  
const CategoryContent: React.FC<CategoryContentProps> = ({ subservices }) => {
  return (
    <div className={styles.subservicesContainer}>
      {subservices.map((subservice, index) => (
        <div key={index} className={styles.subserviceItem}>
          {subservice.image && (
            <Image 
              src={subservice.image} 
              alt={subservice.label} 
              width={445} 
              height={250}
              className={styles.subserviceImage} 
            />
          )}
          <h4 className={styles.subserviceLabel}>{subservice.label}</h4>
          <div className={styles.categoryDescription}>{subservice.description}</div>
        </div>
      ))}
    </div>
  );
};

  
export default CategoryContent;
