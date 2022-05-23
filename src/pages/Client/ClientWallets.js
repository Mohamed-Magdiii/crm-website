import React from "react";

function ClientWallets(props) {
  const clientId = props.clientId;

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          Client wallets {clientId}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientWallets;
