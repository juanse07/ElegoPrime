import ContactSection from '@/components/ContactSection';
import LastSection from '@/components/LastSection';

import NewServiceRequestForm from '@/components/NewServiceRequestForm';
import styles from '@/styles/facepage.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

interface Service {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  backgroundHandler?: string;
  fontColor?: string;
  buttonStyle?: 'primary' | 'outline-primary' | 'outline-secondary';
  hightLightsBackgroundColor?: string;
  HLbodyFont?: string;
  HlTitleFont?: string;
  highLightTitle1?: string;
  highLightTitle2?: string;
  highLightTitle3?: string;
  highLightBody1?: string;
  highLightBody2?: string;
  highLightBody3?: string;
  highLightBody4?: string;
  buttonText?: string;
  onClick?: () => void;
  onClickNavPath?: string;
  
}

interface HomeProps {
  services: Service[];
  heroContent: Array<{
    type: string;
    src: string;
    heading: string;
    subheading: string;
  }>;
}


export default function Home({ 
  services = [], 
  heroContent: desktopContent = []
}: HomeProps) {
  // const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const mobileContent = [
    {
      type: 'image',
      src: '/carrousel1.webp',
      heading: 'Premium Service',
      subheading: 'Professional Bartenders'
    },
    {
      type: 'image',
      src: '/carousel2.webp',
      heading: 'Special Events',
      subheading: 'Memorable Experiences'
    },
    {
      type: 'image',
      src: '/carousel3.webp',
      heading: 'Special Events',
      subheading: 'Memorable Experiences'
    },
    {
      type: 'image',
      src: '/carousel4.webp',
      heading: 'Special Events',
      subheading: 'Memorable Experiences'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1090);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroContent = isMobile ? mobileContent : desktopContent;

  const contactButtons = [
    {
      body: "Get an estimate",
      iconType: "gauge" as const,
      label: ""
    },
    {
      body: "booking@denbar.online",
      iconType: "mail" as const,
      label: ""
    },
    {
      body: "7201234567",
      iconType: "phone" as const,
      label: "phone"
    },
    {
      body: "7201234567",
      iconType: "messageCircle" as const,
      label: "text"
    }
  ];

  if (!services || !heroContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Carousel interval={5000} className={styles.carousel}>
        {heroContent.map((content, index) => (
          <Carousel.Item key={index} className={styles.carouselItem}>
            <div className={styles.imageWrapper}>
              <Image
                src={content.src}
                alt={content.heading}
                width={isMobile ? 750 : 1920}
                height={isMobile ? 600 : 1080}
                quality={90}
                priority={index === 0}
                className={styles.carouselImage}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
            {/* <Carousel.Caption className={styles.carouselCaption}>
              <div className={styles.captionOverlay}>
                <h1>{content.heading}</h1>
                <p>{content.subheading}</p>
                <button
                  className={styles.carouselButton}
                  onMouseOver={(e) => {
                    e.currentTarget.classList.add(styles.carouselButtonHover);
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.classList.remove(styles.carouselButtonHover);
                  }}
                  onClick={() => router.push('/estimate')}
                >
                  Start here
                </button>
              </div>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>

      <div className={styles.mainContent}>
        <div className={styles.contentIllustration}>
          <h1 className={styles.mainTitle}>UNFORGETTABLE <span><br></br>experience</span></h1>
            <div className={styles.ilusindexcontent}>
              <Image src="/Ilustracion.webp" alt="Imagen de storyset en Freepik" width={400} height={400}
              className={styles.ilusindeximage}/>
            </div>
              <p className={styles.mainDescription}>
                A wide range of personalized services is offered, tailored to meet your specific needs. Our work is of exceptional quality,
                ensuring that your home becomes a cozy and well-maintained space. Whether you need regular maintenance or specific repairs,
                we have the experience and resources to get the job done right. Contact us today and experience the difference with our trusted services.
            </p>
        </div>
      </div>
      
      <div className={styles.mainsubContent}>
        <p className={styles.subText}>
        A comprehensive selection of services is available, designed to fit your unique requirements.
        Our commitment to high-quality craftsmanship guarantees that your home will remain inviting and in top condition.
        Whether it&apos;s routine upkeep or specialized repairs, we have the knowledge and tools to handle any task with precision.
        Reach out today and discover how our reliable services can make a positive impact on your home.
        </p>
      </div>

      <div className={styles.aboutContent}>
        <p className={styles.aboutText}>
        We are a dynamic team dedicated to providing practical solutions that allow families to reclaim their time for other activities,
        while we take care of maintaining clean and harmonious spaces that meet their expectations.
        At Elego Prime LLC, we firmly believe that family, work, and recreational spaces should be clean, peaceful,
        and enjoyable for everyone to truly make the most of them. We understand that many people in Colorado strive to maintain these conditions,
        but busy schedules often make it difficult to accomplish all the tasks, and sometimes an extra helping hand is needed.
        </p>
      </div>

      <NewServiceRequestForm />

      {/* {services.map((service, index) => (
        <ServiceSection
          key={index}
          category={service.category}
          title={service.title}
          description={service.description}
          imageUrl={service.imageUrl}
          imagePosition={service.imagePosition}
          backgroundHandler={service.backgroundHandler}
          fontColor={service.fontColor}
          buttonStyle={service.buttonStyle}
          hightLightsBackgroundColor={service.hightLightsBackgroundColor}
          HLbodyFont={service.HLbodyFont}
          HlTitleFont={service.HlTitleFont}
          highLightBody1={service.highLightBody1}
          highLightBody2={service.highLightBody2}
          highLightBody3={service.highLightBody3}
          highLightTitle1={service.highLightTitle1}
          highLightTitle2={service.highLightTitle2}
          highLightTitle3={service.highLightTitle3}
          buttonText={service.buttonText}
          onClickNavPath={service.onClickNavPath}
        />
      ))} */}
      <ContactSection contactButtons={contactButtons} />
      <LastSection />

    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const desktopContent = [
    
      {
        type: 'image',
        src: '/carrousel1.webp',
        heading: 'Premium Service',
      },
      {
        type: 'image',
        src: '/carousel2.webp',
        heading: 'Special Events',
      },
      {
        type: 'image',
        src: '/carousel3.webp',
        heading: 'Special Events',
      },
      {
        type: 'image',
        src: '/carousel4.webp',
        heading: 'Special Events',
      }
    ];
  

    // const services: Service[] = [
    //   {
    //     category: "BARTENDING SERVICES",
    //     title: "Craft Cocktails, Unforgettable Moments!",
    //     description: "Elevating events with premium mobile bartending across the metro area.",
    //     imageUrl: "/coparoja.webp",
    //     imagePosition: "left",
    //     backgroundHandler: "#000000",
    //     buttonStyle: "outline-secondary",
    //     buttonText: "see our menu",
    //     fontColor: "#f9f9f9",
    //     hightLightsBackgroundColor: "linear-gradient(135deg,rgb(0, 0, 0),rgb(41, 41, 43))",
    //     HlTitleFont: "#B8860B",
    //     HLbodyFont: "#F7F7FF",
    //     highLightTitle1: 'Signature Cocktails:',
    //     highLightTitle2: "Private Events:",
    //     highLightTitle3: 'Corporate Functions:',
    //     highLightBody1: 'Experience our curated selection of handcrafted cocktails, tailored to your taste and event theme.',
    //     highLightBody2: 'Transform your special occasions with our professional bartending service and custom drink menus.',
    //     highLightBody3: "Impress your clients and team with sophisticated cocktail service and professional presentation.",
    //     onClickNavPath: '/',
    //   },
    //   {
    //     category: "Premium Bartenders",
    //     title: "Reliable. Professional. Exceptional.",
    //     description: "Experienced mixologists at your service, ready to elevate your event today.",
    //     imageUrl: "/boda.webp",
    //     imagePosition: "right",
    //     backgroundHandler: "#D6CFC7",
    //     buttonStyle: "primary",
    //     buttonText: "Request an Estimate",
    //     fontColor: "#4E3629",
    //     hightLightsBackgroundColor: "linear-gradient(135deg,rgb(161, 162, 167), #f4f4f4)",
    //     HlTitleFont: "#B8860B",
    //     HLbodyFont: "#1d1d1d",
    //     highLightTitle1: "Elite Bartenders",
    //     highLightTitle2: "Custom Bar Service",
    //     highLightTitle3: "Event Support",
    //     highLightBody1: "Need exceptional service? Our bartenders will craft perfect cocktails every time.",
    //     highLightBody2: "Custom drink menus, signature cocktails, and more! We'll design it for you.",
    //     highLightBody3: "We'll handle your entire bar service so you can enjoy your event worry-free.",
    //     onClickNavPath: '/estimate',
    //   },
    //   {
    //     category: "MOBILE BARS",
    //     title: "Premium Bars, Unforgettable Experiences!",
    //     description: "Transforming events with stunning mobile bar setups across the metro area.",
    //     imageUrl: "/pouring1.webp",
    //     imagePosition: "left",
    //     backgroundHandler: "#000000",
    //     buttonStyle: "outline-secondary",
    //     buttonText: "Learn More",
    //     fontColor: "#f9f9f9",
    //     hightLightsBackgroundColor: "linear-gradient(135deg,rgb(0, 0, 0),rgb(41, 41, 43))",
    //     HlTitleFont: "#B8860B",
    //     HLbodyFont: "#F7F7FF",
    //     highLightTitle1: 'Classic LED Bar:',
    //     highLightTitle2: "Rustic Wood Bar:",
    //     highLightTitle3: 'Premium Mirror Bar:',
    //     highLightBody1: 'Sleek and modern LED-illuminated bar, perfect for upscale events and nighttime celebrations.',
    //     highLightBody2: 'Handcrafted wooden bar with rustic charm, ideal for weddings and outdoor gatherings.',
    //     highLightBody3: "Mirror-finished luxury bar that adds glamour and sophistication to any high-end event.",
    //     onClickNavPath: '/',
    //   },
    //   {
    //     category: "Moving",
    //     title: "Making Your Move Smooth and Simple",
    //     description: "From packing to unloading, trust us to care for your belongings..",
    //     imageUrl: "/pouring2.webp",
    //     imagePosition: "right",
    //     hightLightsBackgroundColor: "linear-gradient(135deg,rgb(161, 162, 167), #f4f4f4)",
    //     HlTitleFont: "#B8860B",
    //     HLbodyFont: "#1d1d1d",
    //     highLightTitle1: "Loading and Unloading",
    //     highLightTitle2: "Packing Services",
    //     highLightTitle3: "Furniture Disassembly",
    //     backgroundHandler: "#D6CFC7",
    //     fontColor: "#4E3629",
    //     buttonText: "Request an Estimate",
    //     highLightBody1: "We'll load and unload your belongings with care and precision.",
    //     highLightBody2: "We'll pack your belongings safely and securely for your move.",
    //     highLightBody3: "We'll disassemble your furniture so it's ready for moving day.",
    //     onClickNavPath: '/estimate',
    //   },
    // ];

    return {
      props: {
        // services,
        heroContent:desktopContent,
      },
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        services: [],
        heroContent: [],
      },
      revalidate: 86400,
    };
  }
};