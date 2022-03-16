import React from "react";
import { NavLink } from "react-router-dom";

import { List } from "../List";

import styles from "./artistList.module.css";

export const ArtistList = props => {
  const mapArtists = artists =>
    artists.map(artist => {
      return (
        <NavLink
          className={styles.link}
          to={`releases?id=${artist.id}`}
          exact={false}
        >
          <div className={styles.artist}>
          <img className={styles.image} alt="albumImage" src={artist.thumb}></img>
            <div className={styles.name}>{artist.title}</div>
            <div className={styles.name}>{artist.catno}</div>
            <div className={styles.name}>{artist.year}</div>
            <div className={styles.name}>{artist.genre}</div>
            <div className={styles.name}>{artist.country}</div>
          </div>
        </NavLink>
      );
    });

  return props.artists.length > 0 ? (
    <List items={mapArtists(props.artists)} />
  ) : (
    <div></div>
  );
};