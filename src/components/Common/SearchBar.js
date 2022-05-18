import React, { useCallback } from "react";
import "./SearchBar.styles.scss";
import { debounce } from "lodash";
import { withTranslation } from "react-i18next";
function SearchBar({ handleSearchInput, placeholder = "Search", ...props }){

  const debouncedChangeHandler = useCallback(
    debounce(handleSearchInput, 1000), []
  );

  return (
    <div className="position-relative ">
      <i className=" search-icon bx bx-search-alt search-icon" />
      <div className="search-bar">
        <input 
          onChange={debouncedChangeHandler} 
          id="search-bar-0" 
          type="text" 
          aria-labelledby="search-bar-0-label" 
          className="form-control u-padding-left" 
          placeholder={props.t(placeholder)}
        />
      </div>
    </div>
  );
}
export default withTranslation()(SearchBar);