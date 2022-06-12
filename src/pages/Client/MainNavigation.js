import React from "react";
import { NavLink } from "react-router-dom";

// i18n
import { withTranslation } from "react-i18next";

function MainNavigation(props){
  const clientId = props.clientId;
  
  return (
    <React.Fragment>
      <div className="navbar-header">
        <div className="container-fluid">
          <ul className="nav-tabs-custom nav-justified nav nav-tabs">
            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/details"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Details")}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/bank"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Bank Accounts")}
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/transactions"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Transactions")}
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/wallets"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Wallets")}
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/orders"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Orders")}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withTranslation()(MainNavigation);