import React from "react";

import Layout from "./Layout";

function ClientDetails(props) {
  const clientId = props.id;
  console.log(props);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Layout clientId={clientId}> 
            <h1>
              Client details
            </h1>
          </Layout>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientDetails;
