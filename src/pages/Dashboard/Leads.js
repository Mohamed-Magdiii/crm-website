import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col
} from "reactstrap";
const LeadsStats = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle>Leads</CardTitle>

          <Row className="col-card-same-height mt-5">
            <Col sm={5} xs={12} className="col d-flex align-items-center justify-content-center">
              <div className="">
                <p className="m-0"><b>44</b></p>
                <p className="m-0">All</p>
              </div>
            </Col>
            <Col sm={7} xs={12} className="col p-0">
              <Row>
                <Col sm={12} className="">
                  <div className="circle-stat">
                    40
                  </div>
                  New
                </Col>
                <Col sm={12} className="">
                  <div className="circle-stat">
                    4
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

export default LeadsStats;