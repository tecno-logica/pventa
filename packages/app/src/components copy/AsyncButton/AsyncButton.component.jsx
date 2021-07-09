import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const AsyncButton = ({
    condition = true,
    action = async () => {},
    spanText,
    disabled = false,
    onClick,
    children,
    ...buttonProps
}) => {
    const [loading, setLoading] = useState(false);
    const mounted = useRef(false);
    const handleClick = useCallback(
        debounce((event) => {
            if (action) {
                if (!loading) {
                    if (mounted.current) setLoading(true);
                    return action(event)
                        ?.then((response) => {
                            onClick && onClick(response);
                            return response;
                        })
                        .finally((response) => {
                            if (mounted.current) setLoading(false);
                            return response;
                        });
                }
            }
        }, 250),
        [action, loading]
    );
    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });

    return condition ? (
        <Button
            variant="primary"
            size="sm"
            disabled={disabled || loading}
            onClick={handleClick}
            {...buttonProps}
        >
            {loading ? (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            ) : null}
            <span className={`${loading ? "ml-1" : ""}`}>
                {spanText || children}
            </span>
        </Button>
    ) : null;
};

export default AsyncButton;
