import React from "react";

function ClientDetails(props) {
  const clientId = props.clientId;

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <h1>
            Client details {clientId}
          </h1>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientDetails;
