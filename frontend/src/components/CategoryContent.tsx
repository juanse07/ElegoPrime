// /components/CategoryContent.tsx
import React from 'react';
import styles from '../styles/categories.module.css';

interface CategoryContentProps {
    description: string;
  }
  
  const CategoryContent: React.FC<CategoryContentProps> = ({ description }) => {
    return <div className={styles.categoryDescription}>{description}</div>;
  };
  
  export default CategoryContent;
