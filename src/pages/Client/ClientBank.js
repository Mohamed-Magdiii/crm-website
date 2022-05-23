import React from "react";

function ClientBank(props) {
  const clientId = props.clientId;

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          Client Bank {clientId}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientBank;
