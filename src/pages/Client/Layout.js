import React from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

import MainNavigation  from "./MainNavigation";
// i18n
import { withTranslation } from "react-i18next";

function Layout(props){
  const clientId = props.clientId;
  // TODO this hook is not working for some reason it's not reading the push value
  const history = useHistory();
  const onClickHandler = () => {
    console.log("history before", history);
    history.push("/clients");
    console.log("history after", history);
  };
  
  return (
    <React.Fragment>
      <MainNavigation clientId={clientId} />
      <main>
        {props.children}  
      </main>
      {/* TODO add a back button to get back to client list component */}
      <div className="d-flex justify-content-end col-sm-11 mt-3">
        <div className="p-2">
          <Link to="/clients">
            <i>back</i>
            {/* <Button
              type="button"
              color="primary"
              // onClick={onClickHandler}
            >
              {props.t("Back")}
            </Button> */}
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withTranslation()(Layout);