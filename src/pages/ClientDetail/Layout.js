import React from "react";

// i18n
import { withTranslation } from "react-i18next";
import MainNavigation  from "./MainNavigation";
// import ClientMainPage from "./ClientMainPage";

function Layout(props){
  const clientId = props.clientId;

  // const onClickHandler = () => {
  //   props.redirectToListingHandler();
  // };
  
  return (
    <React.Fragment>
      <MainNavigation clientId={clientId} />
      <main>  
        {props.children}  
      </main>
    </React.Fragment>
  );
}

export default withTranslation()(Layout);