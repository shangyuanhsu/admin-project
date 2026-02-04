import React from 'react';
import { clsx } from 'clsx';
import './Table.css';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string | number;
  /**
   * Optional custom render function for cell content
   */
  render?: (value: T[keyof T] | any, record: T) => React.ReactNode;
}

export interface TableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  className?: string;
  /**
   * Key to use as unique row identifier. Defaults to 'id' if present, otherwise index.
   */
  rowKey?: keyof T | ((record: T) => string | number);
}

export const Table = <T extends object>({
  title,
  columns,
  data,
  className,
  rowKey,
}: TableProps<T>) => {
  
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    if (rowKey && record[rowKey] !== undefined) {
      return record[rowKey] as unknown as string | number;
    }
    // Fallback to 'id' property if it exists
    if ('id' in record) {
      return (record as any).id;
    }
    return index;
  };

  return (
    <div className={clsx("table-wrapper", className)}>
      {title && (
        <div className="table-title-section">
          <h3 className="table-title">{title}</h3>
        </div>
      )}
      
      <div className="table-responsive-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={col.key ? String(col.key) : index}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((record, rowIndex) => (
                <tr key={getRowKey(record, rowIndex)}>
                  {columns.map((col, colIndex) => {
                    const value = (record as any)[col.key];
                    return (
                      <td key={colIndex}>
                        {col.render 
                          ? col.render(value, record) 
                          : (value as React.ReactNode)}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="table-empty-state">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
