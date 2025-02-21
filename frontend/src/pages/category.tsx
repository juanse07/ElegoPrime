import React, { useState } from 'react';

import styles from '../styles/categories.module.css';

const Category: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Categorías con subservicios
  const categories = [
    {
      label: 'Security',
      subservices: [
        { label: 'Camera install', description: 'Security camera installation and maintenance.' },
        { label: 'Doorbell install', description: 'Install and maintain doorbell systems.' },
      ]
    },
    {
      label: 'Videobeam',
      subservices: [
        { label: 'Soundbars install', description: 'Immersive sound in your home with professional soundbar installation' },
        { label: 'Videobeam projectors', description: 'High-quality projectors.' }
      ]
    },
    {
      label: 'TV',
      subservices: [
        { label: 'Tv install', description: 'Professional TV mounting and installation for a sleek, secure setup in any room.' },
        { label: 'Overhead TV', description: 'Expert installation of overhead TVs for an elevated viewing experience and space-saving design.' },
        { label: 'Electric base TV', description: 'Installation and maintenance of electric base TVs, ensuring smooth operation and durability.' },
        { label: 'Hide cables', description: 'Neat and efficient cable management to hide and organize wires for a clean and tidy space.' }
      ]
    },
    {
        label: 'Fans and Lighting',
        subservices: [
          { label: 'Fans install', description: 'Professional installation of ceiling or stand fans to ensure proper air circulation and comfort.' },
          { label: 'Lamps and lights install', description: 'Expert installation of lamps and light fixtures, enhancing the ambiance and lighting in your space.' }
        ]
      },
      {
        label: 'Assembling',
        subservices: [
          { label: 'Furniture assembly', description: 'Efficient and professional assembly of furniture pieces, ensuring durability and proper setup.' },
          { label: 'Murphy bed assembly', description: 'Expert installation and assembly of space-saving Murphy beds, maximizing your rooms functionality.' }
        ]
      },
      {
        label: 'Wall Fixture Setup',
        subservices: [
          { label: 'Shelf install', description: 'Professional installation of shelves, ensuring secure and stylish placement for your storage needs.' },
          { label: 'Mirror install', description: 'Expert mirror installation with precision and care for a perfect, seamless fit.' },
          { label: 'Art install', description: 'Secure and visually appealing installation of artwork to enhance your space with creativity.' }
        ]
      },
      {
        label: 'Faucet and toilet',
        subservices: [
          { label: 'Maintenance', description: 'Regular maintenance to ensure proper functioning and longevity of fixtures.' },
          { label: 'Toilet Install', description: 'Installing new toilets, including standard, eco-friendly, or smart toilets.' }
        ]
      },
      {
        label: 'Painting',
        subservices: [
          { label: 'Interior ', description: 'Painting of walls, ceilings, and trim inside homes and commercial spaces.' },
          { label: 'Exterior ', description: 'Painting of exterior surfaces such as walls, doors, windows, and fences.' }
        ]
      },
  ];

  const handleCategoryClick = (label: string) => {
    setSelectedCategory(selectedCategory === label ? null : label);
  };

  const selectedCategoryContent = categories.find(category => category.label === selectedCategory);

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesLeft}>
        {categories.map((category, index) => (
          <div key={index} className={styles.categoryItem} onClick={() => handleCategoryClick(category.label)}>
            <span className={styles.categoryLabel}>{category.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.categoriesRight}>
        {selectedCategoryContent && (
          <div className={styles.subservicesContainer}>
            {selectedCategoryContent.subservices.map((subservice, index) => (
              <div key={index} className={styles.subserviceItem}>
                <h4 className={styles.subserviceLabel}>{subservice.label}</h4>
                <p className={styles.subserviceDescription}>{subservice.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
