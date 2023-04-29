import React from "react";

const Table = ({
  headings,
  rows,
  independentVars,
}: {
  headings?: string[];
  rows: any[][];
  independentVars: string[];
}) => {
  const colIndexes = new Set(
    independentVars?.map((colName) => headings?.indexOf(colName))
  );

  const numCols = headings?.length;

  const getColumnBgColor = (index) => {
    if (colIndexes.has(index)) {
      return "bg-gray-900";
    }
    if (index === numCols - 1) {
      return "bg-gray-800";
    }
    return "";
  };

  return (
    <table className="table-auto w-full">
      {headings?.length && (
        <thead className="font-bold text-left">
          <tr>
            {headings?.map((heading, colIndex) => (
              <th key={colIndex} className={getColumnBgColor(colIndex)}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row?.map((col, colIndex) => (
              <td key={colIndex} className={getColumnBgColor(colIndex)}>
                {col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
