import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientDetails } from "store/client/actions"; 

function ClientDetails(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientDetails = () => {
    dispatch(fetchClientDetails(clientId)); 
  };

  useEffect(() => {
    loadClientDetails();

  }, []);


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h1>{JSON.stringify(props.clientDetails)}</h1>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  clientDetails: state.clientReducer.clientDetails
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetails));