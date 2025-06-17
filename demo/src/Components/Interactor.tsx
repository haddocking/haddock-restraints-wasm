import init, { WasmAir, WasmInteractor } from "haddock-restraints-wasm";
import { useEffect, useState } from "react";

export const Interactor = () => {
  const [executed, setExecuted] = useState<boolean>(false);

  async function load() {
    await init();
    const active = new Int16Array([1]);
    const passive = new Int16Array([10]);
    const interactor_1 = new WasmInteractor(1, "A", active, passive);
    const interactor_2 = new WasmInteractor(2, "B", active, passive);
    interactor_1.set_target(interactor_2.id());
    interactor_2.set_target(interactor_1.id());

    const air = new WasmAir([interactor_1, interactor_2]);

    const result = air.gen_tbl();
    console.log(result);
    setExecuted(true);
  }

  useEffect(() => {
    load();
  }, [executed]);

  return <></>;
};
