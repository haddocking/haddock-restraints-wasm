// hooks/useInteractors.ts
import { useState } from "react";

export interface Interactor {
  id: number;
  chain: string;
  active: number[];
  passive: number[];
  target: number | null;
}

export const useInteractors = () => {
  const [interactors, setInteractors] = useState<Interactor[]>([
    { id: 1, chain: "A", active: [], passive: [], target: null },
    { id: 2, chain: "B", active: [], passive: [], target: null },
  ]);

  const [tbl, setTbl] = useState<string>("");

  const addInteractor = () => {
    const newId =
      interactors.length > 0
        ? Math.max(...interactors.map((i) => i.id)) + 1
        : 1;
    setInteractors([
      ...interactors,
      { id: newId, chain: "", active: [], passive: [], target: null },
    ]);
  };

  const removeInteractor = (id: number) => {
    setInteractors(interactors.filter((i) => i.id !== id));
  };

  const updateInteractor = (
    id: number,
    field: keyof Interactor,
    value: Array<number> | string | number | null,
  ) => {
    setInteractors(
      interactors.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
    );
  };

  return {
    interactors,
    tbl,
    setTbl,
    addInteractor,
    removeInteractor,
    updateInteractor,
  };
};
