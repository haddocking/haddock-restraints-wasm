import React from "react";
import { IoRocket } from "react-icons/io5";

interface GenerateButtonProps {
  onClick: () => void;
}

export const GenerateRestraintsButton: React.FC<GenerateButtonProps> = ({
  onClick,
}) => (
  <div className="flex justify-center my-6">
    <button
      onClick={onClick}
      className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
    >
      <IoRocket className="inline-block mr-2" />
      Generate Restraints
    </button>
  </div>
);
