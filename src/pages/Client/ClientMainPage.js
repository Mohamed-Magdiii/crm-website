import React from "react";
import { 
  BrowserRouter as Router, Redirect, Route, Switch, useLocation 
} from "react-router-dom";

import Layout from "./Layout";
import ClientBank from "./ClientInfo/Bank/ClientBank";
import ClientDetails from "./ClientInfo/Details/ClientDetails";
import ClientTransactions from "./ClientInfo/Transactions/ClientTransactions";
import ClientWallets from "./ClientInfo/Wallets/ClientWallets";
import OrderList from "./orders/OrdersList";

function ClientMainPage() {
  const location = useLocation();
  const { clientId } = location.state;

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* components to switch from one to the other
            1-details (default) 2-bank 3-transactions 4-wallets */}
          <Router>
            <Layout clientId={clientId}>
              <Switch>
                {/* client details */}
                <Route exact path="/clients/:id/details">
                  <ClientDetails clientId={clientId} />
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
                <Redirect to={"/clients/" + clientId + "/details"} />
              </Switch>
            </Layout>
          </Router>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientMainPage;
