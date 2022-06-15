import React, { useState } from "react";

import {
  UncontrolledAlert,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  AvField,
  AvForm,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import { addNewEvent } from "../../apis/reminder";
import { withTranslation } from "react-i18next";
function AddReminderToClientModal(props) {
  const { selectedClient, onClose, openAdd } = props;
  const [errorMassage, seterrorMassage] = useState("");
  const [errorAlert, setErrorAlertMassage] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");

  const handleValidEventSubmit = (e, values) => {
    addNewEvent(values)
      .then(() => {
        showAlert(false, true);
      }
      )
      .catch((e) => {
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
          {props.t("Add Reminder To Client")}
        </ModalHeader>
        <ModalBody >

          <AvForm onValidSubmit={handleValidEventSubmit}>
            <Row form>

              <Col className="col-12 mb-3">
                <label>{props.t("Client")}</label>
                <h5>{props.t(selectedClient?.firstName + " " + selectedClient?.lastName)}</h5>
              </Col>

              <Col className="col-12 mb-3">
                <AvField
                  name="note"
                  label={props.t("Reminder Note")}
                  type="text"
                  errorMessage={props.t("Invalid Reminder Note")}
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
                  name="timeEnd"
                  label={props.t("Reminder")}
                  value={new Date().toISOString().slice(0, -5)}
                  errorMessage={props.t("Invalid Reminder Note")}
                >
                </AvField>
              </Col>
              <Col className="col-12 mb-3">
                <AvRadioGroup
                  inline
                  name="type"
                  label={props.t("Type")}
                  required
                  errorMessage={props.t("Invalid Reminder type")}
                >
                  <AvRadio label={props.t("Reminder")} value="1" />
                  <AvRadio label={props.t("Todo")} value="0" />
                </AvRadioGroup>
              </Col>

            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-success save-event"
                  >
                    {props.t("Add")}
                  </button>
                </div>
              </Col>
            </Row>
          </AvForm>
          {alertShow && (
            <UncontrolledAlert color="success">
              <i className="mdi mdi-check-all me-2"></i>
              {props.t(alertmsg)}
            </UncontrolledAlert>
          )}
          {errorAlert && (
            <UncontrolledAlert color="danger">
              <i className="mdi mdi-block-helper me-2"></i>
              {props.t(errorMassage)}
            </UncontrolledAlert>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default withTranslation()(AddReminderToClientModal);
