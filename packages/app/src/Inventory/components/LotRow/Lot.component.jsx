import React from "react";
import { sqlToInput } from "../../../../utils";

const Lot = React.memo(({ lot = {}, onSelect = () => {} }) => (
    <tr onMouseDown={onSelect} className="cursor-pointer">
        <td>{lot?.CodTransac}</td>
        <td>{lot?.Ubicacion}</td>
        <td>{lot?.Lote}</td>
        <td>{sqlToInput(lot?.FechaFabricacion || "")}</td>
        <td>{sqlToInput(lot?.FechaVence || "")}</td>
        <td>{lot?.RegistroSanitario}</td>
    </tr>
));
export default Lot;
