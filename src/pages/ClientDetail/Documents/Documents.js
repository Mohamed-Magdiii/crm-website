import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

// i18n 
import { withTranslation } from "react-i18next";
import DocumentUpload from "./DocumentUpload";
import DocumentList from "./DocumentList";
import { fetchDocsStart } from "store/documents/actions";
// import { fetchClientStages } from "store/client/actions";

function ClientDetails(props) {
  const dispatch = useDispatch();

  const loadDocs = (clientId) => {
    dispatch(fetchDocsStart(clientId));
  };

  useEffect(()=>{
    loadDocs(props.clientId);
  }, []);

  return (
    <React.Fragment>
      {
        <div className="">
          <div className="container-fluid">
            <div className="">
              <Row>
                <Col md="12" sm="12" xs="12">
                  <DocumentUpload {...props}/>
                </Col>
                <Col md="12" sm="12" xs="12">
                  <DocumentList />
                </Col>
              </Row>
            </div>

          </div>
        </div>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  loading: state.clientReducer.loading,
  clientDetails: state.clientReducer.clientDetails,
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetails));