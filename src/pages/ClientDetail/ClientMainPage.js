/* eslint-disable object-property-newline */
/* eslint-disable no-debugger */
import React, { useState, useEffect } from "react";
import { 
  BrowserRouter as Router, Redirect, Route, Switch, useParams, useHistory
} from "react-router-dom";

import Layout from "./Layout";
import ClientBank from "./Bank/ClientBank";
import ClientProfile from "./Profile/ClientProfile";
import ClientTransactions from "./Transactions/ClientTransactions";
import ClientWallets from "./Wallets/ClientWallets";
import OrderList from "./orders/OrdersList";
import Documents from "./Documents/Documents";
import Loader from "components/Common/Loader";
import * as axiosHelper from "../../apis/api_helper";
import ClientDetailsHeader from "./ClientDetailsHeader";

function ClientMainPage(props) {
  const pathParams = useParams();
  const history = useHistory();

  const clientId = pathParams.id;
  const [clientProfile, setClientProfile] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const clientFoundError = (error = new Error("Client Not Found")) => {
    setClientProfile({
      loading: false,
      data: null,
      error,
    });
    setTimeout(() => {
      history.push("/clients");
    }, 2000);
  };

  // getting client details to check if client exists using their Id
  const getClientDetails = async(clientId) => {
    try {
      setClientProfile({ loading: true });
      const data = await axiosHelper.get(`/clients/${clientId}`);
      if (data && data.result) {
        setClientProfile({
          loading: false,
          data 
        });
      } else {
        clientFoundError();
        
      }
    } catch (error){
      clientFoundError(error);
    }
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
      {clientProfile.loading && 
        <>
          <div className="page-content">
            <div className="container-fluid">
              <Loader />
            </div>
          </div>
        </>
      }
      {clientProfile.data && 
        <div className="page-content">
          <ClientDetailsHeader clientId={clientId} clientDetails={clientProfile.data.result} />
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
      {!clientProfile.loading && !clientProfile.data && <React.Fragment>
        <div className="page-content">
          <div className="container-fluid text-center">
            <h2>Data not found, please add your design logic here</h2>  
          </div>
        </div>
      </React.Fragment>}
    </React.Fragment>
  );
}

export default ClientMainPage;
