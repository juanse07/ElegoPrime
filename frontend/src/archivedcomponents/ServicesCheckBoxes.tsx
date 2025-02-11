
import styles from "@/styles/ServiceSelector.module.css";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ServiceSelectorProps {
  name: string;
  options: string[];
  multiple?: boolean;
  label?: string;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  name,
  options,
  multiple = false,
  label
}) => {
  const { control } = useFormContext();

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={multiple ? [] : ""}
        render={({ field }) =>
          multiple ? (
            <div className={styles.checkboxContainer}>
              {options.map((option) => (
                <label key={option} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    value={option}
                    checked={field.value.includes(option)}
                    onChange={(e) => {
                      const selected = e.target.value;
                      field.onChange(
                        e.target.checked
                          ? [...field.value, selected]
                          : field.value.filter((val: string) => val !== selected)
                      );
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <select
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className={styles.select}
            >
              <option value="">Select a service</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )
        }
      />
    </div>
  );
};

export default ServiceSelector;