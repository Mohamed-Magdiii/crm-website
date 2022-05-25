import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
// i18n 
import { withTranslation } from "react-i18next";
import { fetchClientWallet } from "store/client/actions";

function ClientWallets(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientWalletDetails = () => {
    dispatch(fetchClientWallet(clientId));
  };
  useEffect(() => {
    loadClientWalletDetails();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {props.error && JSON.stringify(props.errorDetails)}
          {props.success && JSON.stringify(props.clientWalletDetails)}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  error: state.clientReducer.error,
  errorDetails: state.clientReducer.errorDetails,
  success: state.clientReducer.success,
  clientWalletDetails: state.clientReducer.clientWalletDetails
});

export default connect(mapStateToProps, null)(withTranslation()(ClientWallets));
