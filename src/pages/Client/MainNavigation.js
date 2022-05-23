import React from "react";
import { NavLink } from "react-router-dom";

// i18n
import { withTranslation } from "react-i18next";

function MainNavigation(props){
  const clientId = props.clientId;
  
  return (
    <React.Fragment>
      <div className="card-body">
        <div className="card-body">
          <ul className="nav-tabs-custom nav-justified nav nav-tabs">
            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/details"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Client Details")}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/bank"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Client bank")}
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/transactions"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Client transactions")}
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink 
                to={"/clients/" + clientId + "/wallets"}
                className={isActive =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                {props.t("Client wallets")}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withTranslation()(MainNavigation);