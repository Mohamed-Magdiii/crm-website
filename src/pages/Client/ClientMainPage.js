import React, { useState } from "react";
import { 
  BrowserRouter as Router, Redirect, Route, Switch, useLocation 
} from "react-router-dom";

import Layout from "./Layout";
import ClientBank from "./ClientBank";
import ClientDetails from "./ClientDetails";
import ClientTransactions from "./ClientTransactions";
import ClientWallets from "./ClientWallets";

function ClientMainPage() {
  // const [redirectToListing, setRedirectToListing] = useState(false);
  const location = useLocation();
  const { clientId } = location.state;

  // a callback function to handle change in redirect to listing 
  // const redirectToListingHandler = () => {
  //   setRedirectToListing(!redirectToListing);
  // };

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

                {/* default route to details right on loading */}
                <Redirect to={"/clients/" + clientId + "/details"} />
                {/* redirect to listing page when back button in <Layout /> is clicked */}
                {/* {redirectToListing && <Redirect to="/clients" />} */}
              </Switch>
            </Layout>
          </Router>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ClientMainPage;
