const INVENTORY_INITIAL_STATE = {
    inventarioFisico: {
        CodTransac: null,
        Codigo: null,
        FechaConteo: "",
        FechaProceso: "",
        Usuario: "",
        Existencia: 0,
    },
    inventario: {
        Codigo: null,
        Descripcion: "",
    },
    inventarioFisicoLote: [],
    currentLocation: { A: "00", F: "00", W: "00", T: "00", B: "00" },
    isDirty: true,
    overDistributed: false,
};

export default INVENTORY_INITIAL_STATE;
