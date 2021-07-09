import INVENTORY_INITIAL_STATE from "./inventory.state";
import inventoryTypes from "./inventory.types";

const isOverDistributed = (inventarioFisicoLote, Existencia) => {
    return (
        inventarioFisicoLote?.reduce(
            (previousValue, currentValue) => {
                const value = [previousValue[0] + +currentValue.Cantidad];

                return value;
            },
            [0]
        )[0] > Existencia
    );
};

export default function inventoryReducer(
    state = INVENTORY_INITIAL_STATE,
    action
) {
    const overDistributed = () => {
        newState.overDistributed = isOverDistributed(
            newState.inventarioFisicoLote,
            newState.inventarioFisico.Existencia
        );
    };
    let newState = { ...state };
    let physicalInventoryLot;
    let temp;
    let logging = false;
    let index;
    if (logging) {
        console.group(action?.type || "ACTION");
        console.log("Previously:", state);
        console.log("Payload:", action.payload || "none");
    }

    switch (action?.type) {
        case inventoryTypes.SET_MASTER:
            newState.inventarioFisico = action.payload;
            newState.isDirty = true;
            break;
        case inventoryTypes.SET_QTY:
            newState.inventarioFisico.Existencia = parseInt(
                action.payload || 0
            );
            overDistributed();
            newState.isDirty = true;
            break;
        case inventoryTypes.SET_DETAIL:
            newState.inventarioFisicoLote = action.payload;
            newState.isDirty = true;
            break;
        case inventoryTypes.SET_INVENTORY:
            newState.inventario = action.payload;
            newState.inventarioFisico.Codigo = action.payload.Codigo;
            newState.inventarioFisico.Existencia = 0;
            newState.isDirty = true;
            break;
        case inventoryTypes.CHANGE_CURRENT_LOCATION:
            newState.currentLocation = action.payload;
            newState.isDirty = true;
            break;
        case inventoryTypes.EMPTY:
            newState = {
                ...INVENTORY_INITIAL_STATE,
                currentLocation: state.currentLocation,
                inventario: state.inventario,
            };
            newState.inventarioFisico.Codigo = state.inventarioFisico.Codigo;
            break;
        case inventoryTypes.SET_PHYSICAL_INVENTORY:
            newState = {
                ...newState,
                inventarioFisico:
                    action.payload.inventarioFisico ||
                    INVENTORY_INITIAL_STATE.inventarioFisico,
                inventario:
                    action.payload.inventario ||
                    INVENTORY_INITIAL_STATE.inventario,
                inventarioFisicoLote:
                    action.payload.inventarioFisicoLote ||
                    INVENTORY_INITIAL_STATE.inventarioFisicoLote,
                isDirty: false,
            };
            break;
        case inventoryTypes.ADD_NEW_LOT:
            newState.inventarioFisicoLote.push(action.payload);
            break;
        case inventoryTypes.CHANGE_LOT:
            index = newState.inventarioFisicoLote.findIndex(
                (inventarioFisicoLote) =>
                    inventarioFisicoLote.Id == action.payload?.id
            );
            if (index > -1) {
                newState.inventarioFisicoLote[index].Lote =
                    action.payload?.lot || "";
            }
        case inventoryTypes.MODIFY_LOT:
            if (typeof action?.payload?.index == "number") {
                index = action.payload?.index;

                if (index in newState.inventarioFisicoLote) {
                    physicalInventoryLot = {
                        ...action.payload.lot,
                    };
                    temp = newState.inventarioFisicoLote[index];
                    physicalInventoryLot.Id = temp.Id;
                    physicalInventoryLot.CodTransac = temp.CodTransac;
                    if (action.payload.selected) {
                        physicalInventoryLot.Cantidad = temp.Cantidad;
                    }
                    newState.inventarioFisicoLote[index] = physicalInventoryLot;
                    overDistributed();
                    newState.isDirty = true;
                }
            }

        case inventoryTypes.REMOVE_LOT:
            newState.inventarioFisicoLote = newState.inventarioFisicoLote.reduce(
                (previousValue, currentValue) => {
                    return currentValue.Id == action.payload
                        ? previousValue
                        : [...previousValue, currentValue];
                },
                []
            );
        default:
            break;
    }

    if (logging) {
        console.log("Now:", newState);
        console.groupEnd();
    }
    return newState;
}
