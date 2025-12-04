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
    <div
      className="
        flex flex-col
        mt-2
        justify-between items-center gap-3
        sm:flex-row
      "
    >
      {/* PAGINATION BUTTONS */}
      <div
        className="
          flex flex-wrap
          gap-1
        "
      >
        {/* PREV */}
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="
            h-9
            px-2
            text-sm text-neutral-700
            bg-neutral-100
            rounded-md border border-neutral-300
            dark:border-neutral-700 dark:bg-slate-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-gray-800 transition disabled:opacity-40
          "
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {paginationRange.map((page, idx) =>
          page === "..." ? (
            <span
              key={idx}
              className="
                h-9
                px-2
                text-sm text-neutral-700
                bg-neutral-100
                rounded-md border border-neutral-300
                dark:border-neutral-700 dark:bg-slate-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-gray-800 transition disabled:opacity-40
              "
            >
              ...ß
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => table.setPageIndex(Number(page) - 1)}
              className={`
                h-9
                px-2
                text-sm
                rounded-md border border-neutral-300
                transition dark:border-neutral-700
                ${currentPage === page
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-gray-800"
                }
              `}
            >
              {page}
            </button>
          ),
        )}

        {/* NEXT */}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="
            h-9
            px-2
            text-sm text-neutral-700
            bg-neutral-100
            rounded-md border border-neutral-300
            dark:border-neutral-700 dark:bg-slate-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-gray-800 transition disabled:opacity-40
          "
        >
          Next
        </button>
      </div>

      {/* RIGHT SIDE INFO + DROPDOWN */}
      <div
        className="
          flex
          items-center gap-3
        "
      >
        {/* PAGE INFO */}
        <div
          className="
            text-sm text-neutral-700
            dark:text-neutral-300
          "
        >
          <span
            className="
              font-medium
            "
          >
            Page {currentPage}
          </span>{" "}
          of {pageCount}
        </div>

        {/* PAGE SIZE DROPDOWN */}
        <div
          className="
            inline-block
            relative
          "
        >
          <select
            value={pageSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              table.setPageSize(newSize);
              table.setPageIndex(0);
            }}
            style={{ appearance: "none", backgroundImage: "none" }}
            className="
              h-9
              px-3 pr-7
              text-sm text-neutral-700
              bg-neutral-100
              rounded-md border border-neutral-300
              appearance-none dark:border-neutral-700 dark:bg-slate-800 dark:text-neutral-200 focus:outline-none focus:ring-0 focus:border-neutral-300
            "
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>

          {/* DROPDOWN ICON */}
          <div
            className="
              text-neutral-500
              pointer-events-none
              absolute right-2 top-1/2 -translate-y-1/2
            "
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="
                w-4 h-4
              "
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
