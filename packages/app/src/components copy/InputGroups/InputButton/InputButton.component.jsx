import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const InputButton = ({
    buttonSpan = "",
    groupClass = "",
    className = "",
    size = "sm",
    CustomInput = "input",
    ariaLabel = "",
    name = "",
    buttonProps = {},
    ...inputAttributes
}) => (
    <InputGroup size={size} className={groupClass}>
        <CustomInput
            type="text"
            className={`form-control ${className}`}
            name={name}
            aria-label={ariaLabel}
            {...inputAttributes}
        />
        <InputGroup.Append>
            <Button variant="outline-secondary" {...buttonProps}>
                {buttonSpan}
            </Button>
        </InputGroup.Append>
    </InputGroup>
);

export default InputButton;
