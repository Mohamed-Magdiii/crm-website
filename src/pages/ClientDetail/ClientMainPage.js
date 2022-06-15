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
import Loader from "components/Common/Loader";
import * as axiosHelper from "../../apis/api_helper";

function ClientMainPage(props) {
  const pathParams = useParams();
  const clientId = pathParams.id;
  const data = true;

  // getting client details to check if client exists using their Id
  const getClientDetails = async(clientId) => {
    try {
      const data = await axiosHelper.get(`/clients/${clientId}`);
      return data;
    } catch (error){
      console.log(error);
    }
  };
  console.log(getClientDetails(clientId));

  return (
    <React.Fragment>
      {!data && 
        <>
          <div className="page-content">
            <div className="container-fluid">
              <Loader />
            </div>
          </div>
        </>
      }
      {data && 
        <div className="page-content">
          <div className="container-fluid">
            {/* components to switch from one to the other
              1-details (default) 2-bank 3-transactions 4-wallets 
              and so on 
            */}
            
            <Router>
              {/* 
                if client exists ie. the Id passed to the URL is correct
                then head to the requested route
                else redirect to dashboard
              */}
              <Switch>
                {
                  !props.fetchClientDetailsError
                    ?
                    <Layout clientId={clientId}>
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
                    </Layout>
                    :
                    <Redirect to={"/dashboard"} />
                }
              </Switch>
            </Router>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default ClientMainPage;
