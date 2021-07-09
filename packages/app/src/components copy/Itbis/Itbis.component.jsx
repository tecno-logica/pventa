import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectItbis } from "../../redux/company/company.selector";
import "./Itbis.styles.scss";

const Itbis = ({
    PorcItbis,
    productItbis = 0,
    Itbis = [18, 0],
    small = false,
    readOnly = false,
    onChange,
}) => {
    return productItbis ? (
        <select
            className={`form-control ${
                small ? "form-control-sm" : ""
            } rightJustified`}
            value={PorcItbis}
            onChange={onChange}
            readOnly={readOnly}
        >
            <option value={Itbis[0]}>{Itbis[0]}</option>
            <option value={Itbis[1]}>{Itbis[1]}</option>
        </select>
    ) : (
        <input
            className={`form-control ${
                small ? "form-control-sm" : ""
            } rightJustified`}
            disabled
            value={0}
            onChange={() => {}}
        />
    );
};

const mapStateToProps = createStructuredSelector({
    Itbis: selectItbis,
});

export default connect(mapStateToProps)(Itbis);
