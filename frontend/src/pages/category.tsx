import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import CategoryButton from '@/components/CategoryButton';
import CategoryContent from '@/components/CategoryContent';
import styles from '../styles/categories.module.css';

const Category: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<string | null>('Security');

  const router = useRouter();

  const categoryRef = useScrollAnimation();

  useEffect(() => {
    if (router.asPath.includes('#')) {
      const categoryFromHash = decodeURIComponent(router.asPath.split('#')[1]);
      setSelectedCategory(categoryFromHash);
    }
  }, [router.asPath]);

  const categories = [
    {
      label: 'All',
      subservices: [
        { label: 'Camera install', description: 'Security camera installation and maintenance.', image:'/cameraservices.webp', link: '/reserve'},
        { label: 'Doorbell install', description: 'Install and maintain doorbell systems.', image:'/doorbell.webp', link: '/reserve' },
        { label: 'Soundbars install', description: 'Immersive sound in your home with professional soundbar installation', image: '/soundbar.webp', link: '/reserve' },
        { label: 'Videobeam projectors', description: 'High-quality projectors.', image: '/videobeam.webp', link: '/reserve' },
        { label: 'Tv install', description: 'Professional TV mounting and installation for a sleek, secure setup in any room.', image: '/tv-mounting.webp', link: '/reserve' },
        { label: 'Oversized TV', description: 'Expert installation of overhead TVs for an elevated viewing experience and space-saving design.', image: '/oversizedTv.webp', link: '/reserve' },
        { label: 'Electric base TV', description: 'Installation and maintenance of electric base TVs, ensuring smooth operation and durability.', image: '/cables.webp', link: '/reserve' },
        { label: 'Hide cables', description: 'Neat and efficient cable management to hide and organize wires for a clean and tidy space.', image: '/electricbase.webp', link: '/reserve' },
        { label: 'Fans install', description: 'Professional installation of ceiling or stand fans to ensure proper air circulation and comfort.', image: '/fansinstall.webp', link: '/reserve' },
        { label: 'Lamps and lights install', description: 'Expert installation of lamps and light fixtures, enhancing the ambiance and lighting in your space.', image: '/lightingInstallation.webp', link: '/reserve' },
        { label: 'Furniture assembly', description: 'Efficient and professional assembly of furniture pieces, ensuring durability and proper setup.', image: '/furnitureAssembly.webp', link: '/reserve' },
        { label: 'Murphy bed assembly', description: 'Expert installation and assembly of space-saving Murphy beds, maximizing your rooms functionality.', image: '/murphyBed.webp', link: '/reserve' },
        { label: 'Shelf install', description: 'Professional installation of shelves, ensuring secure and stylish placement for your storage needs.', image: '/shelf.webp', link: '/reserve' },
        { label: 'Mirror install', description: 'Expert mirror installation with precision and care for a perfect, seamless fit.', image: '/mirror.webp', link: '/reserve' },
        { label: 'Art install', description: 'Secure and visually appealing installation of artwork to enhance your space with creativity.', image: '/art.webp', link: '/reserve' },
        { label: 'Maintenance', description: 'Regular maintenance to ensure proper functioning and longevity of fixtures.', image: '/faucet.webp', link: '/reserve' },
        { label: 'Toilet Install', description: 'Installing new toilets, including standard, eco-friendly, or smart toilets.', image: '/toilet.webp', link: '/reserve' },
        { label: 'Interior ', description: 'Painting of walls, ceilings, and trim inside homes and commercial spaces.', image: '/interiorPainting.webp', link: '/reserve' },
        { label: 'Exterior ', description: 'Painting of exterior surfaces such as walls, doors, windows, and fences.', image: '/exteriorPainting.webp', link: '/reserve' }
      ]
    },
    {
      label: 'Security',
      subservices: [
        { label: 'Camera install', description: 'Security camera installation and maintenance.', image:'/cameraservices.webp', link: '/reserve' },
        { label: 'Doorbell install', description: 'Install and maintain doorbell systems.', image:'/doorbell.webp', link: '/reserve' }
      ]
    },
    {
      label: 'Videobeam',
      subservices: [
        { label: 'Soundbars install', description: 'Immersive sound in your home with professional soundbar installation', image: '/soundbar.webp', link: '/reserve' },
        { label: 'Videobeam projectors', description: 'High-quality projectors.', image: '/videobeam.webp', link: '/reserve' }
      ]
    },
    {
      label: 'TV',
      
      subservices: [
        { label: 'Tv install', description: 'Professional TV mounting and installation for a sleek, secure setup in any room.', image: '/tv-mounting.webp', link: '/reserve' },
        { label: 'Oversized TV', description: 'Expert installation of overhead TVs for an elevated viewing experience and space-saving design.', image: '/oversizedTv.webp', link: '/reserve' },
        { label: 'Electric base TV', description: 'Installation and maintenance of electric base TVs, ensuring smooth operation and durability.', image: '/cables.webp', link: '/reserve' },
        { label: 'Hide cables', description: 'Neat and efficient cable management to hide and organize wires for a clean and tidy space.', image: '/electricbase.webp', link: '/reserve' }
      ]
    },
    {
        label: 'Fans and Lighting',
        subservices: [
          { label: 'Fans install', description: 'Professional installation of ceiling or stand fans to ensure proper air circulation and comfort.', image: '/fansinstall.webp', link: '/reserve' },
          { label: 'Lamps and lights install', description: 'Expert installation of lamps and light fixtures, enhancing the ambiance and lighting in your space.', image: '/lightingInstallation.webp', link: '/reserve' }
        ]
      },
      {
        label: 'Assembling',
        subservices: [
          { label: 'Furniture assembly', description: 'Efficient and professional assembly of furniture pieces, ensuring durability and proper setup.', image: '/furnitureAssembly.webp', link: '/reserve' },
          { label: 'Murphy bed assembly', description: 'Expert installation and assembly of space-saving Murphy beds, maximizing your rooms functionality.', image: '/murphyBed.webp', link: '/reserve' }
        ]
      },
      {
        label: 'Wall Fixture Setup',
        subservices: [
          { label: 'Shelf install', description: 'Professional installation of shelves, ensuring secure and stylish placement for your storage needs.', image: '/shelf.webp', link: '/reserve' },
          { label: 'Mirror install', description: 'Expert mirror installation with precision and care for a perfect, seamless fit.', image: '/mirror.webp', link: '/reserve' },
          { label: 'Art install', description: 'Secure and visually appealing installation of artwork to enhance your space with creativity.', image: '/art.webp', link: '/reserve' }
        ]
      },
      {
        label: 'Faucet and toilet',
        subservices: [
          { label: 'Maintenance', description: 'Regular maintenance to ensure proper functioning and longevity of fixtures.', image: '/faucet.webp', link: '/reserve' },
          { label: 'Toilet Install', description: 'Installing new toilets, including standard, eco-friendly, or smart toilets.', image: '/toilet.webp', link: '/reserve' }
        ]
      },
      {
        label: 'Painting',
        subservices: [
          { label: 'Interior ', description: 'Painting of walls, ceilings, and trim inside homes and commercial spaces.', image: '/interiorPainting.webp', link: '/reserve' },
          { label: 'Exterior ', description: 'Painting of exterior surfaces such as walls, doors, windows, and fences.', image: '/exteriorPainting.webp', link: '/reserve' }
        ]
      },
  ];

  const handleCategoryClick = (label: string) => {
    router.push(`/services#${label}`, undefined, { shallow: true }); // Actualiza la URL sin recargar la página
    setSelectedCategory(label);
  };

  const selectedCategoryContent = categories.find(category => category.label === selectedCategory);

  return (
    <div ref={categoryRef} className={`${styles.categoriesContainer} ${`fade-in-section`}`}>
      <div className={styles.categoriesLeft}>
        {categories.map((category, index) => (
          <CategoryButton 
            key={index} 
            label={category.label} 
            onClick={() => handleCategoryClick(category.label)} 
          />
        ))}
      </div>

      <div className={styles.categoriesRight}>
        {selectedCategoryContent && (
          <CategoryContent subservices={selectedCategoryContent.subservices} />
        )}
      </div>

    </div>
  );

};

export default Category;