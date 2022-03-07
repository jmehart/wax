import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export const RecordForm = () => {
    const [form, updateForm] = useState({
        album: "",
        artist: "",
        genreId: "",
        value: "",
        releaseDate: "",
        catalogNumber: "",
        albumCover: "",
        rating: ""
    });

    const [genreChoices, setGenreChoice] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/genres")
            .then((res) => res.json())
            .then((genres) => {
                setGenreChoice(genres)
            });
    }, []);

    const history = useHistory()

    const saveForm = (event) => {
        event.preventDefault()

        const newForm = {
            album: form.album,
            artist: form.artist,
            genreId: form.genreId,
            value: form.value,
            releaseDate: form.releaseDate,
            catalogNumber: form.catalogNumber,
            albumCover: form.albumCover,
            rating: form.rating
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newForm)
        }
        return fetch("http://localhost:8088/records", fetchOption)
            .then(response => response.json())
            .then(() => {
                history.push("/records")
            })

    }

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
                            required autoFocus
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
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Enter Catalog Number"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="addCrate">Add to Crate</label>
                        <input type="radio"
                            name="addRadio"
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.addCrate = evt.target.checked
                                    updateForm(copy)
                                }
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="addCollection">Add to Collection</label>
                        <input type="radio"
                            name="addRadio"
                            onChange={
                                (evt) => {
                                    const copy = { ...form }
                                    copy.addCollection = evt.target.checked
                                    updateForm(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <select onChange={
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
                <button className="btn btn-primary" onClick={saveForm}>
                    Add
                </button>
            </form>
        </div>
    )
}