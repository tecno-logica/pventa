import React from "react";

const SpanInput = ({
    span = "",
    className = "",
    small = false,
    CustomInput = "input",
    name = "",
    spanClassName = "",
    ...inputAttributes
}) => (
    <div className={`input-group ${small ? "input-group-sm" : ""}`}>
        <div className="input-group-prepend">
            <span className={`input-group-text ${spanClassName}`}>
                {span || "$"}
            </span>
        </div>
        <CustomInput
            type="text"
            className={`form-control ${className || ""}`}
            name={name}
            aria-label="Amount (to the nearest dollar)"
            {...inputAttributes}
        />
    </div>
);

export default SpanInput;
