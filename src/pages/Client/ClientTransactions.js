import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

// i18n
import { withTranslation } from "react-i18next";
import { fetchClientTransactions } from "store/client/actions";

function ClientTransactions(props) {
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientTransactionsdetails = () => {
    dispatch(fetchClientTransactions(clientId));
  };
  useEffect(() => {
    loadClientTransactionsdetails();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {JSON.stringify(props.clientTransactions)}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  clientTransactions: state.clientReducer.clientTransactions,
  error: state.clientReducer.error,
  errorDetails: state.clientReducer.errorDetails
});

export default connect(mapStateToProps, null)(withTranslation()(ClientTransactions));
