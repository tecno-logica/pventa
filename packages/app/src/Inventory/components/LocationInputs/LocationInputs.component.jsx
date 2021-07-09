import padStart from "lodash/padStart";
import React, { useCallback, useEffect, useState, useRef } from "react";
import InventoryContext from "../../inventory.context";
import {
    handleLocationInputsFocusOut,
    locationInputChangeHandler,
} from "../../inventory.utils";
import {
    changeCurrentLocation,
    emptyInventory,
} from "../../redux/inventory.actions";

const LocationInputs = ({ dispatch, currentLocation }) => {
    const [almacen, setAlmacen] = useState(currentLocation?.A || "00");
    const [piso, setPiso] = useState(currentLocation?.F || "");
    const [pasillo, setPasillo] = useState(currentLocation?.W || "");
    const [tramo, setTramo] = useState(currentLocation?.T || "");
    const [bandeja, setBandeja] = useState(currentLocation?.B || "");
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) return;

        let warehouse = padStart(almacen, 2, "0"),
            floor = padStart(piso, 2, "0"),
            hall = padStart(pasillo, 2, "0"),
            track = padStart(tramo, 2, "0"),
            tray = padStart(bandeja, 2, "0");

        dispatch(emptyInventory);
        dispatch(
            changeCurrentLocation({
                A: warehouse,
                F: floor,
                W: hall,
                T: track,
                B: tray,
            })
        );
    }, [almacen, piso, pasillo, tramo, bandeja]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
    });

    const almacenFocusOut = useCallback(
        (event) => handleLocationInputsFocusOut(setAlmacen)(almacen),
        [almacen]
    );
    const pisoFocusOut = useCallback(
        (event) => handleLocationInputsFocusOut(setPiso)(piso),
        [setPiso, piso]
    );
    const pasilloFocusOut = useCallback(
        (event) => handleLocationInputsFocusOut(setPasillo)(pasillo),
        [setPasillo, pasillo]
    );
    const tramoFocusOut = useCallback(
        (event) => handleLocationInputsFocusOut(setTramo)(tramo),
        [setTramo, tramo]
    );
    const bandejaFocusOut = useCallback(
        (event) => handleLocationInputsFocusOut(setBandeja)(bandeja),
        [setBandeja, bandeja]
    );

    return (
        <div className="input-group input-group-sm mb-2">
            <div className="input-group-prepend">
                <span className="input-group-text">Ubicación</span>
            </div>
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                    A
                </span>
            </div>
            <input
                id="location"
                type="number"
                aria-label="First name"
                className="form-control form-control-sm"
                placeholder="Almacen"
                value={almacen}
                onChange={locationInputChangeHandler(setAlmacen)}
                onBlur={almacenFocusOut}
            />
            <div className="input-group-prepend">
                <span className="input-group-text ">P</span>
            </div>
            <input
                type="number"
                aria-label="Last name"
                className="form-control form-control-sm"
                placeholder="Piso"
                value={piso}
                onChange={locationInputChangeHandler(setPiso)}
                onBlur={pisoFocusOut}
            />
            <div className="input-group-prepend">
                <span className="input-group-text">H</span>
            </div>
            <input
                type="number"
                aria-label="First name"
                className="form-control form-control-sm"
                placeholder="Pasillo"
                value={pasillo}
                onChange={locationInputChangeHandler(setPasillo)}
                onBlur={pasilloFocusOut}
            />
            <div className="input-group-prepend">
                <span className="input-group-text">T</span>
            </div>
            <input
                type="number"
                aria-label="Last name"
                className="form-control form-control-sm"
                placeholder="Tramo"
                value={tramo}
                onChange={locationInputChangeHandler(setTramo)}
                onBlur={tramoFocusOut}
            />
            <div className="input-group-prepend">
                <span className="input-group-text">B</span>
            </div>
            <input
                type="number"
                aria-label="Last name"
                className="form-control form-control-sm"
                placeholder="Bandeja"
                value={bandeja}
                onChange={locationInputChangeHandler(setBandeja)}
                onBlur={bandejaFocusOut}
            />
        </div>
    );
};

export default function () {
    return (
        <InventoryContext.Consumer>
            {(context) => <LocationInputs {...context} />}
        </InventoryContext.Consumer>
    );
}
