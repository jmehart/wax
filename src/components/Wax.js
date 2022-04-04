import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Wax.css";
import { Artist } from "./routes/Artist/index.js";
import { Search } from "./routes/Search/index.js";



//route has customer rendering function to specify if needed
//when the url is that, render this component..
//if you need logic for which componenet should be rendered, then include function like the one below that has wax_user
//if user has logged in, then render nav bar and components
//else if local storage key does not exist, then no one logged in and we redirect to /login url
//this renders /login route path
export const Wax = () => (
    <>

        <Route
            render={() => {
                if (localStorage.getItem("wax_user")) {
                    return (
                        <>
                            <NavBar />
                            <ApplicationViews />
                                
                                
                                <Switch>
                                    <Route path="/artist" component={Artist} />
                                    <Route path="/" component={Search} />
                                </Switch>
                         
                        </>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
);