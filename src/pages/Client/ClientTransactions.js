import React from "react";

function ClientTransactions(props) {
  const clientId = props.clientId;

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          Client transactions {clientId}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientTransactions;