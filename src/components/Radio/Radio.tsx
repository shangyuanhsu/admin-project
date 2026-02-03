import React from 'react';
import styles from './Radio.module.css';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, disabled, ...props }, ref) => {
    return (
      <label className={`${styles.container} ${disabled ? styles.disabled : ''} ${className || ''}`}>
        <input
          type="radio"
          className={styles.input}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <div className={styles.checkmark}>
          <div className={styles.dot} />
        </div>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
