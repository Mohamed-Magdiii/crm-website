import React, { useEffect, useState } from "react";

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

import { Link } from "react-router-dom";

import { getClientById } from "../../apis/client";
import { deleteEvent, updateEvent } from "../../apis/reminder";

function EditReminderModal(props) {
  const [errorMassage, seterrorMassage] = useState("");
  const [errorAlert, setErrorAlertMassage] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  const [editFlag, setEditFlag] = useState(false);

  const { openEdit, eventReminder = {}, onClose } = props;
  const [clientName, setclientName] = useState("");
  const { id, title, createdBy, client, status, timeEnd, differentEndReminderAndNow, type } = eventReminder;
  let ReminderEnd = "";
  if (differentEndReminderAndNow < 0) {
    ReminderEnd = differentEndReminderAndNow * -1 + " days ago";
  } else {
    ReminderEnd = "After " + differentEndReminderAndNow + " days";
  }
  useEffect(() => {
    setEditFlag(false);

  }, [openEdit]);
  useEffect(() => {
    getClientById(client)
      .then(response => {
        setclientName(response.result?.firstName + " " + response.result?.lastName);
      }
      )
      .catch(() => {
        seterrorMassage("fetch client error");
        showAlert(true, false);
      });

  }, [client]);


  const handleValidUpdateSubmit = (e, values) => {

    updateEvent(id, values)
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
        setEditFlag(false);
        onClose();
      }, 2000);
    } else if (danger) {
      setErrorAlertMassage(true);
      setTimeout(() => {
        setErrorAlertMassage(false);
      }, 2000);

    }
  };
  const handleDeleteReminder = (ID) => {
    deleteEvent(ID)
      .then(() => {
        showAlert(false, true, "Reminder Deleted successfully !!!");
      }
      )
      .catch((e) => {
        // console.log(e.toString());
        seterrorMassage(e.toString());
        showAlert(true, false);
      });
  };
  return (
    <React.Fragment >
      <Modal isOpen={openEdit} toggle={onClose} centered={true}>
        <ModalHeader toggle={onClose} tag="h4">
          Edit Reminder
        </ModalHeader>
        <ModalBody >
          {!editFlag ?
            <div className="row">

              <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2">
                <Row>
                  <Col className="col-10">
                    <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3">
                      <h2>Client: {clientName}</h2>
                    </div>
                  </Col>
                  <Col className="col-2">
                    <Link className="text-success float-end" to="#">
                      <i
                        className="mdi mdi-pencil font-size-18"
                        id="edittooltip"
                        onClick={() => { setEditFlag(true) }}
                      ></i>
                    </Link>

                    <Link className="text-danger" to="#">
                      <i
                        className="mdi mdi-delete font-size-18"
                        id="deletetooltip"
                        onClick={() => { handleDeleteReminder(id) }}
                      ></i>
                    </Link>
                  </Col>
                </Row>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3">
                  <h5>Reminder At : {ReminderEnd}</h5>
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3">
                  <h5>Created By : {createdBy?.firstName + " " + createdBy?.lastName}</h5>
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                  <h5>Reminder Note :  {title}</h5>
                  {/* <br /> */}
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3">
                  {type == "0" &&
                    <h5>
                      Type : Todo
                    </h5>
                  }
                  {type == "1" &&
                    <h5>
                      Type : Reminder
                    </h5>
                  }
                  {/* <h5>Created By: {createdBy?.firstName + " " + createdBy?.lastName}</h5> */}
                </div>

              </div>
            </div>

            :

            <AvForm onValidSubmit={handleValidUpdateSubmit}>
              <h1>Update</h1>

              <Row form>
                <Col className="col-12 mb-3">
                  <AvField
                    name="note"
                    label="Reminder Note"
                    type="text"
                    value={title}
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
                    value={timeEnd}
                    errorMessage="Invalid Reminder Note"
                    validate={{
                      required: { value: true },
                    }}
                  >
                  </AvField>
                </Col>
                <Col className="col-12 mb-3">
                  <AvField
                    label="status"
                    type="select"
                    name="status"
                    value={status}
                    validate={{
                      required: { value: true },
                    }}
                  >
                    <option value="">select</option>
                    <option>open</option>
                    <option>ongoing</option>
                    <option>completed</option>

                  </AvField>
                </Col>
                <Col className="col-12 mb-3">
                  <AvRadioGroup
                    inline
                    name="type"
                    label="Type"
                    value={type.toString()}
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
                    >
                      Save
                    </button>
                  </div>
                </Col>
              </Row>
            </AvForm>
          }


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

export default EditReminderModal;
