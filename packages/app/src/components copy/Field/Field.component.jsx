import React from "react";

const Field = ({ label, id, name, type, onChange }) => {
    return (
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor={id}>
                {label}
            </label>
            <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type={type}
                name={name}
                id={id}
                onChange={onChange}
            />
        </div>
    );
};

export default Field;
