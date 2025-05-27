export default function DataTable({ columns, data }) {
  return (
    <div className="overflow-auto bg-white rounded shadow">
      <table className="min-w-full">
        <thead className="bg-primary text-white">
          <tr>
            {columns.map(col => (
              <th key={col.accessor} className="px-4 py-2 text-left">
                {col.Header}
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {columns.map(col => (
                <td key={col.accessor} className="px-4 py-2">
                  {row[col.accessor]}
                </td>
              ))}
              <td className="px-4 py-2 space-x-2">
                {columns.actions.map(ActionButton => (
                  <ActionButton key={row.id} row={row} />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
