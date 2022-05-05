import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthenticationContext } from "../../context/auth-usecontext";

import Button from "../form-elements/Button";

import "./navLinks.css";

const NavLinks = (props) => {
    const auth = useContext(AuthenticationContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/home">Home</NavLink>
            </li>
            <li>
                <NavLink to="/users">All Users</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/user1/plates">My Plates</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/plates/add">Add New Plate</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">Login</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <Button inverse onClick={auth.logout}>
                        Logout
                    </Button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
