import React from "react";

const SpanSpanInput = ({
    span1 = "",
    span2 = "",
    span1Class = "",
    small = false,
    ...inputAttributes
}) => (
    <div className={`input-group ${small ? "input-group-sm" : ""}`}>
        <div className="input-group-prepend">
            <span className={`input-group-text ${span1Class || ""}`}>
                {span1 || "$"}
            </span>
            <span className="input-group-text">{span2 || "$"}</span>
        </div>
        <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            {...inputAttributes}
        />
    </div>
);

export default SpanSpanInput;
