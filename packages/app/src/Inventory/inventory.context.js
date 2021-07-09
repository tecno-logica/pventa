import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useConnectOnContext } from "../../utils";
import INVENTORY_INITIAL_STATE from "./redux/inventory.state";

const InventoryContext = createContext(INVENTORY_INITIAL_STATE);
export default InventoryContext;

export const useConnect = useConnectOnContext(InventoryContext);
