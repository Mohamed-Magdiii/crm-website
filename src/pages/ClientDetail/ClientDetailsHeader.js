import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

// i18n
import { withTranslation } from "react-i18next";
import { fetchClientDetails } from "../../store/client/actions";
import { Col, Row } from "reactstrap";

function ClientDetailsHeader(props){
  const clientId = props.clientId;
  const dispatch = useDispatch();
  const loadClientDetails = () => {
    dispatch(fetchClientDetails(clientId)); 
  };

  useEffect(() => {
    loadClientDetails();
  }, []);
  
  return (
    <React.Fragment>
      <div className="navbar-header solid">
        <div className="container-fluid">
          <div className="border">
            <Row>
              <Col md="2" sm="6" xs="6">
                <div className="card-body border">
                  <div className="faq-count">
                    <h6 className="text">
                      {props.clientDetails.firstName + " " + props.clientDetails.lastName}
                    </h6>
                  </div>
                </div>
              </Col>

              <Col md="2" sm="6" xs="6">
                <div className="card-body">
                  <div className="faq-count">
                    <h6 className="text">
                      {(props.clientDetails.createdAt)}
                    </h6>
                  </div>
                </div>
              </Col>

              <Col md="2" sm="6" xs="6">
                <div className="card-body">
                  <div className="faq-count">
                    <h6 className="text">
                      {props.clientDetails.category}
                    </h6>
                  </div>
                </div>
              </Col>

              <Col md="2" sm="6" xs="6">
                <div className="card-body">
                  <div className="faq-count">
                    <h6 className="text">
                      {props.clientDetails.agent || "N/A"}
                    </h6>
                  </div>
                </div>
              </Col>

              <Col md="2" sm="6" xs="6">
                <div className="card-body">
                  <div className="faq-count">
                    <h6 className="text">
                      {props.clientDetails.isActive ? "Active" : "Inactive"}
                    </h6>
                  </div>
                </div>
              </Col>
            </Row>
 
            {/* name and id */}
            {/* <div className="btn btn-primary">
              {props.clientDetails.firstName + " " + props.clientDetails.lastName}
            </div> */}

            {/* created on */}
            {/* <div className="btn btn-primary">
              {(props.clientDetails.createdAt)}
            </div> */}

            {/* category */}
            {/* <div className="btn btn-primary">
              {props.clientDetails.category}
            </div> */}

            {/* agent */}
            {/* <div className="btn btn-primary">
              {props.clientDetails.agent || "N/A"}
            </div> */}

            {/* status */}
            {/* <div className="btn btn-primary">
              {props.clientDetails.isActive ? "Active" : "Inactive"}
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  clientDetails: state.clientReducer.clientDetails,
});

export default connect(mapStateToProps, null)(withTranslation()(ClientDetailsHeader));