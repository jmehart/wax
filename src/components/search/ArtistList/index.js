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
          to={`artist?id=${artist.id}`}
          exact={false}
        >
          <div className={styles.artist}>
            <div className={styles.name}>{artist.title}</div>
            <div className={styles.name}>{artist.catno}</div>
            <img className="cover" alt="albumCover" src={artist.thumb} />
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