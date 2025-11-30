import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  SortingState,
  RowSelectionState,
} from "@tanstack/react-table";
import { IncomeEntry } from "./types";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TablePagination from "./TablePagination";
import ColumnSelector from "./ColumnSelector";

const columns = [
  { accessorKey: "productName", header: "Product" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "paymentMode", header: "Payment Mode" },
  { accessorKey: "status", header: "Status" },
];

interface Props {
  entries: IncomeEntry[];
}

const IncomeTable: React.FC<Props> = ({ entries }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: entries,
    columns,
    state: { globalFilter, columnFilters, sorting, rowSelection, columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="">
      <ColumnSelector table={table} />
      <div className="overflow-hidden rounded-md border dark:border-gray-700">
        <table className="min-w-full table-auto border-collapse">
          <TableHeader table={table} />
          <TableBody table={table} />
          <TableFooter table={table} />
        </table>
      </div>
      <TablePagination table={table} />
    </div>
  );
};

export default IncomeTable;