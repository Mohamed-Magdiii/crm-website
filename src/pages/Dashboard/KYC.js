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
                <Col sm={12} className="d-flex align-items-center">
                  <div className="circle-stat">
                    40
                  </div>
                  Pending Approval
                </Col>
                <Col sm={12} className="d-flex align-items-center">
                  <div className="circle-stat">
                    4
                  </div>
                  Missing KYC
                </Col>
              </Row>
            </Col>
            <Col sm={4} xs={12} className="col p-0">
              <Row>
                <Col sm={12} className="d-flex align-items-center">
                  <div className="circle-stat">
                    40
                  </div>
                  Approved (Unfunded)
                </Col>
                <Col sm={12} className="d-flex align-items-center">
                  <div className="circle-stat">
                    4
                  </div>
                  <div>No Kyc (Unfunded)</div>
                </Col>
              </Row>
            </Col>
            <Col sm={4} xs={12} className="col p-0">
              <Row>
                <Col sm={12} className="d-flex align-items-center">
                  <div className="circle-stat">
                    40
                  </div>
                  Rejected KYC
                </Col>
                <Col sm={12} className="d-flex align-items-center">
                  <div className="circle-stat">
                    4
                  </div>
                  Expired Documents
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