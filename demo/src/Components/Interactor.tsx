import init, { WasmInteractor } from "haddock-restraints-wasm";
import { useEffect, useState } from "react";

export const Interactor = () => {
  const [interactor, setInteractor] = useState<WasmInteractor>();

  async function load() {
    await init();
    const active = new Int16Array([1]);
    const passive = new Int16Array([10]);
    const api = new WasmInteractor(1, "A", active, passive);
    setInteractor(api);
  }

  useEffect(() => {
    load();
  });

  console.log(interactor?.print());

  return <></>;
};
