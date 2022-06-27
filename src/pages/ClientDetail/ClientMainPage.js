/* eslint-disable object-property-newline */
/* eslint-disable no-debugger */
import React, { useEffect } from "react";
import { 
  BrowserRouter as Router, Redirect, Route, Switch, useParams,
} from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { withTranslation } from "react-i18next";

import Layout from "./Layout";
import ClientBank from "./Bank/ClientBank";
import ClientProfile from "./Profile/ClientProfile";
import ClientTransactions from "./Transactions/ClientTransactions";
import ClientWallets from "./Wallets/ClientWallets";
import OrderList from "./orders/OrdersList";
import Documents from "./Documents/Documents";
import Loader from "components/Common/Loader";
import ClientDetailsHeader from "./ClientDetailsHeader";
import { fetchClientDetails } from "store/client/actions";

function ClientMainPage(props) {
  const pathParams = useParams();
  const dispatch = useDispatch();

  const clientId = pathParams.id;

  // getting client details to check if client exists using their Id
  const getClientDetails = async(clientId) => {
    dispatch(fetchClientDetails(clientId)); 
  };

  const tabsArr = [
    { component: ClientProfile, url: `/clients/${clientId}/profile` },
    { component: ClientBank, url: `/clients/${clientId}/bank` },
    { component: Documents, url: `/clients/${clientId}/documents` },
    { component: ClientTransactions, url: `/clients/${clientId}/transactions` },
    { component: ClientWallets, url: `/clients/${clientId}/wallets` },
    { component: OrderList, url: `/clients/${clientId}/orders` },
    { component: "Logs", url: `/clients/${clientId}/logs` },
    { component: "Security", url: `/clients/${clientId}/security` },
  ];
  useEffect(()=>{
    getClientDetails(clientId);
  }, []);

  return (
    <React.Fragment>
      {props.clientProfileloading && 
        <>
          <div className="page-content">
            <div className="container-fluid">
              <Loader />
            </div>
          </div>
        </>
      }
      {props.clientDetails && 
        <div className="page-content">
          <ClientDetailsHeader clientId={clientId} clientDetails={props.clientDetails} />
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
                      {tabsArr.map((obj, index) =>
                        <Route key={index} exact path={obj.url}>
                          <obj.component clientId={clientId} path={obj.url} />
                        </Route>
                      )}
                      {/* default route to details right on loading */}
                      <Redirect to={tabsArr[0].url} />
                    </Layout>
                    :
                    <Redirect to={"/dashboard"} />
                }
              </Switch>
            </Router>
          </div>
        </div>
      }
      {!props.clientProfileloading && !props.clientDetails && <React.Fragment>
        <div className="page-content">
          <div className="container-fluid text-center">
            <h2>Data not found, please add your design logic here</h2>  
          </div>
        </div>
      </React.Fragment>}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  clientDetails: state.clientReducer.clientDetails,
  clientProfileloading: state.clientReducer.clientProfileloading,
  clientProfileError: state.clientReducer.clientProfileError,

  
});

export default connect(mapStateToProps, null)(withTranslation()(ClientMainPage));