import React from "react";

const Table = ({ headings, rows }: { headings?: string[]; rows: any[][] }) => {
  return (
    <table className="table-auto w-full">
      {headings?.length && (
        <thead className="font-bold text-left">
          <tr>
            {headings?.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row?.map((col, colIndex) => (
              <td key={colIndex}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
