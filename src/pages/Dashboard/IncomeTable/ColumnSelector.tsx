import React from "react";

interface Props {
  table: any;
}

const ColumnSelector: React.FC<Props> = ({ table }) => {
  return (
    <div
      className="
        flex flex-col
        mb-6
        gap-4
        lg:flex-row
      "
    >
      {table.getAllLeafColumns().map((column: any) => {
        const id = `col-toggle-${column.id}`;

        return (
          <label
            key={column.id}
            htmlFor={id}
            className="
              flex
              w-full
              px-3 py-2
              rounded-xl border
              transition-all cursor-pointer select-none
              items-center gap-3 hover:border-blue-400 hover:-translate-y-[1px] active:scale-[0.98] duration-200 ease-in-out dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:hover:border-blue-500 dark:hover:shadow-gray-800
              lg:flex-1
            "
          >
            <input
              id={id}
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
              className="
                w-5 h-5
                bg-gray-100
                rounded-md border border-gray-400
              "
            />

            <span
              className="

              "
            >
              {column.id}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default ColumnSelector;
