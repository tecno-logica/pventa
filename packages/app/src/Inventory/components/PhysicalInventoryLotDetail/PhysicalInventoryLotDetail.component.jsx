import React, { useCallback } from "react";
import {
    fetchAddNewLot,
    fetchSavePhysicalInventory,
} from "../../redux/inventory.actions";
import AsyncButton from "../../../../components/AsyncButton/AsyncButton.component";
import { useConnect } from "../../inventory.context";
import Table from "react-bootstrap/Table";
import LotRow from "../LotRow/LotRow.component";
import { explodeLocation } from "../../inventory.utils";
import "./PhysicalInventoryLotDetail.styles.scss";

const PhysicalInventoryLot = () => {
    const {
        inventarioFisico,
        inventarioFisicoLote,
        fetchSavePhysicalInventory,
        currentLocation,
        fetchAddNewLot,
    } = useConnect(mapState, mapDispatch);

    const saveRecord = useCallback(async () => {
        if (!inventarioFisico.Codigo) return;
        fetchSavePhysicalInventory(inventarioFisico).catch(() => {});
    }, [inventarioFisico]);

    // I don't really know what is going on with this one
    const addNewLot = useCallback(async () => {
        if (!inventarioFisico.CodTransac) {
            return; //await saveRecord().then(addNewEmptyLot);
        } else {
            await fetchAddNewLot(
                inventarioFisico.Codigo,
                inventarioFisico.CodTransac,
                explodeLocation(currentLocation)
            );
        }
    }, [inventarioFisico, saveRecord, fetchAddNewLot, currentLocation]);

    return (
        <section className="inventory-physical-lot-detail card-body">
            <Table size="sm" bordered striped responsive>
                <thead>
                    <tr>
                        <th>LoteId</th>
                        <th>Cantidad</th>
                        <th>Lote</th>
                        <th>Fecha Fabricación</th>
                        <th>Fecha Vence</th>
                        <th>Ubicación</th>
                        <th>Registro Sanitario</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {inventarioFisicoLote?.map(
                        (lot, index) => (
                            <LotRow key={index} lot={lot} index={index} />
                        ),
                        [inventarioFisicoLote]
                    ) ?? null}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="8" align="center" className="p-0">
                            <AsyncButton
                                spanText="Adicionar"
                                size="sm"
                                action={addNewLot}
                                variant="success"
                                className="w-100 m-0"
                                disabled={
                                    !inventarioFisico.Codigo ||
                                    !inventarioFisico.CodTransac
                                }
                            />
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </section>
    );
};

const mapState = ({
    inventarioFisico,
    inventarioFisicoLote,
    currentLocation,
}) => ({
    inventarioFisico,
    inventarioFisicoLote,
    currentLocation,
});

const mapDispatch = (dispatch) => ({
    fetchSavePhysicalInventory: fetchSavePhysicalInventory(dispatch),
    fetchAddNewLot: fetchAddNewLot(dispatch),
});
/*
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhysicalInventoryLot);
*/

export default PhysicalInventoryLot;
