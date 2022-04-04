import React, { Component } from "react";
import { parse, stringify } from "qs";

import { getArtistReleases } from "/Users/jaimiehart/workspace/client-capstone/wax/src/API/getArtistReleases.js";

import { Button, ReleaseList } from "/Users/jaimiehart/workspace/client-capstone/wax/src/components/search";

import styles from "./artist.module.css";

export class Artist extends Component {
  constructor(props) {
    super(props);

    const { id } = parse(window.location.search, {
      ignoreQueryPrefix: true
    });

    this.state = {
      releaseId: id,
      release: {}
    };

  }

  async componentDidMount() {
    const { releaseId } = this.state;
    const releases = await getArtistReleases(releaseId);

    console.log(releases);
    this.setState({
      release: releases
    });
  }

  

  goBack = () => {
    window.history.back();
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.controls}>
          <Button onClick={this.goBack} highlight>
            Go Back
          </Button>
          
        </div>
        <div className={styles.list}>
          <ReleaseList release={this.state.release} />
        </div>
      </div>
    );
  }
}