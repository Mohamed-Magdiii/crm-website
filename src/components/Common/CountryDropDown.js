import { FormGroup } from "reactstrap";
import { AvField } from "availity-reactstrap-validation";
import React, { useEffect, useState} from "react";
import { fetchDictionaryStart } from "store/dictionary/actions";
import { useDispatch, connect } from "react-redux";
import Select from "react-select";
function CountryDropDown(props){ 
  const [selectedGroupe, setSelectedGroup] = useState();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchDictionaryStart());
  }, []);
  
  const optionGroup = props.countries.map(country=>{
    return {
      label: country.ar, 
      value: country.ar
    };
  });
  const handleSelectGroup = (selectedOption)=>{
    setSelectedGroup(selectedOption);
  };
  console.log(selectedGroupe);
  return (
    <React.Fragment>
    
  
      <div className="mb-3">
        <label htmlFor="choices-single-default" className="form-label font-size-13 text-muted">Country</label>
        <Select
          value={selectedGroupe}
          onChange={() => {
            handleSelectGroup();
          }}
          options={optionGroup}
          classNamePrefix="select2-selection"
        />
      </div>
        
    </React.Fragment>);

}
const mapStateToProps = (state)=>({
  countries: state.dictionaryReducer.countries || []
});
export default connect(mapStateToProps, null)(CountryDropDown);