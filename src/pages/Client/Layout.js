import React from "react";
// import { Button } from "reactstrap";

import MainNavigation  from "./MainNavigation";
// i18n
import { withTranslation } from "react-i18next";
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
      {/* TODO add a back button to get back to client list component */}
      {/* <div className="d-flex justify-content-end col-sm-11 mt-3">
        <div className="p-2">
          <Button
            type="button"
            color="primary"
            onClick={() => {onClickHandler()}}
          >
            {props.t("Back")}
          </Button>
        </div>
      </div> */}
    </React.Fragment>
  );
}

export default withTranslation()(Layout);