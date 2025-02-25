import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from '@/styles/facepage.module.css';
import { memo } from 'react';
import ContactUsButton from './contactButton';

interface ContactSectionProps {
  contactButtons: Array<{
    body: string;
    iconType: 'gauge' | 'mail' | 'phone' | 'messageCircle';
    label?: string;
  }>;
  onEstimateClick?: () => void;
}

const ContactSection = memo(function ContactSection({ contactButtons, onEstimateClick }: ContactSectionProps) {
  const animationRef = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '50px 0px',
    once: false
  });

  return (
    <div 
      ref={animationRef}
      className={`${styles.contactUsHome} fade-in-section`}
    >
      {contactButtons.map((button, index) => (
        <ContactUsButton
          key={index}
          body={button.body}
          iconType={button.iconType}
          label={button.label || ''}
          onEstimateClick={button.iconType === 'gauge' ? onEstimateClick : undefined}
        />
      ))}
    </div>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection; 