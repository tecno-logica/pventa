import React, { useCallback, useState } from "react";
import { useSpring } from "react-spring";
import Breadcrumb from "../Breadcrumb/Breadcrumb.component";
import Navigation from "../Navigation/Navigation";
//import Sidebar from "../Sidebar/Sidebar.component";

const NavSideBar = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [{ config, ...props }, set] = useSpring(() => ({
        left: showSidebar ? "0rem" : "-16rem",
        config: { duration: 250 },
    }));

    const toggleShowSidebar = useCallback(() => {
        setShowSidebar(!showSidebar);
        set({
            left: !showSidebar ? "0rem" : "-16rem",
        });
    }, [showSidebar, setShowSidebar, set]);

    /* const onClickOutside = useCallback(() => {
        if (showSidebar) {
            setShowSidebar(false);
            set({
                width: showSidebar ? "14rem" : "0rem",
            });
        }
    }, [showSidebar, setShowSidebar]);
    */

    return (
        <>
            <Navigation toggleShowSidebar={toggleShowSidebar} />
            <div className="wrapper">
                {/* <Sidebar style={props} /> */}
                <Breadcrumb />
                <main className="py-3 my-2" /*onClick={onClickOutside}*/>
                    {children}
                </main>
            </div>
        </>
    );
};

export default NavSideBar;
