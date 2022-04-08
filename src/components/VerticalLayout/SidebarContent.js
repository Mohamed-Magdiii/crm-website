import PropTypes from "prop-types";
import React, { useEffect, useRef, useCallback } from "react";

//Import Icons
import FeatherIcon from "feather-icons-react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

//Import images
import giftBox from "../../assets/images/giftbox.png";

//i18n
import { withTranslation } from "react-i18next";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

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
            <Link to='/clients' className="">
            <FeatherIcon icon="users"/>
            <span>{props.t('Clients')}</span> 
             </Link> 
            </li>
            <li>
            <Link to='/#' className="">
            <FeatherIcon icon="user"/>
            <span>{props.t('Leads')}</span> 
             </Link> 
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <FeatherIcon icon="trending-up" />
                <span>{props.t("Transactions")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Deposit")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Withdrawals")}</Link>
                </li>   
              </ul>
            </li>
            <li>
            <Link to='/#' className="">
            <FeatherIcon icon="cast"/>
            <span>{props.t('Positions')}</span> 
             </Link> 
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <FeatherIcon icon="calendar" />
                <span>{props.t("Reminders/Notes")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Todos")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Reminders")}</Link>
                </li>   
              </ul>
            </li>
            <li>
            <Link to='/#' className="">
            <FeatherIcon icon="link-2"/>
            <span>{props.t('Marketing')}</span> 
             </Link> 
            </li> 
            <li>
              <Link to="/#" className="has-arrow">
                <FeatherIcon icon="clipboard" />
                <span>{props.t("Requests")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("List Coin")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("OTC Request")}</Link>
                </li>   
              </ul>
            </li> 
          
            <li>
              <Link to="/#" className="has-arrow">
                <FeatherIcon icon="tool" />
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Users")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Roles")}</Link>
                </li>   
                <li>
                  <Link to="/#">{props.t("Email Templates")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("User Logs")}</Link>
                </li>   
                <li>
                  <Link to="/#">{props.t("Teams")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Banners")}</Link>
                </li>   
                <li>
                  <Link to="/#">{props.t("Symbols")}</Link>
                </li>
                <li>
                  <Link to="/#">{props.t("Currency Pairs")}</Link>
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

export default withTranslation()(withRouter(SidebarContent));
