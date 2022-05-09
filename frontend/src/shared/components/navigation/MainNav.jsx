import { useState } from "react";

import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideMenu from "./SideMenu";
import Backdrop from "../UI-elements/Backdrop";

import "./mainNav.css";

const MainNav = (props) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const openMenuHandler = () => {
        setMenuIsOpen(true);
    };

    const closeMenuHandler = () => {
        setMenuIsOpen(false);
    };

    return (
        <>
            {menuIsOpen && <Backdrop onClick={closeMenuHandler} />}
            <SideMenu show={menuIsOpen} onClick={closeMenuHandler}>
                <nav className="main-nav_menu-nav">
                    <NavLinks />
                </nav>
            </SideMenu>
            <MainHeader>
                <button className="main-nav_btn" onClick={openMenuHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className="main-nav_title">
                    <Link to="/weeat">WeEat</Link>
                </h1>
                <nav className="main-nav_header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNav;
