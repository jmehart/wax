import React from "react";
import { NavLink } from "react-router-dom";

import { List } from "../List";

import styles from "./artistList.module.css";

export const ArtistList = props => {

  const mapArtists = artists =>
    artists.map(artist => {
      return (
        <>
          <div className={styles.artist} to={`releases?id=${artist.id}`}
            exact={false}>
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