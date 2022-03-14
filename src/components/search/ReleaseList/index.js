import React from "react";

import { List } from "../List";

import styles from "./releaseList.module.css";

export const ReleaseList = props => {
  const mapReleases = releases => {
    return releases.map(release => (
      <div className={styles.release}>
        <img className={styles.image} alt="albumImage" src={release.thumb}></img>
        <div className={styles.title}>{release.title}</div>
        <div className={styles.year}>{release.year}</div>
      </div>
    ));
  };

  return props.releases.length > 0 ? (
    <List itemClass={styles.item} items={mapReleases(props.releases)} />
  ) : (
    <div></div>
  );
};