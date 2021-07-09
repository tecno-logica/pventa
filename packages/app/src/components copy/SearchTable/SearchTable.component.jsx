import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import debounce from "lodash/debounce";
import Spinner from "react-bootstrap/Spinner";
import AsyncButton from "../AsyncButton/AsyncButton.component";
import "./SearchTable.styles.scss";

const SearchTable = ({
    route = "/",
    headers = [],
    mapper = () => <tr></tr>,
    minLenght = 2,
    params = "",
    paginated = true,
    searchField = "",
    automatic = true,
    maxHeight = "auto",
    newBtnDisabled = false,
    onNew,
    ...tableProps
}) => {
    const [results, setResults] = useState([]);
    const [fetching, setFetching] = useState(false);
    const promise = useRef();
    const previousField = useRef(automatic ? null : searchField);
    const mounted = useRef(false);

    const cancelPromise = useCallback(() => {
        if (promise.current) {
            promise.current.cancel("Canceled");
        }
    }, [promise]);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
            cancelPromise();
        };
    }, []);

    const getData = useCallback(
        debounce((page, searchField = "", scrolled = false) => {
            if (page > results.last_page) return;
            setFetching(true);

            cancelPromise();
            promise.current = axios.CancelToken.source();
            axios
                .get(
                    `${route}?page=${page}${
                        params && `&${params}`
                    }&searchField=${searchField}`,
                    {
                        cancelToken: promise.current.token,
                    }
                )
                .then(({ data: response }) => {
                    if (!mounted.current) {
                        return;
                    }
                    if (Array.isArray(response?.data)) {
                        if (scrolled) {
                            response.data = [...results.data, ...response.data];
                        }

                        setResults(response);
                    }
                })
                .catch(() => {})
                .finally(() => {
                    if (mounted.current) {
                        setFetching(false);
                    }
                });
        }, 250),
        [results, params, mounted, setFetching]
    );

    useEffect(() => {
        if (previousField.current != searchField) {
            getData(1, searchField);
            previousField.current = searchField;
        }
    }, [searchField]);

    const TableHeads = useMemo(
        () => headers?.map((key, index) => <th key={index}>{key}</th>),
        [headers]
    );

    const DataRows = useMemo(
        () =>
            results.data?.length ? (
                results.data?.map((...mapArgs) => mapper(...mapArgs, results))
            ) : (
                <tr>
                    <td colSpan={headers?.length}>
                        No hay resultados que mostrar
                    </td>
                </tr>
            ),
        [results, headers]
    );

    const handleScroll = useCallback(
        ({ target: { scrollHeight, offsetHeight, scrollTop } }) => {
            if (scrollTop === scrollHeight - offsetHeight) {
                getData(results.current_page + 1, searchField, true);
            }
        },
        [results, searchField, getData]
    );

    const handleAddNew = useCallback(
        debounce(async (event) => {
            await onNew(event, searchField);
        }, 250),
        [onNew, searchField]
    );

    return (
        <div className="m-0 p-0 search-table h-100" onScroll={handleScroll}>
            <Table bordered hover size="sm" {...tableProps} responsive>
                <thead>
                    <tr>{TableHeads}</tr>
                </thead>
                <tbody>
                    {DataRows}
                    {fetching && (
                        <tr>
                            <td colSpan={headers.length} align="center">
                                <Spinner
                                    size="sm"
                                    animation="border"
                                    variant="info"
                                />
                            </td>
                        </tr>
                    )}

                    {onNew && typeof onNew == "function" && (
                        <tr>
                            <td colSpan={TableHeads.length} className="m-0">
                                <AsyncButton
                                    spanText="Nuevo"
                                    className="w-100 h-100"
                                    size="sm"
                                    variant="success"
                                    action={handleAddNew}
                                    disabled={!searchField || newBtnDisabled}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default SearchTable;
