// frontend/src/components/Shared/DataTable.jsx

import React from "react";

export default function DataTable({
  columns,
  data,
  headerClassName = "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white",
  rowClassName = "",
  containerClassName = "",
  tableClassName = "",
  emptyState = null,
}) {
  if ((!data || data.length === 0) && emptyState) {
    return (
      <div className="p-8 bg-gray-50 rounded-2xl shadow-lg text-gray-500">
        {emptyState}
      </div>
    );
  }

  return (
    <div
      className={`
        overflow-x-auto rounded-2xl bg-white/40 backdrop-blur-lg shadow-lg p-4
        ${containerClassName}
      `}
    >
      <table
        className={`
          min-w-full table-fixed border-collapse 
          ${tableClassName}
        `}
      >
        <thead className={headerClassName}>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.accessor || idx}
                className={`
          ${col.width || ""}        /* sets the column’s width */
          ${col.align || "text-left"} /* text alignment */
          px-6 py-3 text-sm font-semibold uppercase tracking-wide
          align-middle              /* vertical centering */
        `}
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className={rowClassName}>
              {columns.map((col, idx) => {
                const value = row[col.accessor];
                return (
                  <td
                    key={col.accessor || idx}
                    className={`
              ${col.width || ""}        /* same width as header */
              ${col.align || "text-left"} /* same alignment */
              px-6 py-4 text-sm text-gray-900
              align-middle              /* vertical centering */
            `}
                  >
                    {col.Cell
                      ? col.Cell({ value, row: { original: row }, column: col })
                      : value ?? "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// frontend/src/components/Shared/DataTable.jsx

// import React from "react";

// export default function DataTable({
//   columns,
//   data,
//   headerClassName = "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white",
//   rowClassName = "hover:bg-white/60 transition ease-in-out duration-200",
//   containerClassName = "",            // extra wrapper classes
//   tableWrapperClassName = "",         // extra table wrapper classes
//   emptyState = null,
// }) {
//   // Show custom empty state if no data
//   if ((!data || data.length === 0) && emptyState) {
//     return (
//       <div className="p-8 bg-white bg-opacity-40 backdrop-blur-md rounded-2xl shadow-lg">
//         {emptyState}
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`overflow-auto rounded-3xl bg-white bg-opacity-40 backdrop-blur-lg shadow-2xl p-4 ${containerClassName}`}
//     >
//       {/* <div className={`inline-block min-w-full ${tableWrapperClassName}`}> */}
//       <div className={`w-full overflow-x-auto ${tableWrapperClassName}`}>
//         {/* <table className="min-w-full table-fixed border-separate border-spacing-y-4"> */}
//         <table className="w-full table-fixed border-collapse">
//           <thead className={headerClassName}>
//             <tr>
//               {columns.map((col, idx) => (
//                 <th
//                   key={col.accessor || idx}
//                   className="px-8 py-4 text-left text-base font-bold uppercase tracking-wide"
//                 >
//                   {col.Header}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((row) => (
//               <tr
//                 key={row.id}
//                 className={`${rowClassName} border border-white/20 rounded-xl mb-4 backdrop-blur-sm`}
//               >
//                 {columns.map((col, idx) => {
//                   const value = row[col.accessor];
//                   return (
//                     <td
//                       key={col.accessor || idx}
//                       className="px-8 py-5 text-sm text-gray-900"
//                     >
//                       {col.Cell
//                         ? col.Cell({
//                             value,
//                             row: { original: row },
//                             column: col,
//                           })
//                         : value ?? "-"}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
