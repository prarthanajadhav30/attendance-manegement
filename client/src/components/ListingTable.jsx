import React from "react";

const ListingTable = ({ columns, data, loading, error, emptyText, onRowClick, className }) => {
  return (
    <div className={"relative " + (className || "")}> 
      {loading ? (
        <div className="p-8 text-center">Loading...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : (
        <table className="w-full table-auto border-collapse mt-4">
          <thead>
            <tr className="bg-pink-100 text-pink-800">
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 border font-extrabold text-left text-lg tracking-wide">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center py-4 text-gray-700 text-base font-semibold">{emptyText || "No records found."}</td></tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  className="hover:bg-pink-200 cursor-pointer transition-colors"
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 border text-gray-900 font-semibold text-base">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListingTable;
