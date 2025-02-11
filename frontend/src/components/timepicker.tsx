import { useState } from 'react';
import styles from './../styles/TimePicker.module.css';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export default function TimePicker({ value, onChange }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const handleTimeSelect = () => {
    const formattedTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    onChange(formattedTime);
    setIsOpen(false);
  };

  return (
    <div className={styles.timePickerContainer}>
      <button 
        className={styles.timeButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || 'Select Time'}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.hoursGrid}>
            {hours.map((hour) => (
              <button
                key={hour}
                className={`${styles.timeOption} ${selectedHour === hour ? styles.selected : ''}`}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </button>
            ))}
          </div>

          <div className={styles.minutesContainer}>
            <button
              className={`${styles.timeOption} ${selectedMinute === '00' ? styles.selected : ''}`}
              onClick={() => setSelectedMinute('00')}
            >
              00
            </button>
            <button
              className={`${styles.timeOption} ${selectedMinute === '30' ? styles.selected : ''}`}
              onClick={() => setSelectedMinute('30')}
            >
              30
            </button>
          </div>

          <div className={styles.periodContainer}>
            <button
              className={`${styles.timeOption} ${selectedPeriod === 'AM' ? styles.selected : ''}`}
              onClick={() => setSelectedPeriod('AM')}
            >
              AM
            </button>
            <button
              className={`${styles.timeOption} ${selectedPeriod === 'PM' ? styles.selected : ''}`}
              onClick={() => setSelectedPeriod('PM')}
            >
              PM
            </button>
          </div>

          <button className={styles.confirmButton} onClick={handleTimeSelect}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}