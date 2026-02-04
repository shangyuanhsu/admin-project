import React from 'react';
import { clsx } from 'clsx';
import './Tabs.css';

export interface TabOption {
  label: string;
  value: string | number;
}

export interface TabsProps {
  options: TabOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  /**
   * Optional custom class for the select element container
   */
  mobileClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  options,
  value,
  onChange,
  className,
  mobileClassName,
}) => {
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVal = e.target.value;
    const originalOption = options.find(opt => String(opt.value) === selectedVal);
    
    if (originalOption) {
      onChange(originalOption.value);
    }
  };

  const listRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const [showRightFade, setShowRightFade] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      // Show fade if content is overflowing AND we are not at the very end
      const hasOverflow = scrollWidth > clientWidth;
      // Use 1px buffer for calculation precision
      const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1;
      
      setShowRightFade(hasOverflow && !isAtEnd);
    }
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, options]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!listRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - listRef.current.offsetLeft);
    setScrollLeft(listRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !listRef.current) return;
    e.preventDefault();
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast factor
    listRef.current.scrollLeft = scrollLeft - walk;
    // Check scroll during drag
    checkScroll();
  };

  React.useEffect(() => {
    const el = listRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        // Prevent vertical page scroll and scroll horizontally instead
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        checkScroll();
      };
      
      // Use logical OR to fallback for testing environments, though standard browsers support 'passive' option
      el.addEventListener('wheel', onWheel, { passive: false });
      
      return () => {
        el.removeEventListener('wheel', onWheel);
      };
    }
  }, [checkScroll]);

  return (
    <div className={clsx("tabs-container", className)}>
      {/* Mobile View: Select Dropdown */}
      <div className={clsx("tabs-mobile-select-wrapper", mobileClassName)}>
         <select
            value={String(value)}
            onChange={handleSelectChange}
            className="tabs-select"
            aria-label="Select tab"
         >
            {options.map((option) => (
               <option key={String(option.value)} value={String(option.value)}>
                 {option.label}
               </option>
            ))}
         </select>
         <div className="tabs-select-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
         </div>
      </div>

      {/* Desktop/Tablet View: Scrollable List (Drag to Scroll) */}
      <div 
        className={clsx("tabs-desktop-list", { "is-dragging": isDragging, "fade-mask": showRightFade })} 
        role="tablist"
        ref={listRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={checkScroll}
      >
        {options.map((option) => (
          <button
            key={String(option.value)}
            role="tab"
            aria-selected={value === option.value}
            className={clsx("tab-button", { active: value === option.value })}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
