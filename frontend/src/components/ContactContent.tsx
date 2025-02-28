import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from "next/image";
import styles from '../styles/contactUs.module.css';
import ContactUsButton from './contactButton';

interface ContactContentProps {
  contactInfo: {
    welcomeMessage: string;
    socialLinks: Array<{
      platform: string;
      icon: string;
      url: string;
    }>;
    buttons: Array<{
      label: string;
      body: string;
      iconType: string;
    }>;
  };
  onEstimateClick?: () => void;
}

export default function ContactContent({ contactInfo, onEstimateClick }: ContactContentProps) {

  const rightColumnRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: true
  });

  return (
    <div className={styles.contentSection}>

      <div 
        ref={rightColumnRef}
        className={styles.rightColumn}
      >
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
      </div>

    </div>
  );
} 