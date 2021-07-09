import React from "react";
import tachyons from "tachyons";

const Fieldset = ({ children, legend, id }) => {
    return (
        <fieldset id={id} className="ba b--transparent ph0 mh0">
            {legend ? (
                <legend className="f1 fw6 ph0 mh0">{legend}</legend>
            ) : null}
            {children}
        </fieldset>
    );
};

export default Fieldset;
