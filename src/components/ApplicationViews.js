import React from "react"
import { Route } from "react-router-dom"
import { CollectionList } from "./collection/CollectionList"


import { CrateList } from "./crate/CrateList"

import { HomePage } from "./home/HomePage"
import { Record } from "./records/Record"



//Define how your application will respond when the URL matches each of those patterns
//When a user clicks on one of the hyperlinks in the navigation bar, this code dictates which component should be rendered.
//For invoking <Record />: It has :ticketId(\d+) at the end of the URL. If the URL is http://localhost:3000/recordss/3, the value of 3 will be stored in a variable named recordId. The variable can then be used inside Record component.
export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/crate">
                <CrateList />
            </Route>
            <Route path="/records/:recordId(\d+)">
                <Record />
            </Route>
            <Route exact path="/collection">
                <CollectionList />
            </Route>

        </>
    )
}