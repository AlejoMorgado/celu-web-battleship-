import React from "react";
import Cell from "./Cell";

const Table = ({ matrix }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: 10 }, (_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <th>{String.fromCharCode(65 + i)}</th>
              {row.map((cell, j) => (
                <Cell key={j} value={cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
