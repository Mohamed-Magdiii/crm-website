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
import { AsyncPaginate } from "react-select-async-paginate";
import loadClientsOptions from "./loadClientsOptions";
import {
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  getCategories as onGetCategories,
  getEvents as onGetEvents,
  updateEvent as onUpdateEvent,
} from "../../store/actions";
import { addNewEvent } from "../../apis/reminder";

function AddReminderModal(props) {
  const dispatch = useDispatch();
  const { openAdd, selectedDate = {}, onClose } = props;
  const [clientValue, setclientValue] = useState(null);

  const [errorMassage, seterrorMassage] = useState("");
  const [errorAlert, setErrorAlertMassage] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  // #########################
  console.log("#########################");
  console.log(selectedDate);
  const handleValidEventSubmit = (e, values) => {
    const newEvent = {
      customerId: clientValue?.value,
      note: values.note,
      time: values.time,
      // time: selectedDate,
      timeEnd: values.timeEnd,
    };

    addNewEvent(newEvent)
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
    // save new event
    // dispatch(onAddNewEvent(newEvent));

    // setSelectedDay(null);
    // toggle();
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
  // #########################
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
                  onChange={setclientValue}
                  errorMessage="please select Client"
                  validate={{ required: { value: true } }}
                />
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
              </Col>
              <Col className="col-12 mb-3">
                <AvField
                  type="datetime-local"
                  name="time"
                  label="Reminder start"
                  // default={selectedDate}
                  // value={selectedDate.toString()}
                  // value="2022-05-11T09:49:33"
                  value={selectedDate}
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
                  // default={selectedDate}
                  // value={selectedDate.toString()}
                  // value="2022-05-11T09:49:33"
                  value={selectedDate}
                  errorMessage="Invalid Reminder Note"
                // validate={{
                //   required: { value: true },
                // }}
                // validate={{
                //   dateRange: {
                //     start: { selectedDate },
                //     end: { value: "2027-05-11T09:49:33" }
                //   }
                // }}
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
export default connect(mapStateToProps, null)(AddReminderModal);
