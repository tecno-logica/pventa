import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectClients } from "../../redux/company/company.selector";
import { selectCurrentClient } from "../../redux/quote/quote.selector";
import { fetchClient } from "../../redux/quote/quote.actions";
import { removeSpecials } from "../../utils";
import "./ClientList.styles.scss";

const ClientList = ({
    clients,
    cliente,
    className = "",
    readOnly = true,
    fetchClient,
}) => {
    const input = React.createRef();

    useEffect(() => {
        if (!cliente || !cliente.hasOwnProperty("Nombre")) return;
        input.current.value = removeSpecials(cliente.Nombre.toUpperCase());
        return () => {};
    }, [cliente, input, removeSpecials]);

    const fetchTheClient = useCallback(
        (client) => {
            if (typeof client !== "number" || isNaN(client)) return;
            fetchClient(client);
        },
        [fetchClient]
    );

    const clientList = useCallback(() => {
        return clients && clients instanceof Object
            ? clients.map(({ Cliente, Nombre }) => (
                  <option
                      key={Cliente}
                      name={Nombre}
                      value={removeSpecials(Nombre)}
                  />
              ))
            : null;
    }, [clients]);

    const handleOnFocus = useCallback(({ target }) => {
        target.value = "";
    }, []);

    const handleOnBlur = useCallback(
        ({ target }) => {
            if (!cliente) return;
            target.value = removeSpecials(cliente.Nombre);
        },
        [cliente]
    );

    const setCliente = useCallback(
        ({ target }) => {
            const { value } = target;
            const client = clients.filter(
                (client) =>
                    removeSpecials(client.Nombre) === value.toUpperCase()
            );
            if (client.length && client[0].Cliente !== cliente.Cliente) {
                fetchTheClient(client[0].Cliente);
            }
        },
        [removeSpecials, clients, cliente]
    );

    return (
        <div className="client-list-div input-group-sm">
            <input
                id="masterclient"
                className={`${className || ""}`}
                required
                readOnly={readOnly || false}
                ref={input}
                list="clientList"
                type="text"
                placeholder="Cliente"
                onFocus={handleOnFocus}
                onChange={setCliente}
                onBlur={handleOnBlur}
                defaultValue={cliente ? removeSpecials(cliente.Nombre) : ""}
            />
            <datalist id="clientList">{clientList()}</datalist>
        </div>
    );
};
const mapStateToProps = createStructuredSelector({
    clients: selectClients,
    cliente: selectCurrentClient,
});

const mapDispatchToProps = {
    fetchClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
