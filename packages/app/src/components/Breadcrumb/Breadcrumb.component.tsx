import React, { useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Breadcrumb.styles.scss";

function Breadcrumb({ location: { pathname }, match, history }) {
    const Items = useMemo(() => {
        if (!pathname) return null;
        const paths = pathname.split("/").slice(1);
        const length = paths.length;
        let items = [];
        let url = "";
        const current = {};
        current["aria-current"] = "page";

        if (length) {
            items[0] = (
                <li key={-1} className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
            );
            for (let index in paths) {
                const path = paths[index];
                const last = index == length - 1;
                url += `/${path}`;
                items.push(
                    <li
                        key={index}
                        className={`breadcrumb-item${last ? " active" : ""}`}
                        {...(last ? current : {})}
                    >
                        {last ? (
                            `${path}`
                        ) : (
                            <Link to={`${url}`}>{path || "Home"}</Link>
                        )}
                    </li>
                );
            }
        } else {
            /*
            items[0] = (
                <li key={-1} className="breadcrumb-item" aria-current="page">
                    <Link to="/">Home</Link>
                </li>
            );*/
            return null;
        }
        return items;
    }, [pathname]);

    return (
        <nav id="breadcrumb" aria-label="breadcrumb breadcrumb-sm">
            <ol className="breadcrumb">{Items}</ol>
        </nav>
    );
}

export default React.memo(withRouter(Breadcrumb));
