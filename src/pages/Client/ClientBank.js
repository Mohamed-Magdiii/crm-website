import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

// i18n
import { withTranslation } from "react-i18next";
import { fetchClientBankAccount } from "store/client/actions";

function ClientBank(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientBankDetails = () => {
    dispatch(fetchClientBankAccount(clientId));
  };
  useEffect(() => {
    loadClientBankDetails();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {JSON.stringify(props.clientBankAccountDetails)}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  clientBankAccountDetails: state.clientReducer.clientBankAccountDetails,
  error: state.clientReducer.error,
  errorDetails: state.clientReducer.errorDetails
});

export default connect(mapStateToProps, null)(withTranslation()(ClientBank));
