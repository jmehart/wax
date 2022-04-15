import React from "react"
import { RecordForm } from "../records/RecordForm"
import "./HomePage.css"
import { Route, Redirect, Switch } from "react-router-dom";
import { Artist } from "/Users/jaimiehart/workspace/wax-deploy/wax/src/components/routes/Artist/index.js";
import { Search } from "/Users/jaimiehart/workspace/wax-deploy/wax/src/components/routes/Search/index.js";

/*
THIS MODULE IS RESPONSIBLE FOR RENDERING THE HOME PAGE
SHOULD DISPLAY THE RECORD FORM
ADD THE SEARCH FIELD LATER AS STRETCH GOAL
*/

//EXPORT A REGISTER FUNCTION TO ROUTE IN WAX.JS
export const HomePage = () => {

    
    return (
        <>
        <h1 className="waxTitle">WAX</h1>
        <Switch>
                                    <Route path="/artist" component={Artist} />
                                    <Route path="/" component={Search} />
                                </Switch>
        
        </>
    )
}


