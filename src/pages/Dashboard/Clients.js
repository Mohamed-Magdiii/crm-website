import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col
} from "reactstrap";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

const ClientsStats = (props) => {
  return (
    <React.Fragment>
      <Card className="card-animate">
        <CardBody>
          <CardTitle>Clients</CardTitle>
          <Row className="col-card-same-height mt-5">
            <Col sm={5} xs={12} className="col d-flex align-items-center justify-content-center">
              <div className="">
                <p className="m-0"><b>
                  {props.clientsStats && props.clientsStats.assigned + props.clientsStats.unAssigned}  
                </b></p>
                <p className="m-0">All</p>
              </div>
            </Col>
            <Col sm={7} xs={12} className="col p-0">
              <Row>
                <Col sm={12} className="">
                  <div className="circle-stat">
                    {props.clientsStats.assigned}
                  </div>
                  Assigned
                </Col>
                <Col sm={12} className="">
                  <div className="circle-stat">
                    {props.clientsStats.unAssigned}
                  </div>
                  Unassigned
                </Col>
              </Row>
            </Col>
          </Row>
          
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  clientsStats: state.dashboardReducer.clientsStats || {},
});

export default connect(mapStateToProps, null)(withTranslation()(ClientsStats));