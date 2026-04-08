import React from 'react';
import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
}

const DataTable = <T extends { id: string | number }>({ 
  data, 
  columns, 
  onRowClick,
  className 
}: DataTableProps<T>) => {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-slate-100", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {columns.map((column, index) => (
              <th 
                key={index} 
                className={cn(
                  "px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((item) => (
            <tr 
              key={item.id}
              onClick={() => onRowClick && onRowClick(item)}
              className={cn(
                "hover:bg-slate-50 transition-colors group",
                onRowClick && "cursor-pointer"
              )}
            >
              {columns.map((column, index) => (
                <td 
                  key={index} 
                  className={cn(
                    "px-4 py-4 text-sm text-slate-600",
                    column.className
                  )}
                >
                  {typeof column.accessor === 'function' 
                    ? column.accessor(item) 
                    : (item[column.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400 italic">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
