import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

const SideMenu = (props) => {
    const content = (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="side-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="side-menu" onClick={props.onClick}>
                {props.children}
            </aside>
        </CSSTransition>
    );
    return ReactDOM.createPortal(
        content,
        document.getElementById("sidemenu-hook")
    );
};

export default SideMenu;
