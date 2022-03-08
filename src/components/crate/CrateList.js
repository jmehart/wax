import React, { useEffect, useState } from "react"
import "./Crate.css"

export const CrateList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value (I'm getting this value and using it for this function's purpose)
    //useState takes a single arguement - the array input below
    const [crate, setCrate] = useState([])
 
    const userCrate = crate.filter((crateObject) => crateObject.userId === parseInt(localStorage.getItem("wax_user")));
    //useState returns an array
    //built in function/hook - useEffect - takes two arguments (function and array)
    //useEffect's purpose is to run code when state changes
    //observing initial state
    useEffect(
        //get data from API and pull it into application state of products
        () => {
           //crate links to recordId and userId
            fetch(`http://localhost:8088/crate?_expand=record&expand=user&_sort=recordId`)
                .then(res => res.json())
                .then((crateArray) => {
                    //you can not directly modify state in React - you always have to use the function that it provided you in useState
                    //arguement is what you want the state to be
                    setCrate(crateArray)
                })
        },
        []
    )





    return (
        //fragment to put children under single component
        <>
        <section className="crate">
            <h2>Crate</h2>
                {
                    //interpolating an html representation that maps through products
                    userCrate.map(
                        //paramater captures each individual product object as it iterates
                        (crateObject) => {
                            
                            return <div className="crateContainer" key={`crate--${crateObject.id}`}>
                                <ul>
                                <li key={`crateItem--${crateObject.record.id}`}><h3>{crateObject.record.album}</h3>
                                <p>{crateObject.record.artist}</p>
                                <img className="cover" src={crateObject.record.albumCover} />
                                </li>
                                </ul>

                                
                            </div>
                        }
                    )
                }

            </section>
        </>
    )
}
