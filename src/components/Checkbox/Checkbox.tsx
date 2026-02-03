import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, disabled, ...props }, ref) => {
    return (
      <label className={`${styles.container} ${disabled ? styles.disabled : ''} ${className || ''}`}>
        <input
          type="checkbox"
          className={styles.input}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div className={styles.checkmark}>
          <svg 
            className={styles.icon} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
