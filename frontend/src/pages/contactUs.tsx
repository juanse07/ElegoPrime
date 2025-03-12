import ContactContent from '@/components/ContactContent';
import HeroSection from '@/components/HeroSection';
import LastSection from '@/components/LastSection';
import ServiceRequestModal from '@/components/ServiceRequestModal';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';


import styles from '../styles/contactUs.module.css';

interface ContactPageProps {
  heroContent: {
    title: string;
    subtitle: string;
  };
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
}

const Desktop: NextPage<ContactPageProps> = ({ heroContent, contactInfo }) => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const heroRef = useScrollAnimation();
  const contactRef = useScrollAnimation();
  const lastSectionRef = useScrollAnimation();

  return (
    <div className={styles.pageContainer}>
      <div ref={heroRef} className={`fade-in-section`}>
        <HeroSection 
          title={heroContent.title}
          subtitle={heroContent.subtitle}
        />
        <ContactContent 
          contactInfo={contactInfo} 
          onEstimateClick={() => setShowServiceModal(true)}
        />
      </div>
      <div >
        <LastSection />
      </div>
      <ServiceRequestModal 
        show={showServiceModal}
        onHide={() => setShowServiceModal(false)}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  try {
    const heroContent = { 
      title: "Contact Us",
      subtitle: ""
    };

    const contactInfo = {
      welcomeMessage: "We'd love to hear from you! Our dedicated team is ready to assist you",
      socialLinks: [
        {
          platform: "Facebook",
          icon: "",
          url: "#",
          label: "Follow us on Facebook"
        },
        {
          platform: "Instagram",
          icon: "",
          url: "#",
          label: "Follow us on Instagram"
        }
      ],
      buttons: [
        {
          label: "Begin Your Journey",
          body: "Get Started",
          iconType: "gauge"
        },
        {
          label: "Email",
          body: "eventAgent@DenBar.online",
          iconType: "mail"
        },
        {
          label: "Text Us",
          body: "786 123456789",
          iconType: "messageCircle"
        },
        {
          label: "Call Us",
          body: "786 123456789",
          iconType: "phone"
        }
      ]
    };

    return {
      props: {
        heroContent,
        contactInfo
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        heroContent: {
          title: "Contact Us",
          subtitle: "Elevate Your Experience"
        },
        contactInfo: {
          welcomeMessage: "",
          socialLinks: [],
          buttons: []
        }
      },
      revalidate: 86400,
    };
  }
};

export default Desktop;

