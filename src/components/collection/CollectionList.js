import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

export const CollectionList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value (I'm getting this value and using it for this function's purpose)
    //useState takes a single arguement - the array input below
    const [collection, setCollection] = useState([])

    const userCollection = collection.filter((collectionObject) => collectionObject.userId === parseInt(localStorage.getItem("wax_user")));
    //useState returns an array
    //built in function/hook - useEffect - takes two arguments (function and array)
    //useEffect's purpose is to run code when state changes
    //observing initial state
    useEffect(
        //get data from API and pull it into application state of products
        () => {
            //collection links to recordId and userId
            fetch(`http://localhost:8088/collection?_expand=record&expand=user&_sort=recordId`)
                .then(res => res.json())
                .then((collectionArray) => {
                    //you can not directly modify state in React - you always have to use the function that it provided you in useState
                    //arguement is what you want the state to be
                    setCollection(collectionArray)
                })
        },
        []
    )

    const history = useHistory()

    const deleteRecordInCollection = (id) => {
        fetch(`http://localhost:8088/collection/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                history.go("/collection")
            })
    }



    return (
        //fragment to put children under single component
        <>
            <section className="collection">
                <h2>Collection</h2>
                {
                    //interpolating an html representation that maps through products
                    userCollection.map(
                        //paramater captures each individual product object as it iteollections
                        (collectionObject) => {

                            return <div className="collectionContainer" key={`collection--${collectionObject.id}`}>
                                <ul>
                                    <li key={`collectionItem--${collectionObject.record.id}`}>
                                    <Link to={`/records/${collectionObject.record.id}`}>
                                    <h3>{collectionObject.record.album}</h3>
                                    </Link>
                                        <p>{collectionObject.record.artist}</p>
                                        <img className="cover" alt="albumCover" src={collectionObject.record.albumCover} />
                                    </li>
                                    <div>
                                        <button className="btn-collection" 
                                        onClick={
                                            (event) => { 
                                                event.preventDefault()
                                                deleteRecordInCollection(collectionObject.id) }}>Remove Record</button>
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