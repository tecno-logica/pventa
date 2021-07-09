import React, { useEffect, useState } from "react";
import NextLink from "next/link";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useLogoutMutation, useMeQuery, User } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Navigation = () => {
  const [{ data, fetching }] = useMeQuery();
  const [_, logout] = useLogoutMutation();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!fetching && data?.me) {
      setUser(data.me);
    }
  }, [fetching, data]);

  return (
    <Navbar bg="white" expand="md" className="navbar-light shadow-sm">
      <Container>
        <Navbar.Brand href="#home">PVenta</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/empresa">Cambiar Empresa</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            {user ? (
              <>
                <Nav.Link>
                  <NextLink href="/me">
                    {user.firstName + " " + user.lastName}
                  </NextLink>
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    logout();
                    setUser(undefined);
                  }}
                >
                  <NextLink href="/login">Sign out</NextLink>
                </Nav.Link>
              </>
            ) : (
              <Navbar.Text>
                <NextLink href="/login">Sign in</NextLink>
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  /*
    return (
        <nav
            id="topbar"
            className="navbar navbar-expand-md navbar-light bg-white shadow-sm"
        >
            <div className="container-fluid">
                <div>
                    {/* <button
                        className="hamburger btn btn-sm mr-3"
                        onClick={toggleShowSidebar}
                    >
                        &#9776;
                    </button> }
                    <Link to="/" className="navbar-brand">
                        {name}
                    </Link>
                </div>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto"></ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/empresa" className="nav-link">
                                Cambiar Empresa
                            </Link>
                        </li>

                        {currentUser ? (
                            <>
                                {currentCompany &&
                                    usuario &&
                                    usuario.PROFILEID === "ADMIN" && (
                                        <li className="nav-item dropdown">
                                            <a
                                                id="reportsDropDown"
                                                className="nav-link dropdown-toggle"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Reportes
                                                <span className="caret" />
                                            </a>

                                            <div
                                                className="dropdown-menu dropdown-menu-right"
                                                aria-labelledby="reportsDropDown"
                                            >
                                                <button className="btn dropdown-item">
                                                    Ventas por Período
                                                </button>
                                                <button className="btn dropdown-item">
                                                    Reporte de Ventas
                                                </button>
                                            </div>
                                        </li>
                                    )}
                                <li className="nav-item dropdown">
                                    <a
                                        id="userSettingsDropdown"
                                        className="nav-link dropdown-toggle"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {currentUser.name}
                                        <span className="caret"></span>
                                    </a>

                                    <div
                                        className="dropdown-menu dropdown-menu-right"
                                        aria-labelledby="userSettingsDropdown"
                                    >
                                        <Link
                                            className="dropdown-item"
                                            to="/change-password"
                                        >
                                            Cambiar contraseña
                                        </Link>
                                        {!currentUser.role && (
                                            <>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/admin"
                                                >
                                                    Administrar
                                                </Link>
                                                <span
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        showModal(
                                                            modalActionTypes.COMPANIES_SHOW
                                                        );
                                                    }}
                                                >
                                                    Cambiar Empresa
                                                </span>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/admin/register"
                                                >
                                                    Nuevo Usuario
                                                </Link>
                                            </>
                                        )}
                                        <Link
                                            className="dropdown-item"
                                            to="/quote"
                                            onClick={logout}
                                        >
                                            Salir
                                        </Link>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Iniciar Sesion
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );*/
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Navigation);
