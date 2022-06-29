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
  const [submitState, setSubmitState] = useState(false);

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
    setSubmitState(true);
    updateEvent(id, values)
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
                  Reminder At :<span> &nbsp; </span>{ReminderEnd}
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3">
                  Created By :<span> &nbsp; </span> {createdBy?.firstName + " " + createdBy?.lastName}
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                  Reminder Note : <span> &nbsp; </span> {title?.slice(0, 1).toUpperCase() + title?.slice(1, title.length)}
                  {/* <br /> */}
                </div>
                <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-3">
                  {type == "0" &&
                    <>
                      Type : <span> &nbsp; </span>Todo
                    </>
                  }
                  {type == "1" &&
                    <>
                      Type :<span> &nbsp; </span> Reminder
                    </>
                  }
                  {/* <h5>Created By: {createdBy?.firstName + " " + createdBy?.lastName}</h5> */}
                </div>

              </div>
            </div>

            :

            <AvForm onValidSubmit={handleValidUpdateSubmit}>
              <Row form>
                <Col className="col-12 mb-3">
                  <AvField
                    name="note"
                    label="Note"
                    placeholder="Enter Note"
                    type="text"
                    value={title}
                    errorMessage="Invalid Note"
                    validate={{
                      required: { value: true },
                    }}
                  />
                </Col>
                <Col className="col-12 mb-3">
                  <AvField
                    type="datetime-local"
                    name="timeEnd"
                    label="Date"
                    value={timeEnd}
                    errorMessage="Invalid Date"
                    validate={{
                      required: { value: true },
                    }}
                  >
                  </AvField>
                </Col>
                <Col className="col-12 mb-3">
                  <AvField
                    label="Status"
                    type="select"
                    name="status"
                    value={status}
                    errorMassage="Invalid Status"
                    validate={{
                      required: {
                        value: true
                      },
                    }}
                  >
                    <option value="">Select</option>
                    <option>open</option>
                    <option>ongoing</option>
                    <option>completed</option>

                  </AvField>
                </Col>
                <Col className="col-12 mb-2">
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
                      disabled={submitState}
                    >
                      Edit
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
