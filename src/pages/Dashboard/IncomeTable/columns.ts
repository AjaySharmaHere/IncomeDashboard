import { ColumnDef } from "@tanstack/react-table";
import { IncomeEntry } from "./types";

export const incomeColumns: ColumnDef<IncomeEntry>[] = [
  {
    header: "Product",
    accessorKey: "productName",
    footer: (info) =>
      `Total: ${info.table.getPreFilteredRowModel().rows.length}`,
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: (info) => `$${info.getValue()}`,
    footer: (info) =>
      `$${info.table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + row.original.price, 0)}`,
  },
  { header: "Date", accessorKey: "date" },
  { header: "Payment Mode", accessorKey: "paymentMode" },
  { header: "Status", accessorKey: "status" },
];
