// ColumnSelector.tsx
import React, { useEffect, useState } from "react";

interface Props {
  table: any;
}

const ColumnSelector: React.FC<Props> = ({ table }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex overflow-x-auto py-2 mb-4 scrollbar-hide">
      {table.getAllLeafColumns().map((column: any, index: number) => {
        // hide heavy columns on mobile
        if (isMobile && (column.id === "date" || column.id === "paymentMode")) {
          return null;
        }

        const id = `col-toggle-${column.id}`;

        return (
          <label
            key={column.id}
            htmlFor={id}
            className={`
              flex-1 flex items-center justify-center gap-2 px-3 py-2
              border rounded-lg cursor-pointer
              whitespace-nowrap text-sm
              bg-white dark:bg-gray-900
              border-gray-300 dark:border-gray-700
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${index < table.getAllLeafColumns().length - 1 ? "mr-2" : ""}
            `}
          >
            <input
              id={id}
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
              className="w-4 h-4 accent-blue-600 rounded-sm"
            />
            {column.id}
          </label>
        );
      })}
    </div>
  );
};

export default ColumnSelector;