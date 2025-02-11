import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from '@/styles/ServiceSection.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaComments } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

interface ServiceSectionProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  backgroundHandler?: string;
  fontColor?: string;
  buttonStyle?: 'primary' | 'outline-primary' | 'outline-secondary';
  hightLightsBackgroundColor?: string;
  HlTitleFont?: string;
  HLbodyFont?: string;
  highLightTitle1?: string;
  highLightTitle2?: string;
  highLightTitle3?: string;
  highLightBody1?: string;
  highLightBody2?: string;
  highLightBody3?: string;
  buttonText?: string;
  onClickNavPath?: string;
}

export default function ServiceSection({
  category,
  title,
  description,
  imageUrl,
  imagePosition = 'right',
  backgroundHandler = '#FFFFFF',
  fontColor = '#000000',
  buttonStyle = 'primary',
  // hightLightsBackgroundColor = '#FFFFFF',
  // HlTitleFont = '#000000',
  // HLbodyFont = '#000000',
  // highLightTitle1 = 'Quality Service',
  // highLightTitle2 = 'Affordable Pricing',
  // highLightTitle3 = 'Trusted Professionals',
  // highLightBody1 = 'body',
  // highLightBody2 = 'body',
  // highLightBody3 = 'body',
  buttonText = 'Book Now',
  onClickNavPath = '/BarService/new-quotation',
}: ServiceSectionProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(onClickNavPath);
  };

  const animationRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px'
  });

  return (
    <div className={styles.parentContainer}>   
      <div className={styles.Container}>
        <section
          className={`${styles.serviceSection} fade-in-section`}
          style={{
            backgroundColor: backgroundHandler,
            color: fontColor,
            padding: '3rem',
            borderRadius: '8px',
            position: 'relative',
            zIndex: 1
          }}
          ref={animationRef}
        >
          <Container>
            <Row
              className={`align-items-center service-row ${
                imagePosition === 'left' ? 'flex-row-reverse' : ''
              }`}
            >
              <Col>
                <div>
                  <span className={styles.category}>{category}</span>
                  <h2 className={styles.ServiceTitle}>{title}</h2>
                  <p className={styles.ServiceDescription}>{description}</p>
                  <div className={styles.serviceActions}>
                    <Button 
                      className={`${styles.serviceButton} btn btn-${buttonStyle}`}
                      title={buttonText}
                      onClick={handleClick}
                    >
                      {buttonText}
                    </Button>
                    <a href="#" className={styles.serviceIcon}>
                      <FaComments size={24} />
                    </a>
                    <a href="#" className={styles.serviceIcon}>
                      <FiMail size={24} />
                    </a>
                  </div>
                </div>
              </Col>
              <Col>
                <Image
                  src={imageUrl}
                  alt="Responsive Image"
                  width={500}
                  height={400}
                  className={styles.serviceImage}
                  style={{
                    borderRadius: '8px',
                    boxShadow: '4px 8px 12px rgba(0, 0, 0, 0.5), 2px 4px 6px rgba(255, 255, 255, 0.1)',
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </Col>
            </Row>
            {/* <Row className={styles.highlightsRow}>
              {[
                { title: highLightTitle1, body: highLightBody1 },
                { title: highLightTitle2, body: highLightBody2 },
                { title: highLightTitle3, body: highLightBody3 },
              ].map((highlight, index) => (
                <Col key={index} md={4} className={styles.highlight}
                  style={{backgroundImage: hightLightsBackgroundColor, color: fontColor}}>
                  <h4 style={{color: HlTitleFont}}>{highlight.title}</h4>
                  <p style={{color: HLbodyFont}}>{highlight.body}</p>
                </Col>
              ))}
            </Row> */}
          </Container>
        </section>
      </div>
    </div>
  );
}

