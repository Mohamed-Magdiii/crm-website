import React from "react";

import Layout from "./Layout";

function ClientTransactions() {

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Layout> 
            <h1>
              Client transactions
            </h1>
          </Layout>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientTransactions;