import React from "react";

const ButtonInput = ({
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
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    {...ButtonProps}
                >
                    {button || ""}
                </button>
            </div>
            <input
                type="text"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
                {...inputAttributes}
            />
        </div>
    );
};

export default ButtonInput;
