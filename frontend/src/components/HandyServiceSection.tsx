import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import styles from '../styles/handyService.module.css';

interface Subservice {
  label: string;
  description: string;
  image: string;
}

interface Service {
  label: string;
  subservices: Subservice[];
}

const HandyServiceSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  const services: Service[] = [
    {
      label: 'Security',
      subservices: [
        { label: 'Camera install', description: 'Security camera installation and maintenance.', image:'/camerahome.webp'},
        // { label: 'Doorbell install', description: 'Install and maintain doorbell systems.', image:'/security-system.webp' },
      ]
    },
    {
      label: 'SoundBars',
      subservices: [
        { label: 'Soundbars install', description: 'Immersive sound in your home with professional soundbar installation', image: '/soundbarhome.webp' },
        // { label: 'Videobeam projectors', description: 'High-quality projectors.', image: '/herramientasmovil2.webp'}
      ]
    },
    {
      label: 'TV',
      subservices: [
        { label: 'Tv install', description: 'Professional TV mounting and installation for a sleek, secure setup in any room.', image: '/tvinstallhome.webp' },
        // { label: 'Overhead TV', description: 'Expert installation of overhead TVs for an elevated viewing experience and space-saving design.', image: '/camerainstall.webp' },
        // { label: 'Electric base TV', description: 'Installation and maintenance of electric base TVs, ensuring smooth operation and durability.', image: '/herramientasmovil2.webp' },
        // { label: 'Hide cables', description: 'Neat and efficient cable management to hide and organize wires for a clean and tidy space.', image: '/muchasherramientas.webp' }
      ]
    },
    {
      label: 'Fans and Lighting',
      subservices: [
        { label: 'Fans install', description: 'Professional installation of ceiling or stand fans to ensure proper air circulation and comfort.', image: '/fanshome.webp' },
        // { label: 'Lamps and lights install', description: 'Expert installation of lamps and light fixtures, enhancing the ambiance and lighting in your space.', image: '/muchasherramientas.webp' }
      ]
    }
  ];

  const toggleExpand = (serviceLabel: string) => {
    if (expandedCard === serviceLabel) {
      setExpandedCard(null);
    } else {
      setExpandedCard(serviceLabel);
    }
  };

  return (
    <section className={styles.servicesSection}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className={styles.servicesTitle}>Professional Services</h2>
          <Link href="/services" className={styles.seeAllLink}>
            See All Services &gt;
          </Link>
        </div>
        <p className={styles.servicesDescription}>
          Expert installation and maintenance services for your home and office needs
        </p>
        <Row className="g-4">
          {services.map((service) => (
            <Col key={service.label} xs={6} sm={6} md={3}>
              <Link 
                href={`/category?service=${encodeURIComponent(service.label)}&subservice=${encodeURIComponent(service.subservices[0].label)}`}
                className="text-decoration-none"
                onClick={(e) => {
                  // For mobile: prevent navigation on first click to allow expanding
                  if (window.innerWidth <= 768) {
                    e.preventDefault();
                    toggleExpand(service.label);
                  }
                }}
              >
                <Card className={`${styles.serviceCard} ${expandedCard === service.label ? styles.expanded : ''}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={service.subservices[0].image}
                      alt={service.label}
                      fill
                      className={styles.image}
                      priority
                    />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.label}>{service.subservices[0].label}</div>
                    <h3 className={styles.title}>{service.label}</h3>
                    <p className={styles.description}>
                      {service.subservices[0].description}
                    </p>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HandyServiceSection;