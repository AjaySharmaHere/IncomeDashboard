import React from "react";
import { flexRender } from "@tanstack/react-table";

interface Props { table: any }

const TableBody: React.FC<Props> = ({ table }) => (
  <tbody>
    {table.getRowModel().rows.map((row: any) => (
      <tr key={row.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 dark:odd:bg-gray-900 dark:even:bg-gray-900">
        {row.getVisibleCells().map((cell: any) => (
          <td key={cell.id} className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200/70 dark:border-gray-700/60">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default TableBody;
