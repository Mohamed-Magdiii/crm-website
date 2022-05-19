import React from "react";
import { Link } from "react-router-dom";

function MainNavigation(props){
  const clientId = props.clientId;
  
  // TODO make the chosen tab look different from other tabs 
  return (
    <React.Fragment>
      <div className="card-body">
        <div className="card-body">
          <ul className="nav-tabs-custom nav-justified nav nav-tabs">
            <li className="nav-item">
              <a className="active nav-link">
                <Link to={"/clients/" + clientId + "/details"}>
                  <span className="d-none d-sm-block">Client details</span>
                </Link>
                {/* <span className="d-block d-sm-none">
                  <i className="fas fa-home"></i>
                </span> */}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <Link to={"/clients/" + clientId + "/bank"}>
                  <span className="d-none d-sm-block">Client bank</span>
                </Link>
                {/* <span className="d-block d-sm-none">
                  <i className="far fa-user"></i>
                </span> */}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <Link to={"/clients/" + clientId + "/transactions"}>
                  <span className="d-none d-sm-block">Client transactions</span>
                </Link>
                {/* <span className="d-block d-sm-none">
                  <i className="far fa-envelope"></i>
                </span> */}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <Link to={"/clients/" + clientId + "/wallets"}>
                  <span className="d-none d-sm-block">Client wallets</span>
                </Link>
                {/* <span className="d-block d-sm-none">
                  <i className="fas fa-cog"></i>
                </span> */}
              </a>
            </li>
          </ul>
          
          <div className="tab-content p-3 text-muted">
            <div className="tab-pane active">
              <div className="row">
                <div className="col-sm-12">
                  <p className="mb-0 card-text">
                  </p>
                </div>
              </div>
            </div>
            <div className="tab-pane">
              <div className="row">
                <div className="col-sm-12">
                  <p className="mb-0 card-text">
                  </p>
                </div>
              </div>
            </div>
            <div className="tab-pane">
              <div className="row">
                <div className="col-sm-12">
                  <p className="mb-0 card-text">
                  </p>
                </div>
              </div>
            </div>
            <div className="tab-pane">
              <div className="row">
                <div className="col-sm-12">
                  <p className="mb-0 card-text">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ul className="nav-tabs-custom nav-justified nav nav-tabs"> */}
        {/* client details */}
        {/* <li className="nav-item">
            <Link to={"/clients/" + id + "/details"}>
              client details
            </Link>
          </li> */}

        {/* client bank */}
        {/* <li className="nav-item">
            <Link to={"/clients/" + id + "/bank"}>
              client bank
            </Link>
          </li> */}

        {/* client details */}
        {/* <li className="nav-item">
            <Link to={"/clients/" + id + "/transactions"}>
              client transactions
            </Link>
          </li> */}

        {/* client details */}
        {/* <li className="nav-item">
            <Link to={"/clients/" + id + "/wallets"}>
              client wallets
            </Link>
          </li> */}
        {/* </ul> */}

        {/* <div className="tab-content p-3 text-muted">
          <div className="tab-pane">
            <div className="row">
              <div className="col-sm-12">
                <p className="mb-0 card-text">
                  this is a test
                </p>
              </div>
            </div>
          </div>
          <div className="tab-pane active">
            <div className="row">
              <div className="col-sm-12">
                <p className="mb-0 card-text">
                </p>
              </div>
            </div>
          </div>
          <div className="tab-pane">
            <div className="row">
              <div className="col-sm-12">
                <p className="mb-0 card-text">
                </p>
              </div>
            </div>
          </div>
          <div className="tab-pane">
            <div className="row">
              <div className="col-sm-12">
                <p className="mb-0 card-text">
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
}

export default MainNavigation;