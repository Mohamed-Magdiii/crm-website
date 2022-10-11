import PropTypes from "prop-types";
import React, {
  useEffect, useRef, useCallback 
} from "react";
import { connect } from "react-redux";
//Import Icons
import FeatherIcon from "feather-icons-react";
// //Import Scrollbar
import SimpleBar from "simplebar-react";

//Import images
// import giftBox from "../../assets/images/giftbox.png";

//i18n
import { withTranslation } from "react-i18next";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter, Link } from "react-router-dom";

const SidebarContent = (props) => {
  const ref = useRef();

  const { get:getUser } = props.userPermissions;
  const { get:getClient } = props.clientPermissions;
  const { get:getLeads } = props.leadsPermissions;
  const { get:getDeposits } = props.depositsPermissions;
  const { get:getWithdrawals } = props.withdrawalsPermissions;
  // const { get: getInternalTranfer } = props.internalTransferPermissions;
  // const { get: getCredit } = props.creditPermissions;
  const { get:getMarkups } = props.markupsPermissions;
  const { get:getRoles } = props.rolesPermissions;
  const { get:getDictionaries } = props.dictionariesPermissions;
  const { get : getFeeGroup } = props.feeGroupsPermissions;
  // const { get : getTransactionFeeGroup } = props.transactionFeeGroupsPermissions;
  const { get: getSystemEmail } = props.systemEmailsPermissions;
  const { get: getTeams } = props.teamsPermissions;
  const { get: getSymbols } = props.symbolsPermissions;
  const { get :getCurrencyPair } = props.currencyPairsPermissions;
  const { get :getOrderProfit } = props.orderProfitPermissions;
  const { get :getTransactionProfit } = props.transactionProfitPermissions;
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  });
  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }
  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" className="">
                <FeatherIcon icon="home" />
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
          

            <li>
              <Link to='/clients' className={`${!getClient ? "d-none"  : ""}`}>
                <FeatherIcon icon="users"/>
                <span>{props.t("Clients")}</span> 
              </Link> 
            </li>
            <li>
              <Link to='/leads' className={`${!getLeads ? "d-none" : ""}`}>
                <FeatherIcon icon="monitor"/>
                <span>{props.t("Leads")}</span> 
              </Link> 
            </li>
            {/* <li>
              <Link to="/assets" className="">
                <FeatherIcon icon="dollar-sign"/>
                <span>{props.t("Assets")}</span>
              </Link>
            </li> */}
            <li>
              <Link to="/transactions" className="has-arrow">
                <FeatherIcon icon="trending-up" />
                <span>{props.t("Transactions")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/transactions/deposit" className= {`${!getDeposits ? "d-none" : ""}`}>{props.t("Deposit")}</Link>
                </li>
                <li>
                  <Link to="/transactions/withdrawals" className = {`${!getWithdrawals ? "d-none" : ""}`}>{props.t("Withdrawal")}</Link>
                </li> 
                <li>
                  <Link to="/transactions/internal-transfer">{props.t("Internal Transfer")}</Link>
                </li> 
                <li>
                  <Link to="/transactions/credit">{props.t("Credit")}</Link>
                </li>   
              </ul>
            </li>
            {/* <li>
              <Link to='/positions' className="">
                <FeatherIcon icon="cast"/>
                <span>{props.t("Positions")}</span> 
              </Link> 
            </li> */}
            <li>
              <Link to="/calendar/reminders" className="">
                <FeatherIcon icon="calendar" />
                <span>{props.t("Reminders/Todos")}</span>
              </Link> 
            </li>
            {/* <li>
              <Link to='/marketing' className="">
                <FeatherIcon icon="link-2"/>
                <span>{props.t("Marketing")}</span> 
              </Link> 
            </li>  */}          
            <li>
              <Link to="/settings" className="has-arrow">
                <FeatherIcon icon="tool" />
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/dictionaries" className= {`${!getDictionaries ? "d-none" : ""}`}>{props.t("Dictionaries")}</Link>
                </li>
                <li>
                  <Link to="/users" className={`${!getUser ? "d-none" : ""}`}>{props.t("Users")}</Link>
                </li>
                <li>
                  <Link to="/roles" className={`${!getRoles ? "d-none" : ""}`}>{props.t("Roles")}</Link>
                </li>   
                <li>
                  <Link to="/system-emails" className={`${!getSystemEmail ? "d-none" : ""}`}>{props.t("System Emails")}</Link>
                </li>
                <li>
                  <Link to="/user-logs">{props.t("User Logs")}</Link>
                </li>   
                <li>
                  <Link to="/teams" className={`${!getTeams ? "d-none" : ""}`} >{props.t("Teams")}</Link>
                </li>
                <li>
                  <Link to="/banners">{props.t("Banners")}</Link>
                </li>   
                <li>
                  <Link to="/assets" className={`${!getSymbols ? "d-none" : ""}`}>{props.t("Symbols")}</Link>
                </li>
                <li>
                  <Link to="/currency-pairs" className={`${!getCurrencyPair ? "d-none" : ""}`}>{props.t("Currency Pairs")}</Link>
                </li>   

              </ul>
            </li> 
            <li>
              <Link to="/risk-management" className="has-arrow">
                <FeatherIcon icon="alert-circle" />
                <span>{props.t("Risk Management")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/fee-groups" className={`${!getFeeGroup ? "d-none" : ""}`}>{props.t("Trading Fee Groups")}</Link>
                </li>
                <li>
                  <Link to="/transaction-fee-groups" >{props.t("Transaction Fee Groups")}</Link>
                </li>
                <li>
                  <Link to="/markups" className={`${!getMarkups ? "d-none" : ""}`}>{props.t("Markups")}</Link>
                </li>   
                <li>
                  <Link to="/orders-profit" className={`${!getOrderProfit ? "d-none" : ""}`}>{props.t("Order Profit")}</Link>
                </li>    
                <li>
                  <Link to="/transactions-profit" className={`${!getTransactionProfit ? "d-none" : ""}`}>{props.t("Exchange Balance")}</Link>
                </li>          
              </ul>
            </li>
            
          </ul> 
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};
const mapStateToProps = (state) => ({
  rolesPermissions: state.Profile.rolesPermissions || {},
  userPermissions :state.Profile.userPermissions || {}, 
  clientPermissions :state.Profile.clientPermissions || {},
  teamsPermissions : state.Profile.teamsPermissions || {},
  leadsPermissions : state.Profile.leadsPermissions || {},
  withdrawalsPermissions : state.Profile.withdrawalsPermissions || {},
  depositsPermissions : state.Profile.depositsPermissions || {},
  feeGroupsPermissions : state.Profile.feeGroupsPermissions || {},
  systemEmailsPermissions : state.Profile.systemEmailsPermissions || {},
  symbolsPermissions : state.Profile.symbolsPermissions || {},
  dictionariesPermissions : state.Profile.dictionariesPermissions || {},
  currencyPairsPermissions : state.Profile.currencyPairsPermissions || {},
  markupsPermissions : state.Profile.markupsPermissions || {},
  transactionFeeGroupsPermissions : state.Profile.transactionFeeGroupsPermissions || {},
  orderProfitPermissions : state.Profile.orderProfitPermissions || {},
  transactionProfitPermissions : state.Profile.transactionProfitPermissions || {},
  // internalTransferPermissions: state.profile.internalTransferPermissions || {},
  // creditPermissions: state.Profile.creditPermissions || {}
});
export default withTranslation()(withRouter(connect(mapStateToProps, null) (SidebarContent)));
