/* eslint-disable object-property-newline */
import React from "react";
import { NavLink } from "react-router-dom";

// i18n
import { withTranslation } from "react-i18next";

function MainNavigation(props){
  const clientId = props.clientId;

  const tabsArr = [
    { name: "Profile", url: `/clients/${clientId}/profile` },
    { name: "Bank Accounts", url: `/clients/${clientId}/bank` },
    { name: "Documents", url: `/clients/${clientId}/documents` },
    { name: "Transactions", url: `/clients/${clientId}/transactions` },
    { name: "Converts", url: `/clients/${clientId}/converts` },
    { name: "Wallets", url: `/clients/${clientId}/wallets` },
    { name: "Orders", url: `/clients/${clientId}/orders` },
    { name: "Logs", url: `/clients/${clientId}/logs` },
    { name: "Security", url: `/clients/${clientId}/security` },
  ];
  
  return (
    <React.Fragment>
      <div className="navbar-header mb-3">
        <div className="container-fluid">
          <ul className="nav-tabs-custom nav-justified nav nav-tabs page-menues">
            {tabsArr.map((obj, index) =>
              <li className={"nav-item " + `item-${index}`} key={index}>
                <NavLink 
                  to={obj.url}
                  className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  {props.t(obj.name)}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withTranslation()(MainNavigation);