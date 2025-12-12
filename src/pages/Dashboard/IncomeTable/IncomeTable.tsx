import React, { useLayoutEffect, useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
  ColumnFiltersState,
  SortingState,
  RowSelectionState,
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
  { accessorKey: "price", header: "Amount" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "paymentMode", header: "Payment" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "resourceLink",
    header: "Resource",
    cell: ({ getValue }: any) => {
      const link = getValue();
      if (!link)
        return <span className="text-gray-400 dark:text-gray-500">—</span>;

      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-indigo-600 dark:text-indigo-400
            hover:underline font-medium
          "
        >
          Open
        </a>
      );
    },
  },
];

const IncomeTable: React.FC<Props> = ({ entries }) => {
  const sortedEntries = useMemo(() => {
    if (!entries?.length) return entries;

    return [...entries].sort((a: any, b: any) => {
      const aTs =
        typeof a.createdAt?.toDate === "function"
          ? a.createdAt.toDate().getTime()
          : new Date(a.createdAt).getTime();

      const bTs =
        typeof b.createdAt?.toDate === "function"
          ? b.createdAt.toDate().getTime()
          : new Date(b.createdAt).getTime();

      return bTs - aTs;
    });
  }, [entries]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    productName: true,
    price: true,
    date: true,
    paymentMode: true,
    status: true,
    resourceLink: true,
  });

  useLayoutEffect(() => {
    const apply = () => {
      const small = window.innerWidth < 768;
      setColumnVisibility({
        productName: true,
        price: true,
        date: !small,
        paymentMode: !small,
        status: true,
        resourceLink: true,
      });
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const table = useReactTable({
    data: sortedEntries,
    columns,
    state: {
      columnFilters,
      sorting,
      rowSelection,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageIndex(0);
  }, [entries?.length]);

  return (
    <div
      className="
        w-full rounded-xl border
        border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        shadow-sm
      "
    >
      {/* Column selector */}
      <div className="px-4 pt-4 hidden md:block">
        <ColumnSelector table={table} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader table={table} />
          <TableBody table={table} />
        </table>
      </div>

      {/* Pagination */}
      <div
        className="
          border-t border-gray-200 dark:border-gray-700
          bg-gray-50 dark:bg-gray-800
          px-4 py-3
        "
      >
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export default IncomeTable;