import React from "react";
import { flexRender } from "@tanstack/react-table";

interface Props {
  table: any;
}

const TableHeader: React.FC<Props> = ({ table }) => (
  <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
    {table.getHeaderGroups().map((hg: any) => (
      <tr key={hg.id}>
        {hg.headers.map((header: any) => {
          const sort = header.column.getIsSorted();

          return (
            <th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className="
                px-4 py-3 text-xs font-semibold
                text-gray-600 dark:text-gray-300
                border-b border-gray-200 dark:border-gray-700
                cursor-pointer select-none
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors
              "
            >
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </span>

                {sort === "asc" && (
                  <span className="text-gray-400 dark:text-gray-500">▲</span>
                )}
                {sort === "desc" && (
                  <span className="text-gray-400 dark:text-gray-500">▼</span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    ))}
  </thead>
);

export default TableHeader;