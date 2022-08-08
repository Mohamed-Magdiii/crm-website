import React from "react";
import { connect } from "react-redux";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// i18n
import { withTranslation } from "react-i18next";
import Todos from "./Todos";
import Stages from "./Stages";

function Logs(props) {
  const clientId = props.clientId;

  return (
    <React.Fragment>
      <Stages clientId={clientId}/>
      <Todos clientId={clientId}/>
    </React.Fragment>
  );
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps, null)(withTranslation()(Logs));
