import React from "react";

const ErrorSpan = ({ children }) => (
    <span className="invalid-feedback" role="alert">
        <strong>{children}</strong>
    </span>
);

export default ErrorSpan;
