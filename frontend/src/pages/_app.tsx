import { SpeedInsights } from "@vercel/speed-insights/next";
import 'bootstrap/dist/css/bootstrap.min.css';

import "@/styles/globals.scss";

import NavBar from '@/components/NavBar';
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";


// Correct initialization


const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Add desired font weights here
});

export default function App({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
  }, []);
  return (
    <>
     
      <Head>
        <title>DenverBartenders </title>
        <meta name="description" content="DenverBartenders is a professional bartender service that provides bartending services for events and parties." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Icon-App32x32.ico" />
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
        <NavBar />

        <main >
         
           <Component {...pageProps} />
       </main>
      </div>
    </>
    
  );
}


