// import { InventarioFisico,InventarioFisicoLote } from "./generated/graphql";

import { createContext, Dispatch } from "react";

export type globalState = {
  setState?: Dispatch<React.SetStateAction<globalState>>;
  currentLocation: string;
  // inventarioFisico: InventarioFisico,
  // distribution: [InventarioFisicoLote]
};

export const initialState: globalState = { currentLocation: "A00P00H00T00B00" };

export const InventoryContext = createContext<globalState>(initialState);
