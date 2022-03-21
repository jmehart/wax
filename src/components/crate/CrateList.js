import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
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

 


    const history = useHistory()

    const deleteRecordInCrate = (id) => {
        return fetch(`http://localhost:8088/crate/${id}`, {
            method: "DELETE"
        })

    }


    //CREATE FUNCTION TO MOVE A CRATE RECORD TO COLLECTION AND DELETE FROM CRATE
    const moveToCollection = (id) => {



       
        //create new object for crate or collection based on user
        const crateCollectObject = {
            userId: parseInt(localStorage.getItem("wax_user")),
            recordId: parseInt(id)
        }
        const fetchCrateCollect = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crateCollectObject)
        } 
        return fetch("http://localhost:8088/collection", fetchCrateCollect)
            .then(response => response.json())

    }


    return (
        //fragment to put children under single component
        <>
            <section className="crateSection">
                <h1 className="crateTitle">Crate</h1>
                {
                    //interpolating an html representation that maps through products
                    userCrate.map(
                        //paramater captures each individual product object as it iterates
                        (crateObject) => {

                            return <div className="crateContainer" key={`crate--${crateObject.id}`}>
                                <ul className="crateList">
                                    <li key={`crateItem--${crateObject.record.id}`}>
                                        <Link to={`/records/${crateObject.record.id}`}>
                                            <h3>{crateObject.record.album}</h3>
                                        </Link>
                                        <h3>{crateObject.record.artist}</h3>
                                        <Link to={`/records/${crateObject.record.id}`}>
                                            <img className="cover" alt="albumCover" src={crateObject.record.albumCover} />
                                        </Link>
                                    </li>
                                    <div className="moveBtn">
                                        <button className="btn-move"
                                        id={crateObject.recordId}
                                            onClick={
                                                (event) => {
                                                    
                                                    moveToCollection(event.target.id)
                                                    
                                                    .then(() => {

                                                        return deleteRecordInCrate(crateObject.id)
                                                    })
                                                    .then(() => {
                                                        return fetch(`http://localhost:8088/crate?_expand=record&expand=user&_sort=recordId`)
                                                        .then(res => res.json())
                                                        .then((crateArray) => {
                                                            //you can not directly modify state in React - you always have to use the function that it provided you in useState
                                                            //arguement is what you want the state to be
                                                            setCrate(crateArray)
                                                        })
                                                    })
                                                }}>
                                            Move to Collection
                                        </button>
                                    </div>
                                    <div className="deleteBtn">
                                        <button className="btn-crate"
                                            onClick={
                                                (event) => {
                                                    event.preventDefault()
                                                    deleteRecordInCrate(crateObject.id)
                                                }}>
                                            Remove Record</button>
                                    </div>
                                </ul>


                            </div>
                        }
                    )
                }

            </section>
        </>
    )
}
