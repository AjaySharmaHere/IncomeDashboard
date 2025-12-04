// import React from "react";

// interface Props {
//   table: any;
// }

// const ColumnSelector: React.FC<Props> = ({ table }) => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8 mt-4">
//       {table.getAllLeafColumns().map((column: any) => {
//         const id = `col-toggle-${column.id}`;

//         return (
//           <label
//             key={column.id}
//             htmlFor={id}
//             className="
//           flex items-center gap-2
//           px-3 py-2
//           border rounded-lg
//           cursor-pointer select-none
//           dark:bg-gray-900 dark:border-gray-700 dark:text-white
//           w-full
//         "
//           >
//             <input
//               id={id}
//               type="checkbox"
//               checked={column.getIsVisible()}
//               onChange={column.getToggleVisibilityHandler()}
//               className="w-4 h-4 shrink-0 rounded-sm"
//             />

//             <span className="truncate">{column.id}</span>
//           </label>
//         );
//       })}
//     </div>

//   );
// };

// export default ColumnSelector;


// ColumnSelector.tsx
import React, { useEffect, useState } from "react";

interface Props {
  table: any;
}

const ColumnSelector: React.FC<Props> = ({ table }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-4 mt-4">
      {table.getAllLeafColumns().map((column: any) => {
        // on mobile hide checkboxes for date & paymentMode
        if (isMobile && (column.id === "date" || column.id === "paymentMode")) {
          return null;
        }

        const id = `col-toggle-${column.id}`;
        return (
          <label
            key={column.id}
            htmlFor={id}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer select-none dark:bg-gray-900 dark:border-gray-700 dark:text-white w-full"
          >
            <input
              id={id}
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
              className="w-4 h-4 shrink-0 rounded-sm"
            />
            <span className="truncate">{column.id}</span>
          </label>
        );
      })}
    </div>
  );
};

export default ColumnSelector;
