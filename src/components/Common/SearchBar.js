import React from "react";
import "./SearchBar.styles.scss";
function SearchBar({ handleSearchInput }){
  return (
    <div className="position-relative ">
      <i  className=" search-icon bx bx-search-alt search-icon" />
      <div className="search-bar">
        <input  onChange={(e) => handleSearchInput(e)} id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" className="form-control u-padding-left" placeholder="Search" />
      </div>
      
    </div>
  );
}
export default SearchBar;