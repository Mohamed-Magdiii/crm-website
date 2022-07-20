import React, { useEffect } from "react";
import { fetchDictionaryStart } from "store/dictionary/actions";
import { useDispatch, connect } from "react-redux";
import Select from "react-select";

import { withTranslation } from "react-i18next";

function CountryDropDown({ ...props }){ 
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchDictionaryStart());
    
  }, []);
  
  const optionGroup = props.countries.map((country)=>{
    return ({
      label: `${country.en} ${country.ar}`, 
      value: country.en
    });
  });

  const selectedCountryObj = props.countries && optionGroup.find((country) => (
    country.value === props.defaultValue
  )); 
  
  return (
    <React.Fragment>
      <div className="mb-3">
        <label htmlFor="choices-single-default" className="form-label font-size-14">{props.t("Country")}</label>
        {
          !selectedCountryObj &&
          <Select 
            onChange={(e) => {
              props.countryChangeHandler(e);
            }}
            options={optionGroup}
            classNamePrefix="select2-selection"
            placeholder={props.t("Select Country")}
          />
        }
        {
          selectedCountryObj &&
          <Select 
            onChange={(e) => {
              props.countryChangeHandler(e);
            }}
            defaultValue={selectedCountryObj}
            options={optionGroup}
            classNamePrefix="select2-selection"
          />
        }
      </div>
    </React.Fragment>);
}

const mapStateToProps = (state)=>({
  countries: state.dictionaryReducer.countries || []
});

export default connect(mapStateToProps, null)(withTranslation()(CountryDropDown));