// import React from "react";

// interface Props {
//   globalFilter: string;
//   setGlobalFilter: (value: string) => void;
//   rowSelection: any;
//   table: any;
// }

// const TableToolbar: React.FC<Props> = ({
//   globalFilter,
//   setGlobalFilter,
//   rowSelection,
// }) => (
//   <div className="flex justify-between items-center mb-4">
//     <input
//       type="text"
//       placeholder="Search all..."
//       value={globalFilter}
//       onChange={(e) => setGlobalFilter(e.target.value)}
//       className="border rounded px-3 py-2 text-sm w-1/3"
//     />
//     <button
//       onClick={() => console.log("Selected Rows:", rowSelection)}
//       className="bg-red-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
//     >
//       Show Selected
//     </button>
//   </div>
// );

// export default TableToolbar;
