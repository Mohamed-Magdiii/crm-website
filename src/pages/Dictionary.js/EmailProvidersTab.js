import React from "react";
import {useDispatch, connect} from "react-redux";
import { AvForm, AvField } from "availity-reactstrap-validation";
function EmailProvidersTab(props){
  return (

    <React.Fragment>
      
    </React.Fragment>
  );
}
const mapStateToProps = (state)=>({
  dictionary:state.dictionaryReducer.dictionary || []
});

export default connect(mapStateToProps, null)(EmailProvidersTab);