// components/TblOutput.tsx
import React from "react";

interface TblOutputProps {
  tbl: string;
}

export const TblOutput: React.FC<TblOutputProps> = ({ tbl }) => {
  if (!tbl) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Output</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono">
        {tbl}
      </pre>
    </div>
  );
};
