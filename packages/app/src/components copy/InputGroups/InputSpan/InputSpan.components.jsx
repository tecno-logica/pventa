import React from "react";

const InputSpan = ({
    span = "",
    className = "",
    small = false,
    ...inputAttributes
}) => (
    <div className={`input-group ${small ? "input-group-sm" : ""}`}>
        <input
            type="text"
            className={`form-control ${className || ""}`}
            aria-label="Amount (to the nearest dollar)"
            {...inputAttributes}
        />
        <div className="input-group-prepend">
            <span className="input-group-text">{span || "$"}</span>
        </div>
    </div>
);

export default InputSpan;
