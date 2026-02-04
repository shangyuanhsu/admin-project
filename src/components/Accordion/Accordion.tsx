import React, { useState } from 'react';
import { clsx } from 'clsx';
import './Accordion.css';

export interface AccordionItemProps {
  id: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  /**
   * If true, multiple items can be open at once.
   * If false, opening one item closes others.
   * Default: false
   */
  allowMultiple?: boolean;
  /**
   * Default open item ID(s). 
   * Provide a single ID for single mode, or array of IDs for multiple mode.
   */
  defaultExpanded?: string | number | (string | number)[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
}) => {
  // Normalize default state to a Set for easier lookup
  const [expandedIds, setExpandedIds] = useState<Set<string | number>>(() => {
    if (Array.isArray(defaultExpanded)) {
      return new Set(defaultExpanded);
    }
    return new Set(defaultExpanded ? [defaultExpanded] : []);
  });

  const toggleItem = (id: string | number) => {
    setExpandedIds((prev) => {
      const newSet = new Set(allowMultiple ? prev : []);
      
      if (prev.has(id)) {
        if (allowMultiple) {
          newSet.delete(id);
        } else {
          // If single mode and clicking active, simple toggle off (clear all)
           newSet.clear();
        }
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      
      return newSet;
    });
  };

  return (
    <div className={clsx("accordion-container", className)}>
      {items.map((item) => {
        const isActive = expandedIds.has(item.id);
        
        return (
          <div 
            key={item.id} 
            className={clsx("accordion-item", { active: isActive })}
          >
            <button
              className="accordion-header"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isActive}
              type="button"
            >
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-icon">
                {/* Chevron Down Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </span>
            </button>
            <div 
              className="accordion-content-wrapper"
              aria-hidden={!isActive}
            >
              <div className="accordion-content">
                <div className="accordion-inner">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
