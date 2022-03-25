import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Collection.css"


/*
THIS MODULE IS RESPONSIBLE FOR LISTING AN HTML REPRESENTATION OF A USER'S COLLECTION
INCLUDES ARTIST NAME, ALBUM NAME, COVER PHOTO, AND REMOVE BUTTON IN EACH RECORD CONTAINER
*/

export const CollectionList = (props) => {
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



    //HISTORY WILL ALLOW THE USER TO REFRESH THE COLLECTION PAGE    
    const history = useHistory()

    //NEED A DELETE METHOD FETCH TO ACCEPT THE ID OF A RECORD IN THE COLLECTION 
    //AND REMOVE THE OBJECT STORING RECORDID AND USERID FROM THE COLLECTION ARRAY
    //NOT DELETING RECORD OBJECT FROM RECORD ARRAY IN CASE I NEED THAT DATA FOR LATER USE
    const deleteRecordInCollection = (id) => {
        fetch(`http://localhost:8088/collection/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                history.go("/collection")
            })
    }
    //TO DISPLAY TOTAL VALUE OF RECORD COLLECTION - CREATE FUNCTION TO ADD SUM OF VALUE PROPERTY
    //REDUCE METHOD WILL DO THIS
    const totalValue = (userCollection.reduce((a, b) => +a + +b.record.value, 0))
    //PARSEFLOAT TURNS INTO A A FLOAT NUMBER WITH TWO DECIMAL PLACES
    var wholeTotalValue = parseFloat(totalValue).toFixed(2);


    //set up search feature and state
    const [searchInput, setSearchInput] = useState("")


    return (
        //fragment to put children under single component
        <>
            <section className="collectionSection">
                <h1 className="collectionTitle">Collection</h1>
                <div className="totalVal">The total value of your record collection is at least:
                    <h4>${wholeTotalValue}</h4></div>
                <fieldset>
                    <div className="search-form-group">
                        <h3>Search Your Collection</h3>
                        <input
                            autoFocus
                            type="text"
                            className="search-control"
                            placeholder="Artist, album, year, format..."
                            key="recipe-search"
                            value={searchInput}
                            onChange={(evt) => {
                                setSearchInput(evt.target.value)
                            }} />
                    </div>
                </fieldset>
                {
                    userCollection.filter(collectionObject => {
                        if (searchInput === "") {
                            return collectionObject;
                        } else if (collectionObject.record.artist.toLowerCase().includes(searchInput.toLowerCase())) {
                            return collectionObject;
                        } else if (collectionObject.record.album.toLowerCase().includes(searchInput.toLowerCase())) {
                            return collectionObject;
                        } else if (collectionObject.record.releaseDate.toLowerCase().includes(searchInput.toLowerCase())) {
                            return collectionObject;
                        } else if (collectionObject.record.format.toLowerCase().includes(searchInput.toLowerCase())) {
                            return collectionObject;
                        } 
                    }).map(
                        //paramater captures each individual product object as it iteollections
                        (collectionObject) => {


                            return <div className="collectionContainer" key={`collection--${collectionObject.id}`}>

                                <ul className="collectionList">
                                    <li key={`collectionItem--${collectionObject.record.id}`}>
                                        <Link to={`/records/${collectionObject.record.id}`}>
                                            <h3>{collectionObject.record.album}</h3>
                                        </Link>
                                        <h3>{collectionObject.record.artist}</h3>
                                        <Link to={`/records/${collectionObject.record.id}`}>
                                            <img className="cover" alt="albumCover" src={collectionObject.record.albumCover} />
                                        </Link>
                                    </li>
                                    <div className="collectionBtn">
                                        <button className="btn-collection"
                                            onClick={
                                                (event) => {
                                                    event.preventDefault()
                                                    deleteRecordInCollection(collectionObject.id)
                                                }}>Remove Record</button>
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