import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import { existingUserInfo, sendNewUser } from "../APIManager"
import "./Register.css"

/*
THIS MODULE IS RESPONSIBLE FOR REGISTERING A NEW USER
IT ADDS A WAX_USER TOKEN TO AUTHENTICATE A USER AND RENDERS THE HOME PAGE WHEN USER CREATED
IT ALSO ADD THE USER TO THE USERS ARRAY IN THE API
*/

//EXPORT A REGISTER FUNCTION TO ROUTE IN WAX.JS
export const Register = (props) => {
    //ACCESS AND ALTER USER STATE
    const [user, setUser] = useState({})
    //CONFLICTDIALOGUE IS FOR MODAL WHEN REGISTRATION FINDS AN EXISTING USER WITH INPUT VALUES
    const conflictDialog = useRef()

    const history = useHistory()

    //CHECK IF THERE'S AN EXISTING USER
    const existingUserCheck = () => {
        //USE FETCH CALL EXISTINGUSERCHECK FROM APIMANAGER.JS
        return existingUserInfo(user)
            .then(user => !!user.length)
    }
    //REGISTER EVENT HANDLER
    const handleRegister = (e) => {
        e.preventDefault()
        //INVOKE THE EXISTINGUSERCHECK FUNCTION
        existingUserCheck()
            .then((userExists) => {
                //CONDITIONAL TO CHECK IF USER DOESN'T ALREADY EXIST AND THEN INVOKE SENDNEWUSER FETCH CALL FROM APIMANAGER.JS TO POST USER
                if (!userExists) {
                    sendNewUser(user)
                        .then(createdUser => {
                            //THEN GIVE THE NEW USER A TOKEN WITH ID AND PUSH THE HOME PAGE
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("wax_user", createdUser.id)
                                history.push("/")
                            }
                        })
                } //IF USER ALREADY EXISTS - DISPLAY MODAL THAT ALERTS THAT USER ALREADY EXISTS AND CAN'T LOG IN
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    //EVENT HANDLER TO UPDATE THE USER STATE
    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    //RETURN HTML FOR REGISTRATION FORM
    //INCLUDE MODAL DETAILS FIRST FOR DISPLAYING ERROR/CANT REGISTER MESSAGE
    //REGISTRATION FIELDS SECTION - INCLUDE PASSWORD LATER
    //REGISTER BUTTON
    return (
        <main className="container--register" style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Wax</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
            <section className="link--backToLogin">
                <Link to="/login">Go Back to Login</Link>
            </section>
        </main>
    )
}