import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { checkUserEmail } from "../APIManager";
import "./Login.css"

/*
THIS MODULE IS RESPONSIBLE FOR LOGGING IN AN EXISTING USER
IT CHECKS THE WAX_USER TOKEN TO AUTHENTICATE A USER AND RENDERS THE HOME PAGE IF USER EXISTS IN API
*/

//EXPORT A LOGIN FUNCTION TO ROUTE IN WAX.JS
export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    //CHECK IF THERE'S ALREADY AN EXISTING USER
    const existingUserCheck = () => {
        //USE FETCH FROM APIMANAGER.JS
        return checkUserEmail(email)
            .then(user => user.length ? user[0] : false)
    }

    //LOGIN EVENT LISTENER
    const handleLogin = (e) => {
        e.preventDefault()
        //INVOKE THE EXISTINGUSERCHECK FUNCTION FIRST TO CHECK IF USER EXISTS
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    //IF USER EXISTS - store new user in local storage with primary key AND LOGIN TO HOME PAGE
                    localStorage.setItem("wax_user", exists.id)
                    history.push("/")
                } else {
                    //IF USER DOESN'T EXIST - DISPLAY POP UP 
                    existDialog.current.showModal()
                }
            })
    }

    //RENDER HTML FOR LOGIN FORM
    //STARTS WITH MODAL POP UP INFO
    //THEN SIGN IN SECTION
    //INCLUDE INPUTS FOR EMAIL - ADD PASSWORD AND ENCRIPTION LATER
    //ADD SIGN IN BUTTON
    //INCLUDE LINK TO REGISTER IF NOT A USER YET - LINKS TO /REGISTER PAGE
    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="loginTitle">Wax</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button className="loginBtn" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}