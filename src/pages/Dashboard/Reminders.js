import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col
} from "reactstrap";
import { Link } from "react-router-dom";

const RemindersStats = () => {
  const data = [{
    note: "This is test note",
    customerId: {
      _id: "62e3b14d363c715ba8c9aff6",
      firstName: "Lorem",
      lastName: "Ipsum",
    },
    timeEnd: "07 28 2022"
  }, {
    note: "This is test note",
    customerId: {
      _id: "62e3b14d363c715ba8c9aff6",
      firstName: "Lorem",
      lastName: "Ipsum",
    },
    timeEnd: "07 28 2022"
  }, {
    note: "This is test note",
    customerId: {
      _id: "62e3b14d363c715ba8c9aff6",
      firstName: "Lorem",
      lastName: "Ipsum",
    },
    timeEnd: "07 28 2022"
  }];
  return (
    <React.Fragment>
      <Card className="card-animate">
        <CardBody>
          <CardTitle>Reminders</CardTitle>
          <Row>
            {data.map((obj, index) => <Row sm={12} className="note-row pb-2 pt-2" key={index}>
              <Col sm={1} className="reminder-icon">
                <i
                  className={"bx bx-message-alt-dots font-size-18"}
                  id="edittooltip"
                ></i>
              </Col>
              <Col sm={11} className="p-0">
                <p className="mb-0"><b>{obj.note}</b></p>
                <p className="mb-0">
                  <Link to={`/clients/${obj.customerId._id}/logs`}>
                    {obj.customerId.firstName} {" "} {obj.customerId.lastName}
                  </Link>
                </p>
                <small>{obj.timeEnd}</small>
              </Col>
            </Row>)}

          </Row>
          <Row className="text-center pt-3">
            <Link to={"/calendar/reminders"}>
              <h6 className="text-decoration-underline">More</h6>
            </Link>
          </Row>
          
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default RemindersStats;