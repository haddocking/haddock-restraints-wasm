import init, { WasmAir, WasmInteractor } from "haddock-restraints-wasm";
import { useState } from "react";

export const Interactor = () => {
  const [tbl, setTbl] = useState<string>("");
  const [interactors, setInteractors] = useState<
    Array<{
      id: number;
      chain: string;
      active: number[];
      passive: number[];
      target: number | null;
    }>
  >([{ id: 1, chain: "A", active: [1], passive: [10], target: null }]);

  const addInteractor = () => {
    const newId =
      interactors.length > 0
        ? Math.max(...interactors.map((i) => i.id)) + 1
        : 1;
    setInteractors([
      ...interactors,
      { id: newId, chain: "B", active: [1], passive: [10], target: null },
    ]);
  };

  const removeInteractor = (id: number) => {
    setInteractors(interactors.filter((i) => i.id !== id));
  };

  const updateInteractor = (id: number, field: string, value: any) => {
    setInteractors(
      interactors.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
    );
  };

  async function gen_tbl() {
    await init();

    const wasmInteractors = interactors.map((interactor) => {
      const wasmInteractor = new WasmInteractor(
        interactor.id,
        interactor.chain,
        new Int16Array(interactor.active),
        new Int16Array(interactor.passive),
      );

      if (interactor.target) {
        wasmInteractor.set_target(interactor.target);
      }

      return wasmInteractor;
    });

    const air = new WasmAir(wasmInteractors);
    const result = air.gen_tbl();
    console.log(result);
    setTbl(result);
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        HADDOCK Restraints Generator (proof-of-concept)
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Interactors</h2>
          <button
            onClick={addInteractor}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Interactor
          </button>
        </div>

        <div className="space-y-4">
          {interactors.map((interactor) => (
            <div
              key={interactor.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-700">
                  Interactor {interactor.id}
                </h3>
                <button
                  onClick={() => removeInteractor(interactor.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                  Remove
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
                    onChange={(e) =>
                      updateInteractor(interactor.id, "chain", e.target.value)
                    }
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
                      updateInteractor(
                        interactor.id,
                        "target",
                        e.target.value ? parseInt(e.target.value) : null,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">None</option>
                    {interactors
                      .filter((i) => i.id !== interactor.id)
                      .map((i) => (
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
                    onChange={(e) =>
                      updateInteractor(
                        interactor.id,
                        "active",
                        e.target.value
                          .split(",")
                          .map(Number)
                          .filter((n) => !isNaN(n)),
                      )
                    }
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
                    onChange={(e) =>
                      updateInteractor(
                        interactor.id,
                        "passive",
                        e.target.value
                          .split(",")
                          .map(Number)
                          .filter((n) => !isNaN(n)),
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => gen_tbl()}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Generate Restraints
        </button>
      </div>

      {tbl && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Output</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono">
            {tbl}
          </pre>
        </div>
      )}
    </div>
  );
};
