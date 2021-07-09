import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import { Button, Modal } from "react-bootstrap";
import { useIsAuth } from "../../src/utils/useIsAuth";
import { createUrqlClient } from "../../src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import LocationInputs from "../../src/components/LocationInputs";
import {
  Inventario,
  InventarioFisico,
  InventarioFisicoLote,
  useGetFirstEntryQuery,
} from "../../src/generated/graphql";
import { useEffect } from "react";

const InventoryPage: React.FC = () => {
  const [{ data, fetching }] = useGetFirstEntryQuery();
  const [physicalInventory, setPIL] = useState<InventarioFisico>();
  const [inventory, setInventory] = useState<Inventario>();
  const [lots, setLots] = useState<InventarioFisicoLote[]>();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (!fetching && data?.getFirstPhysicalInventoryEntry) {
      const { physicalInventory, inventory, distribution } =
        data.getFirstPhysicalInventoryEntry;
      physicalInventory && setPIL(physicalInventory as InventarioFisico);
      inventory && setInventory(inventory as Inventario);
      distribution && setLots(distribution as InventarioFisicoLote[]);
    }
  }, [fetching, data]);

  return (
    <>
      <section id="physical-inventory-master" className="card-body">
        <LocationInputs />

        <div className="form-group row">
          <label htmlFor="descripcion" className="col-sm-2 col-form-label">
            Descripcion
          </label>

          <div className="col-sm-10">
            <FormControl
              id="descipcion"
              className="cursor-pointer"
              size="sm"
              placeholder="Buscar"
              readOnly
              value={inventory?.Descripcion || ""}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="product-id" className="col-sm-2 col-form-label">
            Código
          </label>
          <div className="col-sm-10">
            <InputGroup>
              <FormControl
                type="number"
                size="sm"
                className="cursor-pointer"
                id="product-id"
                placeholder="Código"
                readOnly
                value={inventory?.Codigo || ""}
              />
            </InputGroup>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="quantity" className="col-sm-2 col-form-label">
            Cantidad
          </label>
          <div className="col-sm-10">
            <FormControl
              type="number"
              size="sm"
              id="quantity"
              placeholder="Cantidad"
              value={physicalInventory?.Existencia || 0}
            />
          </div>
        </div>
      </section>
      <section
        className="card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button>🢀 Anterior</Button>
        <Button>&#x2795; Nuevo</Button>
        <Button>💾 Guardar</Button>
        <Button>💾 Grabar</Button>
        <Button>Siguiente 🢂</Button>
      </section>
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
            {lots?.map((lot) => (
              <tr>
                <td>{lot.Id}</td>
                <td>{lot.Cantidad}</td>
                <td>{lot.Lote}</td>
                <td>{lot.FechaFabricacion}</td>
                <td>{lot.FechaVence}</td>
                <td>{lot.RegistroSanitario}</td>
              </tr>
            )) ?? null}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={8} align="center" className="p-0"></td>
            </tr>
          </tfoot>
        </Table>
      </section>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal((currentValue) => !currentValue);
        }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(InventoryPage);
