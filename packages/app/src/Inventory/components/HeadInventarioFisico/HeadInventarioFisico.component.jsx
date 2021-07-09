import React, { useCallback, useEffect, useRef, useState } from "react";
import LocationInputs from "../LocationInputs/LocationInputs.component";
import InventorySearchModal from "../../../../Modals/InventorySearchModal/InventorySearchModal.component";
import { fetchSearchByProduct, setQTY } from "../../redux/inventory.actions";
import { useConnect } from "../../inventory.context";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../../redux/user/user.selector";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputGroup } from "react-bootstrap";
import { faBarcode } from "@fortawesome/free-solid-svg-icons/faBarcode";
import "./HeadInventarioFisico.styles.scss";

const InventarioFisicoForm = function FormInventarioFisico({ currentUser }) {
    const [modalIsShowing, setModalIsShowing] = useState(false);
    const [qrIsShowing, setQrIsShowing] = useState(false);
    const {
        inventarioFisico,
        inventario,
        changeExistance,
        fetchSearchByCodigo,
    } = useConnect(mapState, mapDispatch);
    const quantityInput = useRef(null);

    const handleShowModal = useCallback(
        (event) => {
            setModalIsShowing(true);
        },
        [setModalIsShowing]
    );

    const handleShowQr = useCallback(
        (event) => {
            setQrIsShowing(true);
        },
        [setQrIsShowing]
    );

    const hideModal = useCallback(() => {
        setModalIsShowing(false);
    }, [setModalIsShowing]);

    const handleSelect = useCallback((product) => {
        fetchSearchByCodigo(product?.Codigo).then(() => {
            quantityInput.current.focus();
        });
    }, []);

    return (
        <>
            <section id="physical-inventory-master" className="card-body">
                <LocationInputs />
                <div className="form-group row">
                    <label
                        htmlFor="descripcion"
                        className="col-sm-2 col-form-label"
                    >
                        Descripcion
                    </label>

                    <div className="col-sm-10">
                        <FormControl
                            id="descipcion"
                            className="cursor-pointer"
                            size="sm"
                            placeholder="Buscar"
                            value={inventario?.Descripcion || ""}
                            readOnly
                            onClick={handleShowModal}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="product-id"
                        className="col-sm-2 col-form-label"
                    >
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
                                value={inventarioFisico?.Codigo || ""}
                                onClick={handleShowModal}
                            />
                            <InputGroup.Append>
                                <Button size="sm">
                                    <FontAwesomeIcon icon={faBarcode} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="quantity"
                        className="col-sm-2 col-form-label"
                    >
                        Cantidad
                    </label>
                    <div className="col-sm-10">
                        <FormControl
                            type="number"
                            size="sm"
                            id="quantity"
                            placeholder="Cantidad"
                            ref={quantityInput}
                            value={inventarioFisico?.Existencia || ""}
                            onChange={changeExistance}
                        />
                    </div>
                </div>
                {currentUser?.role == 0 && (
                    <div className="form-group row">
                        <label
                            htmlFor="quantity"
                            className="col-sm-2 col-form-label"
                        >
                            Usuario
                        </label>
                        <div className="col-sm-10">
                            {inventarioFisico?.Usuario || ""}
                        </div>
                    </div>
                )}
            </section>

            {modalIsShowing ? (
                <InventorySearchModal
                    show={modalIsShowing}
                    onHide={hideModal}
                    onSelect={handleSelect}
                />
            ) : null}
        </>
    );
};

const mapState = ({ inventarioFisico, inventario }) => ({
    inventarioFisico,
    inventario,
});

const mapDispatch = (dispatch) => ({
    changeExistance: (event) => {
        dispatch(setQTY(event.target.value));
    },
    fetchSearchByCodigo: fetchSearchByProduct(dispatch),
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(InventarioFisicoForm);
