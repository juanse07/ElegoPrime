import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        { label: 'Camera installation', description: 'Security camera installation and maintenance.', image:'/camerahome.webp'},
      ]
    },
    {
      label: 'Residential',
      subservices: [
        { label: 'Residential cleaning', description: 'A full home cleaning service covering every room for a spotless, refreshed living space.', image: '/residentialindex.webp' },
      ]
    },
    {
      label: 'TV',
      subservices: [
        { label: 'Tv installation', description: 'Professional TV mounting and installation for a sleek, secure setup in any room.', image: '/tvinstallhome.webp' },
      ]
    },
    {
      label: 'Ceiling fans and light fixtures',
      subservices: [
        { label: 'Fans installation', description: 'Professional installation of ceiling or stand fans to ensure proper air circulation and comfort.', image: '/fanshome.webp' },
      ]
    }
  ];

  const toggleExpand = (serviceLabel: string) => {
    setExpandedCard(expandedCard === serviceLabel ? null : serviceLabel);
  };

  return (
    <section className={styles.servicesSection}>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className={styles.servicesTitle}>Professional Services</h2>
          <Link href="/category" className={styles.seeAllLink}>
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

                    <div className={styles.titleRow}>
  <h3 className={styles.title}>{service.label}</h3>
  <div 
    className={styles.calendarIcon}
    onClick={(e) => {
      e.stopPropagation(); // Previene que se active el enlace padre
      window.location.href = '/booking';
    }}
  >
    <FontAwesomeIcon icon={faCalendarDays} />
  </div>
</div>

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
