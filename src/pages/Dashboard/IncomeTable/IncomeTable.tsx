// src/pages/Dashboard/IncomeTable/IncomeTable.tsx
import React, { useLayoutEffect, useMemo, useState, useEffect } from "react";
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
  entries: IncomeEntry[]; // coming from parent / firebase
}

const columns = [
  { accessorKey: "productName", header: "Product" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "paymentMode", header: "Payment Mode" },
  { accessorKey: "status", header: "Status" },
];

const IncomeTable: React.FC<Props> = ({ entries }) => {
  // Prepare data so newest appears first:
  // - prefer createdAt (Firestore Timestamp or ISO string) if present
  // - fallback to reversing the incoming array
  const sortedEntries = useMemo(() => {
    if (!entries || entries.length === 0) return entries;
    // check for createdAt presence
    const hasCreatedAt = entries.some((e) => (e as any).createdAt !== undefined);
    if (hasCreatedAt) {
      // map safely: if createdAt is Firestore Timestamp with toDate(), handle it
      return [...entries].sort((a: any, b: any) => {
        const aTs = (a.createdAt && typeof a.createdAt.toDate === "function")
          ? a.createdAt.toDate().getTime()
          : new Date(a.createdAt).getTime();
        const bTs = (b.createdAt && typeof b.createdAt.toDate === "function")
          ? b.createdAt.toDate().getTime()
          : new Date(b.createdAt).getTime();
        return bTs - aTs; // newest first
      });
    }
    // fallback: reverse order (assumes firebase returns oldest-first)
    return [...entries].reverse();
  }, [entries]);

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

  // responsive column visibility
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
    data: sortedEntries,
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

  // When entries change, jump to first page so newest is visible
  useEffect(() => {
    // defensive: table might be undefined during SSR
    try {
      table.setPageIndex(0);
    } catch (e) {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries?.length]);

  return (
    <div className="flex flex-col overflow-hidden w-full rounded-md">
      {/* Column selector (hidden on small by CSS in ColumnSelector) */}
      <div className="hidden md:block">
        <ColumnSelector table={table} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full border border-gray-300 rounded-lg dark:border-gray-700">
        <table className="w-full table-auto border-collapse">
          <TableHeader table={table} />
          <TableBody table={table} />
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-3">
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export default IncomeTable;
