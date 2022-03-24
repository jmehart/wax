import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./Record.css"
/*
THIS MODULE IS RESPONSIBLE FOR THE RECORD INPUT FORM
USERS CAN MANUALLY ENTER RECORD INFO TO EITHER ADD TO CRATE OR COLLECTION
ADDS RECORD TO RECORDS ARRAY IN API AND SHOULD ALSO ADD TO CRATE OR COLLECTION ARRAY AND MATCH CURRENT USER
*/

//EXPORT A RECORDFORM FUNCTION TO ROUTE IN WAX.JS
export const RecordForm = () => {
    const [records, setRecords] = useState([])
    useEffect(() => {
        fetch("http://localhost:8088/records")
            .then((res) => res.json())
            .then((recordData) => {
                setRecords(recordData)
            });
    }, []);
    //DEFINE FORM STATE TO ALTER/UPDATE
    //INIATIATE OBJECT PROPERTIES FOR ADDING TO API WHEN FORM SUBMITTED
    const [form, updateForm] = useState({
        album: "",
        artist: "",
        genreId: "",
        value: "",
        releaseDate: "",
        catalogNumber: "",
        albumCover: "",
        rating: "",
        format: ""
    });

    //create destination state variable to allow radio button selection to route to different pages
    const [destination, updateDestination] = useState("")

    //ACCESS GENRE ARRAY STATE TO HAVE DROPDOWN FOR ALL GENRES
    const [genreChoices, setGenreChoice] = useState([]);

    //FETCH CALL TO ACCESS GENRES AND SET A GENRE CHOICE
    useEffect(() => {
        fetch("http://localhost:8088/genres")
            .then((res) => res.json())
            .then((genres) => {
                setGenreChoice(genres)
            });
    }, []);

    const history = useHistory()
    //EVENT HANDLER TO SAVE THE FORM VALUES AS NEW OBJECT
    const saveForm = (event) => {
        event.preventDefault()

        //create new object based on form input
        const newForm = {
            album: form.album,
            artist: form.artist,
            genreId: form.genreId,
            value: form.value,
            releaseDate: form.releaseDate,
            catalogNumber: form.catalogNumber,
            albumCover: form.albumCover,
            rating: form.rating,
            format: form.format
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newForm)
        } //FETCH RECORDS FROM API
        //create new object for crate or collection based on user
        const crateCollectObject = {
            userId: parseInt(localStorage.getItem("wax_user")),
            recordId: parseInt(records.length + 1)
        }
        const fetchCrateCollect = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crateCollectObject)
        } //FETCH RECORDS FROM API
        return fetch("http://localhost:8088/records", fetchOption)
            .then(response => response.json())
            .then(() => {
                //conditional to update destination state variable to route to certain pages
                if (destination === "crate") {
                    history.go("/")
                    return fetch("http://localhost:8088/crate", fetchCrateCollect)
                        .then(response => response.json())
                } else if (destination === "collection") {
                    history.go("/")
                    return fetch("http://localhost:8088/collection", fetchCrateCollect)
                        .then(response => response.json())
                }

            })

    }

    //RETURN HTML FOR FORM
    //INCLUDE INPUT FIELDS, RADIO BUTTONS, AND DROPDOWN
    //RADIO BUTTONS HAVE DIFFERENT DESTINATION NAMES IN ORDER TO ROUTE CORRECTLY
    //INCLUDE SAVE FORM BUTTON
    return (
        <div className="recordFormParent">
            <form className="recordForm">
                <h2 className="recordForm__title">Add a Record</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="artist">Artist</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.artist = evt.target.value
                                    updateForm(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Enter Artist Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="album">Album</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.album = evt.target.value
                                    updateForm(copy)
                                }
                            }
                            
                            type="text"
                            className="form-control"
                            placeholder="Enter Album Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="catalogNumber">Catalog #</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.catalogNumber = evt.target.value
                                    updateForm(copy)
                                }
                            }
                            
                            type="text"
                            className="form-control"
                            placeholder="Enter Catalog Number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="format">Format</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.format = evt.target.value
                                    updateForm(copy)
                                }
                            }
                            
                            type="text"
                            className="form-control"
                            placeholder="Enter LP, 7 inch, reissue, single, etc."
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="releaseDate">Release Date</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.releaseDate = evt.target.value
                                    updateForm(copy)
                                }
                            }
                            
                            type="text"
                            className="form-control"
                            placeholder="Enter Release Date"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="value">Value</label>
                        <div className="form-group-value">
                        <span className="currency-code">$</span>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.value = evt.target.value
                                    updateForm(copy)
                                }
                            }
                            
                            type="number"
                            prefix="$"
                            min="0"
                            className="form-control-value"
                            placeholder="Enter Value"
                        />
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="value">Rating</label>
                        <div className="form-group-rating"></div>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.rating = evt.target.value
                                    updateForm(copy)
                                }
                            }
                           
                            type="number"
                            min="0"
                            max="5"
                            step="0.10"
                            className="form-control"
                            placeholder="Enter Rating"
                        />
                    </div>
                    <div className="form-group-value"></div>
                </fieldset>
                <fieldset>
                    <div className="form-group-genre">
                        <label className="genreLabel" htmlFor="genre">Genre</label>
                        <select className="genreDrop" onChange={
                            (evt) => {
                                const copy = { ...form }
                                copy.genreId = parseInt(evt.target.value)
                                updateForm(copy)
                            }
                        }>
                            <option value="">Choose a Genre</option>
                            {genreChoices.map((genreObject) => {
                                return <option key={`${genreObject.id}`} value={genreObject.id}>{genreObject.genre}</option>
                            })}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="albumCover">Album Cover</label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.albumCover = evt.target.value
                                    updateForm(copy)
                                }
                            }
                            
                            type="text"
                            className="form-control"
                            placeholder="Enter Image URL"
                        />
                    </div>
                </fieldset>
                <fieldset className="addTo">
                    <div className="form-group">
                    <div className="addToButtons">
                        <label className="radioLabel" htmlFor="addCrate">Add to Crate</label>
                        <input type="radio"
                            name="addRadio"
                            value="crate"
                            onChange={
                                (evt) => {
                                    updateDestination("crate")
                                }
                            } />
                    </div>
                    </div>
                    <div className="form-group">
                        <div className="addToButtons">
                        <label className="radioLabel" htmlFor="addCollection">Add to Collection</label>
                        <input type="radio"
                            name="addRadio"
                            onChange={
                                (evt) => {
                                    updateDestination("collection")
                                }
                            } />
                    </div>
                    </div>
                </fieldset>
                <div className="addBtn">
                <button className="btn btn-add" onClick={saveForm}>
                    Add
                </button>
                </div>
            </form>
        </div>
    )
}