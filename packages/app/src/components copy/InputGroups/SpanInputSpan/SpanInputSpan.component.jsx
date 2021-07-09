import React from "react";

const SpanInputSpan = ({
    children,
    span1 = "",
    span2 = "",
    className = "",
    small = false,
    CustomInput = "input",
    ...inputAttributes
}) => (
    <div className={`input-group ${small ? "input-group-sm" : ""}`}>
        <div className="input-group-prepend">
            <span className="input-group-text">{span1 || "$"}</span>
        </div>
        {
            <CustomInput
                type="text"
                aria-label="Amount (to the nearest dollar)"
                className={`form-control ${className || ""}`}
                {...inputAttributes}
            />
        }
        <div className="input-group-append">
            <span className="input-group-text">{span2 || "$"}</span>
        </div>
    </div>
);

export default SpanInputSpan;
