import React from "react";
import { flexRender } from "@tanstack/react-table";

interface Props {
  table: any;
}

const TableBody: React.FC<Props> = ({ table }) => (
  <tbody>
    {table.getRowModel().rows.map((row: any, rowIndex: number) => (
      <tr
        key={row.id}
        className={`
      transition-all duration-200 ease-in-out
      hover:bg-gray-100/80 dark:hover:bg-[#1f2937]
      hover:shadow-sm hover:scale-[1.002] group
      ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} 
      dark:bg-gray-900
    `}
      >
        {row.getVisibleCells().map((cell: any) => (
          <td
            key={cell.id}
            className="
          px-3 py-2.5
          text-sm text-gray-700
          border-b border-gray-200/70
          transition-colors
          dark:border-gray-700/60 last:border-r-0 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white
        "
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}

  </tbody>
);

export default TableBody;
