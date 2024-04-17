import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = () : JSX.Element => {
    const [isActive, setActive] = useState(false);

    const toggleActive = () : void => {
        setActive(!isActive);
    };

    return(
    <>
        <header className="section">
            <nav className="navbar is-link is-fixed-top" role="navigation">
                <div className="navbar-brand">
                    <Link to={""} className="navbar-item"><FontAwesomeIcon icon={faAnchor} /></Link>

                    <a className={`navbar-burger ${isActive ? "is-active" : ""}`} role="button" onClick={toggleActive}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                    <Link to={"/ships"} className="navbar-item">Ships</Link>

                    <Link to={"/"} className="navbar-item">About</Link>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <span className="navbar-link">WoWs Resources</span>

                        <div className="navbar-dropdown">
                            <a className="navbar-item" href="https://worldofwarships.com/" target="_blank">WoWs Website</a>
                            <a className="navbar-item" href="https://na.wows-numbers.com/" target="_blank">WoWs Stats & Numbers</a>
                            <a className="navbar-item" href="https://shiptool.st/" target="_blank">WoWs Ship Tool</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <Outlet />
    </>
    );
}

export default Navbar;