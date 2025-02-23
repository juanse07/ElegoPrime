import React from 'react';
import styles from '@/styles/categoryButton.module.css';

interface CategoryButtonProps {
  label: string;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, onClick }) => {
  return (
    <div className={styles.categoryItem} onClick={onClick}>
      {label}
    </div>
  );
};

export default CategoryButton;
