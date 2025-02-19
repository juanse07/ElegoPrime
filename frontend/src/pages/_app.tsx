import { SpeedInsights } from "@vercel/speed-insights/next";
import 'bootstrap/dist/css/bootstrap.min.css';

import "@/styles/globals.scss";

import NavBar from '@/components/NavBar';
import ServiceRequestModal from '@/components/ServiceRequestModal';
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";


// Correct initialization


const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Add desired font weights here
});

export default function App({ Component, pageProps }: AppProps) {
  const [showServiceModal, setShowServiceModal] = useState(false);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
  }, []);
  return (
    <>
     
      <Head>
        <title>Elego Prime</title>
        <meta name="description" content="DenverBartenders is a professional bartender service that provides bartending services for events and parties." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logoelegotab.svg" sizes="32x32" />
      </Head>
      <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}    
         />
      <SpeedInsights />
    
      <div className={` ${poppinsFont.className}`}
      style={{minHeight: '100vh', position: 'relative'}}>
        <NavBar onEstimateClick={() => setShowServiceModal(true)} />
        <ServiceRequestModal 
          show={showServiceModal}
          onHide={() => setShowServiceModal(false)}
        />
        <main >
         
           <Component {...pageProps} />
       </main>
      </div>
    </>
    
  );
}


