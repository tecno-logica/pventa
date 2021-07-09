import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchTable from "../../../../components/SearchTable/SearchTable.component";
import { sqlToInput } from "../../../../utils";
import {
    changeLot,
    fetchRemoveLot,
    modifyLot,
} from "../../redux/inventory.actions";
import { useConnect } from "../../inventory.context";
import debounce from "lodash/debounce";
import { FormControl } from "react-bootstrap";
import AsyncButton from "../../../../components/AsyncButton/AsyncButton.component";
import LotSearchModal from "../../../../Modals/LotsSearchModal/LotsSearchModal.component";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const headers = [
    "CodTransac",
    "Ubicación",
    "Lote",
    "Fabricado",
    "Vence",
    "Registro Sanitario",
];

const LotRow = ({ index, lot }) => {
    const [lotField, setLotField] = useState("");
    const [displaySearch, setDisplaySearch] = useState(false);

    /*const [modalIsShowing, setModalIsShowing] = useState(false);*/
    const mounted = useRef(false);
    const {
        CodTransac,
        Codigo,
        currentLocation = "",
        modifyLot,
        over,
        fetchRemoveLot,
    } = useConnect(mapStateToProps, mapDispatchToProps);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    /*const showModal = useCallback(() => {
        if (mounted.current) {
            setModalIsShowing(true);
        }
    }, [mounted, setModalIsShowing]);

    const hideModal = useCallback(() => {
        if (mounted.current) {
            setModalIsShowing(false);
        }
    }, [mounted, setModalIsShowing]);*/

    const handleOnFocus = useCallback(
        (event) => {
            setLotField("");
        },
        [setDisplaySearch]
    );

    useEffect(() => {
        setLotField(lot?.Lote);
    }, [lot?.Lote]);

    const handleOnFocusOut = useCallback(
        (event) => {
            if (!displaySearch) setLotField(lot?.Lote);
        },
        [setDisplaySearch, lot?.Lote, displaySearch]
    );

    const handleSelect = useCallback(
        (selectedLot) =>
            debounce((event) => {
                const physicalInventoryLot = { ...lot, ...selectedLot };
                physicalInventoryLot.CodTransac = lot.CodTransac;
                physicalInventoryLot.CodTransacLote = selectedLot.CodTransac;
                modifyLot(index, physicalInventoryLot, null, true);
                setDisplaySearch(false);
            }, 100),
        [index, lot, modifyLot]
    );

    const handleChangeLot = useCallback(
        async (event) => {
            setLotField(event.target.value.toUpperCase());
            /*changeLot(lot?.Id, event.target.value);*/
        },
        [/*lot?.Id,*/ setLotField]
    );

    /*const handleSelect = useCallback((lot) => modifyLot(index, lot), [
        index,
        modifyLot,
    ]);*/

    const handleChange = useCallback(
        ({ target: { name, value } }) => {
            const newLot = { ...lot };
            switch (name) {
                case "quantity":
                    newLot.Cantidad = value;
                    break;
                case "mfg":
                    newLot.FechaFabricacion = value;
                    break;
                case "exp":
                    newLot.FechaVence = value;
                    break;
                case "healthRegister":
                    newLot.RegistroSanitario = value;
                    break;
                default:
                    return;
            }
            modifyLot(index, newLot, lot?.Id);
        },
        [index, modifyLot, lot]
    );

    const handleRemove = useCallback(
        async (event) => {
            await fetchRemoveLot(Codigo, CodTransac, lot?.Id);
        },
        [Codigo, lot, fetchRemoveLot]
    );

    const toggleDisplaySearch = useCallback(
        debounce(() => {
            if (displaySearch) {
                setLotField(lot?.Lote);
            }
            setDisplaySearch(!displaySearch);
        }, 250),
        [setDisplaySearch, displaySearch, lot]
    );

    const mapper = useCallback(
        function mapLotsToRows(lot, index) {
            return (
                <tr
                    key={index}
                    onMouseDown={handleSelect(lot)}
                    className="cursor-pointer"
                >
                    <td>{lot?.CodTransac}</td>
                    <td>{lot?.Ubicacion}</td>
                    <td>{lot?.Lote}</td>
                    <td>{sqlToInput(lot?.FechaFabricacion || "")}</td>
                    <td>{sqlToInput(lot?.FechaVence || "")}</td>
                    <td>{lot?.RegistroSanitario}</td>
                </tr>
            );
        },
        [modifyLot, handleSelect]
    );

    const onNewLot = useCallback(
        async (event, searchField) => {
            if (
                lot.FechaVence &&
                lot?.FechaVence != "0000-00-00 00:00:00" &&
                searchField
            ) {
                const newLot = {
                    ...lot,
                    Lote: searchField,
                };
                return await Axios.post(`/api/inventory/${Codigo}/lot`, newLot)
                    .then(({ data }) => {
                        modifyLot(
                            index,
                            {
                                ...data,
                                CodTransacLote: data?.CodTransac,
                                Cantidad: lot?.Cantidad,
                            },
                            lot?.Id
                        );
                        setDisplaySearch(false);
                    })
                    .catch();
            }
            return "no";
        },
        [index, lot, Codigo]
    );

    return lot ? (
        <>
            <tr>
                <td>{lot?.CodTransacLote ?? ""}</td>
                <td>
                    <FormControl
                        isInvalid={over}
                        name="quantity"
                        size="sm"
                        type="number"
                        placeholder="Cantidad"
                        value={lot?.Cantidad ?? ""}
                        onChange={handleChange}
                        disabled={!lot?.CodTransacLote}
                    />
                </td>
                <td>
                    <InputGroup>
                        <FormControl
                            type="text"
                            size="sm"
                            className="lot"
                            required
                            name="lot"
                            placeholder="Buscar Lote"
                            value={lotField /*|| lot.Lote*/}
                            /*readOnly
                        onClick={showModal}*/
                            onChange={handleChangeLot}
                            onFocus={handleOnFocus}
                            onBlur={handleOnFocusOut}
                        />
                        <InputGroup.Append>
                            <Button size="sm" onClick={toggleDisplaySearch}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </td>

                <td>
                    <FormControl
                        type="date"
                        size="sm"
                        name="mfg"
                        placeholder="Fecha de Fabricación"
                        value={sqlToInput(lot?.FechaFabricacion) ?? ""}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <FormControl
                        type="date"
                        size="sm"
                        name="exp"
                        placeholder="Fecha Vence"
                        required
                        value={sqlToInput(lot?.FechaVence) ?? ""}
                        onChange={handleChange}
                    />
                </td>
                <td>{lot?.Ubicacion ?? ""}</td>
                <td>
                    <FormControl
                        type="text"
                        size="sm"
                        name="healthRegister"
                        placeholder="Registro Sanitario"
                        value={lot?.RegistroSanitario ?? ""}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <AsyncButton
                        spanText="-"
                        className="m-0 h-100 w-100"
                        variant="danger"
                        action={handleRemove}
                    />
                </td>
            </tr>
            {displaySearch ? (
                <tr>
                    <td colSpan="8">
                        <SearchTable
                            route={`/api/inventory/${Codigo}/lot/search`}
                            className="p-0 m-0"
                            headers={headers}
                            params={`location=A${currentLocation.A}`}
                            searchField={lotField}
                            mapper={mapper}
                            onNew={onNewLot}
                            newBtnDisabled={
                                !lot.FechaVence ||
                                lot?.FechaVence == "0000-00-00 00:00:00"
                            }
                        />
                    </td>
                </tr>
            ) : null}

            {/*modalIsShowing ? (
                <LotSearchModal
                    Codigo={Codigo}
                    show={modalIsShowing}
                    onHide={hideModal}
                    onSelect={handleSelect}
                    params={`location=A${currentLocation.A}`}
                />
            ) : null*/}
        </>
    ) : null;
};

const mapStateToProps = ({
    inventarioFisico: { CodTransac, Codigo },
    currentLocation,
    overDistributed,
}) => ({
    CodTransac,
    Codigo,
    currentLocation,
    over: overDistributed,
});

const mapDispatchToProps = (dispatch) => ({
    changeLot: (id, lot) => dispatch(changeLot(id, lot)),
    modifyLot: (index, lot, Id, selected) =>
        dispatch(modifyLot(index, lot, Id, selected)),
    fetchRemoveLot: fetchRemoveLot(dispatch),
});

export default LotRow;
