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
import { AsyncPaginate } from "react-select-async-paginate";
import loadClientsOptions from "./loadClientsOptions";

import { addNewEvent } from "../../apis/reminder";

function AddReminderModal(props) {
  const { openAdd, selectedDate = {}, onClose } = props;
  const [clientValue, setclientValue] = useState(null);
  const [submitState, setSubmitState] = useState(false);

  const [errorMassage, seterrorMassage] = useState("");
  const [errorAlert, setErrorAlertMassage] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");

  const handleValidEventSubmit = (e, values) => {
    const newEvent = {
      customerId: clientValue?.value,
      note: values.note,
      // time: values.time,
      type: values.type,
      timeEnd: values.timeEnd,
    };
    setSubmitState(true);
    addNewEvent(newEvent)
      .then(() => {
        showAlert(false, true);
      }
      )
      .catch((e) => {
        seterrorMassage(e.toString());
        showAlert(true, false);
      });
    setTimeout(() => {
      setSubmitState(false);
    }, 2500);
  };
  const showAlert = (danger, succ, msg) => {
    if (succ) {
      setAlertMsg(msg || "ToDo Added successfully !!!");
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
  const defaultAdditional = {
    page: 1,
  };

  const loadPageOptions = async (q, prevOptions, { page }) => {

    const { options, hasMore } = await loadClientsOptions(q, page);

    return {
      options,
      hasMore,

      additional: {
        page: page + 1,
      },
    };
  };
  return (
    <React.Fragment >
      {/* <Link to="#" className="btn btn-light" onClick={onClose}><i className="bx bx-plus me-1"></i> Add New</Link> */}
      <Modal isOpen={openAdd} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Add Reminder
        </ModalHeader>
        <ModalBody >

          <AvForm onValidSubmit={handleValidEventSubmit}>
            <Row form>

              <Col className="col-12 mb-3">
                <label>Select Client</label>

                <AsyncPaginate
                  additional={defaultAdditional}
                  value={clientValue}
                  loadOptions={loadPageOptions}
                  placeholder="Choose Client Name ..."
                  onChange={setclientValue}
                  errorMessage="please select Client"
                  validate={{ required: { value: true } }}
                />
              </Col>

              <Col className="col-12 mb-3">
                <AvField
                  name="note"
                  label="Reminder Note"
                  placeholder="Enter Your Note"
                  type="textarea"
                  errorMessage="Invalid Reminder Note"
                  validate={{
                    required: { value: true },
                  }}
                /> 
              </Col>
              <Col className="col-12 mb-3">
                <AvField
                  type="datetime-local"
                  name="timeEnd"
                  label="Reminder"
                  value={selectedDate}
                  errorMessage="Invalid Reminder Note"
                >
                </AvField>
              </Col>
              <Col className="col-12 mb-3">
                <AvRadioGroup
                  inline
                  name="type"
                  label="Type"
                  required
                  errorMessage="Invalid Reminder type"
                >
                  <AvRadio label="Reminder" value="1" />
                  <AvRadio label="Todo" value="0" />
                </AvRadioGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-success save-event"
                    disabled={submitState}
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

export default AddReminderModal;
