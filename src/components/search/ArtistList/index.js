import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



import { List } from "../List";

import styles from "./artistList.module.css";

export const ArtistList = props => {
 
  /*
  const [discogsData, setDiscogsData] = useState([])

  //useState returns an array
  //built in function/hook - useEffect - takes two arguments (function and array)
  //useEffect's purpose is to run code when state changes
  //observing initial state
 useEffect(
      //get data from API and pull it into application state of products
      (id) => {
        
          //crate links to recordId and userId
          fetch(`http://localhost:8088/releases?id=${id}`)
              .then(res => res.json())
              .then((discogsArray) => {
                  //you can not directly modify state in React - you always have to use the function that it provided you in useState
                  //arguement is what you want the state to be
                  setDiscogsData(discogsArray)
              })
      },
      []
  )

  const saveSearch = (event) => {
    event.preventDefault()

    
    const newRecord = {
      
      album: artist.album,
      artist: artist.artist,
      genreId: form.genreId,
      value: form.value,
      releaseDate: form.releaseDate,
      catalogNumber: form.catalogNumber,
      albumCover: form.albumCover,
      rating: ""
    }
  }
  */
  

  const mapArtists = artists =>
    artists.map(artist => {
      return (
        <>
          <div className={styles.artist} to={`releases?id=${artist.id}`}
            exact="false">
            <img className={styles.image} alt="albumImage" src={artist.thumb}></img>
            <div className={styles.name}>{artist.title}</div>
            <div className={styles.name}><b>{artist.catno}</b></div>
            <div className={styles.name}>{artist.year}</div>
            <div className={styles.name}>{artist.genre}</div>
            <div className={styles.name}>{artist.country}</div>



            <div className={styles.searchBtn}>
              <div className={styles.collectionBtn}>
                <button className={styles.btn}

                >
                  Add to Collection
                </button>
              </div>
              <div className={styles.crateBtn}>
                <button className={styles.btn}

                >
                  Add to Crate
                </button>
              </div>
            </div>
          </div>

        </>

      );
    });

  return props.artists.length > 0 ? (
    <List items={mapArtists(props.artists)} />
  ) : (
    <div></div>
  );
};