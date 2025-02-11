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
}

export default function ContactContent({ contactInfo }: ContactContentProps) {
  const leftColumnRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: true
  });

  const rightColumnRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: true
  });

  return (
    <div className={styles.contentSection}>
      <div 
        ref={leftColumnRef}
        className={`${styles.leftColumn} fade-in-section`}
      >
        <div className={styles.messageCard}>
          <p className={styles.welcomeMessage}>
            {contactInfo.welcomeMessage}
          </p>
          <div className={styles.socialLinks}>
            {contactInfo.socialLinks.map((link, index) => (
              <a key={index} href={link.url} className={styles.socialIcon}>
                <Image 
                  width={30} 
                  height={30} 
                  alt={link.platform} 
                  src={link.icon} 
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div 
        ref={rightColumnRef}
        className={`${styles.rightColumn} fade-in-section`}
      >
        <div className={styles.contactButtons}>
          {contactInfo.buttons.map((button, index) => (
            <ContactUsButton 
              key={index}
              label={button.label}
              body={button.body}
              iconType={button.iconType}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 