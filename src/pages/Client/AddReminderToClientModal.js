import React, { useEffect, useState } from "react";
import {
  useDispatch, connect
} from "react-redux";

import {
  Button,
  Card,
  UncontrolledAlert,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { addNewEvent } from "../../apis/reminder";

function AddReminderToClientModal(props) {
  const dispatch = useDispatch();
  const { selectedClient, onClose, openAdd } = props;
  console.log("selectedClient");
  console.log(selectedClient);
  const [clientValue, setclientValue] = useState(null);

  const [errorMassage, seterrorMassage] = useState("");
  const [errorAlert, setErrorAlertMassage] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  // #########################
  console.log("#########################");
  // console.log(selectedDate);
  const handleValidEventSubmit = (e, values) => {
    console.log(values);
    // const newEvent = {
    //   customerId: clientValue?.value,
    //   note: values.note,
    //   time: values.time,
    //   // time: selectedDate,
    //   timeEnd: values.timeEnd,
    // };

    addNewEvent(values)
      .then(response => {
        showAlert(false, true);
        console.log(response);
      }
      )
      .catch((e) => {
        // console.log(e.toString());
        seterrorMassage(e.toString());
        showAlert(true, false);
      });

  };
  const showAlert = (danger, succ, msg) => {
    if (succ) {
      setAlertMsg(msg || "Reminder Updated successfully !!!");
      setAlertShow(true);
      setTimeout(() => {
        setAlertShow(false);
        onClose();
      }, 2000);
    } else if (danger) {
      setErrorAlertMassage(true);
      setTimeout(() => {
        setErrorAlertMassage(false);
      }, 2000);

    }
  };
 
  return (
    <React.Fragment >
      <Modal isOpen={openAdd} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Add Reminder To Client
        </ModalHeader>
        <ModalBody >

          <AvForm onValidSubmit={handleValidEventSubmit}>
            <Row form>

              <Col className="col-12 mb-3">
                <label>Client</label>
                <h5>{selectedClient?.firstName + " " + selectedClient?.lastName}</h5>
              </Col>

              <Col className="col-12 mb-3">
                <AvField
                  name="note"
                  label="Reminder Note"
                  type="text"
                  errorMessage="Invalid Reminder Note"
                  validate={{
                    required: { value: true },
                  }}
                />
                <AvField
                  name="customerId"
                  type="hidden"
                  value={selectedClient?._id}
                />
              </Col>
              <Col className="col-12 mb-3">
                <AvField
                  type="datetime-local"
                  name="time"
                  label="Reminder start"
                  value={new Date().toISOString().slice(0, -5)}
                  errorMessage="Invalid Reminder "
                  validate={{
                    required: { value: true },
                  }}
                >
                </AvField>
              </Col>
              <Col className="col-12 mb-3">
                <AvField
                  type="datetime-local"
                  name="timeEnd"
                  label="Reminder"
                  value={new Date().toISOString().slice(0, -5)}
                  errorMessage="Invalid Reminder Note"
                >
                </AvField>
              </Col>

            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-success save-event"
                  >
                    Add
                  </button>
                </div>
              </Col>
            </Row>
          </AvForm>
          {alertShow && (
            <UncontrolledAlert color="success">
              <i className="mdi mdi-check-all me-2"></i>
              {alertmsg}
            </UncontrolledAlert>
          )}
          {errorAlert && (
            <UncontrolledAlert color="danger">
              <i className="mdi mdi-block-helper me-2"></i>
              {errorMassage}
            </UncontrolledAlert>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  addLoading: state.usersReducer.addLoading,
  editResult: state.usersReducer.editResult,
  editError: state.usersReducer.editError,
  editSuccess: state.usersReducer.editSuccess,
  editClearingCounter: state.usersReducer.editClearingCounter,
});
export default connect(mapStateToProps, null)(AddReminderToClientModal);
