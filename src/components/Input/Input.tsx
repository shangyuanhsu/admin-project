import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The label text displayed above the input field.
   */
  title?: string;
  
  /**
   * If true, applies error styling to the input container (red border, etc.).
   */
  isError?: boolean;
  
  /**
   * The error message to display below the input field when in error state.
   * Only visible if `isError` is true.
   */
  errorMessage?: string;
}

/**
 * A reusable Input component with a label and error handling.
 * It extends standard HTMLInputElement attributes, so all native props (value, onChange, placeholder, type, etc.) are supported.
 *
 * @example
 * // Basic usage with title and placeholder
 * <Input 
 *   title="Username" 
 *   placeholder="Enter username" 
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 *
 * @example
 * // Error state usage
 * <Input 
 *   title="Email" 
 *   type="email"
 *   value={email}
 *   isError={!isValid}
 *   errorMessage="Please enter a valid email address"
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ title, type = 'text', isError = false, errorMessage, className, ...props }, ref) => {
    return (
      <div className={`${styles.container} ${isError ? styles.error : ''} ${className || ''}`}>
        {title && <label className={styles.label}>{title}</label>}
        
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            type={type}
            className={styles.input}
            aria-invalid={isError}
            {...props}
          />
        </div>

        {isError && errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
