import React, { useCallback } from "react";
import {
    emptyInventory,
    fetchNextPhysicalInventory,
    fetchPriorPhysicalInventory,
    fetchSavePhysicalInventory,
    fetchUpdatePhysicalInventory,
} from "../../redux/inventory.actions";
import AsyncButton from "../../../../components/AsyncButton/AsyncButton.component";
import { useConnect } from "../../inventory.context";

const PhysicalInventoryMasterButtons = () => {
    const {
        inventarioFisico,
        inventarioFisicoLote,
        isDirty,
        overDistributed,
        newRecord,
        priorPhysicalInventory,
        fetchSave,
        fetchUpdate,
        nextPhysicalInventory,
    } = useConnect(mapState, mapDispatch);

    const fetchPrevious = useCallback(
        async () =>
            await priorPhysicalInventory(
                inventarioFisico.Codigo,
                inventarioFisico.CodTransac
            ).catch(() => {}),
        [inventarioFisico]
    );

    const saveRecord = useCallback(
        async () => fetchSave(inventarioFisico).catch(() => {}),
        [inventarioFisico]
    );

    const updateRecord = useCallback(
        async () =>
            fetchUpdate({
                ...inventarioFisico,
                lots: inventarioFisicoLote,
            }).catch(() => {}),
        [inventarioFisico, inventarioFisicoLote]
    );

    const fetchNext = useCallback(
        async () =>
            await nextPhysicalInventory(
                inventarioFisico.Codigo,
                inventarioFisico.CodTransac
            ).catch(() => {}),
        [inventarioFisico]
    );

    return (
        <section
            className="card-footer"
            style={{ display: "flex", justifyContent: "space-between" }}
        >
            <AsyncButton spanText="Anterior" action={fetchPrevious} />
            {inventarioFisico.CodTransac ? (
                <AsyncButton spanText="Nuevo" action={newRecord} />
            ) : null}
            {!inventarioFisico.CodTransac ? (
                <AsyncButton
                    disabled={!inventarioFisico.Codigo}
                    spanText="Guardar"
                    action={saveRecord}
                />
            ) : null}
            {inventarioFisico.CodTransac ? (
                <AsyncButton
                    disabled={
                        !(inventarioFisico.Codigo && isDirty) || overDistributed
                    }
                    spanText="Grabar"
                    action={updateRecord}
                />
            ) : null}
            <AsyncButton spanText="Siguiente" action={fetchNext} />
        </section>
    );
};

const mapState = ({
    inventarioFisico,
    inventarioFisicoLote,
    isDirty,
    overDistributed,
}) => ({
    inventarioFisico,
    inventarioFisicoLote,
    isDirty,
    overDistributed,
});

const mapDispatch = (dispatch) => ({
    priorPhysicalInventory: fetchPriorPhysicalInventory(dispatch),
    newRecord: () => dispatch(emptyInventory),
    fetchSave: fetchSavePhysicalInventory(dispatch),
    fetchUpdate: fetchUpdatePhysicalInventory(dispatch),
    nextPhysicalInventory: fetchNextPhysicalInventory(dispatch),
});

export default PhysicalInventoryMasterButtons;
