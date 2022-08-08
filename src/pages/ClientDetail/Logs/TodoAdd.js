import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDispatch, connect
} from "react-redux";
import {
  Modal, ModalHeader,
  ModalBody,
  Row, Col
} from "reactstrap";
import {
  AvForm, AvField, AvRadio, AvRadioGroup
} from "availity-reactstrap-validation";
import { withTranslation } from "react-i18next";

import { addTodosStart } from "store/todos/actions";

function TodoAdd (props) {
  const [addModal, setAddUserModal] = useState(false);
  const dispatch = useDispatch();
  const { create = true } = props.todosPermissions;
  const toggleAddModal = () => {
    setAddUserModal(!addModal);
  };
  const handleAddTodo = (e, values) => {
    dispatch(addTodosStart(values));
  };
  useEffect(()=>{
    if (props.clearingCounter > 0 && addModal) {
      setAddUserModal(false);
    }
  }, [props.clearingCounter]);
  return (
    <React.Fragment >
      <Link to="#"  className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i> Add New Todo</Link>
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
            Add New Todo
        </ModalHeader>
        <ModalBody >
          <AvForm onValidSubmit={handleAddTodo}>
            <Row form>

              <Col className="col-12 mb-3">
                <label>{props.t("Client")}</label>
                <h5>{props.t(props.selectedClient?.firstName + " " + props.selectedClient?.lastName)}</h5>
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
                  value={props.selectedClient?._id}
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
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  todosPermissions: state.Profile.todosPermissions || {},
  clearingCounter: state.todosReducer.clearingCounter || 0,
});
export default connect(mapStateToProps, null)(withTranslation()(TodoAdd));
