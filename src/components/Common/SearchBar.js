import React, { useCallback } from "react";
import "./SearchBar.styles.scss";
import { debounce } from "lodash";
function SearchBar({ handleSearchInput }){
  const debouncedChangeHandler = useCallback(
    debounce(handleSearchInput, 1000), []);
  return (
    <div className="position-relative ">
      <i  className=" search-icon bx bx-search-alt search-icon" />
      <div className="search-bar">
        <input  onChange={debouncedChangeHandler} id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control u-padding-left" placeholder="Search" />
      </div>
      
    </div>
  );
}
export default SearchBar;