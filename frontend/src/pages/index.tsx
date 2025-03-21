import ContactSection from '@/components/ContactSection';
import HandyServiceSection from '@/components/HandyServiceSection';
import LastSection from '@/components/LastSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';


import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import ServiceRequestModal from '@/components/ServiceRequestModal';
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

  const mainContentRef = useScrollAnimation();
  const mainSubContentRef = useScrollAnimation();
  const handyServiceRef = useScrollAnimation();

  // const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const mobileContent = [
    {
      type: 'image',
      src: '/crew1.webp',
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
                loading={index === 0 ? 'eager' : 'lazy'}
                // priority={index === 0}
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
      <div ref={handyServiceRef} className={`fade-in-section`}>
        <HandyServiceSection />
      </div>

      <div ref={mainContentRef} className={`${styles.mainContent} ${`fade-in-section`}`}>
        <div className={styles.contentIllustration}>
          <h1 className={styles.mainTitle}>Who We Are? <span><br></br>Elego Prime LLC</span></h1>
            <div className={styles.ilusindexcontent}>
              <Image 
                src="/crew2.webp" 
                alt="Elego Prime Team" 
                width={400} 
                height={600}
                className={styles.ilusindeximage}
                priority={true}
                quality={90}
              />
            </div>
              <p className={styles.mainDescription}>
              We are a dynamic team dedicated to providing practical solutions that allow families to reclaim their time for other activities,
        while we take care of maintaining clean and harmonious spaces that meet their expectations.
        At Elego Prime LLC, we firmly believe that family, work, and recreational spaces should be clean, peaceful,
        and enjoyable for everyone to truly make the most of them. We understand that many people in Colorado strive to maintain these conditions,
        but busy schedules often make it difficult to accomplish all the tasks, and sometimes an extra helping hand is needed.
              
            </p>
        </div>
      </div>
      
      <div ref={mainSubContentRef} className={`${styles.mainsubContent} ${`fade-in-section`}`}>
        <div className={styles.listContainer}>
          <h4 className={styles.subTitle}>Why Choose Us</h4>
            <ul className={styles.subText}>
              <div className={styles.listRow}></div>
              <li className={styles.borderCustom}>
                <FontAwesomeIcon icon={faStar} className={styles.iconCustom}/>
                Commitment to excellence and attention to detail.
              </li >
              <li className={styles.borderCustom}>
                <FontAwesomeIcon icon={faStar} className={styles.iconCustom}/>
                Reliable and customized solutions for every need.
              </li>
              <li className={styles.borderCustom}>
                <FontAwesomeIcon icon={faStar} className={styles.iconCustom}/>
                Experienced professionals in maintenance and repairs.
              </li>
              <li >
                <FontAwesomeIcon icon={faStar} className={styles.iconCustom}/>
                Efficient and professional service tailored to your requirements.
              </li>
            </ul>
        </div>

        <div className={styles.listContainer}> 
          <h4 className={styles.subTitle}>Benefits of Choosing Us</h4>
              <ul className={styles.subText}>
                <li className={styles.borderCustom}>
                  <FontAwesomeIcon icon={faStar} className={styles.iconCustom}/>
                  High-quality craftsmanship for long-lasting results.
                </li>
                <li className={styles.borderCustom}>
                  <FontAwesomeIcon icon={faStar} className={styles.iconCustom}/>
                  Expertise in both routine maintenance and specialized repairs.
                </li>
                <li className={styles.borderCustom}>
                  <FontAwesomeIcon icon={faStar} className={styles.iconCustom}/>
                  Equipped with the right tools to handle any task with precision.
                </li>

                 <li>
                  <FontAwesomeIcon icon={faStar} className={styles.iconCustom}/>
                  Focused on customer satisfaction for a stress-free experience
                </li>
            </ul>
        </div>
      </div>

      {/* <div className={styles.aboutContent}>
        <p className={styles.aboutText}>
        We are a dynamic team dedicated to providing practical solutions that allow families to reclaim their time for other activities,
        while we take care of maintaining clean and harmonious spaces that meet their expectations.
        At Elego Prime LLC, we firmly believe that family, work, and recreational spaces should be clean, peaceful,
        and enjoyable for everyone to truly make the most of them. We understand that many people in Colorado strive to maintain these conditions,
        but busy schedules often make it difficult to accomplish all the tasks, and sometimes an extra helping hand is needed.
        </p>
      </div> */}

     

      {/*<NewServiceRequestForm />*
      /* {services.map((service, index) => (
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
      <ContactSection contactButtons={contactButtons} onEstimateClick={() => setShowServiceModal(true)} />
      <LastSection />

      <ServiceRequestModal 
        show={showServiceModal}
        onHide={() => setShowServiceModal(false)}
      />

    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const desktopContent = [
    
      {
        type: 'image',
        src: '/crew1.webp',
        heading: 'Premium Service',
      },
      {
        type: 'image',
        src: '/carrousel1.webp',
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