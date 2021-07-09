import curry from "lodash/curry";
import {
    addNewLotToPhysicalInventory,
    fetchIteratePhysicalInventory,
    nextPhysicalInventory,
    priorPhysicalInventory,
    removeLotFromPhysicalInventory,
    savePhysicalInventory,
    searchPhysicalByInventory,
    updatePhysicalInventory,
} from "../../../pventa.utils";
import inventoryTypes from "./inventory.types";

export const setMaster = (master) => ({
    type: inventoryTypes.SET_MASTER,
    payload: master,
});

export const setQTY = (qty) => ({
    type: inventoryTypes.SET_QTY,
    payload: qty,
});

export const setDetail = (detail) => ({
    type: inventoryTypes.SET_DETAIL,
    payload: detail,
});

export const emptyInventory = {
    type: inventoryTypes.EMPTY,
};

export const setInventory = (inventory) => ({
    type: inventoryTypes.SET_INVENTORY,
    payload: inventory,
});

export const setPhysicalInventory = (physicalInventory) => ({
    type: inventoryTypes.SET_PHYSICAL_INVENTORY,
    payload: physicalInventory,
});

export const changeCurrentLocation = (location) => ({
    type: inventoryTypes.CHANGE_CURRENT_LOCATION,
    payload: location,
});

export const changeLot = (id, lot) => ({
    type: inventoryTypes.CHANGE_LOT,
    payload: { id, lot },
});

export const modifyLot = (index, lot, Id, selected = false) => ({
    type: inventoryTypes.MODIFY_LOT,
    payload: { index, lot, Id, selected },
});

export const dispatchPhysicalInventory = (dispatch) => ({
    data: {
        inventory: inventario,
        distribution: inventarioFisicoLote,
        ...master
    },
}) => {
    dispatch(
        setPhysicalInventory({
            inventario,
            inventarioFisicoLote,
            inventarioFisico: master,
        })
    );
};

const promiseActionCreator = curry(
    (promise, dispatcher) => (dispatch) => (...data) =>
        promise(...data).then(dispatcher(dispatch)),
    2
);

export const fetchPriorPhysicalInventory = (dispatch) => (codigo, current) =>
    fetchIteratePhysicalInventory(codigo, "prior", current).then(
        dispatchPhysicalInventory(dispatch)
    );

export const fetchNextPhysicalInventory = (dispatch) => (codigo, current) =>
    fetchIteratePhysicalInventory(codigo, "next", current).then(
        dispatchPhysicalInventory(dispatch)
    );

promiseActionCreator(nextPhysicalInventory)(dispatchPhysicalInventory);

export const fetchSavePhysicalInventory = promiseActionCreator(
    savePhysicalInventory
)(dispatchPhysicalInventory);

export const fetchUpdatePhysicalInventory = promiseActionCreator(
    updatePhysicalInventory
)(dispatchPhysicalInventory);

export const fetchSearchByProduct = promiseActionCreator(
    searchPhysicalByInventory
)(dispatchPhysicalInventory);

const addNewLot = (newPhysicalInventoryLot) => ({
    type: inventoryTypes.ADD_NEW_LOT,
    payload: newPhysicalInventoryLot,
});

export const fetchAddNewLot = promiseActionCreator(
    addNewLotToPhysicalInventory,
    (dispatch) => ({ data }) => {
        dispatch(addNewLot(data));
    }
);

export const removeLot = (lotId) => ({
    type: inventoryTypes.REMOVE_LOT,
    payload: lotId,
});

export const fetchRemoveLot = promiseActionCreator(
    removeLotFromPhysicalInventory,
    (dispatch) => ({ data }) => {
        dispatch(removeLot(data));
    }
);
