import React from "react";

// i18n
import { withTranslation } from "react-i18next";
import MainNavigation  from "./MainNavigation";
import ClientDetailsHeader from "./ClientDetailsHeader";
// import ClientMainPage from "./ClientMainPage";

function Layout(props){
  const clientId = props.clientId;

  // const onClickHandler = () => {
  //   props.redirectToListingHandler();
  // };
  
  return (
    <React.Fragment>
      <ClientDetailsHeader clientId={clientId} />
      <MainNavigation clientId={clientId} />
      <main>  
        {props.children}  
      </main>
    </React.Fragment>
  );
}

export default withTranslation()(Layout);