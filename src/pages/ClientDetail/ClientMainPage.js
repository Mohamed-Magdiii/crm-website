/* eslint-disable no-debugger */
import React from "react";
import { 
  BrowserRouter as Router, Redirect, Route, Switch, useParams
} from "react-router-dom";

import Layout from "./Layout";
import ClientBank from "./Bank/ClientBank";
import ClientProfile from "./Profile/ClientProfile";
import ClientTransactions from "./Transactions/ClientTransactions";
import ClientWallets from "./Wallets/ClientWallets";
import OrderList from "./orders/OrdersList";

function ClientMainPage() {
  const pathParams = useParams();
  const clientId = pathParams.id;

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* components to switch from one to the other
            1-details (default) 2-bank 3-transactions 4-wallets 
            and so on 
          */}
          <Router>
            <Layout clientId={clientId}>
              <Switch>
                {/* client details */}
                <Route exact path="/clients/:id/profile">
                  <ClientProfile clientId={clientId} />
                </Route>
                
                {/*  client bank */}
                <Route exact path="/clients/:id/bank">
                  <ClientBank clientId={clientId} />
                </Route>

                {/* client transactions */}
                <Route exact path="/clients/:id/transactions">
                  <ClientTransactions clientId={clientId} />
                </Route>

                {/* client wallets */}
                <Route exact path="/clients/:id/wallets">
                  <ClientWallets clientId={clientId} />
                </Route>

                {/* client orders */}
                <Route exact path="/clients/:id/orders">
                  <OrderList clientId={clientId} />
                </Route>

                {/* default route to details right on loading */}
                <Redirect to={"/clients/" + clientId + "/profile"} />
              </Switch>
            </Layout>
          </Router>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientMainPage;
