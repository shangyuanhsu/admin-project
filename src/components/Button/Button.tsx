import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button.
   * - `primary`: Solid background color (default).
   * - `secondary`: Transparent background with border.
   */
  variant?: 'primary' | 'secondary';
  
  /**
   * The size of the button.
   * - `medium`: Standard size (default).
   * - `small`: Compact size.
   * - `full`: Full width of the container.
   */
  size?: 'full' | 'medium' | 'small';
}

/**
 * A reusable Button component that supports different variants and sizes.
 * It extends standard HTMLButtonElement attributes, so all native props (onClick, disabled, type, etc.) are supported.
 *
 * @example
 * // Default primary button
 * <Button>Submit</Button>
 *
 * @example
 * // Full width secondary button with click handler
 * <Button 
 *   variant="secondary" 
 *   size="full" 
 *   onClick={() => console.log('clicked')}
 * >
 *   Cancel
 * </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'medium', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          ${styles.button} 
          ${styles[size]} 
          ${styles[variant]} 
          ${className || ''}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
