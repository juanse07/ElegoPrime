import ContactContent from '@/components/ContactContent';
import HeroSection from '@/components/HeroSection';
import type { NextPage } from 'next';
import styles from '../styles/contactUs.module.css';

interface ContactPageProps {
  heroContent: {
    image: string;
    title: string;
    subtitle: string;
  };
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

const Desktop: NextPage<ContactPageProps> = ({ heroContent, contactInfo }) => {
  return (
    <div className={styles.pageContainer}>
      <HeroSection 
        image={heroContent.image}
        title={heroContent.title}
        subtitle={heroContent.subtitle}
      />
      <ContactContent contactInfo={contactInfo} />
    </div>
  );
};

export const getStaticProps = async () => {
  try {
    const heroContent = {
      image: "/23779.webp",
      title: "Contact Us",
      subtitle: "Elevate Your Experience"
    };

    const contactInfo = {
      welcomeMessage: "We'd love to hear from you! Our dedicated team is ready to assist you",
      socialLinks: [
        {
          platform: "Facebook",
          icon: "/facebook_svgrepo.com.svg",
          url: "#"
        },
        {
          platform: "Instagram",
          icon: "/instagram_svgrepo.com.svg",
          url: "#"
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
          image: "/23779.webp",
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

