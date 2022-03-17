import React, { Component } from "react";
import { parse, stringify } from "qs";

import { getArtistReleases } from "../../API";

import { Button, ReleaseList } from "/Users/jaimiehart/workspace/client-capstone/wax/src/components/search";

import styles from "./artist.module.css";

export class Artist extends Component {
  constructor(props) {
    super(props);

    const { id, sort, sort_order } = parse(window.location.search, {
      ignoreQueryPrefix: true
    });

    this.state = {
      artistId: id,
      sort,
      sort_order: sort_order || "desc", // if no sort_order, default to desc
      releases: []
    };

    this.sortByDate = this.sortByDate.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
  }

  async componentDidMount() {
    const { artistId, sort, sort_order } = this.state;
    const { releases } = await getArtistReleases(artistId, sort, sort_order);

    console.log(releases);
    this.setState({
      releases: [...releases]
    });
  }

  sortByDate = () => {
    const { artistId, sort } = this.state;
    let { sort_order } = this.state;

    if (sort === "year") {
      sort_order = sort_order === "desc" ? "asc" : "desc";
    }

    const query = {
      id: artistId,
      sort: "year",
      sort_order
    };
    const uri = `/artist?${stringify(query)}`;

    window.location.replace(uri);
  };

  sortByTitle = () => {
    const { artistId, sort } = this.state;
    let { sort_order } = this.state;

    if (sort === "title") {
      sort_order = sort_order === "desc" ? "asc" : "desc";
    }

    const query = {
      id: artistId,
      sort: "title",
      sort_order
    };
    const uri = `/release?${stringify(query)}`;

    window.location.replace(uri);
  };

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
          <Button onClick={this.sortByDate}>Sort by Date</Button>
          <Button onClick={this.sortByTitle}>Sort by Title</Button>
        </div>
        <div className={styles.list}>
          <ReleaseList releases={this.state.releases} />
        </div>
      </div>
    );
  }
}