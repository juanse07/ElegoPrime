// /components/CategoryContent.tsx
import React from 'react';
import styles from '../styles/categories.module.css';
import Image from 'next/image';
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

interface Subservice {
  label: string;
  description: string;
  image: string;
  link?: string;
  readMore?: boolean;
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
          <div className= {styles.categoryContainer}>
            <h4 className={styles.subserviceLabel}>{subservice.label}</h4>
             {subservice.link && (
                <div className={styles.linkWrapper}>
                  <Link href={subservice.link} className={styles.subserviceLink}>
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </Link>
                </div>
            )}
              <div className={styles.categoryDescription}>{subservice.description}</div>
              {subservice.readMore && (
                <div className={styles.readMore}>
                  <Link href="/residential">
                    Read more
                  </Link>
                </div>
              )}
            </div>
          </div>
      ))}
    </div>
  );
};

  
export default CategoryContent;
