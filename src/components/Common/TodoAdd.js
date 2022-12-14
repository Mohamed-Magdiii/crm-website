import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDispatch, connect
} from "react-redux";
import {
  Modal, ModalHeader,
  ModalBody,
  Row, Col, UncontrolledAlert,
} from "reactstrap";
import {
  AvForm, AvField, AvRadio, AvRadioGroup
} from "availity-reactstrap-validation";
import { withTranslation } from "react-i18next";
import { AsyncPaginate } from "react-select-async-paginate";
import moment from "moment";

import { addTodosStart } from "store/todos/actions";


import * as clientsApi from "apis/client";

// const optionsPerPage = 3;

const loadClientsOptions = async (search, page) => {
  const payload = {
    page: page,
    limit: 30,
  };
  if (search) {
    payload.searchText = search;
  }
  const output = [];
  const data = await clientsApi
    .getClients({
      payload: payload,
    })
    .then((results) => {
      return results;
    });
  data.result?.docs?.map(function (item) {
    output.push({
      value: item._id,
      label: item.firstName + " " + item.lastName,
    });
  });
  return {
    options: output,
    hasMore: data.hasNextPage,
  };
};

function TodoAdd(props) {
  const [addModal, setAddTodoModal] = useState(false);

  const dispatch = useDispatch();
  const { create = true } = props.todosPermissions;
  const toggleAddModal = () => {
    setAddTodoModal(!addModal);
    if (props.onClose) {
      props.onClose();
    }
  };
  const handleAddTodo = (e, values) => {
    dispatch(addTodosStart({
      ...values,
      id: todoObj._id
    }));
  };
  useEffect(() => {
    if (props.clearingCounter > 0 && addModal) {
      setAddTodoModal(false);
      if (props.onClose) {
        props.onClose();
      }
    }
  }, [props.clearingCounter]);

  useEffect(() => {
    setAddTodoModal(props.show);
  }, [props.show]);

  /**
   * For clients dropdown
   */
  const [clientValue, setclientValue] = useState(null);
  const [todoObj, setTodoObj] = useState({
    note: "",
    timeEnd: "",
    type: 1,
    _id: "",
  });
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

  /**
   * For reminders page
    */
  // TODO - get enums from the backend
  const statusOptions = ["open", "ongoing", "completed"];

  const handleChangeDate = async (value, ctx, input, cb)=>{
    delete input.validations.min;
    const now = moment();
    const v = moment(value);
    if (!value){
      cb("Date is required");
    }
    if (now.diff(v) > 0)
      cb("Can't choose past dates");
    else
      cb(true);
  };
  useEffect(() => {
    if (props?.data?.customerId?._id) {
      setTodoObj(props.data);
    }
    if (props.selectedDay) {
      setTodoObj({
        ...todoObj,
        timeEnd: props.selectedDay,
      });
    }
  }, [props.data, props.selectedDay]);


  return (
    <React.Fragment >
      {!props.hidenAddButton &&
        <Link to="#" className={`btn btn-primary ${!create ? "d-none" : ""}`} onClick={toggleAddModal}><i className="bx bx-plus me-1"></i>Add New Todo</Link>
      }
      <Modal isOpen={addModal} toggle={toggleAddModal} centered={true}>
        <ModalHeader toggle={toggleAddModal} tag="h4">
          {(todoObj._id ? "Edit " : "New ") + "Todo/Reminder"}
        </ModalHeader>
        <ModalBody >
          <AvForm onValidSubmit={handleAddTodo}>
            <Row form>
              {props.selectedClient && <React.Fragment>
                <Col className="col-12 mb-3">
                  <label>{props.t("Client")}</label>
                  <h5>{props.t(props.selectedClient.firstName + " " + props.selectedClient.lastName)}</h5>
                </Col>
                <AvField
                  name="customerId"
                  type="hidden"
                  value={props.selectedClient?._id}
                />
              </React.Fragment>}
              {props?.data?.customerId && <React.Fragment>
                <Col className="col-12 mb-3">
                  <label>{props.t("Client")}</label>
                  <h5>{props.t(props.data.customerId.firstName + " " + props.data.customerId.lastName)}</h5>
                </Col>
              </React.Fragment>}
              {!props.selectedClient && !props.data && <Col className="col-12 mb-3">
                <label>Client</label>
                <AsyncPaginate
                  additional={{ page: 1 }}
                  value={clientValue}
                  loadOptions={loadPageOptions}
                  placeholder="Choose Client Name ..."
                  onChange={(obj) => { setclientValue(obj) }}
                  errorMessage="please select Client"
                  validate={{ required: { value: true } }}
                />
                <AvField
                  style={{ display: "none" }}
                  name="customerId"
                  type="text"
                  errorMessage={props.t("Please Select Client")}
                  value={clientValue && clientValue.value}
                  validate={{
                    required: { value: true },
                  }}
                />
              </Col>}
              <Col className="col-12 mb-3">
                <AvField
                  className="form-control"
                  name="note"
                  label={props.t("Note")}
                  type="textarea"
                  rows="4"
                  value={todoObj.note}
                  placeholder={props.t("Enter Your Note")}
                  errorMessage={props.t("Invalid Note")}
                  validate={{
                    required: { value: true },
                  }}
                />
              </Col>
              <Col className="col-12 mb-3">
                <AvField
                  type="datetime-local"
                  name="timeEnd"
                  value={todoObj?.timeEnd ? String(moment(todoObj.timeEnd).format("YYYY-MM-DDTHH:mm")) : ""}
                  label={props.t("Date")}
                  min= {moment().format("YYYY-MM-DDTHH:mm")}
                  validate={{
                    required: { value : true },
                    custom: handleChangeDate
                  }}
                >
                </AvField>
              </Col>
              {/* Show todo status enums while editing only, while creating default status is 'open'  */}
              {todoObj._id && <Col className="col-12 mb-3">
                <AvField type="select" name="status" label={props.t("Status")} value={todoObj.status}>
                  {statusOptions.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {props.t(item)}
                      </option>
                    );
                  })}
                </AvField>
              </Col>}
              <Col className="col-12 mb-3">
                <label htmlFor="type">Type</label>
                <AvRadioGroup
                  inline
                  name="type"
                  value={String(todoObj.type)}
                  required
                  errorMessage={props.t("Invalid type")}
                >
                  <AvRadio label={props.t("Reminder")} value="1" />
                  <AvRadio label={props.t("Todo")} value="0" />
                </AvRadioGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success save-event"
                    disabled={props.adding}
                  >
                    {(todoObj._id ? props.t("Edit") : props.t("Add"))}
                  </button>
                </div>
              </Col>
            </Row>
          </AvForm>
          {
            props.error && (
              <UncontrolledAlert className="mt-4" color="danger">
                <i className="mdi mdi-block-helper me-2" />
                {props.t(props.error)}
              </UncontrolledAlert>
            )
          }
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  error: state.todosReducer.addError,
  adding: state.todosReducer.adding,
  loading: state.todosReducer.loading,
  todosPermissions: state.Profile.todosPermissions || {},
  clearingCounter: state.todosReducer.clearingCounter || 0,
});
export default connect(mapStateToProps, null)(withTranslation()(TodoAdd));
