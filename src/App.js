import PropTypes from "prop-types";
import React, { Suspense } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import AppLoader from "./components/AppLoader";

// Import scss
import "./assets/scss/preloader.scss";
import "./assets/scss/theme.scss";

// import { default as themeRight } from "./assets/scss/theme-rtl.scss";
// import { default as themeLeft } from "./assets/scss/theme.scss";


const lang = localStorage.getItem("I18N_LANGUAGE");
if (lang === "ar") {
  import ("./assets/scss/theme-rtl.scss");
}

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

const App = props => {
  function getLayout() {
    let layoutCls = VerticalLayout;
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }
  const userArray = userRoutes();
  const Layout = getLayout(); // layout = layoutCls 
  return (
    <React.Fragment>
      <Suspense fallback={<AppLoader />}>
        <Router>
          <Switch>
            {userArray.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={Layout}
                component={route.component}
                innerPages={route.innerPages}
                get={route.get}
                key={idx}
                isAuthProtected={true}
                {...(route.notExact ? {} : { exact: true })}
              />
            ))}
            {authRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}  
          </Switch>
        </Router>
      </Suspense>
    </React.Fragment>
  );
};


App.propTypes = {
  layout: PropTypes.any
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
