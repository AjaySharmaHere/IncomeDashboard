import React from "react";

interface Props {
  table: any;
}

const TablePagination: React.FC<Props> = ({ table }) => {
  const pagination = table.getState().pagination;

  const pageIndex = pagination?.pageIndex ?? 0;
  const pageSize = pagination?.pageSize ?? 10;

  const pageCount =
    typeof table.getPageCount() === "number" && table.getPageCount() > 0
      ? table.getPageCount()
      : 1;

  const currentPage = Math.min(pageIndex + 1, pageCount);

  const getPaginationRange = () => {
    const total = pageCount;
    const current = currentPage;
    const sibling = 1;
    const range: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) range.push(i);
      return range;
    }

    const left = Math.max(current - sibling, 2);
    const right = Math.min(current + sibling, total - 1);

    range.push(1);

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) range.push(i);

    if (right < total - 1) range.push("...");

    range.push(total);

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
      {/* ===== PAGINATION BUTTONS ===== */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 h-10 rounded-l-lg border border-neutral-300 dark:border-neutral-700
             bg-neutral-100 dark:bg-neutral-900
             text-neutral-700 dark:text-neutral-300
             hover:bg-neutral-200 dark:hover:bg-neutral-800 transition disabled:opacity-40"
        >
          Previous
        </button>

        {paginationRange.map((page, idx) =>
          page === "..." ? (
            <span
              key={idx}
              className="px-3 h-10 flex items-center justify-center border border-neutral-300 dark:border-neutral-700
                         bg-neutral-100 dark:bg-neutral-900 text-neutral-500"
            >
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => table.setPageIndex(Number(page) - 1)}
              className={`px-3 h-10 flex items-center justify-center border text-sm font-medium transition
                ${currentPage === page
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }
                border-neutral-300 dark:border-neutral-700`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 h-10 rounded-r-lg border border-neutral-300 dark:border-neutral-700
             bg-neutral-100 dark:bg-neutral-900
             text-neutral-700 dark:text-neutral-300
             hover:bg-neutral-200 dark:hover:bg-neutral-800 transition disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* ✅ Page X of Y & Showing N */}
        <div className="text-sm text-neutral-700 dark:text-neutral-300">
          <span className="font-medium">Page {currentPage}</span> of {pageCount}{" "}
        </div>

        {/* ✅ DROPDOWN WITH SINGLE ARROW (FIXED) */}
        <div className="relative inline-block">
          <select
            value={pageSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              table.setPageSize(newSize);
              table.setPageIndex(0);
            }}
            className="appearance-none pr-8 rounded-lg px-3 py-2 text-sm
                       border border-neutral-300 dark:border-neutral-700
                       bg-neutral-100 dark:bg-neutral-900
                       text-neutral-700 dark:text-neutral-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
              backgroundImage: "none",
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-neutral-500">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
