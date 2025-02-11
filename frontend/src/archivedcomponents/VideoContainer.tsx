// import React, { ReactNode } from 'react';

// interface VideoContainerProps {
//   videoSrc: string;
//   children?: ReactNode;
//   overlay?: boolean;
//   overlayOpacity?: number;
// }

// const VideoContainer: React.FC<VideoContainerProps> = ({
//   videoSrc,
//   children,
//   overlay = true,
//   overlayOpacity = 0.4
// }) => {
//   return (
//     <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
//     <video
//       autoPlay
//       loop
//       muted
//       playsInline
//       style={{
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         objectFit: 'cover',
//       }}
//     >
//       <source src="/barfilmnoir.mp4" type="video/mp4" />
//     </video>
//     <div
//       style={{
//         position: 'relative',
//         zIndex: 1,
//         color: 'white',
//         textAlign: 'center',
//         top: '50%',
//         transform: 'translateY(-50%)',
//       }}
//     >
//       <h1>Luxury Bartender</h1>
//       <p>Crafting unforgettable cocktail experiences</p>
//     </div>
//   </div>
  
//   );
// };

// export default VideoContainer;
