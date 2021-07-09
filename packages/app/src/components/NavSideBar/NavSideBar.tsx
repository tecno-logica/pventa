import React from "react";
import Navigation from "../Navigation/Navigation";

const NavSideBar: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />

      <main>{children}</main>
    </>
  );
};

export default NavSideBar;
