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
              <Link to="/Insurance" className="has-arrow">
                <FeatherIcon icon="trending-up" />
                <span>{props.t("Insurance")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/insurance/lof" >{props.t("Line Of Bussiness")}</Link>
                </li>
                <li>
                  <Link to="/insurance/products">{props.t("Products")}</Link>
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
  internalTransferPermissions : state.Profile.internalTransferPermissions || {},
  creditPermissions : state.Profile.creditPermissions || {},
  convertPermissions : state.Profile.convertPermissions || {},
});
export default withTranslation()(withRouter(connect(mapStateToProps, null) (SidebarContent)));
