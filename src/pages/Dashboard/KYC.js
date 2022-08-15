import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col
} from "reactstrap";
const KycStats = () => {
  return (
    <React.Fragment>
      <Card className="card-animate">
        <CardBody>
          <CardTitle>Kyc Documents</CardTitle>
          <Row className="col-card-same-height mt-5">
            <Col sm={4} xs={12} className="col p-0">
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
            <Col sm={4} xs={12} className="col p-0">
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
            <Col sm={4} xs={12} className="col p-0">
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

export default KycStats;