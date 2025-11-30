import React from "react";
import { flexRender } from "@tanstack/react-table";

interface Props {
  table: any;
}

const TableHeader: React.FC<Props> = ({ table }) => (
  <thead
    className="
      bg-gray-100
      dark:bg-gray-800 sticky top-0
    "
  >
    {table.getHeaderGroups().map((headerGroup: any) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header: any) => (
          <th
            key={header.id}
            onClick={header.column.getToggleSortingHandler()}
            className="
              px-3 py-2
              text-left text-sm font-medium text-gray-700
              border-b border-gray-300
              cursor-pointer
              dark:border-gray-700 last:border-r-0 dark:text-gray-300
            "
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {{
              asc: " 🔼",
              desc: " 🔽",
            }[header.column.getIsSorted() as string] ?? null}

            {header.column.getCanFilter() && (
              <div
                className="
                  mt-2
                "
              >
                <div
                  className="
                    relative
                  "
                >
                  {/* SEARCH ICON */}
                  <div
                    className="
                      flex
                      pointer-events-none
                      absolute inset-y-0 start-0 items-center ps-3
                    "
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="
                        w-4 h-4
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>

                  {/* INPUT */}
                  <input
                    type="search"
                    value={(header.column.getFilterValue() as string) ?? ""}
                    onChange={(e) =>
                      header.column.setFilterValue(e.target.value)
                    }
                    placeholder={`Search ${header.column.id}`}
                    className="
                      block
                      w-full
                      py-2
                      text-xs text-gray-800 placeholder-gray-500
                      bg-gray-100
                      rounded-lg border border-gray-300
                      shadow-sm transition-all
                      ps-9 pe-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1f2937] dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-600 duration-200
                    "
                  />
                </div>
              </div>
            )}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default TableHeader;
