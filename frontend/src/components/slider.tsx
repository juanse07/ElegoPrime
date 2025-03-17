import React from "react";
import styles from "../styles/slider.module.css";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';


const InfiniteSlider: React.FC = () => {

    const SliderContent = useScrollAnimation();

    const images = [
        "IMG_2977.webp", "IMG_3045.webp", "IMG_32831.webp", "IMG_3345.webp",
        "IMG_3691.webp", "IMG_0021.webp", "IMG_0894.webp", "IMG_4847.webp",
        "IMG20220126131506.webp"
     ];
     
     return (
        <div ref={SliderContent} className={`${styles.slider} fade-in-section`}>
           <div className={styles.slideTrack}>
           {[...images, ...images].map((src, index) => (
    <div className={styles.slide} key={index}>
        <img src={src} alt={`slide-${index % images.length + 1}`} aria-hidden={index >= images.length} />
    </div>
))}
           </div>
        </div>
     );
     
  };
  
  export default InfiniteSlider;