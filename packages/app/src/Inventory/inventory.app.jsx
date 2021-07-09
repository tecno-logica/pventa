import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
    selectCurrentUser,
    selectUsuario,
} from "../../redux/user/user.selector";
import InventoryContext from "./inventory.context";
import inventoryReducer from "./redux/inventory.reducer";
import INVENTORY_INITIAL_STATE from "./redux/inventory.state";
import { getFirstEntry } from "./inventory.utils";
import { dispatchPhysicalInventory } from "./redux/inventory.actions";
import PhysicalInventoryLotMaster from "./components/HeadInventarioFisico/HeadInventarioFisico.component";
import PhysicalInventoryMasterButtons from "./components/PhysicalInventoryMasterButtons/PhysicalInventoryMasterButtons.component";
import PhysicalInventoryLotDetail from "./components/PhysicalInventoryLotDetail/PhysicalInventoryLotDetail.component";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.component";
import "./inventory.styles.scss";

const InventoyApp = ({ usuario }) => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useReducer(
        inventoryReducer,
        INVENTORY_INITIAL_STATE
    );
    const title = useRef(document.title);
    /*
    const callBack = useCallback((response) => {}, []);

    const [data, search, fetching, mounted] = useSearch(null, callBack);
*/
    useEffect(() => {
        document.title = "Inventario | " + title.current;

        let mounted = true;
        getFirstEntry()
            .then((response) => {
                if (mounted) {
                    dispatchPhysicalInventory(dispatch)(response);
                }
            })
            .catch(() => {})
            .finally(() => {
                if (mounted) {
                    setLoading(false);
                }
            });
        return () => {
            console.log("first");
            mounted = false;
            document.title = title.current;
        };
    }, []);

    const context = useMemo(() => ({ usuario, ...state, dispatch }), [
        state,
        dispatch,
        usuario,
    ]);

    return loading ? (
        <LoadingSpinner />
    ) : (
        <article id="inventory-app" className="card mx-3 my-3">
            <InventoryContext.Provider value={context}>
                <PhysicalInventoryLotMaster />
                <PhysicalInventoryMasterButtons />
                <PhysicalInventoryLotDetail />
            </InventoryContext.Provider>
        </article>
    );
};

const mapStateToProps = createStructuredSelector({
    usuario: selectUsuario,
});

export default connect(mapStateToProps)(InventoyApp);
