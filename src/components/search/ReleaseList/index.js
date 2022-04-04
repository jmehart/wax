import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import Carousel from 'react-elastic-carousel';

import styles from "./releaseList.module.css";

export const ReleaseList = ({ release }) => {

  const [records, setRecords] = useState([])
  const [videoLinks, setVideoLinks] = useState([])
  useEffect(() => {
    fetch("https://wax-api-bcskd.ondigitalocean.app/records")
      .then((res) => res.json())
      .then((recordData) => {
        setRecords(recordData)
      });
  }, []);

  useEffect(() => {
    //SPLIT VIDEO TO ALLOW YOUTUBE EMBED 

    if (release.videos) {
      let copy = [...videoLinks]
      for (const video of release.videos) {
        const file = video.uri
        let [a, filename] = file.split("watch?v=")
        copy.push("http://www.youtube.com/embed/" + filename)

      }
      setVideoLinks(copy)
    }

  }, [release]);

  //ACCESS GENRE ARRAY STATE TO HAVE DROPDOWN FOR ALL GENRES
  const [genreChoices, setGenreChoice] = useState([]);

  //FETCH CALL TO ACCESS GENRES AND SET A GENRE CHOICE
  useEffect(() => {
    fetch("https://wax-api-bcskd.ondigitalocean.app/genres")
      .then((res) => res.json())
      .then((genres) => {
        setGenreChoice(genres)
      });
  }, []);

  const genreMatch = genreChoices.find((genreObject) => {
    if (release.genres?.[0] === genreObject.genre) {
      return genreObject.id
    }
  })
  //   return <option key={`${genreObject.id}`} value={genreObject.id}>{genreObject.genre}</option>


  // IF GENRE.GENRE === release.genres?.[0]
  //GET GENRE.ID AND POST IN NEWRECORD OBJECT BELOW FOR GENREID PROPERTY


  const [destination, updateDestination] = useState("")


  const history = useHistory()
  //EVENT HANDLER TO SAVE THE FORM VALUES AS NEW OBJECT
  const saveRecordObj = () => {


    //create new object based on form input
    const newRecord = {
      album: release.title,
      artist: release.artists_sort,
      genreId: genreMatch.id,
      value: release.lowest_price,
      releaseDate: release.released_formatted,
      catalogNumber: release.labels?.[0].catno,
      albumCover: release.thumb,
      rating: release.community?.rating?.average,
      format: release.formats?.[0].descriptions.join("/ ")
    }
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRecord)
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
    return fetch("https://wax-api-bcskd.ondigitalocean.app/records", fetchOption)
      .then(response => response.json())
      .then(() => {
        //conditional to update destination state variable to route to certain pages
        if (destination === "crate") {
          history.go("/")
          return fetch("https://wax-api-bcskd.ondigitalocean.app/crate", fetchCrateCollect)
            .then(response => response.json())
        } else if (destination === "collection") {
          history.go("/")
          return fetch("https://wax-api-bcskd.ondigitalocean.app/collection", fetchCrateCollect)
            .then(response => response.json())
        }

      })

  }


  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];




  return (
    <>
      <div className={styles.release}>

        <div className={styles.title}>Album: <b>{release.title}</b></div>
        <div className={styles.artist}>Artist: <b>{release.artists_sort}</b></div>
        <div className={styles.catNo}>Catalog #: <b>{release.labels?.[0].catno}</b></div>
        <img className="cover" alt="albumCover" src={release.thumb} />
        <div className={styles.format}>Format: <b>{release.formats?.[0].descriptions.join(" / ")}</b></div>
        <div className={styles.releaseDate}>Released: <b>{release.released_formatted}</b></div>
        <div className={styles.country}>Country: <b>{release.country}</b></div>
        <div className={styles.label}>Label: <b>{release.labels?.[0].name}</b></div>
        <div className={styles.genre}>Genre: <b>{release.genres?.[0]}</b></div>
        <div className={styles.style}>Style: <b>{release.styles?.[0]}</b></div>
        <div className={styles.rating}>Average Rating: <b>{release.community?.rating?.average}</b>/5</div>
        <div className={styles.price}>Lowest Selling Price: <b>${release.lowest_price}</b></div>

        <fieldset>
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
          <button className="btn btn-add" onClick={saveRecordObj}>
            Add
          </button>
        </div>

      </div>
      <div className="videoContainer">
        <Carousel className="carouselVideo" itemsToShow={1}>
          {videoLinks.map(videoLink => <iframe key={videoLink} width='675' height='400' src={`${videoLink}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>)}
        </Carousel>
      </div>

    </>
  );
};



