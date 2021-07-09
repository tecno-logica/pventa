import React from "react";
import ErrorSpan from "../ErrorSpan/ErrorSpan";

const FormInput = ({
    label = "",
    id,
    errors = [],
    className = "",
    Tag = "input",
    labelSize = "4",
    inputSize = "6",
    children,
    ...otherAttributes
}) => {
    return (
        <div className="form-group row">
            <label
                htmlFor={id}
                className={`col-md-${labelSize} col-form-label text-md-right`}
            >
                {label}
            </label>
            <div className={`col-md-${inputSize}`}>
                <Tag
                    id={id}
                    type="text"
                    className={`form-control${
                        errors && errors.length ? " is-invalid" : ""
                    } ${className || ""}`}
                    {...otherAttributes}
                >
                    {children}
                </Tag>

                {errors && errors.length ? (
                    <ErrorSpan>{errors.join(", ")}</ErrorSpan>
                ) : null}
            </div>
        </div>
    );
};

export default FormInput;
