import { NavLink } from "react-router-dom";

import "./navLinks.css";

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/">All Users</NavLink>
            </li>
            <li>
                <NavLink to="/user1/plates">My Plates</NavLink>
            </li>
            <li>
                <NavLink to="/plates/add">Add New Plate</NavLink>
            </li>
            <li>
                <NavLink to="/auth">Authenticate</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;
