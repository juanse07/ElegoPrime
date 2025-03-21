import { SpeedInsights } from "@vercel/speed-insights/next";
import 'bootstrap/dist/css/bootstrap.min.css';

import "@/styles/globals.scss";


import NavBar from '@/components/NavBar';
import ServiceRequestModal from '@/components/ServiceRequestModal';
import type { AppProps } from "next/app";
import { Outfit } from "next/font/google";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";


// Correct initialization

const outfitFont = Outfit({
  subsets: ["latin"],
  // Outfit supports variable font weight from 100-900
  weight: "variable",
  display: "swap", // Ensures text remains visible during font load
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"], // Fallback fonts
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
        <meta name="description" content="Elego Prime is a experienced handyman service that provides a variety of services to the Denver area home owners and businesses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logoelegotab.svg" sizes="32x32" />
        <meta property="og:image" content="https://elegoprime.com/crew1MetaDataOptimized.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elego Prime" />
        <meta name="twitter:description" content="Elego Prime is a experienced handyman service that provides a variety of services to the Denver area home owners and businesses." />
        <meta name="twitter:image" content="https://elegoprime.com/crew1MetaDataOptimized.webp" />
      </Head>
      <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}   
          showOnShallow={true}    
         />
      <SpeedInsights />
    
      <div className={outfitFont.className}>
        <NavBar onEstimateClick={() => setShowServiceModal(true)} />
        <ServiceRequestModal 
          show={showServiceModal}
          onHide={() => setShowServiceModal(false)}
        />
        <div style={{ paddingBottom: '0px' }}>
          <Component {...pageProps} />
        </div>
     
      </div>
    </>
    
  );
}


