import React, { useLayoutEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  VisibilityState,
  ColumnFiltersState,
  SortingState,
  RowSelectionState,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import ColumnSelector from "./ColumnSelector";
import { IncomeEntry } from "./types";

interface Props {
  entries: IncomeEntry[];
}

const columns = [
  { accessorKey: "productName", header: "Product" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "paymentMode", header: "Payment Mode" },
  { accessorKey: "status", header: "Status" },
];

const IncomeTable: React.FC<Props> = ({ entries }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    productName: true,
    price: true,
    status: true,
    date: true,
    paymentMode: true,
  });

  useLayoutEffect(() => {
    const apply = () => {
      const small = typeof window !== "undefined" && window.innerWidth < 768;
      setColumnVisibility({
        productName: true,
        price: true,
        status: true,
        date: !small,
        paymentMode: !small,
      });
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const table = useReactTable({
    data: entries,
    columns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      rowSelection,
      columnVisibility,
    },
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
    <div
      className="
        flex flex-col overflow-hidden
        w-full
        rounded-md
      "
    >
      <div
        className="
          md:block
        "
      >
        <ColumnSelector table={table} />
      </div>

      {/* Table */}
      <div
        className="
          overflow-x-auto
          w-full
          border border-gray-300 rounded-lg
          dark:border-gray-800
        "
      >
        <table
          className="
            w-full
            border-collapse
            table-auto
          "
        >
          <TableHeader table={table} />
          <TableBody table={table} />
        </table>
      </div>

      {/* Pagination */}
      <div
        className="
          mt-3
        "
      >
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export default IncomeTable;
