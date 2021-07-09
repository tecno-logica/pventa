import React from "react";

const InputGroup = ({ small }) => (
    <div className={`input-group ${small ? "input-group-sm" : ""}`}></div>
);

export default InputGroup;
