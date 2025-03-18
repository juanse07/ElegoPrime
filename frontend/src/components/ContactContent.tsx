import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import styles from '../styles/contactUs.module.css';
import ContactUsButton from './contactButton';

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faInstagram, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface ContactContentProps {
  contactInfo: {
    welcomeMessage: string;
    socialLinks: Array<{
      platform: string;
      icon: string;
      url: string;
      label: string;
    }>;
    buttons: Array<{
      label: string;
      body: string;
      iconType: string;
    }>;
  };
  onEstimateClick?: () => void;
}

const socialIcons: Record<string, IconDefinition> = {
  facebook: faSquareFacebook,
  instagram: faInstagram,
};

export default function ContactContent({ contactInfo, onEstimateClick }: ContactContentProps) {

  const rightColumnRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: true
  });

  return (
    <div className={styles.contentSection}>
      <div ref={rightColumnRef} className={styles.rightColumn}>
        
        <div className={styles.contactButtons}>
          {contactInfo.buttons.map((button, index) => (
            <ContactUsButton 
              key={index}
              label={button.label}
              body={button.body}
              iconType={button.iconType}
              onEstimateClick={button.iconType === 'gauge' ? onEstimateClick : undefined}
            />
          ))}
        </div>

        <div className={styles.socialLinks}>
          {contactInfo.socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialButton}
            >
              <FontAwesomeIcon 
                icon={socialIcons[link.platform.toLowerCase()]} 
                className={styles.iconCustomContact} 
              />
              <span className={styles.socialLabel}>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}