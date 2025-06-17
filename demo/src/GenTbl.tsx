// GenTbl.tsx (main component)
import init, { WasmAir, WasmInteractor } from "haddock-restraints-wasm";
import { IoAdd } from "react-icons/io5";
import { useInteractors } from "./hooks/useInteractors";
import { InteractorForm } from "./components/InteractorForm";
import { TblOutput } from "./components/TblOutput";
import { GenerateRestraintsButton } from "./components/GenerateRestraintsButton";

export const GenTbl = () => {
  const {
    interactors,
    tbl,
    setTbl,
    addInteractor,
    removeInteractor,
    updateInteractor,
  } = useInteractors();

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
    setTbl(air.gen_tbl());
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        HADDOCK Restraints Generator
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Interactors</h2>
          <button
            onClick={addInteractor}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <IoAdd className="mr-2" />
            Add Interactor
          </button>
        </div>

        <div className="space-y-4">
          {interactors.map((interactor) => (
            <InteractorForm
              key={interactor.id}
              interactor={interactor}
              otherInteractors={interactors.filter(
                (i) => i.id !== interactor.id,
              )}
              onRemove={removeInteractor}
              onUpdate={updateInteractor}
            />
          ))}
        </div>
      </div>

      <GenerateRestraintsButton onClick={gen_tbl} />
      <TblOutput tbl={tbl} />
    </div>
  );
};
