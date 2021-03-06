import React from "react"
//import thirds party dom "link" that allows us to do routing
import { Link } from "react-router-dom"
import "./NavBar.css"
import "../images/69524.png"

//Display navbar with href links to files
//at attribute "to=" it will render a hyperlink in your DOM, and when clicked, it will change the URL in the browser to the value of the to attribute
//"to=" matches "path" in ApplicationViews file
//logout Link includes click event to remove the honey_customer from localStorage in order to remove authentication and go back to login
//Wax.js shows this re-render when local storage doesn't have the authentication we need
export const NavBar = (props) => {
    return (
        <nav className="slidemenu">


            <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" defaultChecked />

            <label htmlFor="slide-item-1">
                <Link id="nav-item-1" className="navLink" to="/" style={{ textDecoration: 'none' }}>
                    <p className="icon"><img className="homeIcon" alt="home icon" src={require("../images/69524.png")} /></p>
                    <span>Home</span>
                </Link>
            </label>



            <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" />
            <label htmlFor="slide-item-2">
                <Link id="nav-item-2" className="navLink" to="/crate" style={{ textDecoration: 'none' }}>
                    <p className="icon">★</p>
                    <span>Crate</span>
                </Link>
            </label>


            <input type="radio" name="slideItem" id="slide-item-3" className="slide-toggle" />
            <label htmlFor="slide-item-3">
                <Link id="nav-item-3" className="navLink" to="/collection" style={{ textDecoration: 'none' }}>
                    <p className="icon">♬</p>
                    <span>Collection</span>
                </Link>
            </label>


            <input type="radio" name="slideItem" id="slide-item-4" className="slide-toggle" />
            <label htmlFor="slide-item-4">
                <Link id="nav-item-4" className="navLink" to="#"
                    style={{ textDecoration: 'none' }}
                    onClick={() => {
                        localStorage.removeItem("wax_user")
                    }}>
                    <p className="icon"><img className="logoutIcon" alt="logout icon" src={require("../images/1200px-OOjs_UI_icon_logOut-ltr.svg.png")} /></p>
                    <span>Logout</span>
                </Link>
            </label>

            <div className="clear"></div>

            <div className="slider">
                <div className="bar"></div>
            </div>

        </nav>

    )
}