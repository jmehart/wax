import React from "react";

import { debounce } from "../../utils";

import styles from "./input.module.css";

export const SearchInput = props => {
    return (
        <div className={styles.container}>
        
                <h2 className={styles.searchHeader}>Search</h2>
      
            <br></br>

            <input
                className={styles.input}
                placeholder="Album Name or Catalog #"
                type="text"
                onKeyUp={evt => debounce(props.keyup(evt), 300)}
            ></input>
        </div>
    );
};