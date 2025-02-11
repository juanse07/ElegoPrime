// import styles from '@/styles/numberInput.module.css';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import React from 'react';

// interface CustomNumberInputProps {
//   value: number;
//   onChange: (value: number) => void;
//   min?: number;
//   max?: number;
//   label?: string;
//   className?: string;
// }

// const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
//   value,
//   onChange,
//   min = 1,
//   max = 1000,
//   label
// }) => {
//   const handleIncrement = () => {
//     if (value < max) {
//       onChange(value + 1);
//     }
//   };

//   const handleDecrement = () => {
//     if (value > min) {
//       onChange(value - 1);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = parseInt(e.target.value);
//     if (!isNaN(newValue) && newValue >= min && newValue <= max) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <div>
//       {label && (
//         <label className={styles.label}>
//           {label}
//         </label>
//       )}
//       <div className={styles.numberInputWrapper}>
//         <input
//           type="number"
//           value={value}
//           onChange={handleInputChange}
//           min={min}
//           max={max}
//           className={styles.numberInput}
//         />
//         {/* <button
//           type="button"
//           className={`${styles.spinButton} ${styles.spinUp}`}
//           onClick={handleIncrement}
//           aria-label="Increase number"
//         >
//           <ChevronUp className={styles.icon} />
//         </button>
//         <button
//           type="button"
//           className={`${styles.spinButton} ${styles.spinDown}`}
//           onClick={handleDecrement}
//           aria-label="Decrease number"
//         >
//           <ChevronDown className={styles.icon} />
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default CustomNumberInput;