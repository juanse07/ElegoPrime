import styles from '@/styles/DatePicker.module.css';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
}

export default function CustomGoldDatePicker({ value, onChange, label }: DatePickerInputProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <Calendar className={styles.icon} />
        </div>
        <div className={styles.wrapper}>
          <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select event date"
            showPopperArrow={false}
            calendarStartDay={1}
            className={styles.datePicker}
            wrapperClassName={styles.wrapper}
          />
        </div>
      </div>
    </div>
  );
}