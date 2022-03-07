import React from "react"
//import thirds party dom "link" that allows us to do routing
import { Link } from "react-router-dom"
import "./NavBar.css"

//Display navbar with href links to files
//at attribute "to=" it will render a hyperlink in your DOM, and when clicked, it will change the URL in the browser to the value of the to attribute
//"to=" matches "path" in ApplicationViews file
//logout Link includes click event to remove the honey_customer from localStorage in order to remove authentication and go back to login
    //Repairs.js shows this re-render when local storage doesn't have the authentication we need
export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("wax_user")
                        }
                    }>
                    Logout</Link>
            </li>
        </ul>
    )
}