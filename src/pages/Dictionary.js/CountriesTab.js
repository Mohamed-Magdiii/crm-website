import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {useDispatch, connect} from "react-redux";
function CountriesTab(props){
  return (
    <React.Fragment>
      <AvForm
        className='p-4'
        onValidSubmit={(e, v) => {

        }}
      >
        <div className="mb-3">
          <AvField
            type="select"
            name="exchanges"
            label="Countries"
            placeholder="Countries"
            errorMessage="Select a country"
            validate={{ required: { value: true } }}
          >
            {props.dictionary[0] && props.dictionary[0].countries.map(country=>{
              return <option key={country.callingCode}>{country.en} {country.ar}</option>;
            })}
          </AvField>
        </div>

  
      </AvForm> 
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  dictionary:state.dictionaryReducer.dictionary || []
});
export default connect(mapStateToProps, null)(CountriesTab);