import axios from "axios";
import padStart from "lodash/padStart";

export function getFirstEntry() {
    return axios.get("/api/inventory/physical").catch(() => {});
}

export const handleChange = function (validate) {
    return function (setFunction) {
        return function (event) {
            let value = event.target.value;
            if (validate(value)) {
                return setFunction(Math.abs(value));
            }
        };
    };
};

export function locationValidation(value) {
    if (value.length > 2) {
        return false;
    } else {
        return true;
    }
}

export const locationInputChangeHandler = (setFunction) =>
    handleChange(locationValidation)(setFunction);

export const handleLocationInputsFocusOut = (setFunction) => (state) =>
    setFunction(padStart(state, 2, "0"));

export const explodeLocation = (location) => {
    return `A${location.A}${+location.F ? `F${location.F}` : ""}${
        +location.W ? `W${location.W}` : ""
    }${+location.T ? `T${location.T}` : ""}${
        +location.B ? `B${location.B}` : ""
    }`;
};
