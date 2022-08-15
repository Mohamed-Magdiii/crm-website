import React from "react";
import {
  Card, CardBody, CardTitle, Row, Col
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import Loader from "components/Common/Loader";


const RemindersStats = (props) => {
  return (
    <React.Fragment>
      <Card className="card-animate">
        <CardBody>
          <CardTitle>Reminders</CardTitle>
          <Row>
            {props.loading && <Col sm={12}>
              <Loader />
            </Col>}
            {!props.loading && props.todos.map((obj, index) => <Row sm={12} className="note-row pb-2 pt-2" key={index}>
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
                <small>{new Date(obj.timeEnd).toUTCString()}</small>
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

const mapStateToProps = (state) => ({
  todos: state.todosReducer.list && state.todosReducer.list.docs || [],
  loading: state.todosReducer.loading || false,
});

export default connect(mapStateToProps, null)(withTranslation()(RemindersStats));