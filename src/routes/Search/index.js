import React, { Component } from "react";

import { SearchInput, ArtistList } from "/Users/jaimiehart/workspace/client-capstone/wax/src/components/search";

import { submitSearch } from "/Users/jaimiehart/workspace/client-capstone/wax/src/API/submitSearch.js";

import styles from "./search.module.css";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artistList: {}
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
