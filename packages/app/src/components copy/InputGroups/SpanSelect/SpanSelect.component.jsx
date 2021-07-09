import React from "react";

const SpanSelect = ({
    children,
    span = "",
    className = "",
    small = false,
    ...inputAttributes
}) => (
    <div className={`input-group ${small ? "input-group-sm" : ""}`}>
        <div className="input-group-prepend">
            <span className="input-group-text">{span || "$"}</span>
        </div>
        <select
            className={`custom-select ${className || ""}`}
            {...inputAttributes}
        >
            {children}
        </select>
    </div>
);

export default SpanSelect;
