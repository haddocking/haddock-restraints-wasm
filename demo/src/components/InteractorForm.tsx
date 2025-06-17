import React from "react";
import { IoRemove } from "react-icons/io5";
import type { Interactor } from "../hooks/useInteractors";

interface InteractorFormProps {
  interactor: Interactor;
  otherInteractors: Interactor[];
  onRemove: (id: number) => void;
  onUpdate: (
    id: number,
    field: keyof Interactor,
    value: Array<number> | string | number | null,
  ) => void;
}

export const InteractorForm: React.FC<InteractorFormProps> = ({
  interactor,
  otherInteractors,
  onRemove,
  onUpdate,
}) => {
  const handleResChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "active" | "passive",
  ) => {
    const values = e.target.value
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));

    onUpdate(interactor.id, field, values);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-700">
          Interactor {interactor.id}
        </h3>
        <button
          onClick={() => onRemove(interactor.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
        >
          <IoRemove className="inline-block" /> Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Chain
          </label>
          <input
            type="text"
            value={interactor.chain}
            onChange={(e) => onUpdate(interactor.id, "chain", e.target.value)}
            maxLength={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Target Interactor
          </label>
          <select
            value={interactor.target || ""}
            onChange={(e) =>
              onUpdate(
                interactor.id,
                "target",
                e.target.value ? parseInt(e.target.value) : null,
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None</option>
            {otherInteractors.map((i) => (
              <option key={i.id} value={i.id}>
                {i.id}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Active Residues (comma separated)
          </label>
          <input
            type="text"
            value={interactor.active.join(",")}
            onChange={(e) => handleResChange(e, "active")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Passive Residues (comma separated)
          </label>
          <input
            type="text"
            value={interactor.passive.join(",")}
            onChange={(e) => handleResChange(e, "passive")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
