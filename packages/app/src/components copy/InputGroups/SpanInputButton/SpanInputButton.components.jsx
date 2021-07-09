import React from "react";

const SpanInputButton = ({
    span = "",
    button = "",
    className = "",
    small = false,
    CustomInput = "input",
    buttonProps = {},
    ...inputAttributes
}) => {
    const {
        dataToggle,
        dataTarget,
        ariaExpanded,
        ariaControls,
        ...rest
    } = buttonProps;
    let ButtonProps = { ...rest };
    if (dataToggle) ButtonProps["data-toggle"] = dataToggle;
    if (dataTarget) ButtonProps["data-target"] = dataTarget;
    if (ariaExpanded) ButtonProps["aria-expanded"] = ariaExpanded;
    if (ariaControls) ButtonProps["aria-controls"] = ariaControls;

    return (
        <div className={`input-group ${small ? "input-group-sm" : ""}`}>
            <div className="input-group-prepend">
                <span className="input-group-text">{span || "$"}</span>
            </div>
            {
                <CustomInput
                    type="text"
                    className={`form-control ${className || ""}`}
                    {...inputAttributes}
                />
            }
            <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    {...ButtonProps}
                >
                    {button || ""}
                </button>
            </div>
        </div>
    );
};

export default SpanInputButton;
