import React, { Component } from "react";

import { ArtistList } from "../../search/ArtistList";
import { SearchInput } from "../../search/SearchInput";

import { submitSearch } from "../../../API/submitSearch";

import styles from "./search.module.css";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artistList: []
    };

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  async onKeyUp(evt) {
    const query = evt.target.value;

    // submit the search only when the input has 3 or more characters
    if (query.length >= 3) {
      const res = await submitSearch(query);
      this.setState({
        query: query,
        artistList: res.results
      });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.input}>
          <SearchInput keyup={this.onKeyUp} />
        </div>
        <div className={styles.list}>
          <ArtistList artists={this.state.artistList} />
        </div>
      </div>
    );
  }
}



/*

export class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artistList: [],
      searchComplete: false,
      releases: []
    };

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchComplete !== prevState.searchComplete) {



      const releaseFetchArray = this.state.artistList.map(result => {
        const [,,, releaseId] = result.uri.split("/")
        return fetch(`https://api.discogs.com/releases/${releaseId}`)
          .then((res) => res.json())
      })

      Promise.all(releaseFetchArray).then(
        (responses) => {

          this.setState({
            releases: responses
          });
        }
      )


    }
  }


  async onKeyUp(evt) {
    const query = evt.target.value;

    // submit the search only when the input has 3 or more characters
    if (query.length >= 3) {
      const res = await submitSearch(query);

      this.setState({
        query: query,
        artistList: res.results,
        searchComplete: true
      });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.input}>
          <SearchInput keyup={(e) => {
            const copy = { ...this.state }
            copy.searchComplete = false
            this.setState(copy)

            this.onKeyUp(e)
          }} />
        </div>
        <div className={styles.list}>
          <ArtistList artists={this.state.artistList} />
        </div>
      </div>
    );
  }
}


*/
