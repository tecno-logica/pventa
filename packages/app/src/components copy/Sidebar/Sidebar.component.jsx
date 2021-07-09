import {
    faBoxes,
    faFileInvoice,
    faHandHoldingUsd,
    faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Accordion, useAccordionToggle } from "react-bootstrap";
import { Link } from "react-router-dom";
import { animated } from "react-spring";

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () => {});

    return (
        <li className="sidebar-item" onClick={decoratedOnClick}>
            {children}
        </li>
    );
}

const links = [
    {
        item: "Reportes",
        icon: faFileInvoice,
        submenu: [
            { to: "/", text: "Ventas" },
            { to: "/", text: "Ventas no Ajuste" },
            { to: "/", text: "Reportes" },
        ],
    },
    /*{
        item: "Cuentas x Cobrar",
        svg: (
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="coins"
                className="svg-inline--fa fa-coins fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    fill="white"
                    d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z"
                ></path>
            </svg>
        ),
        submenu: [
            { to: "/quote/archivo", text: "Archivo" },
            { to: "/si", text: "Consulta" },
            { to: "/si1", text: "Reportes" },
        ],
    },
    {
        item: "Cuentas x Pagar",
        svg: (
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="credit-card"
                className="svg-inline--fa fa-credit-card fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    fill="white"
                    d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                ></path>
            </svg>
        ),
        submenu: [],
    },
    {
        item: "Contabilidad",
        svg: (
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="chart-line"
                className="svg-inline--fa fa-chart-line fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    fill="white"
                    d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"
                ></path>
            </svg>
        ),
        submenu: [],
    },
    {
        item: "Bancos",
        svg: (
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="landmark"
                className="svg-inline--fa fa-landmark fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    fill="white"
                    d="M501.62 92.11L267.24 2.04a31.958 31.958 0 0 0-22.47 0L10.38 92.11A16.001 16.001 0 0 0 0 107.09V144c0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16v-36.91c0-6.67-4.14-12.64-10.38-14.98zM64 192v160H48c-8.84 0-16 7.16-16 16v48h448v-48c0-8.84-7.16-16-16-16h-16V192h-64v160h-96V192h-64v160h-96V192H64zm432 256H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
                ></path>
            </svg>
        ),
        submenu: [],
    },
    {
        item: "Utilitarios",
        svg: (
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="stamp"
                className="svg-inline--fa fa-stamp fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    fill="white"
                    d="M32 512h448v-64H32v64zm384-256h-66.56c-16.26 0-29.44-13.18-29.44-29.44v-9.46c0-27.37 8.88-53.41 21.46-77.72 9.11-17.61 12.9-38.39 9.05-60.42-6.77-38.78-38.47-70.7-77.26-77.45C212.62-9.04 160 37.33 160 96c0 14.16 3.12 27.54 8.69 39.58C182.02 164.43 192 194.7 192 226.49v.07c0 16.26-13.18 29.44-29.44 29.44H96c-53.02 0-96 42.98-96 96v32c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-32c0-53.02-42.98-96-96-96z"
                ></path>
            </svg>
        ),
        submenu: [],
    },
    {
        item: "Información",
        svg: (
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="file-invoice"
                className="svg-inline--fa fa-file-invoice fa-w-12"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path
                    fill="white"
                    d="M288 256H96v64h192v-64zm89-151L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm256 304c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-200v96c0 8.84-7.16 16-16 16H80c-8.84 0-16-7.16-16-16v-96c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16z"
                ></path>
            </svg>
        ),
        submenu: [],
    },*/
];

const NavItem = ({ children, to, ...props }) => (
    <li className="sidebar-submenu-item" {...props}>
        <Link to={to}>{children}</Link>
    </li>
);

const mapSidebarSubMenu = (links) =>
    links.map((link, index) => (
        <CustomToggle eventKey={index} key={index}>
            <div className="sidebar-link cursor-pointer">
                <FontAwesomeIcon icon={link.icon} />
                <span className="link-text noselect">{link.item}</span>
            </div>
            {link.submenu.length > 0 ? (
                <Accordion.Collapse eventKey={index}>
                    <ul className="list-unstyled">
                        {link.submenu.map((submenuItem, submenuItemIndex) => (
                            <NavItem key={submenuItemIndex} to={submenuItem.to}>
                                {submenuItem.text}
                            </NavItem>
                        ))}
                    </ul>
                </Accordion.Collapse>
            ) : null}
        </CustomToggle>
    ));

const AccordionItems = mapSidebarSubMenu(links);

const Sidebar = (props) => {
    return (
        <animated.nav
            {...props}
            className="sidebar navbar navbar-dark color-white"
        >
            <Accordion as="ul" className="sidebar-nav">
                <div className="sidebar-item">
                    <Link to="/quote" className="sidebar-link cursor-pointer">
                        <FontAwesomeIcon icon={faHandHoldingUsd} />
                        <span className="link-text noselect">Cotizaciones</span>
                    </Link>
                </div>
                <div className="sidebar-item">
                    <Link
                        to="/inventario"
                        className="sidebar-link cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faBoxes} />
                        <span className="link-text noselect">Inventario</span>
                    </Link>
                </div>
                {AccordionItems}
            </Accordion>
        </animated.nav>
    );
};

export default Sidebar;
