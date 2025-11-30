import React from "react";
import { flexRender } from "@tanstack/react-table";

interface Props {
  table: any;
}

const TableFooter: React.FC<Props> = ({ table }) => (
  <tfoot className="bg-gray-50 dark:bg-gray-900">
    {table.getFooterGroups().map((footerGroup: any) => (
      <tr key={footerGroup.id}>
        {footerGroup.headers.map((header: any) => (
          <td
            key={header.id}
            className="
            border-gray-300 dark:border-gray-700
            last:border-r-0
            text-sm
            text-gray-700 dark:text-gray-300
            bg-gray-50 dark:bg-gray-900
            font-medium
          "
          >
            {flexRender(header.column.columnDef.footer, header.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tfoot>
);

export default TableFooter;
