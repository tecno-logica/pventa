import React from "react";
import tachyons from "tachyons";

const FieldError = ({ errors }) => {
    if (!errors) {
        return null;
    }
    const strongs = errors.map((error, i) => <strong key={i}>{error}</strong>);
    return (
        <span className="invalid-feedback" role="alert">
            {strongs}
        </span>
    );
};

export default FieldError;
