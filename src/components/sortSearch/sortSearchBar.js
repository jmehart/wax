import React, { useState } from "react";




export const SortSearchBar = () => {

    const [searchInput, setSearchInput] = useState("")
    // set up state options for search view between recipe name and ingredients

    // outputs a search bar input field and drop down to toggle search views


        return (
            <>
                <form className="SearchBar">
                    <fieldset>
                        <div className="form-group">
                            
                            <input
                            autoFocus
                                type="text"
                                className="search-control"
                                placeholder="Search here..."
                                key="recipe-search"
                                value={searchInput}
                                onChange={(evt) => {
                                    setSearchInput(evt.target.value)
                                }} />
                        </div>
                    </fieldset>
                </form>
            </>
        )

}    