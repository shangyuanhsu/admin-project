import React, { useState, useEffect, useRef } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * The label text displayed above the select field.
   */
  title?: string;
  
  /**
   * Array of options to display in the dropdown.
   */
  options: SelectOption[];

  /**
   * If true, applies error styling to the select container.
   */
  isError?: boolean;
  
  /**
   * The error message to display below the field when in error state.
   */
  errorMessage?: string;

  /**
   * Placeholder text to display when no option is selected.
   */
  placeholder?: string;

  /**
   * If true, enables text search filtering within the options.
   * Transforms the native select into a custom searchable combobox.
   */
  searchable?: boolean;
}

/**
 * A reusable Select component with a label, custom arrow, and error handling.
 * Supports standard native select or a searchable combobox mode via the `searchable` prop.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ title, options, isError = false, errorMessage, className, searchable = false, ...props }, ref) => {
    // --- Searchable Logic State ---
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initialize search term based on current value prop
    useEffect(() => {
      if (searchable && props.value) {
        const selectedOption = options.find(opt => String(opt.value) === String(props.value));
        if (selectedOption) {
          setSearchTerm(selectedOption.label);
        }
      }
    }, [props.value, searchable, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
      if (!searchable) return;
      const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          // Revert search term to currently selected value's label if blurred
          if (props.value) {
            const selected = options.find(opt => String(opt.value) === String(props.value));
            if (selected) setSearchTerm(selected.label);
            else setSearchTerm('');
          } else {
            setSearchTerm('');
          }
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchable, props.value, options]);

    // Handle Option Click (Searchable Mode)
    const handleOptionClick = (option: SelectOption) => {
      setSearchTerm(option.label);
      setIsOpen(false);
      
      // Create synthetic event to trigger parent onChange
      if (props.onChange) {
        const syntheticEvent = {
          target: { value: option.value, name: props.name },
          currentTarget: { value: option.value, name: props.name },
        } as React.ChangeEvent<HTMLSelectElement>;
        props.onChange(syntheticEvent);
      }
    };

    const filteredOptions = options.filter(opt => 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div 
        className={`${styles.container} ${isError ? styles.error : ''} ${className || ''}`}
        ref={wrapperRef}
      >
        {title && <label className={styles.label}>{title}</label>}
        
        <div className={styles.selectWrapper}>
          {searchable ? (
            <>
              {/* Hidden Native Select to hold value and Ref for libraries */}
              <select
                ref={ref}
                {...props}
                style={{ display: 'none' }}
                aria-hidden="true"
                tabIndex={-1}
              >
                 <option value="" disabled>{props.placeholder}</option>
                 {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                 ))}
              </select>

              {/* Custom Search Input */}
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder={props.placeholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => {
                  setIsOpen(true);
                  // Optionally select text on focus
                  // e.target.select(); 
                }}
                disabled={props.disabled}
              />

              {/* Dropdown Menu */}
              {isOpen && !props.disabled && (
                <div className={styles.dropdownMenu}>
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                      <div
                        key={opt.value}
                        className={`${styles.dropdownItem} ${String(props.value) === String(opt.value) ? styles.selected : ''}`}
                        onClick={() => handleOptionClick(opt)}
                      >
                        {opt.label}
                      </div>
                    ))
                  ) : (
                    <div className={styles.noOptions}>No options found</div>
                  )}
                </div>
              )}
            </>
          ) : (
            // Native Select Implementation
            <select
              ref={ref}
              className={styles.select}
              aria-invalid={isError}
              {...props}
            >
              {props.placeholder && (
                <option value="" disabled hidden>
                  {props.placeholder}
                </option>
              )}
              
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {/* Custom Arrow Icon (Always visible) */}
          <svg 
            className={styles.arrowIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {isError && errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
