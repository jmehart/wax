import React from "react"
import { RecordForm } from "../records/RecordForm"
import "./HomePage.css"

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
        <RecordForm />
        </>
    )
}


