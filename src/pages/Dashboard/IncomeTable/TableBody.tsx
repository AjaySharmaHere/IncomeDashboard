import React from "react";
import { flexRender } from "@tanstack/react-table";

interface Props {
  table: any;
}

const TableBody: React.FC<Props> = ({ table }) => (
  <tbody
    className="
      divide-y divide-gray-200 dark:divide-gray-700
      bg-white dark:bg-gray-900
    "
  >
    {table.getRowModel().rows.map((row: any) => (
      <tr
        key={row.id}
        className="
          hover:bg-gray-50 dark:hover:bg-gray-800
          transition-colors
        "
      >
        {row.getVisibleCells().map((cell: any) => (
          <td
            key={cell.id}
            className="
              px-4 py-3 text-sm
              text-gray-700 dark:text-gray-300
              whitespace-nowrap
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
