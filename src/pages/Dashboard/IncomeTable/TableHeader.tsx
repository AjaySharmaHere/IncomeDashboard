import React from "react";
import { flexRender } from "@tanstack/react-table";

interface Props { table: any }

const TableHeader: React.FC<Props> = ({ table }) => (
  <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
    {table.getHeaderGroups().map((hg: any) => (
      <tr key={hg.id}>
        {hg.headers.map((header: any) => (
          <th
            key={header.id}
            onClick={header.column.getToggleSortingHandler()}
            className="px-3 py-2 text-xs font-semibold border-b border-gray-300 cursor-pointer dark:border-gray-700 dark:text-gray-300"
          >
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </span>
              {{
                asc: "▲",
                desc: "▼",
              }[header.column.getIsSorted() as string] ?? null}
            </div>
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default TableHeader;

